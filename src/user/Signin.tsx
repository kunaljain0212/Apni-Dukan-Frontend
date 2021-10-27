import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import {
  JWT,
  SignInAPIResponse,
  SignInState,
} from "../interfaces/userInterfaces";
import "../styles.css";
import { CustomError } from "../interfaces/adminInterfaces";

function Signin() {
  const [values, setValues] = useState<SignInState>({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

  const user = isAuthenticated();

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        // console.log(data);
        if ((data as CustomError).error) {
          setValues({
            ...values,
            error: (data as CustomError).error,
            loading: false,
          });
        } else {
          authenticate(data as SignInAPIResponse, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => {
        // console.log("Sign in request failed", err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && (user as JWT).role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    if (loading) {
      return (
        <div className="text-warning text-center">
          <p>Loading...</p>
        </div>
      );
    }
  };

  const errorMessage = () => {
    return (
      <p
        className="text-danger text-center"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </p>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm text-center">
          <form className="myform">
            <div className="form-group">
              <label className="text-black">Email</label>
              <input
                value={email}
                className="form-control"
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-black">Password</label>
              <input
                value={password}
                className="form-control"
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-warning btn-block">
              Submit
            </button>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    );
  };

  return (
    <Base title="Sign in Page" description="A page for user to sign in!!">
      {signInForm()}
      <br />
      {loadingMessage()}
      {errorMessage()}
      {performRedirect()}
    </Base>
  );
}

export default Signin;
