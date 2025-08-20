"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast(
      "Successfully subscribed! <br /> You'll receive exclusive deals and updates in your inbox."
    );

    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="relative  flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Animated gradient overlay with color shifting */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-gradient-shift" />

        {/* Large floating geometric shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rotate-45 blur-lg animate-rotate-slow" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-float-fast" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 transform rotate-12 blur-lg animate-pulse-glow" />

        {/* Animated particles */}
        <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-white/60 rounded-full animate-particle-1" />
        <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-blue-300/80 rounded-full animate-particle-2" />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-purple-300/70 rounded-full animate-particle-3" />
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-pink-300/60 rounded-full animate-particle-4" />
        <div className="absolute top-1/6 left-1/3 w-3 h-3 bg-cyan-300/70 rounded-full animate-particle-5" />
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-yellow-300/50 rounded-full animate-particle-6" />
        <div className="absolute top-2/3 left-1/6 w-2 h-2 bg-green-300/80 rounded-full animate-particle-7" />
        <div className="absolute top-1/3 right-1/6 w-4 h-4 bg-orange-300/60 rounded-full animate-particle-8" />

        {/* Moving light beams */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-light-sweep" />
        </div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-300/15 to-transparent transform skew-x-12 animate-light-sweep-reverse" />
        </div>

        {/* Glowing orbs with neon effect */}
        <div className="absolute top-1/6 right-1/6 w-16 h-16 bg-blue-400/40 rounded-full blur-md animate-neon-pulse" />
        <div className="absolute bottom-1/4 left-1/6 w-20 h-20 bg-purple-400/40 rounded-full blur-md animate-neon-pulse-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-rose-200 text-black overflow-hidden dark:bg-rose-300 dark:font-bold">
          ✨ OUR NEWSLETTER
        </ShinyButton>
        <h2 className="text-4xl lg:text-5xl text-center font-bold text-white mb-4">
          Exclusive Deals & Fresh{" "}
          <AuroraText className="text-blue-800 italic mb-0">
            Arrivals,
          </AuroraText>
          <br />
          just for you.
        </h2>

        <p className="text-blue-100 leading-relaxed max-w-2xl mx-auto animate-fade-in-up">
          Sign up today to receive exclusive promotions! Be part of our growing
          community! Subscribe and enjoy early access to sales, trending
          products, and special discounts only for subscribers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in-up-delayed"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-blue-400/50 animate-input-glow"
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 px-8 bg-rose-700 hover:bg-rose-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 animate-button-glow"
          >
            {isLoading ? "Subscribing..." : "Get Deals"}
          </Button>
        </form>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-4 ">
          <div className="flex -space-x-2">
            <Avatar className="w-10 h-10 border-2 border-white/20">
              <AvatarFallback className="bg-purple-500 text-white font-semibold">
                SM
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10 border-2 border-white/20">
              <AvatarFallback className="bg-blue-500 text-white font-semibold">
                JL
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10 border-2 border-white/20">
              <AvatarFallback className="bg-green-500 text-white font-semibold">
                RK
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="text-white font-medium">
            5,000+ subscribers saving daily
          </p>
        </div>

        {/* Social media icons */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background: linear-gradient(
              45deg,
              rgba(59, 130, 246, 0.3),
              rgba(147, 51, 234, 0.3),
              rgba(236, 72, 153, 0.3)
            );
          }
          25% {
            background: linear-gradient(
              45deg,
              rgba(147, 51, 234, 0.3),
              rgba(236, 72, 153, 0.3),
              rgba(59, 130, 246, 0.3)
            );
          }
          50% {
            background: linear-gradient(
              45deg,
              rgba(236, 72, 153, 0.3),
              rgba(59, 130, 246, 0.3),
              rgba(147, 51, 234, 0.3)
            );
          }
          75% {
            background: linear-gradient(
              45deg,
              rgba(59, 130, 246, 0.3),
              rgba(236, 72, 153, 0.3),
              rgba(147, 51, 234, 0.3)
            );
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
          }
          50% {
            transform: translateY(-10px) translateX(-15px) scale(0.9);
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.05);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(-25px) translateX(-10px) rotate(240deg);
          }
        }

        @keyframes rotate-slow {
          0% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(225deg) scale(1.2);
          }
          100% {
            transform: rotate(405deg) scale(1);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        @keyframes particle-1 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes particle-2 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(-30px);
            opacity: 0;
          }
        }

        @keyframes particle-3 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes particle-4 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(-40px);
            opacity: 0;
          }
        }

        @keyframes particle-5 {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(60px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes particle-6 {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) translateX(-25px) scale(1.5);
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(-50px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particle-7 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(80px);
            opacity: 0;
          }
        }

        @keyframes particle-8 {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          65% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(-60px) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes light-sweep {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes light-sweep-reverse {
          0% {
            transform: translateX(200%) skewX(12deg);
          }
          100% {
            transform: translateX(-100%) skewX(12deg);
          }
        }

        @keyframes neon-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4),
              0 0 40px rgba(59, 130, 246, 0.2);
            opacity: 0.4;
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8),
              0 0 60px rgba(59, 130, 246, 0.4);
            opacity: 0.8;
          }
        }

        @keyframes neon-pulse-delayed {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.4),
              0 0 40px rgba(147, 51, 234, 0.2);
            opacity: 0.4;
          }
          50% {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.8),
              0 0 60px rgba(147, 51, 234, 0.4);
            opacity: 0.8;
          }
        }

        @keyframes text-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.8))
              drop-shadow(0 0 30px rgba(236, 72, 153, 0.6));
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes input-glow {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
        }

        @keyframes button-glow {
          0%,
          100% {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 4px 25px rgba(59, 130, 246, 0.4);
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 8s ease-in-out infinite;
        }
        .animate-rotate-slow {
          animation: rotate-slow 15s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-particle-1 {
          animation: particle-1 8s linear infinite;
        }
        .animate-particle-2 {
          animation: particle-2 10s linear infinite 2s;
        }
        .animate-particle-3 {
          animation: particle-3 12s linear infinite 4s;
        }
        .animate-particle-4 {
          animation: particle-4 9s linear infinite 6s;
        }
        .animate-particle-5 {
          animation: particle-5 11s linear infinite 1s;
        }
        .animate-particle-6 {
          animation: particle-6 13s linear infinite 3s;
        }
        .animate-particle-7 {
          animation: particle-7 7s linear infinite 5s;
        }
        .animate-particle-8 {
          animation: particle-8 14s linear infinite 7s;
        }
        .animate-light-sweep {
          animation: light-sweep 6s ease-in-out infinite;
        }
        .animate-light-sweep-reverse {
          animation: light-sweep-reverse 8s ease-in-out infinite 3s;
        }
        .animate-neon-pulse {
          animation: neon-pulse 3s ease-in-out infinite;
        }
        .animate-neon-pulse-delayed {
          animation: neon-pulse-delayed 3s ease-in-out infinite 1.5s;
        }
        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        .animate-fade-in-up-delayed {
          animation: fade-in-up 1s ease-out 1s both;
        }
        .animate-input-glow {
          animation: input-glow 3s ease-in-out infinite;
        }
        .animate-button-glow {
          animation: button-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
