//src> types> product> product.ts

import { IReview } from "../review/review";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  featured?: boolean;
  categoryId?: string;
  brandId?: string;
  isDiscountActive?: boolean;
  discountPercentage?: number;
  discountedPrice?: number;
  discountValidUntil?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  category?: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    parentId: string | null;
  };

  brand?: {
    id: string;
    name: string;
  };
  specifications?: any[];
}

export type ISingleProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  isDiscountActive: boolean;
  discountPercentage?: number;
  discountedPrice?: number;
  discountValidUntil?: string;
  categoryId?: {
    _id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    parentId: string | null;
  };

  brandId?: {
    _id: string;
    name: string;
  };

  category?: ICategory;
  brand?: IBrand;
  specifications?: IProductSpecification[];
  reviews?: IReview[];
  questions?: IQuestion[];
};

type ICategory = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  parentId: string | null;
};

export interface IBrand {
  _id: string;
  name: string;
  categories: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    parentId: string | null;
  }[];
}

export type IProductSpecification = {
  id: string;
  productId: string;
  key: string;
  value: string;
  product: {
    name: string;
    price: number;
  };
};

export type IProductSpecificationApiResponse = {
  _id: string;
  productId: string;
  key: string;
  value: string;
  product: { name: string; price: number };
};

export type IQuestion = {
  id: string;
  question: string;
  createdAt: string;
  userId: string;
  productId: string;
  answer: IAnswer | null;
};

export type IAnswer = {
  id: string;
  answer: string;
  createdAt: string;
  questionId: string;
  adminId: string;
};

export interface IProductQuery {
  page?: number;
  limit?: number;

  categoryId?: string;
  brandId?: string;

  featured?: boolean;
  isDiscountActive?: boolean;
}

export interface IProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  featured?: boolean;

  categoryId: string;
  brandId: string;

  isDiscountActive?: boolean;
  discountPercentage?: number;
  discountValidUntil?: string;
}

// Pagination type for products page
export interface IPaginatedProducts {
  products: IProduct[];
  total: number;
  page: number;
  limit: number;
}

export type UpdateProductPayload = {
  name?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  brandId?: string;
  featured?: boolean;
  isDiscountActive?: boolean;
  discountPercentage?: number;
  discountValidUntil?: string;
};
