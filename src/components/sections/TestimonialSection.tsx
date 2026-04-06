"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { AuroraText } from "@/components/magicui/aurora-text";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const testimonials = [
  {
    id: 1,
    name: "Angel Whites",
    role: "Marketing Manager",
    company: "TechCorp Inc.",
    image:
      "https://img.freepik.com/premium-photo/official-girl-iamges-hd-wallpaper-free-download-girl-model-with-pant-shairt-product-view-ad_88650-3235.jpg",
    rating: 5,
    text: "This platform has completely transformed how we approach our marketing campaigns. The results have been outstanding and the support team is incredibly responsive.",
    bgColor: "from-blue-50 to-cyan-50",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Designer",
    company: "Design Studio",
    image:
      "https://img.freepik.com/premium-photo/professional-male-entrepreneur-hd-8k-wallpaper-stock-photographic-image_1033957-28697.jpg",
    rating: 5,
    text: "The user experience is phenomenal. Every feature is thoughtfully designed and the interface is incredibly intuitive. Highly recommend to any creative professional.",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "CEO",
    company: "StartupXYZ",
    image:
      "https://img.freepik.com/premium-photo/official-girl-iamges-hd-wallpaper-free-download-girl-model-with-pant-shairt-product-view-ad_88650-3233.jpg",
    rating: 5,
    text: "As a startup founder, I need tools that scale with my business. This solution has been perfect - powerful, flexible, and cost-effective.",
    bgColor: "from-green-50 to-emerald-50",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Software Engineer",
    company: "DevTech Solutions",
    image:
      "https://img.freepik.com/premium-photo/professional-male-entrepreneur-hd-8k-wallpaper-stock-photographic-image_1033957-28697.jpg",
    rating: 5,
    text: "The technical implementation is flawless. Great API documentation, excellent performance, and the development experience is top-notch.",
    bgColor: "from-orange-50 to-yellow-50",
  },
  {
    id: 5,
    name: "Emily Watson",
    role: "Operations Director",
    company: "Global Enterprises",
    image:
      "https://img.freepik.com/premium-photo/official-girl-iamges-hd-wallpaper-free-download-girl-model-with-pant-shairt-product-view-ad_88650-3234.jpg",
    rating: 5,
    text: "We've seen a 40% increase in efficiency since implementing this solution. The automation features have saved us countless hours every week.",
    bgColor: "from-indigo-50 to-blue-50",
  },
  {
    id: 6,
    name: "James Thompson",
    role: "Creative Director",
    company: "Brand Agency",
    image:
      "https://img.freepik.com/premium-photo/portrait-smart-handsome-business-man_1004054-30862.jpg?w=360",
    rating: 5,
    text: "The creative possibilities are endless. This tool has become an essential part of our workflow and has elevated the quality of our deliverables.",
    bgColor: "from-rose-50 to-pink-50",
  },
];

const avatars = [
  {
    imageUrl:
      "https://img.freepik.com/premium-photo/portrait-smart-handsome-business-man_1004054-30862.jpg?w=360",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl:
      "https://img.freepik.com/premium-photo/official-girl-iamges-hd-wallpaper-free-download-girl-model-with-pant-shairt-product-view-ad_88650-3234.jpg",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl:
      "https://img.freepik.com/premium-photo/professional-male-entrepreneur-hd-8k-wallpaper-stock-photographic-image_1033957-28697.jpg",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl:
      "https://img.freepik.com/premium-photo/official-girl-iamges-hd-wallpaper-free-download-girl-model-with-pant-shairt-product-view-ad_88650-3235.jpg",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl:
      "https://img.freepik.com/free-photo/dreamy-european-lady-with-wavy-hairstyle-posing-white-wall-indoor-photo-joyful-girl-black-blouse_197531-11755.jpg?semt=ais_hybrid&w=740&q=80",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl:
      "https://img.freepik.com/premium-photo/profile-attractive-lady-toothy-smiling-arms-crossed_274222-27447.jpg?semt=ais_hybrid&w=740&q=80",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export function TestimonialSection() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="py-20 px-4 bg-secondary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"></div>

      <div className="container mx-auto max-w-[90rem] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-6 bg-badge text-rose-800 overflow-hidden">
            ✨ Testimonials
          </ShinyButton>

          <h2 className="text-4xl lg:text-5xl font-bold text-forground mb-6">
            What Our{" "}
            <AuroraText className="text-blue-600 italic">Amazing</AuroraText>
            <br />
            Customers Say About Us
          </h2>
          <p className=" text-muted-foreground max-w-3xl mx-auto">
            Don&rsquo;t just take our word for it. Here&rsquo;s what real
            customers have to say about their experiences with our platform
          </p>

          {/* new */}
          <div className="flex items-center justify-center gap-4">
            {/* Overlapping Profile Photos */}
            <div className="flex -space-x-3">
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="w-5 h-5 text-gray-400" />
              </div>

              {/* Rating Text */}
              <span className="text-muted-foreground">
                4.5/5 (100+ Reviews)
              </span>
            </div>
          </div>
          {/* new */}
        </motion.div>

        <div className="relative">
          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-rose-200 hover:bg-rose-50 hover:border-rose-300 shadow-lg transition-all duration-300"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="w-5 h-5 text-rose-600" />
            </Button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-rose-200 hover:bg-rose-50 hover:border-rose-300 shadow-lg transition-all duration-300"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="w-5 h-5 text-rose-600" />
            </Button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2.2,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 50,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="testimonials-swiper !pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card
                    className={`h-full bg-gradient-to-br ${testimonial.bgColor} dark:from-gray-900 dark:to-black border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group`}
                  >
                    <CardContent className="relative p-8 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Quote className="w-6 h-6 text-rose-600" />
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-muted-forground text-lg leading-relaxed mb-8 flex-grow italic">
                        &rdquo;{testimonial.text}&rdquo;
                      </blockquote>

                      {/* Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full object-cover border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h4 className="font-bold text-forground text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-muted-forground text-sm">
                            {testimonial.role}
                          </p>
                          <p className="text-blue-700 text-sm font-medium">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Statistics */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "50+", label: "Countries Served" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg shadow-lg p-6 border border-border  hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {stat.number}
              </div>
              <div className="text-forground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .testimonials-swiper .custom-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          background: rgb(96 165 250) !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
          border-radius: 50% !important;
        }

        .testimonials-swiper .custom-bullet-active {
          background: rgb(37 99 235) !important;
          opacity: 1 !important;
          transform: scale(1.25) !important;
        }

        .testimonials-swiper .swiper-slide {
          height: auto !important;
        }

        .testimonials-swiper .swiper-slide-active {
          z-index: 2;
        }

        .testimonials-swiper .swiper-slide-next,
        .testimonials-swiper .swiper-slide-prev {
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
