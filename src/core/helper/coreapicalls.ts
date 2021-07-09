import { Product, CustomError } from "../../interfaces/adminInterfaces";
const { API } = require("../../backend");

export const getProducts = (): Promise<Product[] | CustomError> => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      return {
        error: "Error connecting to server",
      };
    });
};
