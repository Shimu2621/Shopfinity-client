"use client";

import { useState, useMemo } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion } from "framer-motion";
import { useGetAllProductQuestionsQuery } from "@/redux/api/productQuestion/productQuestionApi";
import QnaTable from "@/components/admin/qna/QnaTable";
import QnaStats from "@/components/admin/qna/QnaStats";
import { HelpCircle } from "lucide-react";
import { IQuestion } from "@/types";

const ITEMS_PER_PAGE = 6;

export default function QnAPage() {
  const { data: questions = [], isLoading } = useGetAllProductQuestionsQuery();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  /* ================================
     🔎 Filter Questions
  ================================== */
  const filteredQuestions = useMemo(() => {
    return questions.filter((q: IQuestion) =>
      q.question.toLowerCase().includes(search.toLowerCase()),
    );
  }, [questions, search]);

  /* ================================
     📄 Pagination
  ================================== */
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);

  const paginatedQuestions = filteredQuestions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>

          <AuroraText className="text-4xl md:text-5xl font-bold">
            Product Q&A Management
          </AuroraText>
        </div>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Answer faster. Engage better. Build trust with your every customers
          and clients.
        </p>
      </motion.div>

      {/* Stats */}
      <QnaStats questions={questions} />

      {/* 🔍 Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on search
          }}
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <QnaTable questions={paginatedQuestions} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg border transition ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
