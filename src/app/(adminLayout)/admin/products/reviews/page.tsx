"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/admin/reviews/StatCard";

import {
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
} from "@/redux/api/review/reviewApi";

import { getReviewStats } from "@/lib/reviewStats";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Search, Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function AdminReviewsPage() {
  const [search, setSearch] = useState("");

  const { data: reviews = [], isLoading } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();

  /* ================================
        FILTER REVIEWS
  ================================== */
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) =>
      `${r.product?.name} ${r.user?.name} ${r.comment}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [reviews, search]);

  /* ================================
        STATS
  ================================== */
  const stats = getReviewStats(filteredReviews);

  /* ================================
        DELETE
  ================================== */
  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="space-y-6 p-6 overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500">
            <Star className="h-8 w-8 text-white" />
          </div>

          <AuroraText className="text-4xl md:text-5xl font-bold">
            Product Reviews
          </AuroraText>
        </div>

        <p className="text-muted-foreground">
          Centralize customer reviews to track performance, identify trends, and
          enhance users experiences
        </p>
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-4 gap-5">
        <StatCard
          title="Total Reviews"
          value={stats.total}
          icon="💬"
          variant="blue"
        />

        <StatCard
          title="Average Rating"
          value={`${stats.avg} ⭐`}
          icon="📈"
          variant="yellow"
        />

        <StatCard
          title="5-Star Reviews"
          value={stats.fiveStar}
          icon="⭐"
          variant="green"
        />

        <StatCard title="Current Page" value="1" icon="⏱" variant="purple" />
      </div>

      {/* ================= SEARCH ================= */}
      <Card className=" bg-white/60 dark:bg-black border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Product ID or Name..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= TABLE ================= */}
      <Card className="backdrop-blur-xl bg-white/60 dark:bg-black border">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b ">
              <tr className="text-left">
                <th className="p-4">Review ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Comment</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <MessageSquare size={40} />
                      No reviews found
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <motion.tr
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b hover:bg-muted/40"
                  >
                    <td className="p-4 font-mono text-xs">{review.id}</td>
                    <td className="p-4">{review.product?.name}</td>
                    <td className="p-4">{review.user?.name}</td>
                    <td className="p-4 font-semibold text-yellow-500">
                      {review.rating} ⭐
                    </td>
                    <td className="p-4 max-w-[300px] truncate">
                      {review.comment}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
