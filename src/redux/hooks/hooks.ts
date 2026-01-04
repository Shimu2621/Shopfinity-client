// src/redux/hooks.ts
"use client";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";

// Typed versions of hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Debounce hook (optional but useful)
export const useDebounced = ({
  value,
  delay = 500,
}: {
  value: string;
  delay?: number;
}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
