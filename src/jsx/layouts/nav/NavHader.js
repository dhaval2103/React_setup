import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import logoblack from "../../../icons/appIcon-black.svg"
import logo from "../../../icons/appIcon.svg"


const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" ? (
          <Fragment>
            <div className="App text-center mt-3">
              <img src={logo} width="160px" />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="App text-center mt-3">
              <img src={logoblack} width="160px" />
            </div>
          </Fragment>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
