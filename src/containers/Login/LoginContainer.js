import classes from "../Login/Login.module.css";
import "./Login.css";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Modal, TextField } from "@mui/material";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { SET_USER } from "../../constants";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Button } from "@mui/base";
import LoginContainerChild from "./LoginChildContainer";
import CorporateContainer from "./CorporateContainer";
import LoginContext from "./LoginContext";
import TextFieldForm from "../../components/common/textFieldForm";
import { errorMessages } from "../../components/utilities/formValidation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { LoadingButton } from "@mui/lab";
import OTPInput from "react-otp-input";
import { useEffect } from "react";
import TimerComponent from "../../components/common/TimerComponent";
import { DataContext } from "../../context/LoaderContext";
// import Logo from "../../assets/images/backupImages/Bhagini/LoginLogo.svg";
// import backgroundimage from "../../assets/images/backupImages/Bhagini/LoginBackgroundImage.svg";
export default function LoginContainer() {
  const { bankName, portalAccess } = useContext(DataContext);
  const defaultFormData = {
    email: "",
    password: "",
  };

  const [ToggleState, setToggleState] = useState(1);
  const [captcha, setCaptcha] = useState(false);

  const { otpDisplay, setOtp, response } = useContext(LoginContext);
  const [otp, setotp] = useState("");
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [tries, setTries] = useState("");

  const [clearOtp, setClearOtp] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [logo, setlogo] = useState(null);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

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

  const bankNames = process.env.REACT_APP_FLAVOUR;
  const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
  console.log("bankContactInfo", bankContactInfo);
  useEffect(() => {
    const importedImage = async () => {
      const backgroundimage = await import(
        `../../assets/Banks/${bankNames}/images/LoginBackgroundImage.svg`
      );
      const Logo = await import(
        `../../assets/Banks/${bankNames}/images/LoginLogo.svg`
      );
      setBackgroundImage(backgroundimage.default);
      setlogo(Logo.default);
    };
    importedImage();
  }, [bankNames]);

  useEffect(() => {
    toggleTab(1);
  }, []);

  useEffect(() => {
    setotp("");
  }, [otpDisplay]);

  const handleFalse = () => {
    setOtp(false);
    setTries("");
    setOtp("");

    // window.location.reload();
  };

  const toggleTab = (index) => {
    // console.log("index",index)
    index == 1 ? setCaptcha(true) : setCaptcha(false);
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";
  const [loadings, setloading] = useState(false);

  // console.log("Otp", user);
  const onSubmits = async (data) => {
    setloading(true);
    const payload = {
      custNo: user,
      otp: otp,
    };
    const response = await postApiData(apiList.OTP, payload);
    if (response.status == true) {
      // popupAlert(response.message, "Success", "Password Updated Succesfully");
      dispatch(loginSuccess(response.data));
      setloading(false);
      setotp("");
      setClearOtp(true);
      reset();
    } else if (response.status == false) {
      if (response?.respCode == "OE") {
        SweetAlertPopup(response.message, "Error", "error");
        setloading(false);
        handleFocus();
        handleFalse();
        setClearOtp(true);
        reset();
        // window.location.reload();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setloading(false);
        handleFocus();
        setTries(response?.data?.otpAttempt + 1);
        // setOtp(false);
        setClearOtp(true);
        reset();
        // window.location.reload();
      }
    }
  };

  const handleFocus = () => {
    // Clear the input value on focus
    setotp("");
    setIsOtpEntered(false);
  };

  console.log("response", response);

  return (
    <>

      <div className={classes.mainpagewithback}>
        <div className={classes.backgroundImage} >

          <img
            src={backgroundImage}
            alt="Saving Account"
            style={{ height: "100%" }}
          />


        </div>
        <div className={classes.mainfile}>
          {!otpDisplay ? (
            <Box
              className={classes.box}
            // component="form"
            // onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className={classes.loginLogo}
                style={{ marginBottom: "10px" }}
              >
                <img className={classes.bhaginiloginlogo} src={logo} alt="" />
              </div>

              <div
                className="container-child"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className={classes.tabLogin}>
                  <ul
                    className="tab-list"
                    style={{ display: "flex", justifyContent: "center", gap: '1vw' }}
                  >
                    {
                      portalAccess == "All" &&
                      <>
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
                      </>
                    }

                    {
                      portalAccess == "Personal" &&

                      <li
                        className={`tabs ${getActiveClass(1, "active-tabs-child")}`}
                        onClick={() => toggleTab(1)}
                      >
                        Personal
                      </li>


                    }

                    {
                      portalAccess == "Corporate" &&

                      <li
                        className={`tabs ${getActiveClass(1, "active-tabs-child")}`}
                        onClick={() => toggleTab(1)}
                      >
                        Corporate Banking
                      </li>


                    }

                  </ul>
                </div>
              </div>
              <div className="content-container">
                {
                  portalAccess == "All" &&
                  <>
                    <div
                      className={`content ${getActiveClass(1, "active-content")}`}
                    >
                      <LoginContainerChild captcha={captcha} />
                    </div>
                    <div
                      className={`content ${getActiveClass(2, "active-content")}`}
                    >

                      <ul className="tab-list"></ul>
                      <CorporateContainer captcha={captcha} />
                    </div>

                  </>
                }

                {
                  portalAccess == "Corporate" &&
                  <>
                    <div
                      className={`content ${getActiveClass(1, "active-content")}`}
                    >
                      <div className="container" style={{ padding: "0px" }}>
                        <ul className="tab-list"></ul>
                        <CorporateContainer captcha={captcha} />
                      </div>
                    </div>
                  </>
                }
                {
                  portalAccess == "Personal" &&
                  <>
                    <div
                      className={`content ${getActiveClass(1, "active-content")}`}
                    >
                      <LoginContainerChild captcha={captcha} />
                    </div>
                  </>
                }
              </div>
            </Box>
          ) : (
            <>
              <Box
                className={classes.box2}
                component="form"
                onSubmit={handleSubmit(onSubmits)}
              >
                <div className={classes.backbutton} onClick={handleFalse}>
                  <KeyboardBackspaceIcon /> Back
                </div>
                <div className={classes.firsttabinfootp}>
                  <div className={classes.textcontainer1}>
                    <div className={classes.uppertext1}>
                      Login to Internet Banking
                    </div>
                  </div>

                  {/* <div className={classes.verifysign}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <circle cx="30" cy="30" r="30" fill="#04E091" />
                    <path
                      d="M42 22L25.5 38.5L18 31"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  ATM PIN Verified
                </div> */}
                  <Grid item xs={12} sm={8} md={12}>
                    <div
                      className={classes.frowdataaff}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className={classes.frowtextaff}>
                        Enter Four Digit OTP
                        {/* <sup className={classes.required}>*</sup> */}
                      </div>
                      <div className={classes.widthtfield}>
                        <OTPInput
                          value={otp}
                          onChange={(otpValue) => {
                            const otpVal = otpValue.replace(/\D/g, ""); // Remove non-numeric characters
                            setotp(otpVal);
                            setIsOtpEntered(otpVal.length > 3);
                          }}
                          numInputs={4}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                          inputType="password"
                          autocomplete="off"
                          onFocus={handleFocus}
                          // className="otp-input"
                          inputStyle={{
                            width: "60px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            height: "60px",
                            fontSize: "20px",
                            borderRadius: "5px",
                            borderColor:
                              "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
                          }}
                          containerStyle={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        />
                      </div>
                      <TimerComponent
                        Case="Minutes"
                        setOtp={setOtp}
                        Time={response?.otpTime}
                      />
                      {tries ? (
                        <div style={{ color: "red", marginTop: "20px" }}>
                          You have {tries} attempt left
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                </div>
                <div className={classes.button}>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={loadings}
                    sx={{
                      color: "#FFFFFF",
                      // backgroundColor: "#F84B67",
                      // backgroundColor: "#323232",
                      backgroundColor: "var(--button-color)",
                      border: "1px solid #CCC",
                      borderRadius: "8px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      width: "123px",
                      height: "35px",
                      "&:hover": {
                        background: "var(--button-hover-color)",
                        color: "white",
                      },
                      "@media (max-width: 568px)": {
                        background: "var(--button-color)",
                        border: "1px solid #CCC",
                        borderRadius: "8px",
                        paddingLeft: "18px",
                        paddingRight: "18px",
                        width: "100%",
                        height: "38px",
                      },
                    }}
                    disabled={!isOtpEntered}
                  >
                    Login
                  </LoadingButton>
                </div>
              </Box>
            </>
          )}
        </div>

        {/* <div className={classes.backgroundimglogin}></div> */}
      </div>
      {/* <marquee direction="right"> */}
      <div className={classes.bottomcontent}>
        <div className={classes.bottomcopyrightinfo}>
          <div className={classes.bottominfo}>
            Copyright 2025 | All Rights Reserved By {bankContactInfo?.BANKname}
          </div>
          <div className={classes.bottominfo2}>
            Developed by{" "}
            <a
              href="https://sil.co.in/"
              target="_blank"
              className={classes.linkSaraswat}
            >
              Saraswat Infotech Private Limited
            </a>.
          </div>
        </div>
      </div>
      {/* </marquee> */}







    </>
  );
}
