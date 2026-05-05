"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useCreateProductQuestionMutation } from "@/redux/api/productQuestion/productQuestionApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const questionSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  productId: string;
}

export default function QuestionForm({ productId }: QuestionFormProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [createQuestion, { isLoading }] = useCreateProductQuestionMutation();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (values: QuestionFormValues) => {
    if (!user) {
      toast.error("Please login to ask a question!");
      return;
    }

    try {
      await createQuestion({
        question: values.question,
        productId,
        userId: user.id,
      }).unwrap();

      toast.success("Question submitted successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit question. Please try again.");
      console.error(error);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            Please login to ask a question
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField<QuestionFormValues, "question">
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Ask anything about this product..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-700 hover:bg-rose-900"
            >
              {isLoading ? "Submitting..." : "Submit Question"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
