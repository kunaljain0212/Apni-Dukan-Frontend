import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const preload = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Manage all your categories here!" description="">
      <div className="container bg-info rounded p-2">
        {categories.map((category, index) => (
          <div className="d-flex p-1 bg-light text-black justify-content-between">
            <span>
            <input
            style={{backgroundColor: "transparent", boxShadow: "none" , border: "none" , borderBottom: "" , borderBottomColor: "#ffc107"}}
              //   onChange={handleChange("name")}
              type="text"
              //   placeholder="For Ex. Gym Tshirt"
              required
              value={category.name}
              className="form-control"
            />
            </span>
            <div>
              <Link
              //   to={`/admin/product/update/${product._id}`}
              >
                <Button variant="success" className="p-1 m-1">
                  Update
                </Button>
              </Link>
              <Button
                // onClick={() => deleteaProduct(product._id)}
                variant="danger"
                className="p-1 m-1"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default ManageCategories;
