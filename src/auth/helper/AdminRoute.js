import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

function AdminRoute({ component: Component, ...rest }) {
  // console.log(Component);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 1 ? (
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

export default AdminRoute;
