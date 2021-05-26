import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { SignUpState } from "../interfaces/userInterfaces";

function Signup() {
  const [values, setValues] = useState<SignUpState>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, email, password, error, success } = values;

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

  const onsubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, lastname, email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          // console.log("databse se error while saving" + data.error)
        } else {
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log("error in signup");
      });
  };

  const successMessage = () => {
    return (
      <p
        className="text-success text-center"
        style={{ display: success ? "" : "none" }}
      >
        New account was created successfully.
        <Link to="/signin">Login Here</Link>
      </p>
    );
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

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-sm"></div>

        <div className="col-sm text-center">
          <form className="myform">
            <div className="form-group">
              <label className="text-black">First Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <button className="btn btn-warning btn-block" onClick={onsubmit}>
              Submit
            </button>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A page for user to sign up!!">
      {signUpForm()}
      <br></br>
      {successMessage()}
      {errorMessage()}
    </Base>
  );
}

export default Signup;
