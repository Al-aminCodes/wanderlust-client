import type { Travel } from "@/components/DestinationCard";
import DestinationList from "@/components/DestinationList";

export const dynamic = "force-dynamic";

export default async function AllDestinationPage() {
  let destinations: Travel[] = [];
  let hasError = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destinations`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch destinations");
    }

    destinations = await response.json();
  } catch (error) {
    console.error("Error fetching destinations:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-300">
        <header className="mb-5">
          <h1 className="text-2xl font-normal tracking-tight text-gray-900 sm:text-[28px]">
            Explore All Destinations
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
