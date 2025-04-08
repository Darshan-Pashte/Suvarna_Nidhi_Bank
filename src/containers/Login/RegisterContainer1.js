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
  Password:'',
  mobileno:''
};

const RegisterContainer1 = () => {
    // const navigate = useNavigate();
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

  function handleSignup() {
    navigate('/auth/register');
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
    navigate(route)
}
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
    const response = await postApiData(apiList.LOGIN, payload);
    // console.log("response", response);
    setUserId(data?.email);
    handleOpen();
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
      <div className={classes.mainpagewithback1}>
        <div className={classes.mainfile1}>
          <Box
            className={classes.box1}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.firsttabinfo}>
              <Grid item xs={12} sm={8} md={12} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Registered Mobile No
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "mobileno",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Mobile no",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        inputProps : {maxLength: 10}
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9]+$/}
                      rules={{
                        required:
                          "Mobile Number" +
                          errorMessages.error_autocomplete_message,
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please Enter valid Mobile Number",
                          },
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6} >
                <div className={classes.widthtfield}>
                  <div className={classes.frowtextaff}>
                  ATM Pin no
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
                      name="Password" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "ATM Pin no " + errorMessages.error_autocomplete_message,
                        pattern: {
                          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // Use the custom regular expression here
                          message: "Password does not meet requirements",
                        },
                      }}
                      render={({ field, fieldState }) => {
                        const handleInputChange = (event) => {
                          // const regex = /^[a-zA-Z@#.&0-9]+$/;
                          // const regex = /^[\s\S]*$/;
                        const  regex=/^[0-9]+$/;
                          const { name, value } = event.target;
                          const isValidInput = regex.test(value) || value === "";

                          if (!isValidInput) {
                            event.preventDefault();
                            return;
                          }

                          field.onChange(value);
                        };

                        return (
                          <TextField
                            id="standard-adornment-password"
                            fullWidth="true"
                            placeholder="ATM Pin no"
                            type={showPassword ? "text" : "password"}
                            {...field} // Spread the 'field' props to bind it to the form's state

                            sx={{
                              "& fieldset": { border: "none" },
                              ".MuiInputBase-root": {
                                borderRadius: "6px",
                                height: "35px",
                                //   backgroundColor: "rgb(238, 239, 247)",
                                backgroundColor: "#FFF",
                                fontSize: '13px',
                               
                                color: '#888',
                                fontWeight:'500',
                                border: '1px solid',
                                //   width:'130%'
                              },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {!showPassword ? (
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
                        );
                      }}
                    />
                  </div>
                  {/* <div className={classes.forgetPass}>
                    <a href="#">Forgot Password?</a>
                  </div> */}
                </div>
              </Grid>

              <div className={classes.button} >
                <ColorButton1 variant="contained" type="submit"  >
               Authenticate 
                </ColorButton1>
              </div>
              <div className={classes.lasttext}>
                First time user ? <span onClick={handleSignup} className={classes.register} > Register here</span>
              </div>
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

export default RegisterContainer1;
