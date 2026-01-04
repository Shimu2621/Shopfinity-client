export interface IReview {
  id: string; // MongoDB id
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  user: {
    name: string;
  };
  product: {
    name: string;
  };
  createdAt: string;
}

export type IReviewQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
};
