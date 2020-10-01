import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import "../styles.css";
import { useEffect } from "react";

const Base = ({
  title = "My Title",
  description = "My desription",
  children,
}) => {
  const [darkmode, setDarkMode] = useState(getInitialMode());
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkmode));
    document.body.className = darkmode ? "dark-mode" : "light-mode";
  }, [darkmode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const userPrefMode = getPrefColorMode();
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefMode) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorMode() {
    if (!window.matchMedia) {
      return;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <div>
      <Navigation
        initialMode={darkmode}
        changeMode={() => setDarkMode((prev) => !prev)}
      />
      <div className={darkmode ? "dark-mode" : "light-mode"}>
        <div
          className={
            darkmode
              ? "jumbotron dark-mode text-white text-center"
              : "jumbotron light-mode text-black text-center"
          }
        >
          <h1 className="display-4">{title}</h1>
          <p className="lead">{description}</p>
        </div>
        <div
          className={
            darkmode
              ? "dark-mode text-white text-center child"
              : "light-mode text-dark text-center child"
          }
        >
          {children}
        </div>
      </div>
      <footer className="footer bg-dark">
        <div className="container-fluid bg-info text-white py-1 d-flex justify-content-center">
          <h4 className="py-2 px-2">
            If you got any questions, feel free to reach out!
          </h4>
          <div className="Cus">
            <button className="ContactUs btn btn-warning btn-lg">
              <Link
                to="/contactus"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Contact Us
              </Link>
            </button>
          </div>
        </div>
        <div className="container-fluid text-center">
          <span className="text-muted">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Kunal Jain
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
