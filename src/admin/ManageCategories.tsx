import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Category, CustomError } from "../interfaces/adminInterfaces";
import { JWT } from "../interfaces/userInterfaces";
import {
  deleteCategory,
  getCategories,
} from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { _id, token } = isAuthenticated() as JWT;

  const preload = () => {
    getCategories().then((data) => {
      if ((data as CustomError).error) {
        // console.log((data as CustomError).error);
      } else {
        setCategories(data as Category[]);
      }
    });
  };

  const deleteaCategory = (categoryId: string) => {
    deleteCategory(categoryId, _id, token).then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Manage all your categories here!" description="">
      <div className="container bg-info rounded p-2">
        <div className="row">
          {categories.map((category, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <Card className="mb-2">
                <Card.Header className="text-dark">{category.name}</Card.Header>
                <Button variant="success" className="p-1 m-1">
                  Update
                </Button>
                <Button
                  onClick={() => deleteaCategory(category._id!)}
                  variant="danger"
                  className="p-1 m-1"
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))}
        </div>
        <div className="m-3">
          <Button variant="light">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/dashboard"
            >
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
