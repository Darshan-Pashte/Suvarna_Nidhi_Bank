import React from "react";
import classes from "./AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Divider, Grid, TextField } from "@mui/material";
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
import TextFieldForm from "../../../../../components/common/textFieldForm";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import { useLocation } from "react-router-dom/dist";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import UpdateImpsOTP from "./UpdateImpsOtp";
import GoBackButton from "../../../../../components/common/GoBackButton";
import { LoadingButton } from "@mui/lab";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";



const BeneficiaryDetails = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsloading] = useState(false);
  const { state } = useLocation();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [payloads, setPayload] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // console.log("state", state);

  useEffect(() => {
    setValue("Accountnumber",state?.accno)
  }, [state]);

  useEffect(() => {
    if(state?.rowData && state?.rowData){
      setValue("benaccno", state?.rowData[3])
      setValue("benifsc", state?.rowData[4])
  }
  }, [state]);

  const defaultFormData = {
    Accountnumber : state?.accno,
    benifsc :state?.rowData ?state?.rowData[4] : "",
    benaccno :state?.rowData ? state?.rowData[3] : "",
    benename : "",
    amount: "",
    tpin: "",
    remark:''
  };

  // const Accountnumber = state.accno
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    // value,
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

  const beneficiary = [
    {
      code: 0,
      value: "ABC",
    },
    {
      code: 1,
      value: "XYZ",
    },
  ];

  const onSubmit = async (data) => {
    const payload = {
      amount: data.amount,
      tpin: data.tpin,
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: data?.accountNumber?.value,
      beneNickname: state?.rowData
        ? state?.rowData[1]
        : "other",
      beneAccNo: data.benaccno,
      beneIfsc: data.benifsc,
      beneName : data.benename,
      remark : data.remark,
    };
    setIsloading(true);
    const response = await postApiData(apiList.IMPSTRANSACTIONS, payload);
    // console.log("response", response);
      if (response?.status == true) {
      if (response?.data.respcode == "OTP") {
        setUserId(response?.data);
        setPayload(payload);
        handleOpen();
        reset();
        setIsloading(false);
      } else {
        SweetAlertPopup(response?.message, "Success", "success");
        reset();
        setIsloading(false);
      }
      
    }
    else if (response?.data?.tpinAttempt >= 0) {
      SweetAlertPopup(
        response?.message + "\n" + (response?.data.tpinAttempt + 1) + " Attempts Remaining",
        "Error",
        "error"
      );
      setIsloading(false);
    }
    else if (response?.status == false) {
      reset();
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false);
    }
    else{
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false);
    }
  };

  const accountNumber = watch("accountNumber");

  const fetchBalance = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        accNo: watch("accountNumber") ? watch("accountNumber")?.value : "",
        custNo: user?.userId,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.FETCHBAL, payload);
      if (response?.status == true) {
        setAccountBalance(response?.data);
        setIsloading(false);
      } else {
        setIsloading(false);
      }
    } catch (err) {
      //   console.log(err)
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (accountNumber) {
      fetchBalance();
    }
  }, [accountNumber]);

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

 

//   const accountList =
//   user?.accountDetails &&
//   user?.accountDetails?.map((item) => ({
//     code: item.brCode,
//     value: item.accNo,
//   }));

