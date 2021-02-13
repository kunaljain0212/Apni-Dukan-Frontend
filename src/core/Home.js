import React, { useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import ReusableCard from "./ReusableCard";
import { useState } from "react";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const preload = () => {
    getProducts().then((data) => {
        // console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // console.log(API);
  return (
    <Base title="Homepage" description="Welcome to Apni Dukan">
      <div className="p-4">
        <div className="container-fluid rounded p-3">
          {error ? (
            <h1>Error loading products!</h1>
          ) : (
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col-xl-3 col-md-4 col-sm-6 mb-3 ">
                  <ReusableCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}
