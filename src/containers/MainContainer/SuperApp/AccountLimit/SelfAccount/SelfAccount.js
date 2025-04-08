import React from "react";
import classes from "./SelfAccount.module.css";

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
// import UpdateInternalOtp from "./UpdateInternalOtp";
import GoBackButton from "../../../../../components/common/GoBackButton";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";

import UpdateSelfOtp from "./UpdateSelfOtp";

const defaultFormData = {
  accountNumber: "",
  accName: "",
  acctype: "",
  benifsc: "",
  beneficiaryAccountNumber: "",
  // benifName: "",
  amount: "",
  tpin: "",
  remark: '',
  beneacctype: '',
  beneName: ''

};

const SelfAccountTransfer = () => {
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
  // const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accountBalance, setAccountBalance] = useState("");
  const [payloads, setPayload] = useState(null);
  const [response, setResponse] = useState(null);
  const [beneAccountListfiltered, setbeneAccountListfiltered] = useState([])
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // console.log("state", state);

  const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo, 'name': item.name, 'acctype': item.acctype }));

  let beneAccountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo, 'name': item.name, 'acctype': item.acctype }));

  // useEffect(() => {
  //   if (state?.rowData[3] && state?.rowData[4] && state?.rowData[2]) {
  //     setValue("benaccno", state?.rowData[3])
  //     setValue("benifsc", state?.rowData[4])
  //     setValue("benename", state?.rowData[2])
  //   }
  // }, [state]);



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

  const handlleNavigate = (route, state) => {
    navigate(route, { state: state }); // Directly pass state containing `data` and `response`
  };

  useEffect(() => {
    if (accountList) {
      // setValue("accName", accName)
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
    }
  }, []);

  // useEffect(() => {
  //   if (beneAccountList) {
  //     // setValue("accName", accName)
  //     setValue("beneficiaryAccountNumber", beneAccountList ? compareTextAndReturnObject(beneAccountList, beneAccountList[0]?.value) : '')
  //   }
  // }, []);


  useEffect(() => {
    if (watch("accountNumber")) {
      const beneAccountListrefreshed = beneAccountList.filter((data) => {
        console.log("data from filter", data);
        console.log("accountnumber from filter", watch("accountNumber"));
        return watch("accountNumber")?.value !== data?.value
      })

      console.log("accountnumber from filter", beneAccountListrefreshed);
      setbeneAccountListfiltered(beneAccountListrefreshed)

    }
  }, [watch("accountNumber")])


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

  // useEffect(() => {
  //   if (watch('accountNumber')?.value==watch('beneficiaryAccountNumber')?.value) {
  //     // setValue("accName", accName)
  //     SweetAlertPopup("Remmiter Account and Beneficiary Account should not be same", "Error", "error");
  //   }
  // }, [watch('beneficiaryAccountNumber')]);


  useEffect(() => {
    const accountNumber = watch('accountNumber');
    if (accountNumber) {
      const account = accountList.find(acc => acc.value === watch('accountNumber')?.value);
      if (account) {
        console.log("Set value run");
        setValue('acctype', account?.acctype);
        setValue('accName', account?.name);
      }
    }
  }, [watch('accountNumber'), accountList]);


  useEffect(() => {
    const beneficiaryAccountNumber = watch('beneficiaryAccountNumber');
    if (beneficiaryAccountNumber) {
      const beneaccount = beneAccountList.find(acc => acc.value === watch('beneficiaryAccountNumber')?.value);
      if (beneaccount) {
        console.log("Set value run");
        setValue('beneacctype', beneaccount?.acctype);
        setValue('beneName', beneaccount?.name);
      }
    }
  }, [watch('beneficiaryAccountNumber'), beneAccountList]);

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
      beneAcctNo: data.beneficiaryAccountNumber?.value,
      remark: data.remark,
      strotp: "strotp"
    };
    setIsloading(true);
    const response = await postApiData(apiList.SELFTRANSFER, payload);
    console.log("response", response);
    if (response?.status == true) {
      if (response?.data?.respcode === "OTP") {
        reset()
        setUserId(response?.data);
        setPayload(payload);
        handleOpen();
        setIsloading(false);
        setResponse(response)
       
      } else {
        SweetAlertPopup(response?.message, "Success", "success");
        setIsloading(false);
        reset();
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
      reset();
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
    width: "153px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",

    },
    "&:disabled": {
      background: "gray",
      color: "#c8c8c8",

    },
    "@media (max-width: 568px)": {
      background: "var(--button-color)",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
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
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Self Account
          </div>
        </div>
      </div>
      <div className={classes.Payment1MobilePrepaidMainPage}>
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
                  <div className={classes.headingRemitterss}>
                    Remitter Details
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>Account Number<sup className={classes.required}>*</sup></div>
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
                          const isMaxLengthReached = currentInputValue.length >= maxLength;

                          if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                            event.preventDefault();
                          }
                        },
                      }}

                      rules={{
                        required: "Account Number " + errorMessages.error_autocomplete_message,


                      }}
                      data={accountList}
                      required={true}
                    />

                  </div>
                  <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div>
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
                          placeholder: "Enter Beneficiary Account Number ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.rowData[3] ? true : false,
                          inputProps: { minLength: 1, maxLength: 32 },
                        }}
                        backgroundColor={true}
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
                          placeholder: "Enter  Account Holder Name ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.rowData[4] ? true : false,
                          // inputProps: { maxLength: 11 },
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            " Account Holder Name " +
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
                    Beneficiary Details
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>Beneficiary Account Number<sup className={classes.required}>*</sup></div>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "beneficiaryAccountNumber",
                      }}
                      TextFieldProps={{
                        placeholder: "Select Beneficiary Account Number",
                        onKeyDown: (event) => {
                          // const regex = /^[0-9]*$/;
                          const regex = /^[a-zA-Z0-9]*$/;
                          const isBackspace = event.keyCode === 8;
                          const isValidInput = regex.test(event.key);

                          const currentInputValue = event.target.value;

                          // Maximum length constraint
                          const maxLength = 32; // Set your max length here
                          const isMaxLengthReached = currentInputValue.length >= maxLength;

                          if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                            event.preventDefault();
                          }
                        },
                      }}

                      rules={{
                        required: "Beneficiary Account Number " + errorMessages.error_autocomplete_message,

                        // maxLength: {
                        //   value: 32, // Set your max length here
                        //   message: "Beneficiary Account Number must be no more than 10 digits long",
                        // },
                      }}
                      data={beneAccountListfiltered}
                      required={true}
                    />

                  </div>
                  {/* <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div> */}
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4}>

              <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                  Re-Enter account number
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                  <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "rebenaccno",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Re-Enter Beneficiary account number ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "  Account Number " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid> */}
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
                          name: "beneacctype",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter Account Type ",
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
                      Beneficiary Name
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "beneName",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Beneficiary Name ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          disabled: state?.rowData[4] ? true : false,
                          // inputProps: { maxLength: 11 },
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            " Beneficiary Name " +
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
                          placeholder: "Enter Amount ",
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
                                "@media (max-width: 568px)": {
                                  padding: "20px 10px",
                                },
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
                          placeholder: "Enter Remark",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          // disabled: state?.benelist.ifsc ? true : false,
                        }}
                        // backgroundColor={true}
                        regExp={/^[a-zA-Z0-9., ]+$/}
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
                {/* <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>Remark(optional)</div>
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
                          placeholder: "Enter Remark ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                        }}
                        backgroundColor={true}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid> */}

                <Grid item xs={12} sm={12} md={12}></Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <ColorButton1 variant="contained" type="submit" disabled={watch('accountNumber')?.value == watch('beneficiaryAccountNumber')?.value ? true : false}>
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
            <UpdateSelfOtp
              open={open}
              handleClose={handleClose}
              userId={userId}
              payloads={payloads}
              response={response}

            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SelfAccountTransfer;
