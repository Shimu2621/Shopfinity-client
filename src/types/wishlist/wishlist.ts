// src/types/wishlist.ts
import { IUser } from "../user/user";
import { IProduct } from "../product/product";

/**
 * Wishlist item
 */
export interface IWishlist {
  _id: string;
  userId: string | IUser;
  productId: string | IProduct;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create wishlist payload
 */
export interface IWishlistCreatePayload {
  userId: string;
  productId: string;
}

/**
 * Wishlist query params
 */
export interface IWishlistQueryParams {
  page?: number;
  limit?: number;
  userId?: string;
  searchTerm?: string;
}

/**
 * Wishlist list response
 */
export interface IWishlistResponse {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IWishlist[];
}
