import React from "react";
import { Product } from "../interfaces/adminInterfaces";

interface IProps {
  product: Product;
}

const ImageApiCall: React.FC<IProps> = ({ product }) => {
  // console.log(product);
  return (
    <div
      style={{ height: "300px", width: "250px" }}
      className="text-center rounded p-2"
    >
      <img
        src={product.photo}
        alt="Product"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="border border-dark  mb-3 rounded"
      />
    </div>
  );
};

export default ImageApiCall;
