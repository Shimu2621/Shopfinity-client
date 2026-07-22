"use client";

import { IQuestion } from "@/types/product/product";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { useDeleteProductAnswerMutation } from "@/redux/api/productAnswer/productAnswerApi";

import AnswerDialog from "./AnswerDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Props {
  questions: IQuestion[];
}

export default function QnaTable({ questions }: Props) {
  const [deleteAnswer] = useDeleteProductAnswerMutation();

  return (
    <Card className="shadow-lg dark:bg-black hover:shadow-xl transition-shadow duration-300 py-2">
      <CardHeader className="border-b bg-muted/50 dark:bg-black">
        <CardTitle className="flex items-center space-x-2 pt-4">
          <MessageSquare className="h-5 w-5 text-rose-700" />
          <span className="">Customer Questions & Answers</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {questions.map((q) => (
                <TableRow key={q._id}>
                  <TableCell className="max-w-xs truncate">
                    {q.question}
                  </TableCell>
                  <TableCell>{q.productId?.name}</TableCell>

                  <TableCell>
                    {q.answer ? (
                      <Badge className="bg-green-100 text-green-600">
                        Answered
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-600">
                        Pending
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>{q.answer?.answer || "-"}</TableCell>

                  <TableCell className="flex gap-2">
                    <AnswerDialog question={q} />

                    {q.answer && (
                      <DeleteConfirmDialog
                        onConfirm={() => deleteAnswer(q.answer!._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
