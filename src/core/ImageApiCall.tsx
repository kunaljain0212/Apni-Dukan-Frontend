import React from "react";
import { API } from "../backend";
import { Product } from "../interfaces/adminInterfaces";

interface IProps {
  product: Product;
}

const ImageApiCall: React.FC<IProps> = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
    
  return (
    <div
      style={{ height: "300px", width: "250px" }}
      className="text-center rounded p-2"
    >
      <img
        src={imageurl}
        alt="Product"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="border border-dark  mb-3 rounded"
      />
    </div>
  );
};

export default ImageApiCall;
