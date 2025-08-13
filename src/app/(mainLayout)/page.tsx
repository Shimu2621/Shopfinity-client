import FeaturedCategory from "@/components/sections/FeaturedCategory";
import HeroSection from "@/components/sections/HeroSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategory />
      <TestimonialSection />
    </div>
  );
}
