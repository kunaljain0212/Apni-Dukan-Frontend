import React from "react";
import Base from "../core/Base";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getCategories, createProduct } from "./helper/adminapicall";
import { useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { AddProductState, Category, CustomError } from "../interfaces/adminInterfaces";
import { JWT } from "../interfaces/userInterfaces";

const AddProduct = () => {
  const [values, setValues] = useState<AddProductState>({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    success: "",
    createdProduct: "",
    getaRedirect: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    error,
    success,
    createdProduct,
    formData,
  } = values;

  const { _id, token } = isAuthenticated() as JWT;

  const preload = () => {
    getCategories().then((data) => {
      if ((data as CustomError).error) {
        setValues({
          ...values,
          error: (data as CustomError).error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          categories: data as Category[],
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange =
    (name: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value =
        name === "photo"
          ? (event as React.ChangeEvent<HTMLInputElement>).target.files![0]
          : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(_id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            success: true,
            createdProduct: data.name,
          });
        }
      })
      .catch();
  };

  const successMessage = () => {
    return (
      <span
        className="text-success bg-white text-center"
        style={{ display: success ? "" : "none" }}
      >
        Product: {createdProduct} created successfully.
      </span>
    );
  };

  const errorMessage = () => {
    return (
      <span
        className="text-danger bg-light text-center"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </span>
    );
  };

  const goBack = () => {
    return (
      <Button variant="light">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/admin/dashboard"
        >
          Go Back
        </Link>
      </Button>
    );
  };

  const myProductForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead text-dark bg-warning p-2">
            Add details of the Product here
          </div>
          <div className="p-2">
            <label>Product Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              placeholder="For Ex. Gym Tshirt"
              required
              value={name}
              className="form-control"
            />
            <label className="p-1">Description</label>
            <textarea
              onChange={handleChange("description")}
              name="photo"
              required
              className="form-control"
              placeholder="For Ex. specify the material of the tshirt"
              value={description}
            />
            <label className="p-1">Price</label>
            <input
              onChange={handleChange("price")}
              type="number"
              required
              className="form-control"
              placeholder="Price"
              value={price}
            />
            <label className="p-1">Select Category</label>
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Available categories</option>
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
            <label className="p-1">Stock</label>
            <input
              onChange={handleChange("stock")}
              type="number"
              required
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
            <br />
            <div className="justify-content-center">
              <label className="p-1">Add a photo of Product:</label>
              &nbsp;
              <input
                className="rounded bg-warning p-1"
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="Choose a file"
              />
            </div>
            <br />
            <br />
            <button onClick={onSubmit} className="btn btn-light">
              Create Product
            </button>
          </div>
        </div>
        {goBack()}
        <br />
        <br />
        {successMessage()}
        {errorMessage()}
      </form>
    );
  };

  return (
    <Base
      title="Create a product here!"
      description="Add new products to your categories"
    >
      <div className="p-3">
        <div className="container bg-info rounded p-4">{myProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
