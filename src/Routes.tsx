import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Contactus from "./core/Contactus";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import ManageCategories from "./admin/ManageCategories";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/contactus" exact component={Contactus} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  );
}
