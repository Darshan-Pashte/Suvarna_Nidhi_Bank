import classes from "../Login/Login.module.css";
import "./Login.css";
import React from "react";

import { useNavigate } from "react-router-dom";
import UPI from "../../assets/swiftcore_logo.svg";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import TextFieldForm from "../../components/common/textFieldForm";
import { useForm, Controller } from "react-hook-form";
import { errorMessages } from "../../components/utilities/formValidation";
import { Box, Grid, TextField } from "@mui/material";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { SET_USER } from "../../constants";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";
import { useEffect } from "react";
import styled from "styled-components";
import TextFieldFormNew from "../../components/common/textFieldFormNew";
import { Button } from "@mui/base";
import UpdatePassword from "./updatePasswordModal";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import headerLogo from "../../assets/headerLogo.png";
import loginBackground from "../../assets/loginBackground.png";
import LoginContainer1 from "./LoginContainer1";
import LoginContainerChild from "./LoginChildContainer";
import CorporateContainer from "./CorporateContainer";



const CorporateMain = () => {

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";


  return (
    <>
      <div className={classes.mainpagewithbackCorporate}>
        <div className={classes.mainfile}>
          <Box
            className={classes.box}
            // component="form"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.textcontainer}>
              <div className={classes.uppertext}>Login to Corporate Banking</div>
            </div>

            <div className="container-child">
              <ul className="tab-list" style={{ display: 'flex', justifyContent: 'center' }}>
                <li
                  className={`tabs ${getActiveClass(1, "active-tabs-child")}`}
                  onClick={() => toggleTab(1)}
                >
                  Personal
                </li>
                <li
                  className={`tabs ${getActiveClass(2, "active-tabs-child")}`}
                  onClick={() => toggleTab(2)}
                >
                  Corporate
                </li>
              </ul>
            </div>
            {/* <div className={classes.tabBodyContent}> */}
              <div className="content-container">
                <div
                  className={`content ${getActiveClass(1, "active-content")}`}
                >
                  {/* <div className="container">
                    <ul className="tab-list">
                      <li style={{ fontSize: '15px' }}
                        className={`tabs ${getActiveClassLogin(1, "active-tabs")}`}
                        onClick={() => toggleTabLogin(1)}
                      >
                        Login ID/ Customer ID
                      </li>
                      <li style={{ fontSize: '15px' }}
                        className={`tabs ${getActiveClassLogin(2, "active-tabs")}`}
                        onClick={() => toggleTabLogin(2)}
                      >
                        Registered Mobile no
                      </li>
                    </ul>
                  </div> */}
                  
                  <LoginContainerChild/>
                </div>
                
                <div
                  className={`content ${getActiveClass(2, "active-content")}`}
                >
                           <CorporateContainer/>
                </div>
              </div>
            {/* </div> */}
           
          </Box>
        </div>
       
        <div className={classes.backgroundimglogin}>
          {/* <img src={loginBackground} alt="loginBackground" /> */}
        </div>
      </div>
    </>
  );
};

export default CorporateMain;
