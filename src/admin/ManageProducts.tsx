import React from "react";
import Base from "../core/Base";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { useEffect } from "react";
import { JWT } from "../interfaces/userInterfaces";
import { Product } from "../interfaces/adminInterfaces";

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { _id, token } = isAuthenticated() as JWT;

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteaProduct = (productId: string) => {
    deleteProduct(productId, _id, token).then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const goBack = () => {
    return (
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="/admin/dashboard"
      >
        <Button variant="light"> Go Back</Button>
      </Link>
    );
  };

  const myProducts = () => {
    return (
      <div>
        <div className="lead text-dark rounded bg-warning p-2">
          Total {products.length} products available
        </div>
        <br />
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col- col-md-4 mb-3 col-sm-6">
              <Card
                className="text-dark"
                style={{ height: "100%" }}
                key={index}
              >
                <div className="p-2">
                  <Card.Img
                    className="border border-info"
                    variant="top"
                    src={product.photo}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="bg-warning p-2 rounded">
                    Product: {product.name}
                    <br />
                    <br />
                    Category: {product.category.name}
                    <br />
                    <br />
                    Stock: {product.stock}{" "}
                  </Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/admin/product/update/${product._id}`}>
                    <Button variant="success" className="p-1 form-control">
                      Update
                    </Button>
                  </Link>

                  <br />
                  <br />
                  <Button
                    onClick={() => deleteaProduct(product._id)}
                    variant="danger"
                    className="p-1 form-control"
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
        <br />
        {goBack()}
      </div>
    );
  };

  return (
    <Base title="Manage all your products here!" description="">
      <div className="p-3">
        <div className="container bg-info rounded p-4">{myProducts()}</div>
      </div>
    </Base>
  );
};

export default ManageProducts;
