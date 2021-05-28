export interface Category {
  createdAt?: string;
  name: string;
  updatedAt?: string;
  _v?: number;
  _id?: string;
}

export interface Product {
  name: string;
  description: string;
  price: string;
  stock: string;
  photo: string;
  categories: Category[];
  category: string;
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  createdProduct: string;
  getaRedirect: boolean;
  formData: FormData;
}

export interface CustomError {
  error: string;
}
