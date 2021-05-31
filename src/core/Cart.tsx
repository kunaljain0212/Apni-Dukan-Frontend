import React, { useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import ReusableCard from "./ReusableCard";
import { useState } from "react";
import { loadCart } from "./helper/cartHelper";
import RazorpayCheckout from "./RazorpayCheckout";
import { LocalStorageCart } from "../interfaces/coreInterfaces";

export default function Home() {
  const [products, setProducts] = useState<LocalStorageCart | undefined>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Your Cart" description="Ready for checkout!">
      <div className="container p-4">
        {products !== undefined && products.length !== 0 ? (
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {products.map((product, index) => {
                  return (
                    <div key={index} className="col-sm-6 mb-2">
                      <ReusableCard
                        setReload={setReload}
                        reload={reload}
                        product={product.item}
                        addToCart={true}
                        removeFromCart={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4 ">
              <RazorpayCheckout
                products={products}
                setReload={setReload}
                reload={reload}
              />
            </div>
          </div>
        ) : (
          <div className="container p-3  border border-warning text-center bg-info rounded">
            <h1>CART IS EMPTY</h1>
            <h5>Please add some items to the cart!</h5>
          </div>
        )}
      </div>
    </Base>
  );
}
