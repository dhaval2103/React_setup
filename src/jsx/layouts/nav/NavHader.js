import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import logoblack from "../../../icons/appIcon-black.svg"
import logo from "../../../icons/appIcon.svg"
import main_logo from "../../../icons/main_logo.svg"
import white_logo from "../../../icons/white_logo.svg"
import dark_logo from "../../../images/logo_az.png"


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
            {toggle ? <img src={white_logo} width="50px" /> : <img src={dark_logo} width="160px" />}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="App text-center mt-3">
              {toggle ? <img src={main_logo} width="50px" /> : <img src={logoblack} width="160px" />}
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
