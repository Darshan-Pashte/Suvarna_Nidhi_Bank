import classes from "../Login/Login.module.css";
import "./Login.css";
import React from "react";
import Tooltip from '@mui/material/Tooltip';
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
import {
  loginFailure,
  loginStart,
  loginSuccess,
  otpSuccess,
} from "../../store/authSlice";
import LoginContext from "./LoginContext";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from "../../constantStore/contstants";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
// import { SITE_KEY } from '../../constant/constant';
import { LoadingButton } from "@mui/lab";
import CryptoJS from 'crypto-js';
// import RefreshIcon from '@mui/icons-material/Refresh';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { FormControlLabel, Checkbox } from "@mui/material";
import virtual from '../../assets/images/commonforweb/Virtualkeyboard.svg';
import refreshicon from '../../assets/images/commonforweb/RefreshiconHome.svg';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { DataContext } from "../../context/LoaderContext";

const defaultFormData = {
  email: "",
  password: "",
  user_captcha_input: "",
  isMobileLinked: ""
};

const LoginContainer1 = ({captcha}) => {
  // const { bankName, portalAccess,setCaptcha ,captcha} = useContext(DataContext);
  const dispatch = useDispatch();
  const recaptchaRef = useRef(null);
  const { otpDisplay, setOtp, setResponse } = useContext(LoginContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setloading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const user = useSelector((state) => state.user);

  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);


  

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);


  const handleFocus = (field) => {
    setActiveField(field);
    setKeyboardVisible(true);
    // setIsKeyboardVisible(true)
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
    console.log("event",event)
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

  console.log("email", watch("email"))

  useEffect(() => {
    handleFocus('email')
  }, [])

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
  //   const payload = {
  //     username: data.email,
  //     password: data.password,
  //   };
  //   // const response = await postApiData(apiList.LOGIN, payload);
  //   // console.log("response", response);
  //   // setUserId(data?.email);
  //   // if (response.status == false) {
  //   //   if (response.respCode == "NEW") {
  //   //     handleOpen();
  //   //   } else {
  //   //     popupAlert(response.message, "Error", "error");
  //   //   }
  //   // } else {
  //     // dispatchSetUser({
  //     //   user: data?.email,
  //     //   token: response?.data?.sessionId,
  //     //   username: data?.email,
  //     // });
  //     sessionStorage.setItem("TOKEN", JSON.stringify("shgdfdfbhdfmdsbfmdsf"));
  //     sessionStorage.setItem("menu", "111111111111111111111111111111111111111111111111111111111");
  //     sessionStorage.setItem("lastLogin", "08-Nov-2023");

  //     // sessionStorage.setItem("username", JSON.stringify(data.email));
  //     navigate("/dashboard");
  //     // navigate("/dashboard",{ state: { username: data.email} });
  //   // }
  //   // if (window.location.href.includes("/dashboard")) {
  //   //   window.location.reload();
  //   // }
  // };

  useEffect(() => {
    // Load the CAPTCHA engine with 6 characters
    console.log("useEFFEct Captcha Internet");
    
    captcha && loadCaptchaEnginge(6);
  }, [captcha]);

  const onSubmit = async (data) => {
    setloading(true);
    recaptchaRef && recaptchaRef?.current?.reset();
    let tempToken = await recaptchaRef?.current?.executeAsync();

    const userCaptchaValue = document.getElementById('user_captcha_input').value;
    // if (validateCaptcha(userCaptchaValue)) {
    //     alert('Captcha Matched');
    // } else {
    //     alert('Captcha Does Not Match');
    // }
    if (validateCaptcha(userCaptchaValue)) {
      try {
        dispatch(loginStart());
        const hash = CryptoJS.SHA256(data.email + data.password + "netbanking").toString(CryptoJS.enc.Hex);
        console.log("hash", hash);
        const payload = {
          custNo: data.email,
          password: hash,
        };

        const response = await postApiData(apiList.LOGIN, payload);
        // console.log(response);
        if (response?.status == true) {
          setUserId(data.email);
          sessionStorage.setItem(
            "menu",
            "011111111001111111111111111111111111111111111111"
          );
          setOtp(true);
          dispatch(otpSuccess(data.email));
          setloading(false);
          setResponse(response)
          loadCaptchaEnginge(6)
          setValue("user_captcha_input", "")
        } else {
          dispatch(loginFailure(response.message));
          loadCaptchaEnginge(6)
          setValue("user_captcha_input", "")
          SweetAlertPopup(response.message, "Error", "error");
          setloading(false);
          reset()
        }
      } catch (error) {
        dispatch(loginFailure("An error occurred"));
        loadCaptchaEnginge(6)
        setValue("user_captcha_input", "")
        setloading(false);
      }
    } else {
      // console.log("Captcha Error");
      SweetAlertPopup("Invalid Captcha ", "Error", "error")
      setValue("user_captcha_input", "")
      setloading(false);
    }
  };

  const ColorButton1 = styled(LoadingButton)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    backgroundColor: "#183883",
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

  function handleSignup() {
    navigate("/auth/register");
  }

  function handleTerms() {
    navigate("/auth/termsconditions");
  }
  function handlePrivacyPolicy() {
    navigate("/auth/privacypolicy");
  }
  function handleDisclaimer() {
    navigate("/auth/disclaimer");
  }
  function handleMerchantPolicy() {
    navigate("/auth/merchantpolicy");
  }

  function handlesecuritytips() {
    navigate("/auth/securitytips");
  }



  function handleForgetPass() {
    navigate("/auth/forgetpassword")
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.headingEnter}>
              Please enter your details.
            </div>
            <div className={classes.firsttabinfo}>
              <Grid item xs={12} sm={8} md={12}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Login ID
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "email",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Login ID/Customer ID",

                        //   style: { width: "130%" },

                        fullWidth: true,
                        inputProps: { maxLength: 30 },
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      // backgroundColor= {true}
                      rules={{
                        required:
                          "Login ID " +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    /> */}
                    <Controller
                      name="email" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "Login ID " + errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value:
                        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[a-zA-Z\d@#$%^&+=!]{8,20}$/,
                        //   message: "Password does not meet requirements",
                        // },
                      }}
                      render={({ field, fieldState }) => {
                        const handleInputChange = (event) => {
                          // const regex = /^[a-zA-Z@#.&0-9*/]+$/;
                          const regex = /^[0-9]+$/;

                          // const regex = /^[a-zA-Z@#.*&0-9]$/;
                          const { name, value } = event.target;
                          const isValidInput =
                            regex.test(value) || value === "";

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
                              placeholder="Login ID/Customer ID"
                              type={"text"}
                              {...field}
                              onFocus={() => handleFocus('email')}
                              // onBlur={handleBlur}
                              inputProps={{
                                // minLength: 8, // Minimum length
                                maxLength: 30, // Maximum length
                              }}// Spread the 'field' props to bind it to the form's state
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
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              onChange={handleInputChange}
                            // error={field.error} // Pass the error state here
                            // helperText={passwordError ? "Password does not meet requirements" : ""}
                            />
                            {isKeyboardVisible && activeField === 'email' && (
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

              <Grid item xs={12} sm={8} md={12} >
                <div className={classes.passwordvirtual} >
                  <div className={classes.widthtfields} >
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
                          //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[a-zA-Z\d@#$%^&+=!]{8,20}$/,
                          //   message: "Password does not meet requirements",
                          // },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,20}$/,
                            message: "Password does not meet requirements",
                          },
                        }}
                        render={({ field, fieldState }) => {
                          const handleInputChange = (event) => {
                            // const regex = /^[a-zA-Z@#.&0-9*/]+$/;
                            const regex = /^[a-zA-Z0-9!@#$^&*._|-]+$/;

                            // const regex = /^[a-zA-Z@#.*&0-9]$/;
                            const { name, value } = event.target;
                            const isValidInput =
                              regex.test(value) || value === "";

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
                                {...field}
                                inputProps={{
                                  minLength: 8, // Minimum length
                                  maxLength: 20, // Maximum length
                                }}// Spread the 'field' props to bind it to the form's state
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
                                // onBlur={handleBlur}
                                // onFocus={() => {
                                //   return  watch("isMobileLinked") &&
                                //     <div className={classes.keyboardlayout}>
                                //       <Keyboard
                                //         keyboardRef={(r) => field.ref(r)}
                                //         inputName={inputName}
                                //         layoutName={layoutName}
                                //         onChange={(input) => field.onChange(input)}
                                //         onKeyPress={onKeyPress}
                                //       />
                                //     </div>
                                //   }
                                // }
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
                              {isKeyboardVisible && activeField === 'password' && (
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
                    <div className={classes.forgetPass}>
                      <span onClick={handleForgetPass} className={classes.register} >Forgot Password?
                      </span>
                    </div>
                  </div>
                  <div className={classes.virtualKeyboardss}>
                    {/* <div style={{ visibility: "hidden" }}>
                      gfvhdsds
                    </div> */}
                  
                  </div>
                </div>

              </Grid>

              {
                captcha &&
                

                  <Grid item xs={12} sm={6} md={6}>
                    <div className="captcha-container" style={{ width: "100%" }}>
                      <div className={classes.captchatext} style={{ display: "flex", width: "100%", flexDirection: "row", gap: "5px"}}>

                        <LoadCanvasTemplate style={{ width: '100%'}} className="reload-text" />
                        <div className="reload-icon" onClick={() => {
                          // Trigger reload function here
                          loadCaptchaEnginge(6); // Assuming this function reloads the captcha
                        }}>
                           <Tooltip title="Refresh">
                          <img style={{cursor:'pointer'}}
                         
                            src={refreshicon}
                            alt="Saving Account"
                         
                          />
                          </Tooltip>
                        </div>

                        <Tooltip title="Virtual Keyboard">
                        <div style={{cursor:'pointer'}} onClick={(e)=>handleCheckboxChange(e)}>
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
                          },
                          sx: {
                            "& fieldset": { border: "none" },
                            ".MuiInputBase-root": {
                              marginTop: '3px',
                              borderRadius: '6px',
                              position: 'relative',
                              backgroundColor: '#FFF',
                              border: "1px solid var(--For-stroke, #D6DAE1)", // Default border color
                              fontSize: '13px',
                              height: "2px",
                              color: '#888',
                              fontWeight: '500',
                              padding: '16px 0px',
                            },
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#D6DAE1", // Border color when focused
                              },
                              "&:hover fieldset": {
                                borderColor: "#D6DAE1", // Border color when hovered
                              },
                              "& fieldset": {
                                borderColor: "#D6DAE1", // Default border color
                              },
                            },
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



              <div className={classes.content}>By clicking ‘Login’, you acknowledge that you have reviewed<br /> & agree to our <span onClick={handleTerms} className={classes.termsspan} >
                {" "}Terms & conditions</span>,{" "}<span onClick={handlePrivacyPolicy} className={classes.termsspan}>Privacy Policy{" "}</span>,{" "}<span onClick={handleDisclaimer} className={classes.termsspan}>Disclaimer</span><br/>{" "}<span onClick={handleMerchantPolicy} className={classes.termsspan}>Merchant Policy</span> {" "} & <span onClick={handlesecuritytips} className={classes.termsspan}>
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

              {/* <label>
                <input
                  type="checkbox"
                  checked={isKeyboardVisible}
                  onChange={handleCheckboxChange}
                />
                Show Keyboard
              </label> */}
              <div className={classes.lasttext}>
                First time user ?{" "}
                <span onClick={handleSignup} className={classes.register} >
                  {" "}
                  Register here
                </span>
              </div>
              {/* <Grid item xs={12} sm={6} md={6}>
                <FormControlLabel
                  control={<Checkbox
                    onChange={handleCheckboxChange} checked={watch("isMobileLinked")} {...register("isMobileLinked")
                    }
                  />}
                  name="isMobileLinked"
                />

              </Grid> */}

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
       
      </div>
    </>
  );
};

export default LoginContainer1;
