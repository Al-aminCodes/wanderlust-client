import { HeadphonesIcon, MapIcon, ShieldCheckIcon } from "lucide-react";

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative bg-[#e8f9fc] px-4 py-12 md:py-16">
      <span
        aria-hidden
        className="absolute top-1/2 left-6 hidden h-5 w-px -translate-y-1/2 bg-cyan-600 lg:block"
      />
      <span
        aria-hidden
        className="absolute top-1/2 right-6 hidden h-5 w-px -translate-y-1/2 bg-cyan-600 lg:block"
      />
      <div className="mx-auto max-w-7xl">
        <span aria-hidden className="mx-auto block h-0.5 w-5 bg-cyan-600" />
        <h2 className="mt-12 text-center font-serif text-4xl text-neutral-900 md:text-5xl lg:text-6xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-base text-gray-500 md:text-lg">
          Your trusted partner for exceptional travel experiences
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white p-9 transition-shadow hover:shadow-[0_6px_28px_rgba(8,145,178,0.12)] md:p-10"
            >
              <Icon className="size-10 text-cyan-600" aria-hidden />
              <h3 className="mt-5 font-serif text-2xl text-neutral-800 md:text-3xl">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>
        <span aria-hidden className="mx-auto mt-14 block h-0.5 w-5 bg-cyan-600" />
      </div>
    </section>
  );
}
