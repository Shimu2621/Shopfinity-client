"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignupMutation } from "@/redux/api/user/userApi";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { login } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/lib/getErrorMessage";

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
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const res = await signup(values).unwrap();

      dispatch(login({ user: res.user, token: res.token }));
      localStorage.setItem("token", res.token);

      toast.success("Account created successfully");
      router.push("/");
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("data" in error) {
        toast.error(
          (error.data as { message?: string })?.message || "Signup failed"
        );
      } else {
        toast.error(getErrorMessage(err, "Signup failed"));
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Name" {...form.register("name")} />
            <Input placeholder="Email" {...form.register("email")} />
            <Input
              type="password"
              placeholder="Password"
              {...form.register("password")}
            />
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
