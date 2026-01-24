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
