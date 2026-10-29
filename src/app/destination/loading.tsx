import { Skeleton } from "@/components/ui/skeleton";

function DestinationCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image */}
      <Skeleton className="h-48 w-full rounded-xl sm:h-44 lg:h-48" />

      {/* Country */}
      <Skeleton className="h-3 w-24" />

      {/* Name and price */}
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Duration */}
      <Skeleton className="h-3 w-28" />

      {/* Book now */}
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export default function DestinationsLoading() {
  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-300">
        {/* Page heading */}
        <header className="mb-5 space-y-2">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-3 w-80 max-w-full" />
        </header>

        {/* Filter skeletons */}
        <div className="grid grid-cols-1 border border-gray-200 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-7 w-full rounded-none border-b border-gray-100 sm:border-b-0"
            />
          ))}
        </div>

        {/* Destination count */}
        <Skeleton className="mt-3 h-3 w-36" />

        {/* Cards */}
        <div className="mt-5 grid grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <DestinationCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
