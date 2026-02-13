import { IReview } from "@/types/review/review";

export const getReviewStats = (reviews: IReview[]) => {
  const total = reviews.length;

  const avg =
    total === 0
      ? 0
      : Number(
          (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1),
        );

  const fiveStar = reviews.filter((r) => r.rating === 5).length;

  return { total, avg, fiveStar };
};
