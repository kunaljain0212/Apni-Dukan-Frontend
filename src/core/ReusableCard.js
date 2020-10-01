import React from "react";
import { Card, Button } from "react-bootstrap";
import ImageApiCall from "./helper/ImageApiCall";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { useState } from "react";
import { useEffect } from "react";

const ReusableCard = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [description, setDescription] = useState(true);
  const [count, setCount] = useState(0);
  // const [incart, setIncart ] = useState(false)

  const getCount = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        const index = cart.findIndex((value) => value.item._id === product._id);
        // console.log("index = " + index);
        if (index !== -1) {
          setCount((prev) => (prev = cart[index].count));
          // localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
  };

  useEffect(() => {
    // console.log("I ran CARD");
    getCount();
    showDescription();
  }, []);

  // console.log(count);

  const sendToCart = () => {
    addItemToCart(product);
    getCount();
  };

  const removeItFromCart = () => {
    removeItemFromCart(product);
    getCount();
  };

  // console.log(count);

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <Button
          onClick={() => {
            sendToCart();
            setReload(!reload);
          }}
          variant="success"
          className="p-1 form-control"
        >
          Add to Cart
        </Button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div>
          <br />
          <Button
            onClick={() => {
              removeItFromCart();
              setReload(!reload);
            }}
            variant="danger"
            className="p-1 form-control"
          >
            Remove from Cart
          </Button>
        </div>
      )
    );
  };
  const showDescription = () => {
    setDescription((prev) => !prev);
  };

  // const handleDescription = () => !description;

  // console.log(description);

  return (
    <Card className="text-dark border border-info" style={{ height: "100%" }}>
      <Card.Title className="bg-warning p-2">{product.name}</Card.Title>
      <div className="p-2">
        <ImageApiCall product={product} />
      </div>
      <Card.Body>
        {description && <Card.Text>{product.description}</Card.Text>}
        <p className="btn btn-info rounded  btn-sm px-4">
          {product.category.name}
        </p>
        <br />
        <p
          onClick={showDescription}
          className="btn btn-info rounded  btn-sm px-4"
        >
          Show Description
        </p>
        <br />
        <p className="btn btn-info rounded  btn-sm px-4">₹ {product.price}</p>
        {count !== 0 && (
          <div>
            <br />
            <p className="btn btn-warning rounded  btn-sm px-4">
              Cart count : {count}
            </p>
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        {showAddToCart(addToCart)}
        {showRemoveFromCart(removeFromCart)}
      </Card.Footer>
    </Card>
  );
};

export default ReusableCard;
