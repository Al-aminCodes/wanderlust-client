import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Kyoto During Cherry Blossom Season Was A Dream. Every Temple Visit Felt Like Stepping Back In Time And The Local Food Was Outstanding."',
    name: "Emma Wilson",
    location: "London, UK",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Safari In Kenya Was A Once-In-A-Lifetime Experience. We Spotted The Big Five And The Camp Was Far More Comfortable Than We Expected."',
    name: "David Kim",
    location: "Seoul, South Korea",
    image: "/images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-4 pt-16 pb-20 md:pt-20">
      <Carousel
        opts={{ align: "start" }}
        className="mx-auto w-full max-w-7xl"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl text-neutral-900 md:text-5xl lg:text-[52px]">
              What Travelers Say
            </h2>
            <p className="mt-3 text-base text-gray-500 md:text-lg">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <CarouselPrevious className="static size-12 border-neutral-200 bg-white text-gray-400 hover:text-cyan-600 md:size-13" />
            <CarouselNext className="static size-12 border-neutral-200 bg-white text-gray-400 hover:text-cyan-600 md:size-13" />
          </div>
        </div>
        <CarouselContent className="mt-10">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="md:basis-1/2">
              <div className="flex h-full flex-col gap-6 rounded-sm border border-neutral-200 bg-white p-6 md:flex-row">
                <div className="flex flex-1 flex-col">
                  <p className="text-[19px] leading-relaxed text-neutral-900 md:text-xl">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto pt-8">
                    <p className="text-[17px] text-cyan-600">
                      — {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="relative h-64 w-full shrink-0 md:h-auto md:w-48">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
