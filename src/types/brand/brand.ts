// export interface IBrand {
//   id: string;
//   name: string;
//   categories: {
//     id: string;
//     name: string;
//     slug: string;
//     icon: string;
//     description: string;
//     parentId: string | null;
//   }[];
// }

import { ICategory } from "../category/category";

export interface IBrand {
  _id: string;
  name: string;
  categoryIds?: ICategory[];
  createdAt?: string;
  updatedAt?: string;
}
