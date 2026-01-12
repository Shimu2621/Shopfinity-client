"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/api/user/userApi";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.user && token) {
      dispatch(login({ user: data.user, token }));
    }

    if (isError) {
      dispatch(logout());
      localStorage.removeItem("token");
    }
  }, [data, isError, dispatch, token]);

  return null;
};

export default AuthInitializer;
