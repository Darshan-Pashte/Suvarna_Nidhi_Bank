import classes from "../Register/Register.module.css";
import "./Register.css";
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
import RegisterContext from "./RegisterContext";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import { LoadingButton } from "@mui/lab";
import Loader from "../../components/common/loader";



const defaultFormData = {
  email: "",
  password: "",
};

const RegisterContainer1 = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const { otpDisplay, setOtp, custNo, setResponse } = useContext(RegisterContext);
  const [isLoading, setisLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsKeyboardVisible(event.target.checked);
  }

  function handleSignup() {
    navigate("/auth/login");
  }
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
  const handlleNavigate = (route) => {
    navigate(route);
  };
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

  function handleTerms() {
    navigate("/auth/termsconditions");
  }

  const onSubmit = async (data) => {
    setisLoading(true);
    const payload = {
      custNo: data.custno,
      regType: "mobile",
    };
    const response = await postApiData(apiList.REGISTER, payload);
    // console.log("Register Mobile", response);
    if (response?.status == true) {
      setisLoading(false);
      custNo(data.custno);
      setOtp(true);
      setResponse(response)
    } else {
      setisLoading(false);
      SweetAlertPopup(response?.message, "Error", "error");
    }
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
    fontSize: '15px',
    width: "123px",
    height: "32px",
    "&:hover": {
      background: "var(--button-hover-color)",
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

      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <div className={classes.mainpagewithback1}>

        <div className={classes.mainfile1}>
          <Box
            className={classes.boxsss} style={{ width: '100%' }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className={classes.regwithmobupper}>Please enter the customer number, we will send the OTP to registered mobile number
            </div>
            <div className={classes.firsttabinfoRegister} style={{ width: '95%' }}>
              <Grid item xs={12} sm={8} md={12} style={{ width: '100%' }}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Customer Number
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "custno",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Enter Customer Number",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // inputProps : {maxLength: 10}
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9]+$/}
                      rules={{
                        required:
                          "Customer Number" +
                          errorMessages.error_autocomplete_message,
                        pattern: {
                          // value: /^[0-9]{10}$/,
                          message: "Please Enter valid Customer Number",
                        },
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={12} style={{ width: '95%' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={isKeyboardVisible}
                    onChange={handleCheckboxChange}
                  />
                  <span className={classes.termsspanpara}> I accept the <span className={classes.termsspan} onClick={handleTerms}>Terms & Conditions</span> </span>
                </label>
              </Grid>
              <div className={classes.button}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  disabled={isKeyboardVisible ? false : true}
                  loading={isLoading}
                  sx={{
                    color: "#FFFFFF",
                    // color:'var(--button-color)',
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    backgroundColor: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "115px",
                    height: "32px",
                    "&:hover": {
                      // background: "#808080",
                      background: "var(--button-hover-color)",
                      color: "white",
                    },
                    '@media (max-width: 568px)': {
                      background: "var(--button-color)",
                      border: "1px solid #CCC",
                      borderRadius: "14px",
                      paddingLeft: "18px",
                      paddingRight: "18px",
                      width: "100%",
                      height: "38px",
                      // margin: "0px 10px 0px 10px"
                    },
                  }}
                >
                  Register
                </LoadingButton>
              </div>
              {/* <div className={classes.lasttext}>
                First time user ?{" "}
                <span onClick={handleSignup} className={classes.register} >
                  Login
                </span>
              </div> */}
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default RegisterContainer1;
