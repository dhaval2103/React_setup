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
    "dashboard-dark",
    "wallet",
    "invoices-list",
    "create-invoices",
    "card-center",
    "transaction-details",
    "task",
  ],
    app = [
      "app-profile",
      "post-details",
      "changepassword",
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
            <Link to="/changepassword" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20" />
                <circle cx={12} cy={15} r={4} />
              </svg>
              <span className="ms-2">Change Password</span>
            </Link>
            {/* <Link to="/google2fa" className="dropdown-item ai-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary me-1"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                <path d="M12 2c-3.314 0-6 2.686-6 6 0 4 6 10 6 10s6-6 6-10c0-3.314-2.686-6-6-6zm0 18c-1.916 0-3.604-1.304-4.136-3h8.272c-.532 1.696-2.22 3-4.136 3zm-4.363-5c-.5-1.112-.918-2.356-1.236-3.676-.42-1.52-.764-2.942-.888-3.324a1 1 0 0 1 1.964-.552c.057.256.276 1.704.648 3.3.4 1.684.946 3.302 1.544 4.824a1 1 0 0 1-1.08 1.404z" />
              </svg>
              <span className="ms-2">Google2fa Authentication</span>
            </Link> */}
            
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="#" >
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul >
              <li><Link className={`${path === "dashboard" ? "mm-active" : ""}`} to="/dashboard"> Dashboard Light</Link></li>
              <li><Link className={`${path === "dashboard-dark" ? "mm-active" : ""}`} to="/dashboard-dark"> Dashboard Dark</Link></li>
              {/* <li><Link className={`${path === "wallet" ? "mm-active" : ""}`} to="/wallet">My Wallet</Link></li>
              <li><Link className={`${path === "invoices-list" ? "mm-active" : ""}`} to="/invoices-list"> Invoices</Link></li>
              <li><Link className={`${path === "create-invoices" ? "mm-active" : ""}`} to="/create-invoices">Create Invoices</Link></li>
              <li><Link className={`${path === "card-center" ? "mm-active" : ""}`} to="/card-center">Card-Center</Link></li>
              <li><Link className={`${path === "transaction-details" ? "mm-active" : ""}`} to="/transaction-details"> Transaction</Link></li>
              <li><Link className={`${path === "task" ? "mm-active" : ""}`} to="/task">Task</Link></li> */}
            </ul>
          </li>

          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fa fa-user"></i>
              <span className="nav-text">Users List</span>
            </Link>
            <ul >
              <li><Link className={`${path === "carrier-list" ? "mm-active" : ""}`} to="/carrier-list">Carrier List</Link></li>
              <li><Link className={`${path === "broker-list" ? "mm-active" : ""}`} to="/broker-list">Broker List</Link></li>
              <li><Link className={`${path === "fmcsas-list" ? "mm-active" : ""}`} to="/fmcsas-list">Fmcsas List</Link></li>
            </ul>
          </li>
          <li className={`${path === "request-list" || path == "request-detail" ? "mm-active" : ""}`}>
            <Link to="/request-list" >
              <i className="fa fa-question-circle"></i>
              <span className="nav-text">Request List</span>
            </Link>
          </li>
          {/* <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i class="fa fa-cog" aria-hidden="true"></i>
              <span className="nav-text">General Setting</span>
            </Link>
            <ul >
              <li><Link className={`${path === "cms-list" ? "mm-active" : ""}`} to="/cms-list">CMS List</Link></li>
              <li><Link className={`${path === "manage-subscriptions" ? "mm-active" : ""}`} to="/manage-subscriptions">Manage Subscriptions</Link></li>
              <li><Link className={`${path === "faq-group-list" ? "mm-active" : ""}`} to="/faq-group-list">FAQ Group List</Link></li>
              <li><Link className={`${path === "faq-list" ? "mm-active" : ""}`} to="/faq-list">FAQ List</Link></li>
              <li><Link className={`${path === "technical-guide-list" ? "mm-active" : ""}`} to="/technical-guide-list">Technical Guide List</Link></li>
              <li><Link className={`${path === "contact-us" ? "mm-active" : ""}`} to="/contact-us">Contact Us</Link></li>
            </ul>
          </li>
          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i class="fa fa-bell" aria-hidden="true"></i>

              <span className="nav-text">Notifications</span>
            </Link>
            <ul >
            <li><Link className={`${path === "general-notification" ? "mm-active" : ""}`} to="/general-notification">General Notifications</Link></li>
            <li><Link className={`${path === "user-notification" ? "mm-active" : ""}`} to="/user-notification">Individual/Group Notification</Link></li>
          
            </ul>
          </li>
          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i class="fa fa-bars" aria-hidden="true"></i>

              <span className="nav-text">Maintenance Module</span>
            </Link>
            <ul >
              <li><Link className={`${path === "maintenance-request-list" ? "mm-active" : ""}`} to="/maintenance-request-list">Maintenance Request</Link></li>
              <li><Link className={`${path === "technician-list" ? "mm-active" : ""}`} to="/technician-list">Technician List</Link></li>
            </ul>
          </li>
          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className={`${path === "live-chat" ? "mm-active" : ""}`} to="/live-chat">
              <i class="fa fa-comments" aria-hidden="true"></i>

              <span className="nav-text">Live Chat</span>
            </Link>
          </li> */}
          {/* Apps */}
          {/* <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-info-circle"></i>
              <span className="nav-text">Apps</span>
            </Link>
            <ul >
              <li><Link className={`${path === "app-profile" ? "mm-active" : ""}`} to="/app-profile">Profile</Link></li>
              <li><Link className={`${path === "post-details" ? "mm-active" : ""}`} to="/post-details">Post Details</Link></li>
              <li className={`${email.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow" to="#" >Email</Link>
                <ul  className={`${email.includes(path) ? "mm-show" : ""}`}>
                  <li><Link className={`${ path === "email-compose" ? "mm-active" : ""}`} to="/email-compose">Compose</Link></li>
                  <li><Link className={`${path === "email-inbox" ? "mm-active" : ""}`} to="/email-inbox">Inbox</Link></li>
                  <li><Link className={`${path === "email-read" ? "mm-active" : ""}`} to="/email-read">Read</Link></li>
                </ul>
              </li>
              <li><Link className={`${path === "app-calender" ? "mm-active" : ""}`}to="/app-calender">Calendar</Link></li>
              <li className={`${shop.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow" to="#" >Shop</Link>
                <ul  className={`${shop.includes(path) ? "mm-show" : ""}`}>
                  <li><Link className={`${ path === "ecom-product-grid" ? "mm-active" : ""}`} to="/ecom-product-grid">Product Grid</Link></li>
                  <li><Link className={`${ path === "ecom-product-list" ? "mm-active" : ""}`} to="/ecom-product-list">Product List</Link></li>
                  <li><Link className={`${ path === "ecom-product-detail" ? "mm-active" : "" }`} to="/ecom-product-detail">Product Details</Link></li>
                  <li><Link className={`${ path === "ecom-product-order" ? "mm-active" : "" }`} to="/ecom-product-order">Order</Link></li>
                  <li><Link className={`${ path === "ecom-checkout" ? "mm-active" : ""}`} to="/ecom-checkout">Checkout</Link></li>
                  <li><Link className={`${ path === "ecom-invoice" ? "mm-active" : "" }`} to="/ecom-invoice">Invoice</Link></li>
                  <li><Link className={`${ path === "ecom-customers" ? "mm-active" : "" }`} to="/ecom-customers">Customers</Link></li>
                </ul>
              </li>
            </ul>
          </li> */}
          {/* Charts */}
          {/* <li className={`${charts.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-chart-line"></i>
              <span className="nav-text">Charts</span>
            </Link>
            <ul >
              <li><Link className={`${path === "chart-rechart" ? "mm-active" : ""}`} to="/chart-rechart">RechartJs</Link></li>
              <li><Link className={`${path === "chart-chartjs" ? "mm-active" : ""}`} to="/chart-chartjs">Chartjs</Link></li>
              <li><Link className={`${path === "chart-chartist" ? "mm-active" : ""}`} to="/chart-chartist">Chartist</Link></li>
              <li><Link className={`${path === "chart-sparkline" ? "mm-active" : ""}`} to="/chart-sparkline">Sparkline</Link></li>
              <li><Link className={`${path === "chart-apexchart" ? "mm-active" : ""}`} to="/chart-apexchart" >Apexchart</Link></li>
            </ul>
          </li> */}
          {/* Bootstrap */}
          {/* <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fab fa-bootstrap"></i>
              <span className="nav-text">Bootstrap</span>
            </Link>
            <ul >
              <li><Link className={`${path === "ui-accordion" ? "mm-active" : ""}`} to="/ui-accordion">Accordion</Link></li>
              <li><Link className={`${path === "ui-alert" ? "mm-active" : ""}`} to="/ui-alert"> Alert</Link></li>
              <li><Link className={`${path === "ui-badge" ? "mm-active" : ""}`} to="/ui-badge">Badge</Link></li>
              <li><Link className={`${path === "ui-button" ? "mm-active" : ""}`} to="/ui-button">Button</Link></li>
              <li><Link className={`${path === "ui-modal" ? "mm-active" : ""}`} to="/ui-modal">Modal</Link></li>
              <li><Link className={`${path === "ui-button-group" ? "mm-active" : ""}`} to="/ui-button-group">Button Group</Link></li>
              <li><Link className={`${path === "ui-list-group" ? "mm-active" : ""}`} to="/ui-list-group" >List Group</Link></li>
              <li><Link className={`${path === "ui-card" ? "mm-active" : ""}`} to="/ui-card">Cards</Link></li>
              <li><Link className={`${path === "ui-carousel" ? "mm-active" : ""}`} to="/ui-carousel">Carousel</Link></li>
              <li><Link className={`${path === "ui-dropdown" ? "mm-active" : ""}`} to="/ui-dropdown">Dropdown</Link></li>
              <li><Link className={`${path === "ui-popover" ? "mm-active" : ""}`} to="/ui-popover">Popover</Link></li>
              <li><Link className={`${path === "ui-progressbar" ? "mm-active" : ""}`} to="/ui-progressbar">Progressbar</Link></li>
              <li><Link className={`${path === "ui-tab" ? "mm-active" : ""}`} to="/ui-tab">Tab</Link></li>
              <li><Link className={`${path === "ui-typography" ? "mm-active" : ""}`} to="/ui-typography">Typography</Link></li>
              <li><Link className={`${path === "ui-pagination" ? "mm-active" : ""}`} to="/ui-pagination">Pagination</Link></li>
              <li><Link className={`${path === "ui-grid" ? "mm-active" : ""}`} to="/ui-grid">Grid</Link></li>
            </ul>
          </li>
          {/* Plugins */}
          {/* <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-heart"></i><span className="nav-text">Plugins</span>
            </Link>
            <ul >
              <li><Link className={`${path === "uc-select2" ? "mm-active" : ""}`} to="/uc-select2">Select 2</Link></li>
              <li><Link className={`${path === "uc-noui-slider" ? "mm-active" : ""}`} to="/uc-noui-slider">Noui Slider</Link></li>
              <li><Link className={`${path === "uc-sweetalert" ? "mm-active" : ""}`} to="/uc-sweetalert">Sweet Alert</Link></li>
              <li><Link className={`${path === "uc-toastr" ? "mm-active" : ""}`} to="/uc-toastr">Toastr</Link></li>
              <li><Link className={`${path === "map-jqvmap" ? "mm-active" : ""}`} to="/map-jqvmap">Jqv Map</Link></li>
              <li><Link className={`${path === "uc-lightgallery" ? "mm-active" : ""}`} to="/uc-lightgallery">Light Gallery</Link></li>
            </ul>
          </li> */}
          {/* Redux */}
          {/* <li className={`${redux.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#" >
                  <i className="flaticon-087-stop"></i><span className="nav-text">Redux</span>
              </Link>
          <ul>
                <li><Link className={`${path === "todo" ? "mm-active" : ""}`} to="/todo">Todo</Link></li>
          </ul>
         </li> */}
          {/* Widget */}
          {/* <li className={`${widget.includes(path) ? "mm-active" : ""}`}>
            <Link to="widget-basic" className="ai-icon" >
              <i className="fas fa-user-check"></i>
              <span className="nav-text">Widget</span>
            </Link>
          </li> */}
          {/* Forms */}
          {/* <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-file-alt"></i>
              <span className="nav-text forms">Forms</span>
            </Link>
            <ul >
              <li><Link className={`${path === "form-element" ? "mm-active" : ""}`} to="/form-element">Form Elements</Link></li>
              <li><Link className={`${path === "form-wizard" ? "mm-active" : ""}`} to="/form-wizard"> Wizard</Link></li>
              <li>
                <Link className={`${path === "form-editor-summernote" ? "mm-active" : ""}`} to="/form-editor-summernote">
                  Summernote
                </Link>
              </li>
              <li><Link className={`${path === "form-pickers" ? "mm-active" : ""}`} to="/form-pickers">Pickers</Link></li>
              <li>
                <Link className={`${path === "form-validation-jquery" ? "mm-active" : ""}`} to="/form-validation-jquery">
                  Form Validate
                </Link>
              </li>
            </ul>
          </li> */}
          {/* Table */}
          {/* <li className={`${table.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" ><i className="fas fa-table"></i><span className="nav-text">Table</span></Link>
            <ul>
              <li>
                <Link className={`${path === "table-filtering" ? "mm-active" : ""}`} to="/table-filtering">
                  Table Filtering
                </Link>
              </li>
              <li>
                <Link className={`${path === "table-sorting" ? "mm-active" : ""}`} to="/table-sorting">
                  Table Sorting
                </Link>
              </li>
              <li>
                <Link className={`${path === "table-bootstrap-basic" ? "mm-active" : ""}`} to="/table-bootstrap-basic">
                  Bootstrap
                </Link>
              </li>
              <li>
                <Link className={`${path === "table-datatable-basic" ? "mm-active" : ""}`} to="/table-datatable-basic">
                  Datatable
                </Link>
              </li>
            </ul>
          </li> */}
          {/* Pages */}
          {/* <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-clone"></i>
              <span className="nav-text">Pages</span>
            </Link>
            <ul >
              <li className={`${error.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#" >Error</Link>
                <ul>
                  <li><Link className={`${path === "page-error-400" ? "mm-active" : ""}`} to="/page-error-400">Error 400</Link></li>
                  <li><Link className={`${path === "page-error-403" ? "mm-active" : ""}`} to="/page-error-403">Error 403</Link></li>
                  <li><Link className={`${path === "page-error-404" ? "mm-active" : ""}`} to="/page-error-404">Error 404</Link></li>
                  <li><Link className={`${path === "page-error-500" ? "mm-active" : ""}`} to="/page-error-500">Error 500</Link></li>
                  <li><Link className={`${path === "page-error-503" ? "mm-active" : ""}`} to="/page-error-503">Error 503</Link></li>
                </ul>
              </li>
              <li><Link className={`${path === "page-lock-screen" ? "mm-active" : ""}`} to="/page-lock-screen">Lock Screen</Link></li>
            </ul>
          </li> */}
        </MM>
        {/* <div className="copyright">
          <p><strong>AZ Security Admin Dashboard</strong> © 2022 All Rights Reserved</p>
          <p className="fs-12">Made with <span className="heart"></span> by DexignLabs</p>
        </div> */}
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
