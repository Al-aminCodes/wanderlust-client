import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import FeaturedDestinations from "@/components/home/featured-destinations";

import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <FeaturedDestinations />
        <WhyChoose />
        <Testimonials />
        <Cta />
      </main>
    </>
  );
}
