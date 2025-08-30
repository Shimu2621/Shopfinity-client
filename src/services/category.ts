import api from "@/lib/axios";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const res = await api.get<{ data: Category[] }>("/api/v1/categories");
  return res.data.data;
}
