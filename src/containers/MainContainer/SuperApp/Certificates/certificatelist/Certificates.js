import React from "react";
import classes from "./AccountLimit.module.css";

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

import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import RadioGroupForm from "../../../../../components/common/RedioButtonForm";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import GoBackButton from "../../../../../components/common/GoBackButton";

const defaultFormData = {
  certificateType: "",
  accountNumber: "",
  chequeNo: "",
  financialYear: "",
};

const CertificateList = [
  {
    code: "TAN",
    value: "TAN Certificate",
  },
  {
    code: "TERMDEPOSIT",
    value: "TD Certificate",
  },
  {
    code: "INTCERTLOAN",
    value: "Interest Certificate Loan Request",
  },
  {
    code: "BALANCECERT",
    value: "Balance Certificate",
  },
  {
    code: "BALANCECERTLOAN",
    value: "Balance Certificate - Loan",
  },
  {
    code: "BALANCECERTCASA",
    value: "Balance Certificate CASA",
  },
  {
    code: "CHEQUEPASSING",
    value: "Cheque Passing Certificate",
  },
  {
    code: "PROVISIONALINTCERT",
    value: "Provisional Intereset Certificate",
  },
  {
    code: "INTCERTCASA",
    value: "Intereset Certificate CASA",
  },
];

// const FinancialYearList = [
//   {
//     code: "2024",
//     value: "2024",
//   },
//   {
//     code: "2023",
//     value: "2023",
//   },
//   {
//     code: "2022",
//     value: "2022",
//   },
//   {
//     code: "2021",
//     value: "2021",
//   },
//   {
//     code: "2020",
//     value: "2020",
//   },
//   {
//     code: "2019",
//     value: "2019",
//   },
//   {
//     code: "2018",
//     value: "2018",
//   },
//   {
//     code: "2017",
//     value: "2017",
//   },
//   {
//     code: "2016",
//     value: "2016",
//   },
//   {
//     code: "2015",
//     value: "2015",
//   },
//   {
//     code: "2014",
//     value: "2014",
//   },
// ].sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10));

const currentYear = new Date().getFullYear();
const FinancialYearList = Array.from({ length: 11 }, (_, index) => {
  const year = currentYear - index;
  return { code: year.toString(), value: year.toString() };
});


