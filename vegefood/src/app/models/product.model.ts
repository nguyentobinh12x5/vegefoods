export interface Product {
  id: number;
  name: string;
  image: string;
  priceOriginal: number;
  priceSales: number;
  status: string;
}

export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ProductCart {
  id: number;
  name: string;
  image: string;
  priceOriginal: number;
  priceSales: number;
  status: string;
  quantity: number;
}

export interface ProductWishlist {
  id: number;
  name: string;
  image: string;
  priceOriginal: number;
  priceSales: number;
  status: string;
  quantity: number;
}
