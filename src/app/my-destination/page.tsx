"use client";

import type { Travel } from "@/components/DestinationCard";
import DestinationList from "@/components/DestinationList";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function AllDestinationPage() {
  const [destinations, setDestinations] = useState<Travel[]>([]);
  const [hasError, setHasError] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const controller = new AbortController();

    async function fetchDestinations() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-destination/${email}`,
          { cache: "no-store", signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        setDestinations(await response.json());
        setHasError(false);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error fetching destinations:", error);
        setHasError(true);
      }
    }

    void fetchDestinations();
    return () => controller.abort();
  }, [email]);

  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-300">
        <header className="mb-5">
          <h1 className="text-2xl font-normal tracking-tight text-gray-900 sm:text-[28px]">
            Explore My Destinations
          </h1>

          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        {hasError ? (
          <p className="py-10 text-sm text-red-500">
            Unable to load destinations. Please try again later.
          </p>
        ) : (
          <DestinationList destinations={destinations} />
        )}
      </div>
    </main>
  );
}
