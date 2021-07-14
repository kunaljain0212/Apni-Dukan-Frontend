import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { SignUpState } from "../interfaces/userInterfaces";
import { CustomError } from "../interfaces/adminInterfaces";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
  field: {
    // marginTop: 20,
    marginBottom: 20,
    // display: "block",
    width: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpParent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
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
      .then(data => {
        if ((data as CustomError).error) {
          setValues({
            ...values,
            error: (data as CustomError).error,
            success: false,
          });
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
      .catch(err => {
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

  const classes = useStyles();
  const signUpForm = () => {
    return (
      <div className={classes.signUpParent}>
        <Container className={classes.signUpParent}>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.field}
              onChange={handleChange("name")}
              label="First Name"
              variant="outlined"
              color="primary"
              value={name}
              fullWidth
              required
            />
            <TextField
              className={classes.field}
              onChange={handleChange("lastname")}
              label="Last Name"
              variant="outlined"
              color="primary"
              value={lastname}
              fullWidth
              required
            />
            <TextField
              className={classes.field}
              onChange={handleChange("email")}
              label="Email"
              variant="outlined"
              color="primary"
              value={email}
              fullWidth
              required
            />
            <TextField
              className={classes.field}
              onChange={handleChange("password")}
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              value={password}
              fullWidth
              required
            />
            <Button
              type="submit"
              color="primary"
              style={{ fill: "#ffc107" }}
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={onsubmit}
            >
              Submit
            </Button>
          </form>
        </Container>
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
