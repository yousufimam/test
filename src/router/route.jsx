import { Navigate, Route } from "react-router-dom";
import PropTypes, { element } from "prop-types";

import React from "react";
import jwt from "jwt-decode";

const getRole = () => {
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const accessToken = JSON.parse(authUser).accessToken;

    if (accessToken) {
      return jwt(accessToken).role;
    }
  }
  return "";
};

const Authmiddleware = ({ component: Component, isAuthProtected, path, role }) => {
  const authUser = localStorage.getItem("authUser");

  if (isAuthProtected && !authUser) {
    return <Navigate to="/login" />;
  } else if (!isAuthProtected && authUser) {
    // if authUser is true and isAuthProtected is false then check for role
    if (getRole() === "admin") {
      if (path === "/" || path === "/login" || path === "/register") {
        return <Navigate to="/admin-panel" />;
      }
    } else if (getRole() === "customer") {
      if (path === "/" || path === "/login" || path === "/register") {
        return <Navigate to="/dashboard" />;
      }
      return <Component />;
    }
  } else if (isAuthProtected && authUser) {
    // if authUser is true and isAuthProtected is true then check role and get role match
    if (getRole() === "admin" && role === "admin") {
      return <Component />;
    } else if (getRole() === "customer" && role === "customer") {
      return <Component />;
    } else if (getRole() === "admin" && role === "customer") {
      return <Navigate to="/admin-panel" />;
    } else if (getRole() === "customer" && role === "admin") {
      return <Navigate to="/dashboard" />;
    } else {
      return <Component />;
    }
  }

  return <Component />;

  // if (isAuthProtected && !authUser) {
  //   return <Navigate to="/login" />;
  // } else if (!isAuthProtected && authUser) {
  //   if (path == "/login") {
  //     return <Navigate to="/dashboard" />;
  //   }
  //   return <Component />;
  // }

  // return <Component />;
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
  path: PropTypes.string,
  role: PropTypes.string
};

export default Authmiddleware;
