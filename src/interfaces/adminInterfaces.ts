export interface Category {
  createdAt?: string;
  name: string;
  updatedAt?: string;
  _v?: number;
  _id?: string;
}

export interface CustomError {
  error: string;
}

export interface AddProductState {
  name: string;
  description: string;
  price: string;
  stock: string;
  photo?: string;
  categories: Category[];
  category: string;
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  createdProduct: string;
  getaRedirect: boolean;
  formData: FormData;
}

export interface UpdateProductState {
  name?: string;
  description?: string;
  price?: string;
  stock?: string;
  photo?: string;
  categories?: Category[];
  category?: string;
  oldCate?: string;
  loading?: boolean;
  error?: string | boolean;
  success?: string | boolean;
  createdProduct?: string;
  getaRedirect?: boolean;
  formData: FormData;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  photo?: Object;
  createdAt?: string;
  updatedAt?: string;
  category: Category;
  _v?: number;
}
