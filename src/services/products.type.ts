export interface iProductLocation {
  name: string;
  longitude: number;
  latitude: number;
}

export interface iProductImage {
  url: string;
  _id: string;
}

export interface iProductUser {
  _id: string;
  email: string;
}

export interface iProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: iProductImage[];
  location: iProductLocation;
  user: iProductUser;
  createdAt: string;
  updatedAt: string;
}

export interface iPagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  limit: number;
}

export interface iProductsApiResponse {
  success: boolean;
  data: iProduct[];
  pagination: iPagination;
}


export type DetailsScreenParams = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: iProductImage[];
  latitude: number;
  longitude: number;
  user: iProductUser;
};
