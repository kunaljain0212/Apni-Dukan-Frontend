import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { createCategory } from "./helper/adminapicall";
import { JWT } from "../interfaces/userInterfaces";
import { CustomError } from "../interfaces/adminInterfaces";

const AddCategory = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean | String>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { _id, token } = isAuthenticated() as JWT;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(_id, token, { name }).then((data) => {
      if ((data as CustomError).error) {
        setError((data as CustomError).error);
        setName("");
        setSuccess(false);
      } else {
        setName("");
        setError("");
        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    return (
      <span
        className="text-success bg-white text-center"
        style={{ display: success ? "" : "none" }}
      >
        Category was created successfully.
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

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead text-dark bg-warning p-2">
            Enter the Category name here
          </div>
          <input
            type="text"
            onChange={handleChange}
            value={name}
            placeholder="For Ex. Summer"
            autoFocus
            required
            className="form-control my-3"
          />
          <button onClick={onSubmit} className="btn btn-light">
            Create Category
          </button>
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
      title="Create a category here!"
      description="Add a new category for products"
    >
      <div className="p-3">
        <div className="container bg-info shadow rounded p-4">
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
