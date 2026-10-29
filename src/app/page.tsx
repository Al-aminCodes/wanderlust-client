import { Banner } from "@/components/banner";
import { Cta } from "@/components/cta";

import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <WhyChoose />
        <Testimonials />
        <Cta />
      </main>
    </>
  );
}
