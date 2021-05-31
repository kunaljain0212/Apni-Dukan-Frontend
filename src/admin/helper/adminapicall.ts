import { Category, CustomError } from "../../interfaces/adminInterfaces";

const { API } = require("../../backend");

//Create category
export const createCategory = async (
  userId: string,
  token: string,
  name: { name: string }
): Promise<Category | CustomError> => {
  const response = await fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  });
  return response.json();
};

//Get all Categories
export const getCategories = (): Promise<Category[] | CustomError> => {
  return fetch(`${API}/categories/all`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Create Product
export const createProduct = (
  userId: string,
  token: string,
  product: FormData
) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get all Products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Get photos of products
export const getPhotosOfProducts = (productId: string) => {
  return fetch(`${API}/product/photo/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Get a specific product
export const getaProduct = (productId: string) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Update Product
export const updateProduct = (
  productId: string,
  userId: string,
  token: string,
  product: FormData
) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Delete Product
export const deleteProduct = (
  productId: string,
  userId: string,
  token: string
) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Delete Category
export const deleteCategory = (
  categoryId: string,
  userId: string,
  token: string
) => {
  return fetch(`${API}/category/${categoryId}/delete/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
