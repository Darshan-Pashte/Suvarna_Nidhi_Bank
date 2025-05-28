import classes from "./Sidebar.module.scss";
import React, { useContext, useEffect, useState } from "react";
// import { PROTECTED_ROUTES, PROTECTED_ROUTES_SERVICES, PROTECTED_ROUTES_SETTINGS } from '../../routes/Routes';
import routes from "../../routes/Routes";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ChevronDown from "./SidebarIcons/CaretDown.svg";
import ChevronUp from "./SidebarIcons/Caretup.svg";
import HandleOpen from "../../assets/Sidebar/OpenIcon.svg";
import HandleClose from "../../assets/Sidebar/CloseIcon.svg";
// import SidebarImageIcon from "../../assets/images/backupImages/Bhagini/SideBarLastIcon.svg";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { set } from "react-hook-form";
// import logo from "../../assets/images/backupImages/Bhagini/Logo.svg";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import ThemeButton from "../common/ThemeButton";
// import { animated } from 'react-spring';
const package_json = require("../../../package.json");

const slideIn = keyframes`${fadeIn}`;
const AnimatedCard = styled.div`
  animation: 0.7s ${slideIn};
`;

// const AnimatedContent = animated.div;

const Sidebar = ({opens,setOpens}) => {
  // const { state } = useContext(AuthContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 425);
  const {
    PROTECTED_ROUTES,
    PROTECTED_ROUTES_SERVICES,
    PROTECTED_ROUTES_SETTINGS,
  } = routes();
  const [selectedChildRoute, setSelectedChildRoute] = useState(null);

  const { loading, error, isAuthenticated, user, menu, userType } = useSelector(
    (state) => state.auth
  );

  console.log("process.env.REACT_APP_VERSION", process.env.REACT_APP_VERSION);

  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [sideBarHovered, setSideBarHovered] = useState(true);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const dispatch = useDispatch();
  const [SidebarImageIcon, setSidebarImageIcon] = useState(null);
  const [logo, setlogo] = useState(null);
  const theme = useSelector((state) => state.theme.theme);
  const themeClass = ThemeButton()

  const handleDrawerOpen = () => {
    setOpens(true);
  };

  const handleDrawerClose = () => {
    setOpens(false);
  };

  const bankNames = process.env.REACT_APP_FLAVOUR;


  useEffect(() => {
    const importedImage = async () => {
      const logo = await import(`../../assets/Banks/${bankNames}/images/Logo.svg`);
      const SidebarImageIcon = await import(`../../assets/Banks/${bankNames}/images/SideBarLastIcon.svg`);
      setSidebarImageIcon(SidebarImageIcon.default);
      setlogo(logo.default);
    };
    importedImage(); 
  }, [bankNames]);

  useEffect(() => {
    const storedExpandedRoute = sessionStorage.getItem("expandedRoute");
    if (storedExpandedRoute) {
      setExpandedRoute(storedExpandedRoute);
    }
  }, []);

  // useEffect(() => {
  //   const storedExpandedRoute = sessionStorage.getItem('expandedRoute');
  //   if (location.pathname) {
  //     setExpandedRoute(location.pathname);
  //   }
  // }, [location]);

  useEffect(() => {
    if (location.pathname === "/") setActiveRoute("dashboard");
    else {
      PROTECTED_ROUTES.forEach((route) =>
        location.pathname.includes(route.id) ? setActiveRoute(route.id) : null
      );
      PROTECTED_ROUTES_SERVICES.forEach((route) =>
        location.pathname.includes(route.id) ? setActiveRoute(route.id) : null
      );
      PROTECTED_ROUTES_SETTINGS.forEach((route) =>
        location.pathname.includes(route.id) ? setActiveRoute(route.id) : null
      );
    }
  }, [location]);
  const a = "11111000000";
  const arr = a.split("");
  useEffect(() => {
    sessionStorage.getItem("menu");
  }, []);

  const handleRouteChange = (route) => {
    setActiveRoute(route.id);
    navigate(route.url);
    setExpandedRoute(null);
    setSelectedChildRoute(null);
    sessionStorage.setItem("expandedRoute", null);
    setOpens(false);
  };

  const handleChildRouteChange = (parent, child) => {
    setActiveRoute(parent.id);
    navigate(`${parent.url}${child.url}`);
    setExpandedRoute(parent.name);
    setSelectedChildRoute(child.id);
    sessionStorage.setItem("expandedRoute", parent.name);
    setOpens(false);
  };

  const openSidebar = () => {
    document.getElementById("mySidebar").style.width = "15.344vw";
    // document.getElementById('MenuItems').style.width = 'max-content';
    setSideBarHovered(true);
  };

  const closeSidebar = () => {
    document.getElementById("mySidebar").style.width = "3.762vw";
    // document.getElementById('MenuItems').style.width = '0vw';
    setSideBarHovered(false);
  };

  const hover = () => {
    if (isSmallScreen === true) {
      return true;
    } else {
      setSideBarHovered(false);
      return false;
    }
  };

  const processedRoutes = PROTECTED_ROUTES.map((route) => {
    if (!route.childRoutes) {
      if (route.arr == "1") return route;
      else return false;
    } else {
      let childRoutes = route.childRoutes?.filter((child) => child.arr == "1");
      if (childRoutes.length) return { ...route, childRoutes: childRoutes };
      else return false;
    }
  }).filter(Boolean);

  const processedRoutesServices = PROTECTED_ROUTES_SERVICES.map((route) => {
    if (!route.childRoutes) {
      if (route.arr == "1") return route;
      else return false;
    } else {
      let childRoutes = route.childRoutes?.filter((child) => child.arr == "1");
      if (childRoutes.length) return { ...route, childRoutes: childRoutes };
      else return false;
    }
  }).filter(Boolean);

  // console.log("processedRoutesServices",processedRoutesServices);

  const processedRoutesSettings = PROTECTED_ROUTES_SETTINGS.map((route) => {
    if (!route.childRoutes) {
      if (route.arr == "1") return route;
      else return false;
    } else {
      let childRoutes = route.childRoutes?.filter((child) => child.arr == "1");
      if (childRoutes.length) return { ...route, childRoutes: childRoutes };
      else return false;
    }
  }).filter(Boolean);

  const handleLogout = () => {
    // authDispatch({ type: REMOVE_USER });
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <>
      {/* Mobile */}
      <div className={classes.mainheaderresp}>
        <header className={classes.mainHeader}>
          <div className={classes.g20}>
            <a
              href="."
              className={classes.fpic}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              <img
                src={logo}
                alt="logo_image"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </a>
          </div>
          <div className={classes.rightlogo}>
            {!opens ? (
              <div onClick={() => handleDrawerOpen()}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // style="vertical-align: middle;"
                >
                  <path
                    d="M2.73541 13.6953H15.2604C15.4683 13.6953 15.6676 13.6127 15.8146 13.4658C15.9616 13.3188 16.0442 13.1194 16.0442 12.9116C16.0442 12.7037 15.9616 12.5044 15.8146 12.3574C15.6676 12.2104 15.4683 12.1278 15.2604 12.1278H2.73541C2.52755 12.1278 2.3282 12.2104 2.18122 12.3574C2.03423 12.5044 1.95166 12.7037 1.95166 12.9116C1.95166 13.1194 2.03423 13.3188 2.18122 13.4658C2.3282 13.6127 2.52755 13.6953 2.73541 13.6953ZM2.73541 9.78032H15.2604C15.4673 9.78032 15.6657 9.69814 15.812 9.55186C15.9582 9.40558 16.0404 9.20719 16.0404 9.00032C16.0404 8.79345 15.9582 8.59505 15.812 8.44878C15.6657 8.3025 15.4673 8.22032 15.2604 8.22032H2.73541C2.52854 8.22032 2.33015 8.3025 2.18387 8.44878C2.03759 8.59505 1.95541 8.79345 1.95541 9.00032C1.95541 9.20719 2.03759 9.40558 2.18387 9.55186C2.33015 9.69814 2.52854 9.78032 2.73541 9.78032ZM1.98541 5.08532C1.98541 5.28423 2.06443 5.475 2.20508 5.61565C2.34573 5.7563 2.5365 5.83532 2.73541 5.83532H15.2604C15.4683 5.83532 15.6676 5.75275 15.8146 5.60577C15.9616 5.45878 16.0442 5.25943 16.0442 5.05157C16.0442 4.84371 15.9616 4.64436 15.8146 4.49738C15.6676 4.35039 15.4683 4.26782 15.2604 4.26782H2.73541C2.62848 4.2631 2.52178 4.28131 2.42247 4.32125C2.32317 4.36118 2.23356 4.42191 2.15967 4.49935C2.08578 4.57679 2.02933 4.66915 1.99409 4.77022C1.95886 4.87129 1.94567 4.97873 1.95541 5.08532H1.98541Z"
                    fill="#E6E5E8"
                  ></path>
                </svg>
              </div>
            ) : (
              <div onClick={() => handleDrawerClose()}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // style="vertical-align: middle;"
                >
                  <path
                    d="M14.5949 3.41247C14.5127 3.33015 14.4151 3.26485 14.3076 3.22029C14.2002 3.17573 14.085 3.1528 13.9687 3.1528C13.8523 3.1528 13.7371 3.17573 13.6297 3.22029C13.5222 3.26485 13.4246 3.33015 13.3424 3.41247L8.99991 7.74747L4.65741 3.40497C4.57517 3.32273 4.47754 3.25749 4.37008 3.21298C4.26263 3.16848 4.14746 3.14557 4.03116 3.14557C3.91485 3.14557 3.79969 3.16848 3.69224 3.21298C3.58478 3.25749 3.48715 3.32273 3.40491 3.40497C3.23882 3.57106 3.14551 3.79633 3.14551 4.03122C3.14551 4.26611 3.23882 4.49138 3.40491 4.65747L7.74741 8.99997L3.40491 13.3425C3.23882 13.5086 3.14551 13.7338 3.14551 13.9687C3.14551 14.2036 3.23882 14.4289 3.40491 14.595C3.571 14.7611 3.79627 14.8544 4.03116 14.8544C4.26605 14.8544 4.49132 14.7611 4.65741 14.595L8.99991 10.2525L13.3424 14.595C13.5085 14.7611 13.7338 14.8544 13.9687 14.8544C14.2035 14.8544 14.4288 14.7611 14.5949 14.595C14.761 14.4289 14.8543 14.2036 14.8543 13.9687C14.8543 13.7338 14.761 13.5086 14.5949 13.3425L10.2524 8.99997L14.5949 4.65747C14.7571 4.49084 14.8478 4.2675 14.8478 4.03497C14.8478 3.80244 14.7571 3.5791 14.5949 3.41247Z"
                    fill="#E6E5E8"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </header>
      
          <div className={classes.navbar} style={{ visibility: opens ? 'visible' : 'hidden',display : opens ? "block" : "none", transform:opens ? "translateX(0)":"translateX(100%)" ,  opacity: opens ? 1 : 0, transition: 'transform 0.5s ease-in-out', position : opens ?  'relative' : 'absolute' }} >

            <div className={classes.newdropdowncontent}>
              <ul className={classes.ul}>
                {processedRoutes.map(({ Icon, ...route }) =>
                  route.childRoutes?.length ? (
                    <div key={route.id}>
                      <li
                        className={
                          activeRoute === route.id ? classes.Active : ""
                        }
                        onClick={() =>
                          setExpandedRoute((prev) =>
                            prev === route.name ? null : route.name
                          )
                        }
                      >
                        <Icon
                          className={
                            activeRoute === route.id
                              ? classes.MenuIcon
                              : classes.MenuRed
                          }
                        />
                        {sideBarHovered && (
                          <AnimatedCard className={classes.parentList}>
                            <div>{route.name}</div>
                            {expandedRoute === route.name ? (
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.5 16.3257L12 8.82567L19.5 16.3257"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.5 8.82567L12 16.3257L4.5 8.82567"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}
                          </AnimatedCard>
                        )}
                      </li>
                      {sideBarHovered && expandedRoute === route.name && (
                        <AnimatedCard className={classes.childRoutesContainer}>
                          {route.childRoutes?.map(
                            (child) =>
                              child.arr == "1" && (
                                <li
                                  onClick={() =>
                                    handleChildRouteChange(route, child)
                                  }
                                  className={classes.submenu}
                                >
                                  {sideBarHovered && <div>- {child.name}</div>}
                                </li>
                              )
                          )}
                        </AnimatedCard>
                      )}
                    </div>
                  ) : (
                    <li
                      key={route.id}
                      onClick={() => handleRouteChange(route)}
                      className={activeRoute === route.id ? classes.Active : ""}
                    >
                      <Icon
                        className={
                          activeRoute === route.id
                            ? classes.MenuIcon
                            : classes.MenuRed
                        }
                      />
                      {sideBarHovered && (
                        <AnimatedCard>{route.name}</AnimatedCard>
                      )}
                    </li>
                  )
                )}
              </ul>
              {processedRoutesServices.length === 0 ? null : (
                <div className={classes.products}>Services</div>
              )}
              <ul>
                {processedRoutesServices.map(({ Icon, ...route }) =>
                  route.childRoutes?.length ? (
                    <div key={route.id}>
                      <li
                        className={
                          activeRoute === route.id ? classes.Active : ""
                        }
                        onClick={() =>
                          setExpandedRoute((prev) =>
                            prev === route.name ? null : route.name
                          )
                        }
                      >
                        <Icon
                          className={
                            activeRoute === route.id
                              ? classes.MenuIcon
                              : classes.MenuRed
                          }
                        />
                        {sideBarHovered && (
                          <AnimatedCard className={classes.parentList}>
                            <div>{route.name}</div>
                            {expandedRoute === route.name ? (
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.5 16.3257L12 8.82567L19.5 16.3257"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.5 8.82567L12 16.3257L4.5 8.82567"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}
                          </AnimatedCard>
                        )}
                      </li>
                      {sideBarHovered && expandedRoute === route.name && (
                        <AnimatedCard className={classes.childRoutesContainer}>
                          {route.childRoutes?.map(
                            (child) =>
                              child.arr == "1" && (
                                <li
                                  onClick={() =>
                                    handleChildRouteChange(route, child)
                                  }
                                  className={classes.submenu}
                                >
                                  {sideBarHovered && <div>- {child.name}</div>}
                                </li>
                              )
                          )}
                        </AnimatedCard>
                      )}
                    </div>
                  ) : (
                    <li
                      key={route.id}
                      onClick={() => handleRouteChange(route)}
                      className={activeRoute === route.id ? classes.Active : ""}
                    >
                      <Icon
                        className={
                          activeRoute === route.id
                            ? classes.MenuIcon
                            : classes.MenuRed
                        }
                      />
                      {sideBarHovered && (
                        <AnimatedCard>{route.name}</AnimatedCard>
                      )}
                    </li>
                  )
                )}
              </ul>
              {processedRoutesSettings.length === 0 ? null : (
                <div className={classes.products}>Settings</div>
              )}
              <ul>
                {processedRoutesSettings.map(({ Icon, ...route }) =>
                  route.childRoutes?.length ? (
                    <div key={route.id}>
                      <li
                        className={
                          activeRoute === route.id ? classes.Active : ""
                        }
                        onClick={() =>
                          setExpandedRoute((prev) =>
                            prev === route.name ? null : route.name
                          )
                        }
                      >
                        <Icon
                          className={
                            activeRoute === route.id
                              ? classes.MenuIcon
                              : classes.MenuRed
                          }
                        />
                        {sideBarHovered && (
                          <AnimatedCard className={classes.parentList}>
                            <div>{route.name}</div>
                            {expandedRoute === route.name ? (
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.5 16.3257L12 8.82567L19.5 16.3257"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.5 8.82567L12 16.3257L4.5 8.82567"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}
                          </AnimatedCard>
                        )}
                      </li>
                      {sideBarHovered && expandedRoute === route.name && (
                        <AnimatedCard className={classes.childRoutesContainer}>
                          {route.childRoutes?.map(
                            (child) =>
                              child.arr == "1" && (
                                <li
                                  onClick={() =>
                                    handleChildRouteChange(route, child)
                                  }
                                  className={classes.submenu}
                                >
                                  {sideBarHovered && <div>- {child.name}</div>}
                                </li>
                              )
                          )}
                        </AnimatedCard>
                      )}
                    </div>
                  ) : (
                    <li
                      key={route.id}
                      onClick={() => handleRouteChange(route)}
                      className={activeRoute === route.id ? classes.Active : ""}
                    >
                      <Icon
                        className={
                          activeRoute === route.id
                            ? classes.MenuIcon
                            : classes.MenuRed
                        }
                      />
                      {sideBarHovered && (
                        <AnimatedCard>{route.name}</AnimatedCard>
                      )}
                    </li>
                  )
                )}
              </ul>
              <div className={classes.buttonLogout}>
              <Button onClick={handleLogout}>Logout</Button>
              </div>
             
            </div>
          </div>
        
 
        <div />
      </div>
      {/* Laptop */}
      <div id="mySidebar" className={`${classes.Sidebar} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
        <div className={classes.MenuItems}>
          {/* <div className={classes.products}>Products</div> */}
          <ul>
            {processedRoutes.map(({ Icon, ...route }) =>
              route.childRoutes?.length ? (
                <div key={route.id}>
                  <li
                    // className={activeRoute === route.id ? classes.Active : ""}
                    className={activeRoute === route.id ? `${classes.Active} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`:""}
                    onClick={() =>
                      setExpandedRoute((prev) =>
                        prev === route.name ? null : route.name
                      )
                    }
                  >
                    <Icon
                      className={
                        activeRoute === route.id
                          ? classes.MenuIcon
                          : classes.MenuRed
                      }
                    />
                    {sideBarHovered && (
                      <AnimatedCard className={classes.parentList}>
                        <div>{route.name}</div>
                        <img
                          className={classes.expandIcon}
                          src={
                            expandedRoute === route.name
                              ? ChevronUp
                              : ChevronDown
                          }
                          alt=""
                        />
                      </AnimatedCard>
                    )}
                  </li>
                  {sideBarHovered && expandedRoute === route.name && (
                    <AnimatedCard className={classes.childRoutesContainer}>
                      {route.childRoutes?.map(
                        (child) =>
                          //  child.arr=="1" && <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>- {child.name}</div>}</li>
                          child.arr == "1" && (
                            // <li
                            //   onClick={() =>
                            //     handleChildRouteChange(route, child)
                            //   }
                            //   className={
                            //     selectedChildRoute === child.id
                            //       ? classes.childList
                            //       : ""
                            //   }
                            // >
                            //   {sideBarHovered && (
                            //     <div
                            //       className={
                            //         selectedChildRoute === child.name
                            //           ? classes.SelectedChild
                            //           : ""
                            //       }
                            //     >
                            //       {" "}
                            //       - {child.name}
                            //     </div>
                            //   )}
                            // </li>
                            <li
                              onClick={() =>
                                handleChildRouteChange(route, child)
                              }
                              style={{
                                backgroundColor:
                                  selectedChildRoute === child.id ? "" : "",
                                fontSize:
                                  selectedChildRoute === child.id
                                    ? "0.8rem"
                                    : "",
                                color:
                                  selectedChildRoute === child.id
                                    ? "#FFDE24"
                                    : "",

                                textDecorationLine:
                                  selectedChildRoute === child.id
                                    ? "underline"
                                    : "",
                                textUnderlinePosition:
                                  selectedChildRoute === child.id
                                    ? "under"
                                    : "",
                                textDecorationThickness:
                                  selectedChildRoute === child.id ? "2px" : "",
                                // Add any other styles you want for the active state
                              }}
                            >
                              {sideBarHovered && (
                                <div
                                  style={{
                                    fontWeight:
                                      selectedChildRoute === child.name
                                        ? "bold"
                                        : "normal",
                                    // Add any other styles you want for the active state
                                  }}
                                >
                                  {" "}
                                  - {child.name}
                                </div>
                              )}
                            </li>
                          )
                      )}
                    </AnimatedCard>
                  )}
                </div>
              ) : (
                <li
                  key={route.id}
                  onClick={() => handleRouteChange(route)}
                  className={activeRoute === route.id ? classes.Active : ""}
                >
                  <Icon
                    className={
                      activeRoute === route.id
                        ? classes.MenuIcon
                        : classes.MenuRed
                    }
                  />
                  {sideBarHovered && <AnimatedCard>{route.name}</AnimatedCard>}
                </li>
              )
            )}
          </ul>
        </div>
        <div id="mySidebar" className={`${classes.SidebarService} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
          <div className={classes.MenuItems}>
            {processedRoutesServices.length === 0 ? null : (
              <div className={classes.products}>Services</div>
            )}

            <ul>
              {processedRoutesServices.map(({ Icon, ...route }) =>
                route.childRoutes?.length ? (
                  <div key={route.id}>
                    <li
                      className={activeRoute === route.id ? classes.Active : ""}
                      onClick={() =>
                        setExpandedRoute((prev) =>
                          prev === route.name ? null : route.name
                        )
                      }
                    >
                      <Icon
                        className={
                          activeRoute === route.id
                            ? classes.MenuIcon
                            : classes.MenuRed
                        }
                      />
                      {sideBarHovered && (
                        <AnimatedCard className={classes.parentList}>
                          <div>{route.name}</div>
                          <img
                            className={classes.expandIcon}
                            src={
                              expandedRoute === route.name
                                ? ChevronUp
                                : ChevronDown
                            }
                            alt=""
                          />
                        </AnimatedCard>
                      )}
                    </li>
                    {sideBarHovered && expandedRoute === route.name && (
                      <AnimatedCard className={classes.childRoutesContainer}>
                        {route.childRoutes?.map(
                          (child) =>
                            //  child.arr=="1" && <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>- {child.name}</div>}</li>
                            child.arr == "1" && (
                              <li
                                onClick={() =>
                                  handleChildRouteChange(route, child)
                                }
                                style={{
                                  backgroundColor:
                                    selectedChildRoute === child.id ? "" : "",
                                  fontSize:
                                    selectedChildRoute === child.id
                                      ? "0.8rem"
                                      : "",
                                  color:
                                    selectedChildRoute === child.id
                                      ? "#FFDE24"
                                      : "",

                                  textDecorationLine:
                                    selectedChildRoute === child.id
                                      ? "underline"
                                      : "",
                                  textUnderlinePosition:
                                    selectedChildRoute === child.id
                                      ? "under"
                                      : "",
                                  textDecorationThickness:
                                    selectedChildRoute === child.id
                                      ? "2px"
                                      : "",
                                  // Add any other styles you want for the active state
                                }}
                              >
                                {sideBarHovered && (
                                  <div
                                    className={
                                      selectedChildRoute === child.id
                                        ? classes.SelectedChild
                                        : ""
                                    }
                                  >
                                    {" "}
                                    - {child.name}
                                  </div>
                                )}
                              </li>
                            )
                        )}
                      </AnimatedCard>
                    )}
                  </div>
                ) : (
                  <li
                    key={route.id}
                    onClick={() => handleRouteChange(route)}
                    className={activeRoute === route.id ? classes.Active : ""}
                  >
                    <Icon
                      className={
                        activeRoute === route.id
                          ? classes.MenuIcon
                          : classes.MenuRed
                      }
                    />
                    {sideBarHovered && (
                      <AnimatedCard>{route.name}</AnimatedCard>
                    )}
                  </li>
                )
              )}
            </ul>
            {processedRoutesSettings.length === 0 ? null : (
              <div className={classes.products}>Settings</div>
            )}
            <ul>
              {processedRoutesSettings.map(({ Icon, ...route }) =>
                route.childRoutes?.length ? (
                  <div key={route.id}>
                    <li
                      className={activeRoute === route.id ? classes.Active : ""}
                      onClick={() =>
                        setExpandedRoute((prev) =>
                          prev === route.name ? null : route.name
                        )
                      }
                    >
                      <Icon
                        className={
                          activeRoute === route.id
                            ? classes.MenuIcon
                            : classes.MenuRed
                        }
                      />
                      {sideBarHovered && (
                        <AnimatedCard className={classes.parentList}>
                          <div>{route.name}</div>
                          <img
                            className={classes.expandIcon}
                            src={
                              expandedRoute === route.name
                                ? ChevronUp
                                : ChevronDown
                            }
                            alt=""
                          />
                        </AnimatedCard>
                      )}
                    </li>
                    {sideBarHovered && expandedRoute === route.name && (
                      <AnimatedCard className={classes.childRoutesContainer}>
                        {route.childRoutes?.map(
                          (child) =>
                            //  child.arr=="1" && <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>- {child.name}</div>}</li>
                            child.arr == "1" && (
                              <li
                                onClick={() =>
                                  handleChildRouteChange(route, child)
                                }
                                className={
                                  selectedChildRoute === child.id
                                    ? classes.childList
                                    : ""
                                }
                              >
                                {sideBarHovered && (
                                  <div
                                    className={
                                      selectedChildRoute === child.id
                                        ? classes.SelectedChild
                                        : ""
                                    }
                                  >
                                    {" "}
                                    - {child.name}
                                  </div>
                                )}
                              </li>
                            )
                        )}
                      </AnimatedCard>
                    )}
                  </div>
                ) : (
                  <li
                    key={route.id}
                    onClick={() => handleRouteChange(route)}
                    className={activeRoute === route.id ? classes.Active : ""}
                  >
                    <Icon
                      className={
                        activeRoute === route.id
                          ? classes.MenuIcon
                          : classes.MenuRed
                      }
                    />
                    {sideBarHovered && (
                      <AnimatedCard>{route.name}</AnimatedCard>
                    )}
                  </li>
                )
              )}
            </ul>
            <div className={classes.sidebarImage}>
              <img
                className={classes.lefttitlelogo}
                src={SidebarImageIcon}
                alt="sidebarImage"
              />
              {/* {userType == "corporate" ? (
                <div className={classes.experience}>
                  Experience Corporate Banking
                </div>
              ) : (
                <div className={classes.experience}>
                  Experience Personel Banking
                </div>
              )} */}
            </div>
            {/* <div style={{ textAlign: "center" }}>
              Version : {package_json.version}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
