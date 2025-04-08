
import React from "react";
import classes from '../Payments/Payments.module.css'

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";



const defaultFormData = {
  email: "",
  password: "",
  mobileno:'',
  operatorBiller:'',
  cirLocation:'',
  rechargeamount:'',




};

const Payment1MobilePrepaid = () => {
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
    if (response.status == false) {
      if (response.respCode == "NEW") {
        handleOpen();
      } else {
        popupAlert(response.message, "Error", "error");
      }
    } else {
      // dispatchSetUser({
      //   user: data?.email,
      //   token: response?.data?.sessionId,
      //   username: data?.email,
      // });
      // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
      // sessionStorage.setItem("menu", response?.data?.menu);
      sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);

      // sessionStorage.setItem("username", JSON.stringify(data.email));
      navigate("/dashboard");
      // navigate("/dashboard",{ state: { username: data.email} });
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
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
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#707070",
  
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#FFF",
    border: "1px solid #707070",
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


  return (
  <>
  <div className={classes.Payment1MobilePrepaidMainPage}>
  <Box
            className={classes.box1}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <div className={classes.firsttabinfo}>
            <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: '0.1vw' }}
              >





              <Grid item xs={12} sm={12} md={6} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                  Prepaid Mobile no. 
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
                        placeholder: "Enter Prepaid Mobile no.",
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
              <Grid item xs={12} sm={12} md={6} ></Grid>
             
             
              <Grid item xs={12} sm={12} md={6} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                  Operator / Biller 
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                  <AutocompleteForm
                          controlerProps={{
                            control: control,
                            name: "operatorBiller",
                          }}
                          TextFieldProps={{
                            // style: { width: "28vw" },

                            placeholder: "Select Operator/Biller",
                            onKeyDown: (event) => {
                              //const regex = /^[a-zA-Z]*$/;
                              const regex = /^[a-zA-Z\s]*$/;
                              const isBackspace = event.keyCode === 8;
                              const isValidInput = regex.test(event.key);

                              if (!isValidInput && !isBackspace) {
                                event.preventDefault();
                              }
                            },
                          }}
                          rules={{
                            required:
                              "Operator/Biller " + errorMessages.error_autocomplete_message,
                          }}
                        //   data={filteredData}
                          required={true}
                        />
                  </div>
                </div>
              </Grid>


              <Grid item xs={12} sm={12} md={6} ></Grid>
              <Grid item xs={12} sm={12} md={6} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                  Circle/Location
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                  <AutocompleteForm
                          controlerProps={{
                            control: control,
                            name: "cirLocation",
                          }}
                          TextFieldProps={{
                            // style: { width: "28vw" },

                            placeholder: "Select Circle/Location",
                            onKeyDown: (event) => {
                              //const regex = /^[a-zA-Z]*$/;
                              const regex = /^[a-zA-Z\s]*$/;
                              const isBackspace = event.keyCode === 8;
                              const isValidInput = regex.test(event.key);

                              if (!isValidInput && !isBackspace) {
                                event.preventDefault();
                              }
                            },
                          }}
                          rules={{
                            required:
                              "  Circle/Location " + errorMessages.error_autocomplete_message,
                          }}
                        //   data={filteredData}
                          required={true}
                        />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} ></Grid>

              <Grid item xs={12} sm={12} md={6} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                  Recharge Amount
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "rechargeamount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter Recharge Amount",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9.]*$/}
                      rules={{
                        required:
                          "Recharge Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
    
                </div>
          
              </Grid>

              <Grid item xs={12} sm={12} md={6} >
              <div className={classes.payment1mobileprepaiddropdowntext}>
               
               Browse all plans from the operator
    </div> 
              </Grid>
              </Grid>
              </div>

              <div className={classes.payment1mobileprepaidbutton} >
                <ColorButton2 variant="contained" type="submit">
               Back 
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit">
               Authenticate 
                </ColorButton1>
              
             
        
            </div>
            
          </Box>
  </div>
  
  
  </>
  )
}

export default Payment1MobilePrepaid
