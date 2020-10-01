import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

function PrivateRoute({ component: Component, ...rest }) {
  // console.log(Component);
  // console.log(rest)
  // console.log(isAuthenticated().role)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
