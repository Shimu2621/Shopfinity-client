/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Rocket,
  MousePointer,
  Sparkles,
  Zap,
  CheckCircle,
} from "lucide-react";
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    description: "Mon-Fri from 8am to 5pm",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@company.com", "support@company.com"],
    description: "We'll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Business Street", "New York, NY 10001"],
    description: "Come visit our office",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    description: "Sunday: Closed",
  },
];

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [positions, setPositions] = useState<{ left: string; top: string }[]>(
    [],
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  useEffect(() => {
    // Run only in client
    const generated = [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setPositions(generated);
  }, []);

  return (
    <section
      id="contact"
      className="relative py-20 px-4 overflow-hidden scroll-mt-20"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-blue-800 to-purple-900"></div>

      {/* Floating circles */}
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Animated center top icon */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 w-16 h-16 border-2 border-white/40 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
          {/* Secondary pulsing ring */}
          <motion.div
            className="absolute inset-0 w-16 h-16 border border-white/30 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.5,
              ease: "easeOut",
            }}
          />
        </div>
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <Rocket className="w-12 h-12 text-white/30" />
      </motion.div>

      <motion.div
        className="absolute top-20 right-20"
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        <MousePointer className="w-8 h-8 text-white/40" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      >
        <Zap className="w-10 h-10 text-yellow-300/50" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      >
        <Sparkles className="w-10 h-10 text-yellow-300/50" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-10"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1.5,
        }}
      >
        <MessageCircle className="w-9 h-9 text-white/35" />
      </motion.div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white mb-16"
        >
          <div className="text-center gap-2">
            <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-rose-200 text-black overflow-hidden dark:bg-rose-300 dark:font-bold">
              🌐 CONTACT US
            </ShinyButton>
          </div>
          <h2 className="text-4xl lg:text-5xl text-center font-bold text-white mb-4">
            Get{" "}
            <AuroraText className="text-blue-800 italic mb-0">
              Connected
            </AuroraText>
            <br />
            and Stay With Us
          </h2>
          <p className="text-blue-100 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
            Have questions about your orders, returns, or our products? Our
            support team is ready to assist you with quick responses and
            friendly services. Fill out the form or reach us through email,
            phone, or live chat — we’ll make sure your shopping experience is
            smooth and stress-free.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-white font-bold animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-blue-100 text-sm mb-1">
                              {detail}
                            </p>
                          ))}
                          <p className="text-blue-200 text-xs mt-2">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 text-center"
            >
              {[
                { number: "24/7", label: "Support" },
                { number: "< 1hr", label: "Response Time" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Send us a message
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you
                    shortly.
                  </p>
                </div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      Message sent successfully! We&apos;ll get back to you
                      soon.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full  bg-rose-700 hover:bg-rose-900 text-white py-3 font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center  gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-5 h-5 animate-shine" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
