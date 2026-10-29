import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationDetailLoading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-5 sm:px-8 lg:px-10">
        {/* Back and action buttons */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-36" />

          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-sm" />
            <Skeleton className="h-8 w-20 rounded-sm" />
          </div>
        </div>

        {/* Hero image */}
        <Skeleton className="h-[230px] w-full rounded-none sm:h-[320px] lg:h-[390px]" />

        <div className="my-6 h-px bg-gray-100" />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          {/* Main information */}
          <section className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-64 max-w-full" />

              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
              <Skeleton className="h-3 w-3/4" />
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-10/12" />

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="size-4 shrink-0 rounded-full" />
                    <Skeleton className="h-3 w-48 max-w-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Booking card */}
          <aside className="w-full lg:sticky lg:top-6">
            <div className="border border-gray-200 p-4 shadow-sm">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-8 w-32" />
              <Skeleton className="mt-2 h-3 w-20" />

              <Skeleton className="mt-5 h-10 w-full rounded-sm" />
              <Skeleton className="mt-3 h-10 w-full rounded-sm" />

              <div className="my-4 h-px bg-gray-100" />

              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="size-3 rounded-full" />
                    <Skeleton className="h-3 w-44 max-w-full" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
