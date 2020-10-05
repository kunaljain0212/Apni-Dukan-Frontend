import React, { useState } from "react";
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
      <footer className="sticky-bottom footer bg-dark">
        <div className="container-fluid bg-info text-center">
          <span className="text-light">
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
