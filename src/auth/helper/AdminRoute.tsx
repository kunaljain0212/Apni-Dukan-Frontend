import React from "react";
import { Route, Redirect } from "react-router-dom";
import { JWT } from "../../interfaces/userInterfaces";
import { isAuthenticated } from "./index";

interface IProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const AdminRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && (isAuthenticated() as JWT).role === 1 ? (
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

export default AdminRoute;
