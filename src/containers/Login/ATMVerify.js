import classes from "../Login/Login.module.css";
import "./Login.css";
import React from "react";
import { useContext, useState } from "react";
import headerLogo from "../../assets/images/commonforweb/mahesh.png";
import LoginContainer from "./LoginContainer";
import FooterCommon from "./FooterCommon";
import CorporateMain from "./CorporateMain";
import ATMVerifyContainer from "./ATMVerifyContainer";

const ATMVerify = () => {

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <>
      <div className={classes.mainfullpage}>
        <div className={classes.header} >
          <div className={classes.leftlogo}>
            <img src={headerLogo} alt="headerLogo" />
          </div>
          <div className="container">
            <ul className="tab-list" style={{marginLeft:'20%',marginTop:'1%' }}>
              <li
                className={`tabs ${getActiveClass(1, "active-tabs")}`}
                onClick={() => toggleTab(1)}
              >
                Personal
              </li>
              <li
                className={`tabs ${getActiveClass(2, "active-tabs")}`}
                onClick={() => toggleTab(2)}
              >
                Corporate
              </li>
            </ul>
          </div>

        </div>
      
        <div className={classes.tabBodyContent}>
          <div className="content-container">
            <div
              className={`content ${getActiveClass(1, "active-content")}`}
            >
              <ATMVerifyContainer />
            </div>
            <div
              className={`content ${getActiveClass(2, "active-content")}`}
            >
              {/* <CorporateMain/> */}
            </div>
          </div>
       
        </div>
      <FooterCommon/>
      </div>
  
    </>
  );
};

export default ATMVerify;
