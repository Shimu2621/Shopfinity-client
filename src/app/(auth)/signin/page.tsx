"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Home,
  Moon,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  User,
  Shield,
  Sun,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import signupAnimation from "@/app/assets/lottie/signupanimation.json";
import { useTheme } from "next-themes";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useSigninMutation } from "@/redux/api/user/userApi";
import { toast } from "sonner";
import { login } from "@/redux/features/auth/authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type SigninFormData = z.infer<typeof signinSchema>;

const QUICK_LOGIN_CREDENTIALS = {
  user: {
    email: "user@user.com",
    password: "securePassword",
  },
  admin: {
    email: "admin@admin.com",
    password: "securePassword",
  },
} as const;

type QuickLoginRole = keyof typeof QUICK_LOGIN_CREDENTIALS;

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useSigninMutation();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.token) {
        localStorage.setItem("token", res.token);
        dispatch(login({ user: res.user, token: res.token }));
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(res.message || "Login failed.");
      }
    } catch (error: unknown) {
      const err = error as FetchBaseQueryError;
      toast.error(
        "status" in err
          ? (err.data as { message: string })?.message ||
              "Invalid email or password"
          : "Invalid email or password",
      );
    }
  };

  const handleQuickLogin = (role: QuickLoginRole) => {
    const credentials = QUICK_LOGIN_CREDENTIALS[role];

    // Set form values
    form.setValue("email", credentials.email, { shouldValidate: true });
    form.setValue("password", credentials.password, { shouldValidate: true });
    form.setValue("rememberMe", true);

    // Submit the form
    form.handleSubmit(onSubmit)();
    toast.success(`${role === "admin" ? "Admin" : "User"} credentials filled!`);
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
      {/* Background decoration circles */}
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

      {/* Header Actions */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Link href="/">
            <Home className="w-5 h-5" />
          </Link>
        </Button>

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
              className="w-full h-full"
            />
          </div>

          <div className="text-center space-y-3 max-w-md">
            <AuroraText className="text-blue-600 italic font-bold text-4xl">
              {" "}
              Welcome Back
            </AuroraText>
            <p className="text-gray-600 text-pretty leading-relaxed">
              Sign in to your account and continue your amazing shopping journey
              with us.
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
                Secure Login
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
                Fast Access
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <motion.div variants={itemVariants} className="w-full max-w-md mx-auto">
          <Card className="rounded-[2rem] shadow-2xl border-0">
            <CardHeader className="space-y-6 pb-4">
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                <p className="text-gray-500 text-sm">
                  Enter your credentials to access your account
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Email
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
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <label className="text-sm text-gray-600 cursor-pointer">
                              Remember me
                            </label>
                          </div>
                          <Link
                            href="/forgot-password"
                            className="text-sm text-rose-600 hover:underline font-medium"
                          >
                            Forgot password?
                          </Link>
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
                      className="w-full bg-gradient-to-r from-blue-700 to-rose-600 hover:from-rose-600 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg h-12 flex items-center justify-center gap-2"
                      disabled={isLoading} // 🔹 disable button while loading
                    >
                      {isLoading ? "Signing in..." : "Sign In"}{" "}
                      {/* 🔹 optional text change */}
                      {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </Button>
                  </motion.div>

                  <div className="pt-4">
                    <p className="text-center text-xs text-gray-500 mb-3 uppercase tracking-wide">
                      Quick Login
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 text-xs hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 dark:hover:border-blue-800"
                        onClick={() => handleQuickLogin("user")}
                      >
                        <User className="h-3 w-3 mr-1" />
                        User Login
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 text-xs hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-orange-950/20 dark:hover:border-orange-800"
                        onClick={() => handleQuickLogin("admin")}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Admin Login
                      </Button>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-sm text-gray-600">
                      Don&rsquo;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Sign up here
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
