import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, render, jwt, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) =>
        jwt ? (
          render ? (
            render(routeProps)
          ) : (
            <Component {...routeProps} />
          )
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default ProtectedRoute;
