import api from "@/lib/axios";
import { IProduct } from "@/types";

export async function getFeaturedProducts(): Promise<IProduct[]> {
  const res = await api.get<{ data: IProduct[] }>(
    "/api/v1/products?featured=true"
  );
  return res.data.data;
}
