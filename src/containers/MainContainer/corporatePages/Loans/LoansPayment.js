
import React from "react";
import classes from '../Loans/loans.module.css'

import { useLocation, useNavigate } from "react-router-dom";
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
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import GoBackButton from "../../../../components/common/GoBackButton";
import LoanOTP from "./LoanOTP";
import Loader from "../../../../components/common/loader";



const defaultFormData = {

  accountno: "",
  loanAccNo: '',
  amount: "",
  tpin: '',
  remark: ''

};

const LoansPayment = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [responseData, setResponseData] = useState()
  const [payloads, setPayload] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isLoading, setIsloading] = useState(false);

  const [depositList, setDepositList] = useState([]);


  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );




  const loantypedata = [
    {
      code: 0,
      value: 'Gold Loan'
    },
    {
      code: 1,
      value: 'Home Loan'
    },
  ]
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

  const { state } = useLocation()
  // console.log('state', state)


  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));


  const loanAccList =
    state?.loanList &&
    state?.loanList?.map((item) => ({
      code: item.loanbrCode,
      value: item.loanAccNo,
    }));




  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: data.accountno.value,
      tpin: data?.tpin,
      amount: data?.amount,
      brCode: data.accountno.code,
      loanActno: data?.loanAccNo.value,
      loanBrCode: data?.loanAccNo.code,
      remark: data?.remark
    };
    setIsloading(true);
    const response = await postApiData(apiList.LOANPAYMENT, payload);
    // console.log("response", response);
    if (response?.status == false) {
      SweetAlertPopup(response?.message, "Error", "error");
    } else if (response?.status == true) {
      if (response?.data.respcode == "OTP") {
        setResponseData(response?.data);
        setPayload(payload);

        handleOpen();
        reset()
      } else {
        SweetAlertPopup(response?.message, "Success", "success");
        reset()
      }
    }
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
    width: "123px",
    height: "35px",
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
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.Payment1MobilePrepaidMainPage}>
        <GoBackButton />
        <div className={classes.mainupperheader}>Loan Payment</div>

        <Box
          className={classes.tableMainBox}
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



              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Number
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "accountno",
                      }}
                      TextFieldProps={{
                        style: { width: "100%" },

                        placeholder: "Account Number",
                        onKeyDown: (event) => {
                          //const regex = /^[a-zA-Z]*$/;
                          // const regex = /^[0-9]*$/;
                          const regex = /^[a-zA-Z0-9]*$/;
                          const isBackspace = event.keyCode === 8;
                          const isValidInput = regex.test(event.key);

                          if (!isValidInput && !isBackspace) {
                            event.preventDefault();
                          }
                        },
                      }}
                      rules={{
                        required:
                          "Account No." +
                          errorMessages.error_autocomplete_message,
                      }}
                      data={accountList}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>




              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Loan Account Number
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "loanAccNo",
                      }}
                      TextFieldProps={{
                        style: { width: "100%" },

                        placeholder: "Loan Account Number",
                        onKeyDown: (event) => {
                          //const regex = /^[a-zA-Z]*$/;
                          // const regex = /^[a-zA-Z\s]*$/;
                          const regex = /^[a-zA-Z0-9]*$/;
                          const isBackspace = event.keyCode === 8;
                          const isValidInput = regex.test(event.key);

                          if (!isValidInput && !isBackspace) {
                            event.preventDefault();
                          }
                        },
                      }}
                      rules={{
                        required:
                          "Loan Account No." +
                          errorMessages.error_autocomplete_message,
                      }}
                      data={loanAccList}
                      required={true}
                    />
                  </div>
                </div>
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
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9.]*$/}
                      rules={{
                        required:
                          "  Amount " +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
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
                              marginTop: '4px',
                              borderRadius: "6px",
                              height: "35px",
                              //   backgroundColor: "rgb(238, 239, 247)",
                              backgroundColor: "#FFF",
                              fontSize: '13px',

                              color: '#888',
                              fontWeight: '500',
                              border: '1px solid',
                            },
                          }}
                          inputProps={{ maxLength: 4, minLength: 4 }}

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



            </Grid>
          </div>

          <div className={classes.payment1mobileprepaidbutton} >

            <ColorButton1 variant="contained" type="submit">
              Apply
            </ColorButton1>



          </div>

        </Box>

        {open ? (
          <LoanOTP
            open={open}
            handleClose={handleClose}
            responseData={responseData}
            payloads={payloads}
          />
        ) : null}
      </div>


    </>
  )
}

export default LoansPayment