//   useEffect(() => {
//     if (accountList) {
//         setValue("accno1", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value): '')
//     }
// }, [])


  return (
    <>
    {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.Payment1MobilePrepaidMainPage}>
        <GoBackButton/>
        <div className={classes.tableMainBoxInner}>
       <div className={classes.beneficiarymaintitle}> Immediate Payment Service (IMPS)</div>
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
                style={{ padding: "0.1vw" }}
              >
                {/*            
              <Grid item xs={12} sm={12} md={12}>
                <ColorButton1 variant="contained" type="submit">
                  Instant Pay
                </ColorButton1>
              </Grid> */}

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.beneficiarytitle}
                >
                  Beneficiary Details
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                    Account Number
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "Accountnumber",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Beneficiary Account Number ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.accno ? true : false,
                          inputProps: { minLength: 1,maxLength: 32 },
                        }}
                        backgroundColor={true}
                        // regExp={/^[0-9]*$/}
                        regExp={/^[0-9A-Za-z]*$/}
                        rules={{
                          required:
                            "  Account Number " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                  <div>{accountBalance?.accBal}</div>
                </Grid>

                
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Beneficiary Account Number
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "benaccno",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Beneficiary Account Number ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.rowData ? true : false,
                          inputProps: { minLength: 1,maxLength: 32 },
                        }}
                        backgroundColor={true}
                        // regExp={/^[0-9]*$/}
                        regExp={/^[0-9A-Za-z]*$/}
                        rules={{
                          required:
                            "  Account Number " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Beneficiary IFSC
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "benifsc",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Beneficiary IFSC ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.rowData ? true : false,
                          inputProps: { maxLength: 11 },
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "  Beneficiary IFSC  " +
                            errorMessages.error_autocomplete_message,
                          // pattern: {
                          //   value: /^[A-Z]{4}0[0-9]{7}$/,
                          //   message: "Please Enter valid format of IFSC Number",
                          // },
                          pattern: {
                            value: /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/,
                            message:
                              "Please enter a valid IFSC code",
                          },
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

              
                {!state?.rowData ? <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Beneficiary Name
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "benename",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Beneficiary Name ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.rowData ? true : false,
                          // inputProps: { maxLength: 11 },
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z]+$/}
                        rules={{
                          required:
                            "  Beneficiary Name  " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid> : null}
                <Grid item xs={12} sm={12} md={12}></Grid>
                <Grid item xs={12} sm={12} md={12}></Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Divider />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.beneficiarytitle}
                >
                  Transfer Details
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Amount
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "amount",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Amount ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          inputProps: { maxLength: 14 },
                        }}
                        backgroundColor={true}
                        regExp={/^[0-9.]*$/}
                        // regExp={/^\d{1,11}(\.\d{1,2})?$/}
                        rules={{
                          required: "Amount is required",
                          pattern: {
                            value: /^\d{1,11}(?:\.\d{1,2})?$/,
                            message: "Please Enter a valid Amount",
                          },
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  {/* <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      TPIN
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "tpin",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Tpin ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          inputProps: { maxLength: 4 },
                        }}
                        backgroundColor={true}
                        regExp={/^[0-9]*$/}
                        rules={{
                          required:
                            "  Tpin " +
                            errorMessages.error_autocomplete_message,
                          pattern: {
                            value: /^\d{4}$/,
                            message: "Please Enter valid TPIN",
                          },
                        }}
                        required={true}
                      />
                    </div>
                  </div> */}
                       <div className={classes.grid4title}>Enter TPIN  <sup className={classes.required}>*</sup></div>
                <div className={classes.frow1aff}>
                  <Controller
                    name="tpin" // The name should match the key in 'data' object in onSubmit
                    control={control}
                    defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "TPIN " + errorMessages.error_autocomplete_message,
                          pattern: {
                            value: /^[0-9]{4,}$/, // This pattern allows only digits and requires at least 4 digits
                            message: "TPIN must contain only digits and have at least 4 digits",
                          },
                      }}
                    render={({ field, fieldState }) => {
                      const handleInputChange = (event) => {
                        const regex = /^[0-9]+$/;
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
                          placeholder="Enter TPIN "
                          maxLength={4}
                          type={showPassword ? "text" : "password"}
                          {...field} // Spread the 'field' props to bind it to the form's state
                          sx={{
                            "& fieldset": { border: "none" },
                            ".MuiInputBase-root": {
                              borderRadius: '6px',
                              position: 'relative',
                              // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                              backgroundColor: '#FFF',
                              // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                              marginTop:'4px',
                              
                              border: '1px solid',
                              // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                              // borderColor: 'red',
                              fontSize: '13px',
                              height : "34px",
                              color: '#888',
                              fontWeight:'500',
                              
                              // width: '520px',
                              padding: '16px 0px',
                            },
                          }}
                          inputProps={{ maxLength: 4,minLength:4 }}
                          
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
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Remark
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "remark",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Remark",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          // disabled: state?.benelist.ifsc ? true : false,
                        }}
                        backgroundColor={true}
                      regExp={/.*/}
                        rules={{
                          required:
                            "  Remark  " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12}></Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                {/* <ColorButton1 variant="contained" type="submit" loading={loading}>
                  Submit
                </ColorButton1> */}
 <div className={classes.button}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                  sx={{
                    color: "#FFFFFF",
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    // backgroundColor: "#183883",
                    background: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "153px",
                    height: "35px",
                    "&:hover": {
                      background: "var(--button-hover-color)",
                      color: "white",
                    },
                  }}
                >
                       Submit
                </LoadingButton>
              </div>

              </Grid>
            </div>

            {/* <div className={classes.payment1mobileprepaidbutton} >
                <ColorButton2 variant="contained" type="submit">
                Reset
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit">
                Continue
                </ColorButton1>
              
             
        
            </div> */}
          </Box>
          {open ? (
            <UpdateImpsOTP
              open={open}
              handleClose={handleClose}
              userId={userId}
              payloads={payloads}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BeneficiaryDetails;
