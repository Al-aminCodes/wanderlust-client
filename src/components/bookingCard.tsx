"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient, useSession } from "@/lib/auth-client";
import { ArrowRight, Check, CheckCircle2, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

interface Travel {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BookingCard = ({ destination }: { destination: Travel }) => {
  const { data: session, isPending: sessionPending } = useSession();
  const user = session?.user;

  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isCheckingBooking, setIsCheckingBooking] = useState(true);

  // Check saved booking whenever the user or destination changes.
  useEffect(() => {
    if (sessionPending) return;

    let cancelled = false;

    const checkBooking = async () => {
      setIsCheckingBooking(true);
      setIsBooked(false);

      if (!user?.email) {
        setIsCheckingBooking(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          email: user.email.toLowerCase().trim(),
          destinationId: destination._id,
        });

        const response = await fetch(
          `${API_URL}/booking/check?${params.toString()}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Failed to check booking status.");
        }

        const result = await response.json();

        if (!cancelled) {
          setIsBooked(result.isBooked === true);
        }
      } catch (error) {
        console.error("Booking status check failed:", error);
      } finally {
        if (!cancelled) {
          setIsCheckingBooking(false);
        }
      }
    };

    void checkBooking();

    return () => {
      cancelled = true;
    };
  }, [user?.email, destination._id, sessionPending]);

  const handleBookingDate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please log in before booking.");
      return;
    }

    if (isBooking || isBooked) return;

    const form = e.currentTarget;
    const { data, error } = await authClient.token();
    const token = data?.token;

    const departureDate = (
      form.elements.namedItem("departure-date") as HTMLInputElement
    ).value;

    const datas = {
      ...destination,
      departureDate,
      destinationId: destination._id,
      email: user.email.toLowerCase().trim(),
      userName: user.name ?? "",
      bookingDate: new Date().toISOString(),
    };

    setIsBooking(true);

    try {
      const response = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datas),
      });

      const result = await response.json();

      if (response.status === 409) {
        setIsBooked(true);
        toast.warning(
          result.message || "You have already booked this destination!",
        );
        return;
      }

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Booking failed!");
      }

      setIsBooked(true);
      toast.success(result.message || "Booking successful!");
    } catch (error) {
      console.error("Booking error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <aside className="w-full lg:sticky lg:top-6">
      <Card className="gap-0 rounded-sm border-gray-200 py-0 shadow-md">
        <CardContent className="p-4">
          <p className="text-xs text-gray-500">Starting from</p>

          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-cyan-600">
            ${Number(destination.price).toLocaleString()}
          </p>

          <p className="text-[11px] text-gray-500">per person</p>

          <form onSubmit={handleBookingDate}>
            <div className="mt-5">
              <label htmlFor="departure-date" className="sr-only">
                Departure date
              </label>

              <Input
                id="departure-date"
                name="departure-date"
                type="date"
                defaultValue={destination.departureDate}
                disabled={isBooking || isBooked || isCheckingBooking}
                required
                className="h-10 rounded-none border-gray-200 bg-gray-50 text-xs shadow-none"
              />
            </div>

            <Button
              type="submit"
              disabled={
                isBooking || isBooked || isCheckingBooking || sessionPending
              }
              className={`mt-3 inline-flex h-10 w-full items-center justify-center rounded-none text-xs font-medium text-white transition-colors ${
                isBooked
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              {isCheckingBooking || sessionPending ? (
                <>
                  <LoaderCircle className="mr-1 size-4 animate-spin" />
                  Checking...
                </>
              ) : isBooking ? (
                <>
                  <LoaderCircle className="mr-1 size-4 animate-spin" />
                  Booking...
                </>
              ) : isBooked ? (
                <>
                  <CheckCircle2 className="mr-1 size-4" />
                  Booked
                </>
              ) : (
                <>
                  Book Now
                  <ArrowRight size={15} className="ml-1" />
                </>
              )}
            </Button>
          </form>

          <Separator className="my-4" />

          <ul className="space-y-2.5">
            {[
              "Free cancellation up to 7 days",
              "Travel insurance included",
              "24/7 customer support",
            ].map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-[11px] leading-4 text-gray-500"
              >
                <Check size={13} className="mt-0.5 shrink-0 text-green-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
};

export default BookingCard;
