import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="bg-neutral-900">
      <div className="relative flex min-h-130 flex-col items-center justify-center px-4 py-20 text-center">
        <Image
          src="/images/Banner.png"
          alt="Aerial view of a coastal bay"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative">
          <h1 className="font-serif text-5xl leading-[1.15] text-white md:text-7xl">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/90 md:text-lg">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-7">
            <a
              href="#"
              className="inline-flex h-12 items-center gap-3 bg-cyan-600 px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-cyan-500"
            >
              Explore Now
              <ArrowRightIcon className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-12 items-center bg-white/25 px-8 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/35"
            >
              View Destination
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-white/30 bg-white/15 backdrop-blur-sm md:flex-row md:divide-x md:divide-y-0">
        {searchFields.map((field) => (
          <div key={field.label} className="flex-1 px-7 py-3.5">
            <p className="text-[17px] font-semibold text-white">
              {field.label}
            </p>
            <p className="mt-1 text-sm text-white/75">{field.value}</p>
          </div>
        ))}
        <button
          type="button"
          className="h-12 shrink-0 bg-cyan-600 text-lg font-bold text-white transition-colors hover:bg-cyan-500 md:h-auto md:w-56"
        >
          Search
        </button>
      </div>
    </section>
  );
}
