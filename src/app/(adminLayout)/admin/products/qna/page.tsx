"use client";

import { useState } from "react";
import { useGetAllProductQuestionsQuery } from "@/redux/api/productQuestion/productQuestionApi";
import {
  useCreateProductAnswerMutation,
  useDeleteProductAnswerMutation,
} from "@/redux/api/productAnswer/productAnswerApi";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, Clock } from "lucide-react";
import { IQuestion } from "@/types";

export default function QnAPage() {
  const { data: questions = [], isLoading } = useGetAllProductQuestionsQuery();

  const [createAnswer] = useCreateProductAnswerMutation();
  const [deleteAnswer] = useDeleteProductAnswerMutation();

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [answerText, setAnswerText] = useState("");

  const total = questions.length;
  const answered = questions.filter((q: IQuestion) => q.answer).length;
  const pending = total - answered;

  const handleSubmit = async (questionId: string) => {
    if (!answerText) return;

    await createAnswer({
      questionId,
      answer: answerText,
      adminId: "ADMIN_ID_HERE", // replace with logged-in admin id
    });

    setAnswerText("");
    setSelectedQuestionId(null);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-600">
          Product Q&A Management
        </h1>
        <p className="text-gray-500">
          Manage customer questions and provide helpful answers
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 shadow-md rounded-2xl">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600">Total Questions</p>
              <h2 className="text-3xl font-bold text-blue-600">{total}</h2>
            </div>
            <MessageSquare className="text-blue-500 w-10 h-10" />
          </CardContent>
        </Card>

        <Card className="bg-green-50 shadow-md rounded-2xl">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600">Answered</p>
              <h2 className="text-3xl font-bold text-green-600">{answered}</h2>
            </div>
            <CheckCircle className="text-green-500 w-10 h-10" />
          </CardContent>
        </Card>

        <Card className="bg-orange-50 shadow-md rounded-2xl">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600">Pending</p>
              <h2 className="text-3xl font-bold text-orange-600">{pending}</h2>
            </div>
            <Clock className="text-orange-500 w-10 h-10" />
          </CardContent>
        </Card>
      </div>

      {/* ================= TABLE ================= */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-3">Question</th>
                <th>Product</th>
                <th>Status</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {questions.map((q: IQuestion) => (
                <tr key={q._id} className="border-b hover:bg-gray-50">
                  <td className="py-4">{q.question}</td>

                  <td>{q.productId?.name}</td>

                  <td>
                    {q.answer ? (
                      <Badge className="bg-green-100 text-green-600">
                        Answered
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-600">
                        Pending
                      </Badge>
                    )}
                  </td>

                  <td>{q.answer?.answer || "-"}</td>

                  <td className="space-x-2">
                    {!q.answer && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedQuestionId(q._id)}
                      >
                        Answer
                      </Button>
                    )}

                    {q.answer && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteAnswer(q.answer._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ================= ANSWER FORM ================= */}
      {selectedQuestionId && (
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Write Answer</h3>

            <Textarea
              placeholder="Type your answer..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            />

            <div className="flex gap-3">
              <Button onClick={() => handleSubmit(selectedQuestionId)}>
                Submit Answer
              </Button>

              <Button
                variant="outline"
                onClick={() => setSelectedQuestionId(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