const Certificates = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bene, setBene] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loanList, setLoanList] = useState([]);

  const handleDownloadPDF = (data) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = 'certificate'; // You can change this to whatever filename you want
    link.click();
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
  const handlleNavigate = (route) => {
    navigate(route);
  };


  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (CertificateList) {
      // setValue("accName", accName)
      setValue("certificateType", CertificateList ? compareTextAndReturnObject(CertificateList, CertificateList[0]?.value) : '')
    }
  }, []);

  useEffect(() => {
    if(watch("certificateType")){
      setValue("accountNumber","")
      setDownloadUrl("")
    }
  }, [watch("certificateType")]);

  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  const handleReset=()=>{
    setDownloadUrl("")
    setValue("certificateType", CertificateList ? compareTextAndReturnObject(CertificateList, CertificateList[0]?.value) : '')
  }



  useEffect(() => {
    const getDeposit = async () => {
      try {
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId,
        };
        setIsloading(true);
        const response = await postApiData(
          apiList.FETCHLOANINFO +
          `?pageNo=${1}&pageSize=${100}`,
          payload
        );
        // console.log("response", response);
        setLoanList(response?.data?.loanDeatils);
        // setShowBal(response.data?.accBal);
        // if(response.status == false)
        // SweetAlertPopup(response?.message,"Error","error")

        setIsloading(false);
      } catch (err) {
        // console.log(err);
        setIsloading(false);
      }
    };

    if (watch("certificateType")?.code == "INTCERTLOAN" || watch("certificateType")?.code == "BALANCECERTLOAN") {
      getDeposit();
    }

  }, [watch("certificateType")?.code == "INTCERTLOAN", watch("certificateType")?.code == "BALANCECERTLOAN"]);


  const loanAccList = loanList && loanList?.map(item => ({ "code": item.loanbrCode, "value": item.loanAccNo }));

  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      flag: data.certificateType.code,
      acctNo: data.accountNumber ? data.accountNumber.value : "",
      chequeNo: data.chequeNo ? data.chequeNo : "",
      financialYear: data.financialYear ? data.financialYear.code : "",
    };

    setIsloading(true)
    const response = await postApiData(apiList.CERTIFICATE_DOWNLOAD, payload);
    console.log("response", response);
    if (response?.status == true) {
      setDownloadUrl(response.data.url)
      // reset();
      setIsloading(false)
    } else {
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false)
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
    width: "133px",
    height: "31px",
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
    width: "133px",
    height: "31px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "#FFF",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
    },
  }));


  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>
      <div>
        <div style={{display:"flex",alignItems:"center", gap:'5px'}}>
          <GoBackButton/>
      <div className={classes.SubHeading}>
      Certificates
              </div>
              </div>
              </div>


           
            </div>
        <div className={classes.sbox}>
      <div className={classes.Payment1MobilePrepaidMainPage}>
       
        <div>
          <Box
            className={classes.box1}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "0.1vw" }}
            >
              <Grid item xs={12} sm={12} md={3} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Certificates Type
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "certificateType",
                      }}
                      TextFieldProps={{
                        style: { width: "100%" },
                        placeholder: "Certificates Type",
                        onKeyDown: (event) => {
                          //const regex = /^[a-zA-Z]*$/;
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
                          "Certificates Type" +
                          errorMessages.error_autocomplete_message,
                      }}
                      data={CertificateList}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              {
                watch("certificateType")?.code == "INTCERTLOAN" || watch("certificateType")?.code == "BALANCECERT" || watch("certificateType")?.code == "BALANCECERTLOAN" || watch("certificateType")?.code == "BALANCECERTCASA" || watch("certificateType")?.code == "CHEQUEPASSING" || watch("certificateType")?.code == "INTCERTCASA" ?
                  <Grid item xs={12} sm={12} md={3}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Account Number
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.widthtfield}>
                        <AutocompleteForm
                          controlerProps={{
                            control: control,
                            name: "accountNumber",
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
                              "Account " +
                              errorMessages.error_autocomplete_message,
                            // maxLength: {
                            //   value: 32, // Set your max length here
                            //   message: "Account Number must be no more than 10 digits long",
                            // },
                          }}
                          data={watch("certificateType")?.code == "BALANCECERTLOAN" || watch("certificateType")?.code == "INTCERTLOAN" ? loanAccList : accountList}
                          required={true}
                        />
                      </div>
                    </div>
                  </Grid>
                  : null
              }

              {
                watch("certificateType")?.code == "CHEQUEPASSING" &&
                <Grid item xs={12} sm={12} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Cheque No.
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "chequeNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Cheque No.",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // inputProps: { maxLength: 11 },
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Cheque No." +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
              }

              {
                watch("certificateType")?.code == "PROVISIONALINTCERT" &&
                <Grid item xs={12} sm={12} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Financial Year
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "financialYear",
                        }}
                        TextFieldProps={{
                          style: { width: "100%" },

                          placeholder: "Financial Year",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[0-9]*$/;
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
                            "Financial Year " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={FinancialYearList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
              }


              <Grid item xs={12} sm={12} md={4} marginTop={3}>
                <div className={classes.payment1mobileprepaidbutton}>
                <ColorButton2 onClick={() => handleReset()}>
                      Reset
                    </ColorButton2>
                  <ColorButton1 variant="contained" type="submit">
                    Submit
                  </ColorButton1>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={4} marginTop={3}></Grid>
            </Grid>
            {
              downloadUrl != "" &&
              <Grid item xs={12} sm={12} md={4} marginTop={7}>
                <div className={classes.payment1mobileprepaidbutton}>
                  Dear Customer your {watch("certificateType")?.value} is ready to download
                  {/* <a href={downloadUrl} target="_new">
                  Click Here. 
                </a>to download */}
                  <ColorButton1 variant="contained" type="button" onClick={handleDownloadPDF}>
                    Click Here
                  </ColorButton1>
                </div>
              </Grid>
            }

          </Box>
        </div>
      </div>
      </div>
    </>
  );
};

export default Certificates;
