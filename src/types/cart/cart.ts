import { IProduct } from "../product/product";

/**
 * Single cart item returned from backend
 */
export interface ICartItem {
  _id: string;
  userId: string;
  productId: IProduct; // populated product
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create cart payload
 */
export interface IAddToCartPayload {
  userId: string;
  productId: string;
  quantity: number;
}

/**
 * Update cart quantity payload
 */
export interface IUpdateCartPayload {
  id: string;
  quantity: number;
}

/**
 * API responses
 */
export interface ICartResponse {
  success: boolean;
  data: ICartItem[];
}

export interface ISingleCartResponse {
  success: boolean;
  data: ICartItem;
}
