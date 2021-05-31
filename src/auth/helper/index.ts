import { CustomError } from "../../interfaces/adminInterfaces";
import {
  IsAuthenticated,
  JWT,
  SignUp,
  SignIn,
  SignInAPIResponse,
  SignUpAPIResponse,
} from "../../interfaces/userInterfaces";
const { API } = require("../../backend");

export const signup = (
  user: SignUp
): Promise<SignUpAPIResponse | CustomError> => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (
  user: SignIn
): Promise<SignInAPIResponse | CustomError> => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data: SignInAPIResponse, next: () => void) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next: () => void) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    next();
  }

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = (): IsAuthenticated => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")!) as JWT;
  } else {
    return false;
  }
};
