import classes from "../Login/Login.module.css";
import "./Login.css";
import React from "react";
import { useContext, useState } from "react";
import LoginContainer1 from "./LoginContainer1";
import RegisterContainer1 from "./RegisterContainer1";

const LoginContainerChild = ({captcha}) => {

    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";


    return (
        <>



            {/* <div className="container">
              <ul className="tab-list" style={{ display: 'flex', justifyContent: 'center' }}>
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
            </div> */}
            {/* <div className={classes.tabBodyContent}> */}
            {/* <div className="content-container"> */}
            <div className="container" style={{padding:"0px"}}>
                <ul className="tab-list">
                    <li style={{ fontSize: '14px' }}
                        className={`tabs ${getActiveClass(1, "active-tabs")}`}
                        onClick={() => toggleTab(1)}
                    >
                        {/* Login ID/ Customer ID */}
                    </li>
                    <li style={{ fontSize: '14px' }}
                        className={`tabs ${getActiveClass(2, "active-tabs")}`}
                        onClick={() => toggleTab(2)}
                    >
                        {/* Registered Mobile no */}
                    </li>
                </ul>
                {/* </div> */}
                {/* </div> */}
            </div>
            {/* </div> */}
            <div className="content-container">
                <div
                    className={`content ${getActiveClass(1, "active-content")}`}
                >
                    <LoginContainer1 captcha={captcha}/>
                </div>
                <div
                    className={`content ${getActiveClass(2, "active-content")}`}
                >
                    {/* <RegisterContainer1 /> */}
                    </div>
            </div>
        </>
    );
};

export default LoginContainerChild;
