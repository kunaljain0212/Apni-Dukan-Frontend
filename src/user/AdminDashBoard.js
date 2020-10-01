import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";

function AdminDashBoard() {
  const { name, email } = isAuthenticated();
  // console.log(isAuthenticated())

  const adminLeftSide = () => {
    return (
      <div className="bg-info rounded p-2">
        <h2 className="card bg-warning text-dark p-3">Admin Navigation</h2>
        <div className="text-left p-2">
          <div>
            <Badge variant="warning">Name :</Badge>
            &nbsp;
            <span className="text-light">{name}</span>
          </div>
          <div>
            <Badge variant="warning">Email :</Badge>
            &nbsp;
            <span className="text-light">{email}</span>
          </div>
          <div>
            <Badge variant="warning">Role :</Badge>
            &nbsp;
            <span className="text-light">Admin</span>
          </div>
        </div>
        <div className="p-3">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/create/category"
          >
            <Button block variant="outline-light">
              Create Category
            </Button>
          </Link>

          <br />

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/create/product"
          >
            <Button block variant="outline-light">
              Create Product
            </Button>
          </Link>
          <br />

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/categories"
          >
            <Button block variant="outline-light">
              Manage Category
            </Button>
          </Link>
          <br />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/products"
          >
            <Button block variant="outline-light">
              Manage Products
            </Button>
          </Link>
          <br />

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/orders"
          >
            <Button block variant="outline-light">
              Manage Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all your products and categories here!"
    >
      <div className="row">
        <div className="col-8 offset-2">{adminLeftSide()}</div>
      </div>
    </Base>
  );
}

export default AdminDashBoard;
