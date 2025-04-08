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
import { Box, Grid, TextField, Tooltip } from "@mui/material";
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
import { loginCorporate } from "../../store/authAction";
import { SITE_KEY, SITE_KEY_CORPORATE } from "../../constantStore/contstants";
import ReCAPTCHA from "react-google-recaptcha";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
// import { SITE_KEY } from '../../constant/constant';
import { LoadingButton } from "@mui/lab";
import { loginFailure, loginStart, loginStartCorporate, otpSuccess } from "../../store/authSlice";
import { useRef } from "react";
import UpdateOTP from "./updateOtpModal";
import OTPModal from "./otpModal";
import OtpCorporateModal from "./OtpCorporateModal";
import UpdateCorporatePassword from "./UpdateCorporatePassword";
import axios from "axios";
import SetNewPasswordOtpModal from "./SetNewPasswordOtpModal";
import CryptoJS from 'crypto-js';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { FormControlLabel, Checkbox } from "@mui/material";
import virtual from '../../assets/images/commonforweb/Virtualkeyboard.svg';
import refreshicon from '../../assets/images/commonforweb/RefreshiconHome.svg';
import { DataContext } from "../../context/LoaderContext";
const defaultFormData = {
  email: "",
  password: "",
  user_captcha_input: "",
  isMobileLinked: ""
};

const CorporateContainer = ({captcha}) => {
  const { bankName, portalAccess} = useContext(DataContext);

  // console.log("  captcha && ", captcha)
  const dispatch = useDispatch();

  const recaptchaRefCorporate = useRef(null);

  // console.log("recaptchaRefCorporate", recaptchaRefCorporate)


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [response, setResponse] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");

  const [loading, setloading] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);


  const dynamicLayout = () => {
    return {
      default: [
        [
          { label: 'A', key: 'a' },
          { label: 'B', key: 'b' },
          { label: 'C', key: 'c' },
        ],
        [
          { label: 'D', key: 'd' },
          { label: 'E', key: 'e' },
          { label: 'F', key: 'f' },
        ],
        // ...
      ],
      // Add more layouts as needed
      customLayout1: [
        [
          { label: 'X', key: 'x' },
          { label: 'Y', key: 'y' },
          { label: 'Z', key: 'z' },
        ],
        [
          { label: '1', key: '1' },
          { label: '2', key: '2' },
          { label: '3', key: '3' },
        ],
        // ...
      ],
    };
  };

  const handleFocus = (field) => {
    setActiveField(field);
    setKeyboardVisible(true);
  };


  const handleBlur = () => {
    setActiveField(null);
    setKeyboardVisible(false);
  };


  const onChange = (input) => {
    // setInput(input);
    setValue("email", watch("email"))
    console.log("Input changed", input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };



  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [layout, setLayout] = useState({
    default: [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      'z x c v b n m',
      '{enter} {bksp}',
    ],
  });

  const characters = 'qwertyuiopasdfghjklzxcvbnm!@#$%^&*()_+-={}:<>?`~|\\[];"\',./ ';
  const shuffleCharacters = () => {
    const charactersArray = characters.split('');
    for (let i = charactersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charactersArray[i], charactersArray[j]] = [charactersArray[j], charactersArray[i]];
    }
    return charactersArray.join('');
  };

  const handleCheckboxChange = (event) => {
    setIsKeyboardVisible(!isKeyboardVisible);
    if (event.target.checked) {
      // Shuffle the characters when the keyboard is visible
      const shuffledCharacters = shuffleCharacters();
      setLayout({
        default: [
          shuffledCharacters.slice(0, 1),
          shuffledCharacters.slice(1, 2),
          shuffledCharacters.slice(2, 3),
          shuffledCharacters.slice(3, 4),
          shuffledCharacters.slice(4, 5),
          shuffledCharacters.slice(5, 10),
          shuffledCharacters.slice(10, 14),
          shuffledCharacters.slice(10, 19),
          shuffledCharacters.slice(19, 26),
          shuffledCharacters.slice(0, 10),
          shuffledCharacters.slice(10, 19),
          shuffledCharacters.slice(19, 26),
          '{enter} {bksp}',
        ],
      });
    } else {
      // Reset the layout when the keyboard is hidden
      setLayout({
        default: [
          'q w e r t y u i o p',
          'a s d f g h j k l',
          'z x c v b n m',
          '{enter} {bksp}',
        ],
      });
    }
  };


  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(watch("email"));
  };

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

  console.log("portalAccess",portalAccess)
  useEffect(() => {
    // Load the CAPTCHA engine with 6 characters
    if(portalAccess=="All" || portalAccess=="Personal"){
      !captcha && loadCaptchaEnginge(6);
    }else if(portalAccess=="Corporate"){
      captcha && loadCaptchaEnginge(6);
    }
  }, [portalAccess=="All" ,portalAccess=="Personal",portalAccess=="Corporate",captcha]);

  // useEffect(() => {
  //   if (portalAccess === "All" || portalAccess === "Personal") {
  //     if (!captcha) {
  //       loadCaptchaEnginge(6);
  //     }
  //   } else if (portalAccess === "Corporate") {
  //     if (captcha != false && captcha != null && captcha !== undefined) {
  //       loadCaptchaEnginge(6);
  //     }
  //   }
  // }, [portalAccess, captcha]);

  // useEffect(() => {
  //   // Load the CAPTCHA engine with 6 characters
  //   if(portalAccess=="All" || portalAccess=="Personal"){
  //     !captcha && loadCaptchaEnginge(6);
  //   }
  // }, [portalAccess=="All" ,portalAccess=="Personal",!captcha]);

