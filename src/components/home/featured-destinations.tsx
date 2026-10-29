"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Star,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
}

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured");
        }

        const response = await fetch(`${apiUrl}/destination/limit`);

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const data: Destination[] = await response.json();
        setDestinations(data.slice(0, 10));
      } catch (error) {
        console.error("Featured destinations error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 410 : -410,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Your next adventure
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Featured Destinations
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destination"
          className="group inline-flex items-center gap-3 rounded-full border border-teal-200/80 bg-white px-5 py-3 text-sm font-semibold text-teal-800 shadow-sm transition-all duration-300 hover:border-teal-700 hover:bg-teal-700 hover:text-white hover:shadow-lg hover:shadow-teal-700/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          <span>Explore All Destinations</span>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/15 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      {/* Destination carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="min-w-0 flex-[0_0_85%] overflow-hidden border-0 shadow-none sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
              >
                <Skeleton className="aspect-[1.55/1] w-full rounded-none" />
                <CardContent className="space-y-3 p-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          : destinations.map((destination) => (
              <Card
                key={destination._id}
                className="group min-w-0 flex-[0_0_85%] snap-start overflow-hidden rounded-sm border-0 bg-white shadow-none sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
              >
                {/* Destination image */}
                <Link
                  href={`/destination/${destination._id}`}
                  className="relative block aspect-[1.55/1] overflow-hidden bg-gray-100"
                >
                  <Image
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-sm bg-white/95 px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                    <span>{destination.rating ?? "New"}</span>
                    {destination.rating != null && (
                      <Star className="h-3 w-3 fill-current" />
                    )}
                  </div>

                  <span className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-3 py-1 text-xs font-medium text-teal-800">
                    {destination.category}
                  </span>
                </Link>

                {/* Destination details */}
                <CardContent className="px-0 pb-2 pt-4">
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{destination.country}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/destination/${destination._id}`}
                      className="text-lg font-medium leading-snug text-gray-900 transition-colors hover:text-teal-700"
                    >
                      {destination.name}
                    </Link>

                    <p className="shrink-0 text-right text-lg font-semibold text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(Number(destination.price))}
                      <span className="text-xs font-normal text-gray-500">
                        /person
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{destination.duration}</span>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <Link
                      href={`/destination/${destination._id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-teal-700 transition-colors hover:text-teal-900"
                    >
                      Explore destination
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

        {!loading && destinations.length === 0 && (
          <div className="w-full rounded-lg border border-dashed p-10 text-center">
            <MapPin className="mx-auto mb-3 h-8 w-8 text-gray-400" />
            <h3 className="font-semibold text-gray-900">No destinations yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add some travel destinations to feature them here.
            </p>
          </div>
        )}
      </div>

      {/* Carousel controls */}
      <div className="mt-3 flex items-center gap-5">
        <span className="shrink-0 text-sm font-medium text-gray-800">
          {destinations.length > 0 ? `1–${destinations.length}` : "0"}{" "}
          <span className="text-gray-400">/ {destinations.length}</span>
        </span>

        <div className="h-px flex-1 bg-gray-200" />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Scroll destinations left"
            onClick={() => scroll("left")}
            className="h-10 w-10 rounded-full border-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Scroll destinations right"
            onClick={() => scroll("right")}
            className="h-10 w-10 rounded-full border-gray-300"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
