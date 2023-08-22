import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import { ThemeContext } from "../context/ThemeContext";
import User from "./pages/User/Carrier";
import RequestList from "./pages/User/Request";
import viewRequest from "./pages/User/ViewRequest";
import ViewUser from "./pages/User/ViewUser";
import Notification from "./pages/Setting/Notification";
import BrokerList from "./pages/User/BrokerList";
import UserNotification from "./pages/Setting/UserNotification";
import NotificationDetail from "./pages/Setting/NotificationDetail";
import ChangePassword from "./components/AppsMenu/AppProfile/ChangePassword";
import Google2fa from "./components/AppsMenu/AppProfile/Google2fa";
// import Google2fa from "./components/AppsMenu/AppProfile/";
import FmcsasView from "./pages/User/FmcsasView";
import FmcsasList from "./pages/User/FmcsasList";
import SubUserList from "./pages/User/SubUserList";
import LinkList from "./pages/User/LinkList";
import SubUserLinkList from "./pages/User/SubUserLinkList";
import CarrierSubUserList from "./pages/User/CarrierSubUserList";
import SubUserFmcsasList from "./pages/User/SubUserFmcsasList";
import CarrierSubUserLinkList from "./pages/User/CarrierSubUserLinkList";
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";




const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },
 
    
    // User
    { url: "carrier-list", component: User },
    { url: "broker-list", component: BrokerList },
    { url: "sub-user-list", component: SubUserList },
    { url: "link-list", component: LinkList },
    { url: "sub-user-link-list", component: SubUserLinkList },
    { url: "carrier-sub-user-list", component: CarrierSubUserList },
    { url: "carrier-sub-user-Link-list", component: CarrierSubUserLinkList },
    { url: "sub-user-FMCSAS-list", component: SubUserFmcsasList },
    { url: "request-list", component: RequestList },
    { url: "request-detail", component: viewRequest },
    { url: "FMCSAS-list", component: FmcsasList },
    { url: "FMCSAS-view", component: FmcsasView },

    
    //Notification
    { url: "general-notification", component: Notification },
    { url: "user-notification", component: UserNotification },
    { url: "notification-detail", component: NotificationDetail },

    { url: "user-detail", component: ViewUser },

	
	/// Apps
    { url: "app-profile", component: AppProfile },
    { url: "change-password", component: ChangePassword },
    { url: "google2fa", component: Google2fa },



    /// pages
    { url: "page-register", component: Registration },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },

  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>      
	  <ScrollToTop />
    </>
  );
};

export default Markup;
