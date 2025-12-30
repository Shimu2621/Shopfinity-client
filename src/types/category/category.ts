import { IBrand } from "../brand/brand";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  parentId: string | null;
  children: ICategory[];
  parent: ICategory | null;
  brands: IBrand[];
}

export interface IFilterOption {
  id: string;
  categoryId: string;
  name: string;
  type: "DROPDOWN" | "RANGE" | "TEXT";
  options: string[] | null;
  unit: string | null;
  category: ICategory;
}
