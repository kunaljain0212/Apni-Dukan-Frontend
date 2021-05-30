import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

interface IProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
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
};

export default PrivateRoute;
