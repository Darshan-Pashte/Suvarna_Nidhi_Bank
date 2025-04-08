
import React from "react";
import classes from './loans.module.css'

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
import { compareIdAndReturnObject, compareTextAndReturnObject } from "../../../../components/common/commonArray";



const defaultFormData = {
  custNo: "",
  accountno: "",
  loanAccNo: '',
  amount: "",
  tpin: '',
  remark: '',
  loanaccName: '',
  loanacctype: '',
  loanEmi: '',
};

const CorporateLoanPayment = () => {
  // const navigate = useNavigate();
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [responseData, setResponseData] = useState()
  const [payloads, setPayload] = useState("");
  const [response, setResponse] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [accountBalance, setAccountBalance] = useState({})
  const [loanAccounts, setLoanAccounts] = useState([]);



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isLoading, setIsloading] = useState(false);

  const [depositList, setDepositList] = useState([]);
  const [isAccountBalance, setIsAccountBalance] = useState(false);



  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (watch("accountno")) {
      // if (isAccountBalance)
      fetchBalance();
    }
  }, [watch("accountno")]);

  const fetchBalance = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        accNo: watch("accountno").value,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.CORPORATE_FETCH_BALANCE, payload);
      if (response?.status == true) {
        setAccountBalance(response?.data);
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }
  };

  const accountListNew = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo, 'name': item.custName, 'acctype': item.acctype }));
  const loanAccList = loanAccounts && loanAccounts?.map(item => ({ "code": item.loanbrCode, "value": item.loanAccNo, 'name': item.accHolderName, 'acctype': item.accType, 'emi': item.EMI }));

  useEffect(() => {
    const accountNumber = watch('accountno');
    if (accountNumber) {
      const account = accountListNew.find(acc => acc.value === watch('accountno').value);
      if (account) {
        console.log("Set value run", account);
        setValue('acctype', account.acctype);
        setValue('accName', account.name);
      }
    }
  }, [watch('accountno'), accountListNew]);

  useEffect(() => {
    const accountNumber = watch('loanAccNo');
    if (accountNumber) {
      const account = loanAccList.find(acc => acc.value === watch('loanAccNo').value);
      if (account) {
        console.log("Set value run", account);
        setValue('loanacctype', account.acctype);
        setValue('loanaccName', account.name);
        setValue('loanEmi', account.emi);
      }
    }
  }, [watch('loanAccNo'), loanAccList]);





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
  console.log('state', state)

  useEffect(() => {
    if (accountList) {
      setValue("accountno", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : "");
    }
  }, []);

  // useEffect(() => {
  //   setValue("custNo", compareIdAndReturnObject(user?.customerList, user?.customerList[0]?.code));
  // }, []);


  useEffect(() => {
    if (watch("custNo")) {
      handleLoanAccountFetch();
    }
  }, [watch("custNo")]);


  const handleLoanAccountFetch = async () => {
    try {
      setIsloading(true);
      let payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        custNo: watch("custNo")?.code,
      };
      const response = await postApiData(
        apiList.CORPORATE_LOANACCOUNT,
        payload
      );
      if (response?.status === true) {
        setLoanAccounts(response?.data?.loanDeatils);
        setIsloading(false);
      } else {
        SweetAlertPopup(response?.message, "Error", "error");
        setLoanAccounts([]);
        // setApiData([]);
        setValue("loanAcc", "")
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };


  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  const onSubmit = async (data) => {
    const payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      accountNo: data.accountno.value,
      // tpin: data?.tpin,
      amount: data?.amount,
      // brCode: data.accountno.code,
      loanActno: data?.loanAccNo.value,
      loanBrCode: data?.loanAccNo.code,
      remark: data?.remark
    };
    setIsloading(true);
    const response = await postApiData(apiList.CORPORATE_LOAN_PAY, payload);
    // console.log("response", response);
    if (response?.status == false) {
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false);
    } else if (response?.status == true) {
      if (response?.data?.respcode == "OTP") {
        setResponseData(response?.data);
        setPayload(payload);
        setResponse(response)
        handleOpen();
        reset()
        setIsloading(false);
      } else {
        SweetAlertPopup(response?.message, "Success", "success");
        reset()
        setIsloading(false);
      }
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
    width: "123px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "var(--button-color)",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
      marginTop: "10px"
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


      <div className={classes.redrow}>
        <div style={{ display: "flex", gap: "5px" }}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Loan Payment
          </div>
        </div>
      </div>
      <div className={classes.sbox}>
        <div className={classes.Payment1MobilePrepaidMainPage}>

          <Box
            className={classes.tableMainBoxLoan}
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
                            const currentInputValue = event.target.value;
                            const maxLength = 32;
                            const isMaxLengthReached = currentInputValue.length >= maxLength;
                            if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Account No." +
                            errorMessages.error_autocomplete_message,
                          // maxLength: {
                          //   value: 32, // Set your max length here
                          //   message: "Account Number must be no more than 10 digits long",
                          // },
                        }}
                        data={accountList}
                        required={true}
                      />
                      <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div>
                    </div>
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
                          // disabled: state?.rowData[3] ? true : false,
                          inputProps: { maxLength: 32 },
                          disabled: true
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
                          disabled: true
                          // style:{border:'3px solid #ECECEC'}
                          // disabled: state?.rowData[4] ? true : false,

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "  Account Holder Name  " +
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
                      Customer Number
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "custNo",
                        }}
                        TextFieldProps={{
                          style: { width: "100%" },

                          placeholder: "Customer Number",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[0-9]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);
                            const currentInputValue = event.target.value;
                            const maxLength = 10;
                            const isMaxLengthReached = currentInputValue.length >= maxLength;
                            if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            " Customer Number" +
                            errorMessages.error_autocomplete_message,
                          // maxLength: {
                          //   value: 32, // Set your max length here
                          //   message: " Customer Number must be no more than 10 digits long",
                          // },
                        }}
                        data={user?.customerList}
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
                            // const regex = /^[0-9]*$/;
                            const regex = /^[a-zA-Z0-9]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);
                            const currentInputValue = event.target.value;
                            const maxLength = 32;
                            const isMaxLengthReached = currentInputValue.length >= maxLength;
                            if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Loan Account No." +
                            errorMessages.error_autocomplete_message,
                          // maxLength: {
                          //   value: 32, // Set your max length here
                          //   message: "Account Number must be no more than 10 digits long",
                          // },
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
                      Loan Account Type
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "loanacctype",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Account Type",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          // disabled: state?.rowData[3] ? true : false,
                          inputProps: { maxLength: 32 },
                          disabled: true
                        }}
                        backgroundColor={true}
                        regExp={/^[0-9A-Za-z]*$/}
                        rules={{
                          required:
                            " Account Type " +
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
                     Loan Account Holder Name
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "loanaccName",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Account Holder Name ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          disabled: true
                          // style:{border:'3px solid #ECECEC'}
                          // disabled: state?.rowData[4] ? true : false,

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "  Account Holder Name  " +
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
                      Loan EMI Amount
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "loanEmi",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "EMI ",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          disabled: true
                          // style:{border:'3px solid #ECECEC'}
                          // disabled: state?.rowData[4] ? true : false,

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "EMI " +
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
                      Transaction Amount
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
                          inputProps: { maxLength: 19 },
                          // style:{border:'3px solid #ECECEC'}
                        }}
                        regExp={/^[0-9.]*$/}
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
                        regExp={/^[0-9A-Za-z,. ]*$/}
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
              response={response}
            />
          ) : null}
        </div>
      </div>


    </>
  )
}

export default CorporateLoanPayment


