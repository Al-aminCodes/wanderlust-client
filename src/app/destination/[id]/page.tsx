import { ArrowLeft, CalendarDays, Check, MapPin, Star } from "lucide-react";
import Link from "next/link";

import DeleteDialog from "@/components/DeleteDestination";
import EditTravelDialog from "@/components/EditTravelDialog";

import BookingCard from "@/components/bookingCard";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import type { ComponentType } from "react";

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

  isOwner: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const highlights = [
  "Luxury beachfront accommodation",
  "Visit local attractions at sunset",
  "Traditional local cuisine experience",
  "Private beach dinner experience",
  "Scenic nature exploration",
  "Unforgettable travel memories",
];

async function getDestination(id: string): Promise<Travel | null> {
  const requestHeaders = await headers();

  const jwtToken = await auth.api.getToken({
    headers: requestHeaders,
  });
  const token = jwtToken?.token;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch destinations");
    }

    const destinations: Travel = await response.json();
    return destinations;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const destination = await getDestination(id);
  // const session = await auth.api.getSession({ headers: await headers() });

  // const isOwner =
  //   !!session?.user?.email && session.user.email === destination?.userEmail;

  if (!destination) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-20 text-center">
        <h1 className="text-2xl font-semibold">Destination not found</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          This destination may have been removed or does not exist.
        </p>

        <Link
          href="/destinations"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to destinations
        </Link>
      </main>
    );
  }

  const duration = Number(destination.duration) || 1;
  const DestinationEditTravelDialog =
    EditTravelDialog as unknown as ComponentType<{
      destination: Travel;
    }>;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-310 px-5 py-5 sm:px-8 lg:px-10">
        {/* Top navigation */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={15} />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            {destination?.isOwner && (
              <>
                <DestinationEditTravelDialog destination={destination} />
                <DeleteDialog
                  id={String(destination._id)}
                  name={destination.name}
                />
              </>
            )}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-57.5 overflow-hidden bg-gray-100 sm:h-80 lg:h-97.5">
          <Image
            width={600}
            height={600}
            src={destination.imageUrl}
            alt={destination.name}
            className="h-full w-full object-cover"
          />
        </div>

        <Separator className="my-5 sm:my-6" />

        {/* Main content and booking card */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          {/* Destination information */}
          <section className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={13} />
              {destination.country}
            </div>

            <h1 className="mt-2 text-3xl font-normal tracking-tight text-gray-950 sm:text-4xl">
              {destination.name}
            </h1>

            {/* Rating and duration */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="fill-green-600 text-green-600" />
                <span className="font-semibold">4.9</span>
                <span className="text-gray-500">(234 reviews)</span>
              </div>

              <span className="hidden text-gray-300 sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-gray-800">
                <CalendarDays size={13} />
                <span className="font-medium">
                  {duration} Days / {duration} Nights
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="mt-7">
              <h2 className="text-lg font-medium tracking-tight">Overview</h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                {destination.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-6">
              <h2 className="text-lg font-medium tracking-tight">Highlights</h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Discover the beauty of {destination.name}, explore local
                attractions, experience the culture, and enjoy memorable moments
                during your journey.
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs leading-5 text-gray-600"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Booking card */}
          <BookingCard destination={destination}></BookingCard>
        </div>
      </div>
    </main>
  );
}
