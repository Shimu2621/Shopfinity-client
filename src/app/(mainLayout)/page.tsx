import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { BasicServicesSection } from "@/components/sections/BasicServicesSection";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import FeaturedCategory from "@/components/sections/FeaturedCategory";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HeroSection from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { SpecialOfferSection } from "@/components/sections/SpecialOfferSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import SignupPage from "../(auth)/signup/page";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategory />
      <BasicServicesSection />
      <FeaturedProducts />
      <SpecialOfferSection />
      <AboutUsSection />
      <NewsletterSection />
      <TestimonialSection />
      <SignupPage />

      <ContactUsSection />
    </div>
  );
}
