import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import LOGO from "./LOGO.png";
import { Nav, Navbar } from "react-bootstrap";
import { isAuthenticated, signout } from "../auth/helper";
import "../styles.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#ffc107",
    };
  } else {
    return {
      color: "#FFFFFF",
    };
  }
};

function Navigation({ history, changeMode, initialMode }) {
  return (
    <div className="shadow-lg sticky-top navBar">
      <Navbar 
        collapseOnSelect
        expand="lg"
        bg="info"
        variant="light"
        sticky="top"
      >
        <Link className="nav-link" to="/">
          <img style={{ height: 25, width: 25 }} src={LOGO} alt="LOGOf" />
        </Link>
        <span style={{ color: initialMode ? "grey" : "yellow" }}>☀︎</span>
        <span className="toggle">
          <input
            checked={initialMode}
            onChange={changeMode}
            type="checkbox"
            className="checkbox"
            id="checkbox"
          />
          <label htmlFor="checkbox"></label>
        </span>
        <span style={{ color: initialMode ? "black" : "grey" }}> ☾</span>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              Cart
            </Link>
            {isAuthenticated() && isAuthenticated().role === 0 && (
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                U. Dashboard
              </Link>
            )}
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                A. Dashboard
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  SignUp
                </Link>
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  SignIn
                </Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <span
                className="nav-link signout"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Sign Out
              </span>
            )}
          </Nav>
          <Nav>
            <Link
              style={currentTab(history, "/contactus")}
              className="nav-link"
              to="/contactus"
            >
              Contact Us
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(Navigation);
