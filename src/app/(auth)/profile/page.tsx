"use client";

import {
  Camera,
  DollarSign,
  Globe2,
  MapPin,
  Pencil,
  Plane,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Sarah Mitchell",
    location: "San Francisco, CA",
    memberSince: "Mar 2024",
    nationality: "United States",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
  });

  const [form, setForm] = useState(profile);
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const statistics = [
    {
      title: "Total Bookings",
      value: "12",
      icon: Plane,
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Countries Visited",
      value: "18",
      icon: Globe2,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Upcoming Trips",
      value: "2",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-500",
    },
    {
      title: "Total Spent",
      value: "$15,750",
      icon: DollarSign,
      color: "bg-fuchsia-50 text-fuchsia-500",
    },
  ];

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfile(form);
    setOpen(false);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="font-serif text-4xl tracking-tight text-neutral-950">
            My Profile
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Manage your account settings and travel preferences
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="rounded-none border-neutral-100 shadow-sm md:col-span-1">
            <CardContent className="p-5">
              <div className="flex flex-col items-center pt-1">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={user?.image ?? profile.image}
                      alt={user?.name ?? profile.name}
                    />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>

                  <button
                    type="button"
                    aria-label="Change profile photo"
                    onClick={() =>
                      document.getElementById("profile-image")?.click()
                    }
                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-600 text-white shadow-sm transition hover:bg-cyan-700"
                  >
                    <Camera className="h-4 w-4" />
                  </button>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfile((prev) => ({
                          ...prev,
                          image: URL.createObjectURL(file),
                        }));
                      }
                    }}
                  />
                </div>

                <h2 className="mt-4 font-serif text-lg font-semibold text-neutral-900">
                  {user?.name}
                </h2>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </p>
              </div>

              <Separator className="my-5" />

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-neutral-500">Member since</span>
                  <span className="font-semibold text-neutral-900">
                    {profile.memberSince}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-neutral-500">Nationality</span>
                  <span className="text-right font-semibold text-neutral-900">
                    {profile.nationality}
                  </span>
                </div>
              </div>

              <Dialog
                open={open}
                onOpenChange={(value) => {
                  setOpen(value);
                  if (value) setForm(profile);
                }}
              >
                <Button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mt-5 h-10 w-full rounded-none bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your personal and travel information.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-name">Full Name</Label>
                      <Input
                        id="profile-name"
                        value={form.name}
                        required
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-location">Location</Label>
                      <Input
                        id="profile-location"
                        value={form.location}
                        required
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-nationality">Nationality</Label>
                      <Input
                        id="profile-nationality"
                        value={form.nationality}
                        required
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nationality: e.target.value,
                          })
                        }
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-cyan-600 hover:bg-cyan-700"
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Travel Statistics */}
          <section className="md:col-span-2">
            <h2 className="mb-3 font-serif text-base font-semibold text-neutral-900">
              Travel Statistics
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {statistics.map((stat) => {
                const Icon = stat.icon;

                return (
                  <Card
                    key={stat.title}
                    className="rounded-none border-neutral-100 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-xs text-neutral-500">{stat.title}</p>
                        <p className="mt-2 text-base font-semibold text-neutral-950">
                          {stat.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
