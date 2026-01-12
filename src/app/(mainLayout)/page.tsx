import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { BasicServicesSection } from "@/components/sections/BasicServicesSection";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HeroSection from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { SpecialOfferSection } from "@/components/sections/SpecialOfferSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <BasicServicesSection />
      <FeaturedProducts />
      <SpecialOfferSection />
      <AboutUsSection />
      <NewsletterSection />
      <TestimonialSection />
      <ContactUsSection />
    </div>
  );
}
