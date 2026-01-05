// src/redux/api/userApi.ts

import { baseApi } from "../baseApi";
import {
  IUser,
  SignupPayload,
  SigninPayload,
  AuthResponse,
  UpdateUserPayload,
} from "@/types/user/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* -------------------- AUTH -------------------- */

    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (data) => ({
        url: "/users/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER"],
    }),

    signin: builder.mutation<AuthResponse, SigninPayload>({
      query: (data) => ({
        url: "/users/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER"],
    }),

    /* -------------------- USER -------------------- */

    getProfile: builder.query<{ user: IUser }, string>({
      query: (id) => `/users/profile/${id}`,
      providesTags: ["USER"],
    }),

    getAllUsers: builder.query<{ users: IUser[] }, void>({
      query: () => "/users/all",
      providesTags: ["USER"],
    }),

    updateUser: builder.mutation<
      { message: string; user: IUser },
      UpdateUserPayload
    >({
      query: ({ id, data }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["USER"],
    }),

    /* -------------------- ADMIN (OPTIONAL) -------------------- */
    /**
     * REQUIRES BACKEND IMPLEMENTATION
     * DELETE /users/delete/:id
     */
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetProfileQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
