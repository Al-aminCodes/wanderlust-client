"use client";

import { useSession } from "@/lib/auth-client";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  MapPin,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Booking } from "./page";
import { redirect } from "next/navigation";

interface MyBookingListProps {
  initialBookings: Booking[];
}

function formatDate(date: string) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MyBookingList({ initialBookings }: MyBookingListProps) {
  const { data: session, isPending } = useSession();

  const [cancelledBookingIds, setCancelledBookingIds] = useState<string[]>([]);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const userEmail = session?.user?.email?.trim().toLowerCase();
  const bookings = userEmail
    ? initialBookings
        .filter((booking) => booking.email?.trim().toLowerCase() === userEmail)
        .map((booking) =>
          cancelledBookingIds.includes(booking._id)
            ? { ...booking, status: "Cancelled" }
            : booking,
        )
    : [];

  const handleCancel = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    setCancellingId(id);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/booking/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Cancellation failed: ${response.status}`);
      }

      setCancelledBookingIds((previous) =>
        previous.includes(id) ? previous : [...previous, id],
      );
    } catch (error) {
      console.error("Cancel booking error:", error);
      window.alert(
        "Could not cancel this booking. Please check your backend API.",
      );
    } finally {
      setCancellingId(null);
    }
    redirect("/my-bookings");
  };

  if (isPending) {
    return (
      <main className="min-h-[60vh] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-10 w-56 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-72 rounded bg-gray-100" />
          <div className="mt-8 h-40 rounded bg-gray-100" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-gray-200 pb-7">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-gray-950 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Manage and view your upcoming travel plans
          </p>
        </header>

        {!session?.user ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Please log in to view your bookings
            </h2>

            <Link
              href="/login"
              className="mt-5 inline-block bg-cyan-600 px-5 py-2.5 text-sm text-white hover:bg-cyan-700"
            >
              Login
            </Link>
          </div>
        ) : bookings.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-36 sm:w-69">
                  <Image
                    src={booking.imageUrl || booking.image}
                    alt={booking.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 276px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span
                    className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === "Pending"
                        ? "bg-orange-50 text-orange-600"
                        : booking.status === "Cancelled"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                    }`}
                  >
                    {booking.status === "Pending" ? (
                      <Clock3 className="size-3.5" />
                    ) : booking.status === "Cancelled" ? (
                      <Trash2 className="size-3.5" />
                    ) : (
                      <CheckCircle2 className="size-3.5" />
                    )}

                    {booking.status || "Confirmed"}
                  </span>

                  <h2 className="font-serif text-xl font-semibold leading-tight text-gray-950 sm:text-2xl">
                    {booking.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 shrink-0" />
                      Departure: {formatDate(booking.departureDate)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0" />
                      Booking ID: {booking._id}
                    </span>
                  </div>

                  <p className="mt-2 font-serif text-2xl font-semibold text-cyan-600">
                    ৳{Number(booking.price).toLocaleString("en-BD")}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:self-end">
                  {booking.status !== "Cancelled" && (
                    <button
                      type="button"
                      disabled={cancellingId === booking._id}
                      onClick={() => handleCancel(booking._id)}
                      className="inline-flex h-9 items-center justify-center gap-1.5 border border-red-400 px-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
                    >
                      <Trash2 className="size-3.5" />
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel"}
                    </button>
                  )}

                  <Link
                    href={`/destination/${booking._id}`}
                    className="inline-flex h-9 items-center justify-center gap-1.5 bg-cyan-600 px-4 text-xs font-medium text-white transition-colors hover:bg-cyan-700"
                  >
                    <Eye className="size-3.5" />
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CalendarDays className="size-12 text-gray-300" />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
              You haven&apos;t booked any trips yet. Explore destinations and
              plan your next adventure.
            </p>

            <Link
              href="/destination"
              className="mt-6 inline-block bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-700"
            >
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
