import classes from "../Login/Login.module.css";
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
// import { clearErrors, login } from "../../actions/userActions";
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
import { login } from "../../store/authAction";
import { loginFailure, loginStart, loginSuccess, otpSuccess } from "../../store/authSlice";
import LoginContext from "./RegisterContext";
import DatePickerForm from "../../components/common/datePickerForm";
import { convertDate } from "../../components/utilities/convertDate";
import RegisterContext from "./RegisterContext";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import { SITE_KEY } from "../../constantStore/contstants";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import ReCAPTCHA from 'react-google-recaptcha';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const defaultFormData = {
  email: "",
  password: "",
  custno: '',
  cvv: '',
  cardno: ''
};

const LoginContainer1 = () => {
  const dispatch = useDispatch();
  const { otpDisplay, setOtp, custNo, setResponse } = useContext(RegisterContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const recaptchaRef = useRef(null)

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const user = useSelector(state => state.user);
  const [isLoading, setisLoading] = useState(false);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsKeyboardVisible(event.target.checked);
  }

  function handleTerms() {
    navigate("/auth/termsconditions");
  }

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

  const onSubmit = async (data) => {
    setisLoading(true)
    recaptchaRef && recaptchaRef?.current?.reset();
    let tempToken = await recaptchaRef?.current?.executeAsync();

    //  if(tempToken){
    try {
      dispatch(loginStart());

      const payload = {
        custNo: data.custno,
        regType: "debit",
        cardNo: data.cardno,
        cvv: data.cvv,
        expdate: convertDate(data.expdate, 10)
      };

      const response = await postApiData(apiList.REGISTER, payload);
      // console.log(response);
      if (response?.status == true) {
        custNo(data.custno);
        setOtp(true)
        setResponse(response)
        setisLoading(false)
      }
      else {
        SweetAlertPopup(response?.message, "Error", "error");
        setisLoading(false)

      }
    } catch (error) {
      //  console.log(error);
    }
    //  }else{
    //   setisLoading(false)

    //   // console.log("captch error")

    //  }
  };

  function handleSignup() {
    navigate("/auth/login");
  }

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
    height: "33px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  const [valueTab, setValueTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  // function handleSignup() {
  //   navigate('/auth/register');
  // }

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  function handleLogin() {
    navigate("/auth/login");
  }

  // console.log("From Date",convertDate(watch("fromDate")),10);
  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <>
      <div className={classes.mainpagewithback1}>
        <div className={classes.mainfile1}>

          <Box
            className={classes.boxsss}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.firsttabinfoRegister}>
              <Grid item xs={12} sm={12} md={12} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Customer No
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
                        placeholder: "Customer No",
                        //   style: { width: "130%" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Customer No " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={8} md={12} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Card No
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "cardno",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Card No",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        inputProps: { maxLength: 16 }
                      }}
                      regExp={/^[0-9]+$/}
                      rules={{
                        required:
                          "Card No" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={12} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    CVV
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "cvv",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        type: "password",
                        // label: "Branch",
                        placeholder: "CVV",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        inputProps: { maxLength: 3 }
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9]+$/}
                      rules={{
                        required:
                          "CVV" +
                          errorMessages.error_autocomplete_message,
                        pattern: {
                          value: /^[0-9]{3}$/,
                          message: "Please Enter valid CVV Format",
                        },
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>Expiry date<sup className={classes.required}>*</sup></div>
                  <DatePickerForm
                    controlerProps={{
                      control: control,
                      name: "expdate",
                    }}
                    TextFieldProps={{
                      //   fullWidth: true,
                      sx: {
                        width: "100%"
                      }
                    }}
                    DatePickerProps={{
                      // label: "From Date",
                      fullWidth: true,
                      views: ['month', 'year']

                    }}
                    monthyear={true}
                    required={false}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6} marginTop={2}>
                <label>
                  <input
                    type="checkbox"
                    checked={isKeyboardVisible}
                    onChange={handleCheckboxChange}
                  />
                  <span className="termsspanpara"> I accept the <span className="termsspan" onClick={handleTerms}>Terms & Conditions</span> </span>
                </label>
              </Grid>



              <div className={classes.button}>
                <LoadingButton
                  variant="contained"
                  disabled={isKeyboardVisible ? false : true}
                  type="submit"
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
                First time user ? <span onClick={handleSignup} className={classes.register} > Login</span>
              </div> */}
              {open ? (
                <UpdatePassword
                  open={open}
                  handleClose={handleClose}
                  userId={userId}
                />
              ) : null}
            </div>
          </Box>

        </div>
        {/* <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={SITE_KEY} /> */}
      </div>
    </>
  );
};

export default LoginContainer1;
