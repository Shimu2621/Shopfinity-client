import { ICategory } from "../category/category";

export type FilterType = "select" | "range" | "checkbox";

export interface IFilterOption {
  _id: string;
  name: string;
  type: FilterType;
  options?: string[];
  unit?: string;
  categoryId: ICategory | string;
  createdAt?: string;
  updatedAt?: string;
}