//  useEffect(() => {
//     // Load the CAPTCHA engine with 6 characters
//     if(portalAccess=="Corporate"){
//       captcha && loadCaptchaEnginge(6);
//     }
//   }, [portalAccess=="Corporate",captcha]);


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

  // const onSubmit = async (data) => {
  //   // dispatch(loginStart());

  //   const payload = {
  //     custNo: data.email,
  //     password: data.password,
  //   };
  //   // state.userType="personel";
  //   // state.user = "RAJHANS";
  //   sessionStorage.setItem("TOKEN", JSON.stringify("hsdfsd324sdfw784875882435724895"));
  //   sessionStorage.setItem("jwtToken", JSON.stringify("jhfhkw84jj454857345543"));
  //   // sessionStorage.setItem("menu", action.payload.menu);
  //   sessionStorage.setItem("menu", "10000000011000000000000000000000000");
  //   sessionStorage.setItem("lastLogin", "4644833");
  //   sessionStorage.setItem("customerName", JSON.stringify("RAJHANS"));
  //   sessionStorage.setItem("userId", JSON.stringify("userID"));
  //   navigate("/dashboard")
  //   // dispatch(loginCorporate(payload))
  // };
console.log("useriddddddddddd", userId)
  useEffect(() => {
    handleFocus('email')
  }, [])

  const onSubmitApi = async (data) => {
    setloading(true);

    recaptchaRefCorporate && recaptchaRefCorporate?.current?.reset();
    let tempToken = await recaptchaRefCorporate?.current?.executeAsync();
    const userCaptchaValue = document.getElementById('user_captcha_input').value;
    // recaptchaRef && recaptchaRef?.current?.reset();
    // let tempToken = await recaptchaRef?.current?.executeAsync();
    if (validateCaptcha(userCaptchaValue)) {
      try {
        dispatch(loginStartCorporate());
        const hash = CryptoJS.SHA256(data.domain + data.email + data.password + "netbanking").toString(CryptoJS.enc.Hex);
        console.log("hash", hash);
        const payload = {
          username: data.domain + data.email,
          password: hash,
        };
        const response = await postApiData(apiList.CORPORATELOGIN, payload);
        // console.log(response);
        if (response.status == false) {
          if (response.respCode == "NE") {
            setUserId(data.domain + data.email);
            handleOpenUpdate()
            reset()
            setloading(false);
            loadCaptchaEnginge(6)
            setValue("user_captcha_input", "")
          }
          else {
            SweetAlertPopup(response.message, "Error", "error")
            setloading(false);
            reset()
            loadCaptchaEnginge(6)
            setValue("user_captcha_input", "")
          }
        }
        else {
          setUserId(data.domain + data.email);
          setResponse(response)
          handleOpen()
          reset()
          loadCaptchaEnginge(6)
          setValue("user_captcha_input", "")
          setloading(false);
        }

        // if (response?.status == true) {
        //   setUserId(data.email);
        //   // sessionStorage.setItem(
        //   //   "menu",
        //   //   "10000000011000000000000000000000000"
        //   // );
        //   handleOpen()
        //   // setOtp(true);
        //   // dispatch(otpSuccess(data.email));
        //   setUserId(data.email)
        //   setloading(false);
        // } else {
        //   dispatch(loginFailure(response.message));
        //   SweetAlertPopup(response.message, "Error", "error");
        //   setloading(false);
        // }
      } catch (error) {
        dispatch(loginFailure("An error occurred"));
        setloading(false);
        loadCaptchaEnginge(6)
        setValue("user_captcha_input", "")
      }
    }
    else {
      // console.log("Captcha Error");
      SweetAlertPopup("Invalid Captcha ", "Error", "error")
      setValue("user_captcha_input", "")
      setloading(false);
      loadCaptchaEnginge(6)
    }
  };

  function handleSignup() {
    navigate("/auth/register");
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
    width: "123px",
    height: "32px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  function handleTerms() {
    navigate("/auth/termsconditions");
  }
  function handlePrivacyPolicy() {
    navigate("/auth/privacypolicy");
  }
  function handleDisclaimer() {
    navigate("/auth/disclaimer");
  }
  function handlesecuritytips() {
    navigate("/auth/securitytips");
  }
  const [valueTab, setValueTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  function handleForgetPass() {
    navigate("/auth/forgetpasswordcorporate")
  }
  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <>
      <div className={classes.mainpagewithback1}>
        <div className={classes.mainfile1}>
          <Box
            className={classes.box1}
            component="form"
            onSubmit={handleSubmit(onSubmitApi)}
          // style={{ margin: '-11px' }}
          >
            <div className={classes.headingEnter}>
              Please enter your details.
            </div>

            <div className={classes.firsttabinfo}  >
            <Grid item xs={12} sm={8} md={12} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Domain ID/Company ID
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "email",
                      }}
                      TextFieldProps={{
                        placeholder: "Please Enter Your User ID",
                        fullWidth: true,
                        inputProps: {
                          minLength: 3,
                          maxLength: 20
                        }
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "User ID " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    /> */}
                    <Controller
                      name="domain" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "Domain ID/Company ID " + errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value:
                        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[a-zA-Z\d@#$%^&+=!]{8,20}$/,
                        //   message: "Password does not meet requirements",
                        // },
                      }}
                      render={({ field, fieldState }) => {
                        const handleInputChange = (event) => {
                          // const regex = /^[a-zA-Z@#.&0-9*/]+$/;
                          const regex = /^[a-zA-Z0-9]+$/;

                          // const regex = /^[a-zA-Z@#.*&0-9]$/;
                          const { name, value } = event.target;
                          const isValidInput =
                            regex.test(value) || value === "";

                          if (!isValidInput) {
                            event.preventDefault();
                            return;
                          }

                          const uppercaseValue = value.toUpperCase();

                          field.onChange(uppercaseValue);
                        };


                        return (
                          <>
                            <TextField
                              id="standard-adornment-password"
                              fullWidth="true"
                              placeholder="Your User ID"
                              type={"text"}
                              {...field}
                              onFocus={() => handleFocus('domain')}
                              // onBlur={handleBlur}
                              inputProps={{
                                minLength: 1,
                                maxLength: 10
                              }}
                              sx={{
                                "& fieldset": { border: "none" },
                                ".MuiInputBase-root": {
                                  borderRadius: "6px",
                                  height: "35px",
                                  //   backgroundColor: "rgb(238, 239, 247)",
                                  backgroundColor: "#FFF",
                                  fontSize: '13px',
                                  border: "1px solid var(--For-stroke, #D6DAE1)",
                                  color: '#888',
                                  fontWeight: '500',
                                  border: '1px solid var(--For-stroke, #D6DAE1);',
                                  //   width:'130%'
                                },
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              onChange={handleInputChange}
                            // error={field.error} // Pass the error state here
                            // helperText={passwordError ? "Password does not meet requirements" : ""}
                            />
                            { isKeyboardVisible && activeField === 'domain' && (
                              <div className={classes.keyboardlayout}>
                                <Keyboard
                                  // layout={layout}
                                  keyboardRef={(r) => field.ref(r)}
                                  inputName="domain"
                                  layoutName={layoutName}
                                  // onChange={(input) => {
                                  //   console.log("input", input);
                                  //   const regex = /^[a-zA-Z0-9]+$/;
                                  //   const isValidInput = regex.test(input) || input === "";

                                  //   if (isValidInput) {
                                  //     const lastValidChar = input[input.length - 1]; // get the last character typed
                                  //     const newInputValue = field.value + lastValidChar; // concatenate the new valid character
                                  //     field.onChange(newInputValue); // update input field value
                                  //   }
                                  // }}
                                  onChange={(input) => field.onChange(input)}
                                  onKeyPress={onKeyPress}
                                />
                              </div>
                            )}
                            {/* {
                              watch("isMobileLinked") &&
                              <div className={classes.keyboardlayout}>
                                <Keyboard
                                  keyboardRef={(r) => field.ref(r)}
                                  inputName={inputName}
                                  layoutName={layoutName}
                                  onChange={(input) => field.onChange(input)}
                                  onKeyPress={onKeyPress}
                                />
                              </div>
                            } */}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={8} md={12} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    User ID
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "email",
                      }}
                      TextFieldProps={{
                        placeholder: "Please Enter Your User ID",
                        fullWidth: true,
                        inputProps: {
                          minLength: 3,
                          maxLength: 20
                        }
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "User ID " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    /> */}
                    <Controller
                      name="email" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "User ID " + errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value:
                        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[a-zA-Z\d@#$%^&+=!]{8,20}$/,
                        //   message: "Password does not meet requirements",
                        // },
                      }}
                      render={({ field, fieldState }) => {
                        const handleInputChange = (event) => {
                          // const regex = /^[a-zA-Z@#.&0-9*/]+$/;
                          const regex = /^[a-zA-Z0-9]+$/;

                          // const regex = /^[a-zA-Z@#.*&0-9]$/;
                          const { name, value } = event.target;
                          const isValidInput =
                            regex.test(value) || value === "";

                          if (!isValidInput) {
                            event.preventDefault();
                            return;
                          }

                          const uppercaseValue = value.toUpperCase();

                          field.onChange(uppercaseValue);
                        };


                        return (
                          <>
                            <TextField
                              id="standard-adornment-password"
                              fullWidth="true"
                              placeholder="Your User ID"
                              type={"text"}
                              {...field}
                              onFocus={() => handleFocus('email')}
                              // onBlur={handleBlur}
                              inputProps={{
                                minLength: 3,
                                maxLength: 20
                              }}
                              sx={{
                                "& fieldset": { border: "none" },
                                ".MuiInputBase-root": {
                                  borderRadius: "6px",
                                  height: "35px",
                                  //   backgroundColor: "rgb(238, 239, 247)",
                                  backgroundColor: "#FFF",
                                  fontSize: '13px',
                                  border: "1px solid var(--For-stroke, #D6DAE1)",
                                  color: '#888',
                                  fontWeight: '500',
                                  border: '1px solid var(--For-stroke, #D6DAE1);',
                                  //   width:'130%'
                                },
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              onChange={handleInputChange}
                            // error={field.error} // Pass the error state here
                            // helperText={passwordError ? "Password does not meet requirements" : ""}
                            />
                            { isKeyboardVisible && activeField === 'email' && (
                              <div className={classes.keyboardlayout}>
                                <Keyboard
                                  // layout={layout}
                                  keyboardRef={(r) => field.ref(r)}
                                  inputName="email"
                                  layoutName={layoutName}
                                  // onChange={(input) => {
                                  //   console.log("input", input);
                                  //   const regex = /^[a-zA-Z0-9]+$/;
                                  //   const isValidInput = regex.test(input) || input === "";

                                  //   if (isValidInput) {
                                  //     const lastValidChar = input[input.length - 1]; // get the last character typed
                                  //     const newInputValue = field.value + lastValidChar; // concatenate the new valid character
                                  //     field.onChange(newInputValue); // update input field value
                                  //   }
                                  // }}
                                  onChange={(input) => field.onChange(input)}
                                  onKeyPress={onKeyPress}
                                />
                              </div>
                            )}
                            {/* {
                              watch("isMobileLinked") &&
                              <div className={classes.keyboardlayout}>
                                <Keyboard
                                  keyboardRef={(r) => field.ref(r)}
                                  inputName={inputName}
                                  layoutName={layoutName}
                                  onChange={(input) => field.onChange(input)}
                                  onKeyPress={onKeyPress}
                                />
                              </div>
                            } */}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={12} >
                <div className={classes.passwordvirtual}>
                  <div className={classes.widthtfields}>
                    <div className={classes.frowtextaff}>
                      Password
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "password",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        type : "password",
                        placeholder: "Please Enter Password",
                        // style: { width: "33vw" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z@#.&0-9]+$/}
                      rules={{
                        required:
                          "Password " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                      icon={<RemoveRedEye />}
                    /> */}
                      <Controller
                        name="password" // The name should match the key in 'data' object in onSubmit
                        control={control}
                        defaultValue="" // Set an initial value if needed
                        rules={{
                          required:
                            "Password " + errorMessages.error_autocomplete_message,
                          // pattern: {
                          //   value:
                          //     // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!$])[a-zA-Z\d@#$%^&+=!$]{8,16}$/,
                          //     /^[a-zA-Z0-9!@#$^&*._|-]{8,20}$/,
                          //   message: "Password does not meet requirements",
                          //   // message: <b>Password must contain at least 1 lowercase letter</b>, <b></b>, 1 digit, 1 special character, and be between 8 and 16 characters in length.",
                          // },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,20}$/,
                            message: "Password does not meet requirements",
                          },
                        }}
                        render={({ field, fieldState }) => {
                          const handleInputChange = (event) => {
                            // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                            // const regex = /^[a-zA-Z$@#.&0-9*/-]+$/;
                            const regex = /^[a-zA-Z0-9!@#$^&*._|-]+$/;
                            const { name, value } = event.target;
                            const isValidInput = regex.test(value) || value === "";

                            if (!isValidInput) {
                              event.preventDefault();
                              return;
                            }

                            field.onChange(value);
                          };

                          return (
                            <>
                              <TextField
                                id="standard-adornment-password"
                                fullWidth="true"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                {...field} // Spread the 'field' props to bind it to the form's state
                                inputProps={{
                                  minLength: 8, // Minimum length
                                  maxLength: 20, // Maximum length
                                }}

                                sx={{
                                  "& fieldset": { border: "none" },
                                  ".MuiInputBase-root": {
                                    borderRadius: "6px",
                                    height: "35px",
                                    //   backgroundColor: "rgb(238, 239, 247)",
                                    backgroundColor: "#FFF",
                                    fontSize: '13px',
  
                                    color: '#888',
                                    fontWeight: '500',
                                    border: '1px solid var(--For-stroke, #D6DAE1);',
                                    //   width:'130%'
                                  },
                                }}
                                onFocus={() => handleFocus('password')}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={handleInputChange}
                              // error={field.error} // Pass the error state here
                              // helperText={passwordError ? "Password does not meet requirements" : ""}
                              />
                              { isKeyboardVisible && activeField === 'password' && (
                                <div className={classes.keyboardlayout}>
                                  <Keyboard
                                    keyboardRef={(r) => field.ref(r)}
                                    inputName="password"
                                    layoutName={layoutName}
                                    onChange={(input) => field.onChange(input)}
                                    onKeyPress={onKeyPress}
                                  />
                                </div>
                              )}
                            </>

                          );
                        }}
                      />
                    </div>
                    {/* <div className={classes.forgetPass}>
                    <a href="#">Forgot Password?</a>
                  </div> */}
                    <div className={classes.forgetPass}>
                      <span onClick={handleForgetPass} className={classes.register} >Forgot Password?
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>

              {
                // portalAccess=="All" || portalAccess=="Personal"? !captcha : captcha &&
                !captcha &&
                <Grid item xs={12} sm={6} md={6}>
                    <div className="captcha-container" style={{width:"100%"}}>
                      <div className={classes.captchatext} style={{display:"flex",width:"100%",flexDirection:"row",gap:"5px"}}>
                        
                        <LoadCanvasTemplate style={{width:'100%'}} className="reload-text"  />
                        <div className="reload-icon" onClick={() => {
                          // Trigger reload function here
                          loadCaptchaEnginge(6); // Assuming this function reloads the captcha
                        }}>
                           <Tooltip title="Refresh">
                           <img style={{cursor:'pointer'}}
                            // className={classes.iconImagesPaddingType1}
                            src={refreshicon}
                            alt="Saving Account"
                            // onClick={handlerefresh} 
                          />
                          </Tooltip>
                        </div>
                        <Tooltip title="Virtual Keyboard">
                        <div style={{cursor:'pointer'}} className={classes.boxvirtuals} onClick={(e)=>handleCheckboxChange(e)}>
                      <img src={virtual} alt='' />
                    </div>
                    </Tooltip>

                        {/* <RefreshIcon /> */}
                      </div>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "user_captcha_input",
                          id: "user_captcha_input"
                        }}
                        TextFieldProps={{
                          placeholder: "Type CAPTCHA Here",
                          fullWidth: true,
                          id: "user_captcha_input",
                          inputProps: {
                            minLength: 6,
                            maxLength: 6,
                          }
                        }}
                        sx={{
                          "& fieldset": { border: "none" },
                          ".MuiInputBase-root": {
                            marginTop: '3px',
                            borderRadius: '6px',
                            position: 'relative',
                            backgroundColor: '#FFF',
                            
                            border: "1px solid var(--For-stroke, #D6DAE1)",
                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                            fontSize: '13px',
                            height: "2px",
                            color: '#888',
                            fontWeight: '500',
                            padding: '16px 0px',

                          },
                        }}
                        id="user_captcha_input"
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required: "CAPTCHA" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </Grid>
              }
              {
                captcha &&
                <Grid item xs={12} sm={6} md={6}>
                    <div className="captcha-container" style={{width:"100%"}}>
                      <div className={classes.captchatext} style={{display:"flex",width:"100%",flexDirection:"row",gap:"5px"}}>
                        
                        <LoadCanvasTemplate style={{width:'100%'}} className="reload-text"  />
                        <div className="reload-icon" onClick={() => {
                          // Trigger reload function here
                          loadCaptchaEnginge(6); // Assuming this function reloads the captcha
                        }}>
                           <Tooltip title="Refresh">
                           <img style={{cursor:'pointer'}}
                            // className={classes.iconImagesPaddingType1}
                            src={refreshicon}
                            alt="Saving Account"
                            // onClick={handlerefresh} 
                          />
                          </Tooltip>
                        </div>
                        <Tooltip title="Virtual Keyboard">
                        <div style={{cursor:'pointer'}} className={classes.boxvirtuals} onClick={(e)=>handleCheckboxChange(e)}>
                      <img src={virtual} alt='' />
                    </div>
                    </Tooltip>

                        {/* <RefreshIcon /> */}
                      </div>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "user_captcha_input",
                          id: "user_captcha_input"
                        }}
                        TextFieldProps={{
                          placeholder: "Type CAPTCHA Here",
                          fullWidth: true,
                          id: "user_captcha_input",
                          inputProps: {
                            minLength: 6,
                            maxLength: 6,
                          }
                        }}
                        sx={{
                          "& fieldset": { border: "none" },
                          ".MuiInputBase-root": {
                            marginTop: '3px',
                            borderRadius: '6px',
                            position: 'relative',
                            backgroundColor: '#FFF',
                            
                            border: "1px solid var(--For-stroke, #D6DAE1)",
                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                            fontSize: '13px',
                            height: "2px",
                            color: '#888',
                            fontWeight: '500',
                            padding: '16px 0px',

                          },
                        }}
                        id="user_captcha_input"
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required: "CAPTCHA" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </Grid>
              }

              {/* <div style={{ visibility: 'hidden' }}>
                Forgot Password?

              </div> */}

<div className={classes.content}>By clicking ‘Login’, you acknowledge that you have reviewed<br /> & agree to our <span onClick={handleTerms} className={classes.termsspan} >
                {" "}Terms & conditions</span>,{" "}<span onClick={handlePrivacyPolicy} className={classes.termsspan}>Privacy Policy</span>,{" "}<span onClick={handleDisclaimer} className={classes.termsspan}>Disclaimer</span><br/>& <span onClick={handlesecuritytips} className={classes.termsspan}>
                  Tips for Safe Banking</span>
              </div>





              <div className={classes.button}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
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
                  }}
                >
                  Login
                </LoadingButton>
              </div>
              {/* <div className={classes.lasttext} style={{ visibility: "hidden" }}>
                First time user ?{" "}
                <span onClick={handleSignup} className={classes.register} >
                  {" "}
                  Register here
                </span>
              </div> */}
            </div>
            {/* <div style={{ visibility: 'hidden' }}>A</div> */}


            {/* <Grid item xs={12} sm={6} md={6}>
              <FormControlLabel
                control={<Checkbox
                  onChange={handleCheckboxChange} checked={watch("isMobileLinked")} {...register("isMobileLinked")
                  }
                />}
                name="isMobileLinked"
              />
              Use virtual keyboard
            </Grid> */}
            {/* <div className={classes.corporatelast}>
              Trouble logging in?
            </div>
            <div className={classes.corporatelast1}>
              <a href="#" style={{ textDecoration: 'none' }}>Get your logging details</a>
              <a href="#" style={{ textDecoration: 'none' }}>Get your logging details</a>
              <a href="#" style={{ textDecoration: 'none' }}>Get your logging details</a>
            </div> */}

            {open ? (
              <OtpCorporateModal
                open={open}
                handleClose={handleClose}
                userId={userId}
                response={response}
              />
            ) : null}
            {openUpdate ? (
              <SetNewPasswordOtpModal
                open={openUpdate}
                handleClose={handleCloseUpdate}
                userId={userId}
              />
            ) : null}
            {/* {
              !captcha && <ReCAPTCHA ref={recaptchaRefCorporate} size="invisible" sitekey={SITE_KEY} />

            } */}
          </Box>

        </div>
      </div>
    </>
  );
};

export default CorporateContainer;




