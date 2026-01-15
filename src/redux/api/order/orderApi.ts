// src/redux/api/order/orderApi.ts
import { baseApi } from "../baseApi";
import { IOrder } from "@/types/order/order";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create Order
    createOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ORDER"],
    }),

    // 📦 Get all orders
    getAllOrders: builder.query<IOrder[], void>({
      query: () => "/orders",
      transformResponse: (response: { orders: IOrder[] }) => response.orders,
      providesTags: ["ORDER"],
    }),

    // 📄 Get single order
    getOrderById: builder.query<IOrder, string>({
      query: (orderId) => `/orders/${orderId}`,
      transformResponse: (response: { order: IOrder }) => response.order,
      providesTags: ["ORDER"],
    }),

    // 📄 Get My orders
    getMyOrders: builder.query<IOrder[], void>({
      query: () => "/orders/my-orders",
      transformResponse: (res: { orders: IOrder[] }) => res.orders,
      providesTags: ["ORDER"],
    }),

    // ✏️ Update order status (ADMIN)
    updateOrderStatus: builder.mutation<
      IOrder,
      { id: string; status: IOrder["status"] }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["ORDER"],
    }),

    // ❌ Delete order (ADMIN)
    deleteOrder: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
