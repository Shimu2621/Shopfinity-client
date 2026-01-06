"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignupMutation } from "@/redux/api/user/userApi";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { login } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/lib/getErrorMessage";
// import { useState } from "react";
// import { Link } from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";

import signupAnimation from "@/app/assets/lottie/signupanimation.json";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useTheme } from "next-themes";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty("Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().nonempty("Please confirm your password"),

    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

  // const form = useForm<SignupFormValues>({
  //   resolver: zodResolver(signupSchema),
  // });

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: SignupFormData) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await signup(payload).unwrap();

      dispatch(login({ user: res.user, token: res.token }));
      localStorage.setItem("token", res.token);

      toast.success("Account created successfully");
      form.reset();
      router.push("/signin");
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("data" in error) {
        toast.error(
          (error.data as { message?: string })?.message || "Signup failed"
        );
      } else {
        toast.error(getErrorMessage(err, "Registration failed"));
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-blue-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-40 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl" />
      <div className="absolute top-32 right-32 w-20 h-20 bg-cyan-200/20 rounded-full blur-2xl" />
      <div className="absolute bottom-40 right-20 w-28 h-28 bg-orange-300/20 rounded-full blur-3xl" />

      {/* Logo */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-rose-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="font-serif font-semibold text-xl text-rose-600">
          ShopFinity
        </span>
      </Link>

      <div className="absolute top-6 right-6 flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Home className="w-5 h-5" />
          </Button>
        </Link>
        {/* Theme Toggle */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side - Lottie Animation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div className="w-full max-w-md aspect-square bg-gradient-to-br from-blue-100/40 to-orange-50/40 rounded-[3rem] p-12 flex items-center justify-center backdrop-blur-sm border border-gray-200/50 shadow-lg">
            <Lottie
              animationData={signupAnimation}
              loop
              autoplay
              className="w-full h-full"
            />
          </div>

          <div className="text-center space-y-3 max-w-md">
            <AuroraText className="text-blue-600 italic font-bold text-4xl">
              {" "}
              Join ShopFinity Today
            </AuroraText>
            <p className="text-gray-600 text-pretty leading-relaxed">
              Create your account and start your amazing shopping journey with
              exclusive deals and premium products.
            </p>

            <div className="flex items-center justify-center gap-4 pt-3">
              <span className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Free Account
              </span>
              <span className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant Access
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div variants={itemVariants} className="w-full max-w-md mx-auto">
          <Card className="rounded-[2rem] shadow-2xl border-0">
            <CardHeader className="space-y-6 pb-4">
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold">
                  Create Account
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  Join thousands of happy customers
                </p>
              </div>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              placeholder="Sahrukh Khan"
                              className="pl-10 bg-blue-50/50 border-transparent focus:bg-blue-50/70 h-12"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              type="email"
                              placeholder="user@user.com"
                              className="pl-10 bg-blue-50/50 border-transparent focus:bg-blue-50/70 h-12"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••••••"
                              className="pl-10 pr-10 bg-blue-50/50 border-transparent focus:bg-blue-50/70 h-12"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10 bg-blue-50/50 border-transparent focus:bg-blue-50/70 h-12"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                            />
                          </FormControl>
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-rose-600 hover:underline font-medium"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-rose-600 hover:underline font-medium"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-800 to-rose-600 hover:from-rose-600 hover:to-blue-800 text-white font-semibold py-6 rounded-xl shadow-lg h-12 flex items-center justify-center gap-2"
                    >
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>

                  <div className="text-center pt-2">
                    <span className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Sign in here
                      </Link>
                    </span>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
