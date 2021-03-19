export const API =
  process.env.REACT_APP_ENVIRONMENT === "localhost"
    ? process.env.REACT_APP_BACKEND_LOCAL
    : process.env.REACT_APP_BACKEND;
export const KEY_ID = process.env.REACT_APP_KEY_ID;
