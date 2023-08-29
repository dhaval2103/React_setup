/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';
import dummy from "../../../images/dummy.png";


/// Image
//import user from "../../../images/user.jpg";
import { connect } from "react-redux";


class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = (props) => {
  const adminData = props?.adminData;

  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    // var handleheartBlast = document.querySelector('.heart');
    // function heartBlast() {
    //   return handleheartBlast.classList.toggle("heart-blast");
    // }
    // handleheartBlast.addEventListener('click', heartBlast);

  }, []);
  // let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
    "",
    "dashboard",
    "dashboard-dark",
    "wallet",
    "invoices-list",
    "create-invoices",
    "card-center",
    "transaction-details",
    "task",
  ],
  user = [
    "carrier-list",
    "broker-list",
    'user-detail'
  ],
  notification = [
    "general-notification",
    "user-notification",
  ],
    app = [
      "app-profile",
      "post-details",
      "change-password",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    email = ["email-compose", "email-inbox", "email-read"],
    shop = [
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",

      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
    redux = [
      "redux-form",
      "redux-wizard",
      "todo",
    ],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  return (
    <div
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        // ? scrollPosition > 120
        //   ? "fixed"
        //   : ""
        // : ""
        }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown className="dropdown header-profile2">
          <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
            <div className="header-info2 d-flex align-items-center border">
              <img src={adminData?.profileImage != null ? adminData?.profileImage : dummy} width={20} alt="" />
              {/* <img src={profile} width={20} alt="" /> */}
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w700 d-block mb-2">{adminData?.displayName}</span>
                  <small className="text-end font-w400">Super Admin</small>
                </div>
                <i className="fas fa-sort-down ms-4"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-end">
            <Link to="/app-profile" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile </span>
            </Link>
            <Link to="/change-password" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20" />
                <circle cx={12} cy={15} r={4} />
              </svg>
              <span className="ms-2">Change Password</span>
            </Link>
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) || path == 'dashboard' ? "mm-active" : ""}`}>
            <Link to="/" >
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${user.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fa fa-user"></i>
              <span className="nav-text">Users List</span>
            </Link>
            <ul >
              <li><Link className={`${path === "carrier-list" ? "mm-active" : ""}`} to="/carrier-list">Carrier List</Link></li>
              <li><Link className={`${path === "broker-list" ? "mm-active" : ""}`} to="/broker-list">Broker List</Link></li>
            </ul>
          </li>
          <li className={`${path === "FMCSA-list" || path === "FMCSA-view" ? "mm-active" : ""}`}>
            <Link to="/FMCSA-list" >
              <i className="fa fa-question-circle"></i>
              <span className="nav-text">FMCSA List</span>
            </Link>
          </li>
          <li className={`${path === "request-list" || path == "request-detail" ? "mm-active" : ""}`}>
            <Link to="/request-list" >
              <i className="fa fa-question-circle"></i>
              <span className="nav-text">Request List</span>
            </Link>
          </li>
          <li className={`${notification.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i class="fa fa-bell" aria-hidden="true"></i>

              <span className="nav-text">Notifications</span>
            </Link>
            <ul >
            <li><Link className={`${path === "general-notification" ? "mm-active" : ""}`} to="/general-notification">General Notifications</Link></li>
            <li><Link className={`${path === "user-notification" ? "mm-active" : ""}`} to="/user-notification">Individual Notification</Link></li>
            </ul>
          </li>
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adminData: state.auth.auth
  };
};
export default connect(mapStateToProps)(SideBar);
