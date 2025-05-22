export interface ProductLocation {
  name: string;
  longitude: number;
  latitude: number;
}

export interface ProductImage {
  url: string;
  _id: string;
}

export interface ProductUser {
  _id: string;
  email: string;
}

export interface iProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  location: ProductLocation;
  user: ProductUser;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  limit: number;
}

export interface ProductsApiResponse {
  success: boolean;
  data: iProduct[];
  pagination: Pagination;
}

export type DetailsScreenParams = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  latitude: number;
  longitude: number;
};
