// src/types/order/order.ts

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IProduct {
  _id: string;
  name: string;
  images: string[]; // ✅ array
  price: number;
  description: string;
}

export interface IOrderItem {
  productId: IProduct; // 👈 populated product
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ICreateOrderPayload {
  userId: string;
  items: ICreateOrderItem[];
  totalAmount: number;
  paymentMethod: "pay_now" | "cod";
}
