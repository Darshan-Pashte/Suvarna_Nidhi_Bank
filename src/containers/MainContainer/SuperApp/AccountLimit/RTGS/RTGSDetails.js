import React from "react";
import classes from "../RTGS/RTGS.module.css";

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
import UpdateNeftOtp from "./UpdateRTGSOtp";
import GoBackButton from "../../../../../components/common/GoBackButton";
import UpdateRTGSOtp from "./UpdateRTGSOtp";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";

const defaultFormData = {
  amount: "",
  tpin: "",
  remark: "",
};

const RTGSDetails = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState("");
  const { state } = useLocation();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [payloads, setPayload] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // console.log("state", state);
  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
      name: item.name,
      acctype: item.acctype,
    }));
  useEffect(() => {
    if (state?.rowData[3] && state?.rowData[4] && state?.rowData[2]) {
      setValue("benaccno", state?.rowData[3]);
      setValue("benifsc", state?.rowData[4]);
      setValue("benename", state?.rowData[2]);
    }
  }, [state]);

  const defaultFormData = {
    Accountnumber: state?.accno,
    accName: state?.accName,
    // acctype: state?.acctype,
    benifsc: state?.rowData[4] ? state?.rowData[4] : "",
    benaccno: state?.rowData[3] ? state?.rowData[3] : "",
    benename: state?.rowData[2] ? state?.rowData[2] : "",
    amount: "",
    tpin: "",
    remark: "",
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
      beneNickname: state?.rowData[1] ? state?.rowData[1] : "other",
      beneAccNo: data.benaccno,
      beneIfsc: data.benifsc,
      remark: data.remark,
    };
    setIsloading(true);
    const response = await postApiData(apiList.RTGSTRANSACTIONS, payload);
    // console.log("response", response);

    if (response?.status == true) {
      if (response?.data.respcode == "OTP") {
        reset();
        setUserId(response?.data);
        setPayload(payload);
        handleOpen();
        setIsloading(false);
        setResponse(response);
      } else {
        reset();
        SweetAlertPopup(response?.message, "Success", "success");
        setIsloading(false);
      }
    } else if (response?.data?.tpinAttempt >= 0) {
      SweetAlertPopup(
        response?.message +
        "\n" +
        (response?.data.tpinAttempt + 1) +
        " Attempts Remaining",
        "Error",
        "error"
      );
      setIsloading(false);
    } else {
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false);
    }
  };


  useEffect(() => {
    if (accountList) {
      // setValue("accName", accName)
      setValue(
        "accountNumber",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

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

  useEffect(() => {
    const accountNumber = watch("accountNumber");
    if (accountNumber) {
      const account = accountList.find(
        (acc) => acc.value === watch("accountNumber").value
      );
      if (account) {
        console.log("Set value run");
        setSelectedAccountName(account.name);
        setValue("acctype", account.acctype);
        setValue("accName", account.name);
      }
    }
  }, [watch("accountNumber"), accountList]);
  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
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
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>

        <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Real Time Gross Settlement (RTGS)
          </div>
        </div>
      </div>


      <div className={classes.sbox}>
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
                <div className={classes.headingRemitter}>
                  Remitter Details
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Number<sup className={classes.required}>*</sup>
                  </div>
                  <AutocompleteForm
                    controlerProps={{
                      control: control,
                      name: "accountNumber",
                    }}
                    TextFieldProps={{
                      placeholder: "Select Account Number",
                      onKeyDown: (event) => {
                        // const regex = /^[0-9]*$/;
                        const regex = /^[a-zA-Z0-9]*$/;
                        const isBackspace = event.keyCode === 8;
                        const isValidInput = regex.test(event.key);

                        const currentInputValue = event.target.value;

                        // Maximum length constraint
                        const maxLength = 32; // Set your max length here
                        const isMaxLengthReached =
                          currentInputValue.length >= maxLength;

                        if (
                          (!isValidInput && !isBackspace) ||
                          (isMaxLengthReached && !isBackspace)
                        ) {
                          event.preventDefault();
                        }
                      },
                    }}
                    rules={{
                      required:
                        "Account Number " +
                        errorMessages.error_autocomplete_message,

                      // maxLength: {
                      //   value: 32, // Set your max length here
                      //   message:
                      //     "Account Number must be no more than 10 digits long",
                      // },
                    }}
                    data={accountList}
                    required={true}
                  />
                  <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Type
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "acctype",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Account Type",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        disabled: state?.rowData[3] ? true : false,
                        inputProps: { maxLength: 32 },
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9A-Za-z]*$/}
                      rules={{
                        required:
                          "  Account Type " +
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
                    Account Holder Name
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "accName",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Account Holder Name ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        disabled: state?.rowData[4] ? true : false,
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "  Beneficiary IFSC  " +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
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
                <div className={classes.headingRemitter}>
                  Beneficiary Details
                </div>
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
                        placeholder: "Beneficiary Account Number ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        disabled: state?.rowData[3] ? true : false,
                        inputProps: { minLength: 1, maxLength: 32 },
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]*$/}
                      rules={{
                        required:
                          " Beneficiary Account Number " +
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
                        placeholder: "Beneficiary IFSC ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        disabled: state?.rowData[4] ? true : false,
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
                          message: "Please enter a valid IFSC code",
                        },
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
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
                        placeholder: "Beneficiary Name ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        disabled: state?.rowData[2] ? true : false,
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "  Beneficiary Name  " +
                          errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value: /^[A-Z]{4}0[0-9]{7}$/,
                        //   message: "Please Enter valid format of IFSC Number",
                        // },
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

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
                <div className={classes.headingRemitter}>
                  Transfer Details
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
                        placeholder: "Amount ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        inputProps: { maxLength: 19 },
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9.]*$/}
                      // regExp={/^\d{1,11}(\.\d{1,2})?$/}
                      rules={{
                        required: "Amount is required",
                        pattern: {
                          value: /^\d{1,16}(?:\.\d{1,2})?$/,
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
                <div className={classes.frowtextaff}>
                  Enter TPIN <sup className={classes.required}>*</sup>
                </div>
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
                        message:
                          "TPIN must contain only digits and have at least 4 digits",
                      },
                    }}
                    render={({ field, fieldState }) => {
                      const handleInputChange = (event) => {
                        const regex = /^[0-9]+$/;
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
                              borderRadius: "6px",
                              position: "relative",
                              // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                              backgroundColor: "#FFF",
                              // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                              marginTop: "4px",

                              border: "1px solid",
                              // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                              // borderColor: 'red',
                              fontSize: "13px",
                              height: "24px",
                              color: "#888",
                              fontWeight: "500",

                              // width: '520px',
                              padding: "14px 0px",
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
                        placeholder: "Remark",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        // disabled: state?.benelist.ifsc ? true : false,
                      }}
                      // backgroundColor={true}
                      regExp={/^[a-zA-Z0-9., ]+$/}
                      rules={{
                        required:
                          "Remark  " +
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
              <ColorButton1 variant="contained" type="submit">
                Continue
              </ColorButton1>
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
          <UpdateRTGSOtp
            open={open}
            handleClose={handleClose}
            userId={userId}
            payloads={payloads}
            response={response}
           
          />
        ) : null}
      </div>

    </>
  );
};

export default RTGSDetails;
