import classes from "./ForgetPassword.module.css";

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
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import headerLogo from "../../assets/headerLogo.png";
import loginBackground from "../../assets/loginBackground.png";
// import RegisterContext from "./RegisterContext";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import ForgetPassOTP from "./ForgetPasswordOTPCorporate";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { LoadingButton } from "@mui/lab";
import Loader from "../../components/common/loader";
// import backgroundimage from "../../assets/images/backupImages/Bhagini/LoginBackgroundImage.svg";


const defaultFormData = {
  email: "",
  password: "",
  customerno : "",
};

const ForgetPasswordCorporate = () => {
  // const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
//   const { otpDisplay, setOtp, custNo } = useContext(RegisterContext);
const [backgroundImage, setBackgroundImage] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const bankNames = process.env.REACT_APP_FLAVOUR;

  useEffect(() => {
    const importedImage = async () => {
      const backgroundimage = await import(`../../assets/Banks/${bankNames}/images/LoginBackgroundImage.svg`);
      setBackgroundImage(backgroundimage.default);
    };
    importedImage(); 
  }, [bankNames]);

  const [isLoading, setisLoading] = useState(false);
  const [isloading, setloading] = useState(false);
    const [response, setResponse] = useState("");
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


// const onSubmit = async (data) => {
//     const payload = {
//       username : data?.domain + data?.customerno,
//     };
//     setloading(true);
//     const response = await postApiData(apiList.FORGOTPASSCORPORATE, payload);
//     // console.log("response", response);
//     if(response?.status == true){
//       handleOpen()    
//       setloading(false);
//       setResponse(response)
//       }
//       else{
//        SweetAlertPopup(response?.message , "Error", "error")
//         setloading(false);
//      }
      
//    }
const onSubmit = async (data) => {
  const username = data?.domain + data?.customerno; // Construct the username
  const payload = { username };
  setloading(true);

  const response = await postApiData(apiList.FORGOTPASSCORPORATE, payload);

  if (response?.status === true) {
    handleOpen();
    setloading(false);
    setResponse({ ...response, username }); // Include username in response
  } else {
    SweetAlertPopup(response?.message, "Error", "error");
    setloading(false);
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
    fontSize:'15px',
    width: "103px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));


  function handleLogin() {
    navigate("/auth/login");
  }

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
    {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.mainpagewithback}>
      <div className={classes.backgroundImage} >
          <img
            src={backgroundImage}
            alt="Saving Account"
            style={{ height: "100%" }}
          />
        </div>
        <div className={classes.box}>
        <span onClick={handleLogin} className={classes.loginbutton} >
        <KeyboardBackspaceIcon/>  Back to Login
                </span>
        <div className={classes.mainfile1}>
        <div className={classes.forgetpassheading}>
            Forgot Password
            </div>

            <div className={classes.forgetpassheadtext}>
           
            Please enter the Domain ID/Company ID, we will send the OTP to registered mobile number
            </div>
          <Box
            className={classes.box1} style={{width:'100%'}}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <div className={classes.firsttabinfo} style={{width:'100%'}} >
           
            <div className={classes.frowdataaff} style={{width:'95%'}}>
                  <div className={classes.frowtextaff}>
                 Domain ID/Company ID
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "domain",
                        rows: 3,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Domain ID/Comapny ID",
                          // style: { width: "120%" },
                        fullWidth: true,
                        // inputProps : {maxLength: 10}
                        inputProps:{
                          
                          minLength: 1, // Minimum length
                          maxLength: 10, // Maximum length
                        },
                        onInput: (e) => {
                          e.target.value = e.target.value.toUpperCase(); // Automatically convert to uppercase
                        },
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                    // backgroundColor={true}
                    rules={{
                      required:
                        "Domain ID/Company ID" +
                        errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value: /^[0-9]{10}$/,
                        //   message: "Please Enter valid Mobile Number",
                        // },
                    }}
                    required={true}
                    />
                  </div>
                </div>
                <div className={classes.frowdataaff} style={{width:'95%'}}>
                  <div className={classes.frowtextaff}>
                 User ID
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "customerno",
                        rows: 3,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "User ID",
                          // style: { width: "120%" },
                        fullWidth: true,
                        // inputProps : {maxLength: 10}
                        inputProps:{
                          minLength: 3, // Minimum length
                          maxLength: 20, // Maximum length
                        },
                     
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                    // backgroundColor={true}
                    rules={{
                      required:
                        "User ID" +
                        errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value: /^[0-9]{10}$/,
                        //   message: "Please Enter valid Mobile Number",
                        // },
                    }}
                    required={true}
                    />
                  </div>
                </div>
             
          
              <div className={classes.button}>
              <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isloading}
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
                    "@media (max-width: 568px)": {
                      background: "var(--button-color)",
                      border: "1px solid #CCC",
                      borderRadius: "14px",
                      paddingLeft: "18px",
                      paddingRight: "18px",
                      width: "95%",
                      height: "38px",
                    },
                  }}
                >
                  Send
                </LoadingButton>
              </div>
              
             
            </div>
          </Box>

          {open ? (
            <ForgetPassOTP
              open={open}
              handleClose={handleClose}
              custNo={response?.username}
              response={response}
            />
          ) : null}
        </div>
        </div>


      </div>
    </>
  );
};

export default ForgetPasswordCorporate;
