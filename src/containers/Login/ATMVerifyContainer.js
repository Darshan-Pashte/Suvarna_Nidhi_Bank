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

const defaultFormData = {
  email: "",
  password: "",
};

const ATMVerifyContainer = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });
  const navigate = useNavigate();
  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     popupAlert("Please Enter Valid Credentials", "Error", "error");
  //     dispatch(clearErrors());
  //   }

  //   if (isAuthenticated) {
  //     navigate("/dashboard")
  //   }
  // }, [dispatch, error, navigate, isAuthenticated,popupAlert]);
  // const { dispatch: authDispatch } = useContext(AuthContext);
  // const dispatchSetUser = (payload) => {
  //   authDispatch({ type: SET_USER, payload });
  // };
  // const [passwordInput, setPasswordInput] = useState('password');

  const onSubmit = async (data) => {
    const payload = {
      username: data.email,
      password: data.password,
    };
    // const response = await postApiData(apiList.LOGIN, payload);
    // console.log("response", response);
    // setUserId(data?.email);
    // if (response.status == false) {
    //   if (response.respCode == "NEW") {
    //     handleOpen();
    //   } else {
    //     popupAlert(response.message, "Error", "error");
    //   }
    // } else {
      // dispatchSetUser({
      //   user: data?.email,
      //   token: response?.data?.sessionId,
      //   username: data?.email,
      // });
      sessionStorage.setItem("TOKEN", JSON.stringify("shgdfdfbhdfmdsbfmdsf"));
      // sessionStorage.setItem("menu", "111111111111111111111111111111111111111111111111111111111");
      sessionStorage.setItem("lastLogin", "08-Nov-2023");

      // sessionStorage.setItem("username", JSON.stringify(data.email));
      navigate("/dashboard");
      // navigate("/dashboard",{ state: { username: data.email} });
    // }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
     background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const [valueTab, setValueTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <>
      <div className={classes.mainpagewithback}>
        <div className={classes.mainfile1}>
          <Box
            className={classes.box}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <div className={classes.firsttabinfo}>
            <div className={classes.textcontainer1}>
              <div className={classes.uppertext1}>Login to Internet Banking</div>
            </div>
                
                <div className={classes.verifysign}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
  <circle cx="30" cy="30" r="30" fill="#04E091"/>
  <path d="M42 22L25.5 38.5L18 31" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
ATM PIN Verified
                </div>
              <Grid item xs={12} sm={8} md={12} >
                <div className={classes.frowdataaff} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div className={classes.frowtextaff}>
                   Enter Four Digit OTP
                    {/* <sup className={classes.required}>*</sup> */}
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "email",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "OTP",
                        //   style: { width: "130%" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "OTP " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

             
             
            </div>
            <div className={classes.button}>
                <ColorButton1 variant="contained" type="submit">
                  Login
                </ColorButton1>
              </div>
              <div className={classes.lasttext}>
                First time user ? <a href="#"> Register here</a>
              </div>
              {open ? (
                <UpdatePassword
                  open={open}
                  handleClose={handleClose}
                  userId={userId}
                />
              ) : null}
          </Box>

        </div>

      </div>
    </>
  );
};

export default ATMVerifyContainer;
