export type PaymentStatus = "pending" | "paid" | "cancelled";
export type PaymentMethodType = "pay_now" | "cod";

export interface IPayment {
  _id: string;
  userId: string;
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePaymentPayload {
  userId: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
}
