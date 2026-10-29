import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex min-h-110 items-center justify-center px-4 py-20 text-center">
      <Image
        src="/images/CTA.png"
        alt="Airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div className="relative">
        <h2 className="font-serif text-4xl text-white md:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/80 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="#"
          className="mt-10 inline-flex h-12 items-center gap-3 bg-white px-10 text-sm font-bold tracking-wide text-neutral-900 uppercase transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRightIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
