import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { BasicServicesSection } from "@/components/sections/BasicServicesSection";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import FeaturedCategory from "@/components/sections/FeaturedCategory";
import HeroSection from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { SpecialOfferSection } from "@/components/sections/SpecialOfferSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategory />
      <BasicServicesSection />
      <SpecialOfferSection />
      <AboutUsSection />
      <ContactUsSection />
      <NewsletterSection />
      <TestimonialSection />
    </div>
  );
}
