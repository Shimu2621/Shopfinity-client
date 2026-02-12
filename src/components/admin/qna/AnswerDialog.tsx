"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IQuestion } from "@/types/product/product";
import {
  useCreateProductAnswerMutation,
  useUpdateProductAnswerMutation,
} from "@/redux/api/productAnswer/productAnswerApi";

interface Props {
  question: IQuestion;
}

export default function AnswerDialog({ question }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(question.answer?.answer || "");

  const [createAnswer] = useCreateProductAnswerMutation();
  const [updateAnswer] = useUpdateProductAnswerMutation();

  const isEdit = !!question.answer;

  const handleSubmit = async () => {
    if (isEdit) {
      await updateAnswer({
        id: question.answer!._id,
        answer: text,
      });
    } else {
      await createAnswer({
        questionId: question._id,
        answer: text,
        adminId: "ADMIN_ID_HERE",
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-white bg-blue-700 hover:bg-blue-800">
          {isEdit ? "Edit" : "Answer"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Answer" : "Add Answer"}</DialogTitle>
        </DialogHeader>

        <Textarea value={text} onChange={(e) => setText(e.target.value)} />

        <Button
          onClick={handleSubmit}
          className="mt-4 bg-rose-700 hover:bg-rose-900"
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
