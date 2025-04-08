import React from "react";
import classes from "./AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Tooltip } from "@mui/material";
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
import BeneficiaryCard from "./BeneficiaryCard";
import Loader from "../../../../../components/common/loader";
import BeneficiaryExternalCardCorporate from "./BeneficiaryCard";
import AddBeneficiaryOtp from "./AddBeneficiaryOtp";

import CachedIcon from '@mui/icons-material/Cached';
import GoBackButton from "../../../../../components/common/GoBackButton";

const defaultFormData = {
  accnumber: "",
  ifsccode: '',
  nickname: "",
  fullname: "",
  mobilenum: '',
};

const AccountBeneficiaryCorporate = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsloading] = useState(false);
  const [bene, setBene] = useState("");

  const [response, setResponse] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [payLoad, setPayload] = useState([]);
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
  // const [passwordInput, setPasswordInput] = useState('password')


  // const handlerefresh = () => {
  //   Bene();
  // }


  // useEffect(() => {
  //   Bene();

  // }, []);

  const Bene = async (data) => {
    const payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      accNo: ""
    };
    setIsloading(true);
    const response = await postApiData(apiList.CORPORATE_BENEFICIARYBROWSE+"?pageNo=1&pageSize=10000", payload);
    // console.log("responseBene", response);
    if (response?.status == true) {
      setBene(response?.data.beneficiary);
    }
    setIsloading(false);
  };

  const onSubmit = async (data) => {
    const payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      smsType: "COR_ADD_BENEFICIARY"

      // accNo: data.accnumber,
      // ifsc: data.ifsccode,
      // nickname: data.nickname,
      // fullname: data.fullname,
      // mobileNo: data.mobilenum,
      // tpin : data.tpin
      // otp: otp,
    };
    // console.log('data', data)
    setIsloading(true);
    const response = await postApiData(apiList.CORPORATE_BULKUPLOAD_OTP, payload);
    // console.log("response", response);
    // handleOpen()
    if (response?.status == true) {
      setResponse(response)
      handleOpen()
      // SweetAlertPopup(response?.message, "Success", "success")
      // handleClose()  
      // handleExt()
      setIsloading(false);

      setPayload(data)

      reset();
    } else {
      // SweetAlertPopup(response?.message, "Error", "error")
      // handleExt()
      setIsloading(false);
      // reset();
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    backgroundColor: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
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
      width: "90%",
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
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "#FFF",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "90%",
      height: "38px",
    },
  }));

  const filteredbene = bene && bene.filter((item) => item.beneType == "E");

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
            Add Other Bank Beneficiary
            </div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>

          {/* <Button disabled={isLoading} className={classes.refreshIcon}>
            <Tooltip title="Refresh">
              <IconButton>
                <CachedIcon onClick={handlerefresh} />
              </IconButton>
            </Tooltip>

          </Button> */}
          {/* <div className={classes.accountlimitimpxheading}>Add Other Bank Beneficiary</div> */}
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
                          name: "accnumber",
                        }}
                        TextFieldProps={{
                          placeholder: "Account Number ",
                          fullWidth: true,
                          inputProps: { minLength: 1, maxLength: 32 },
                        }}
                        // backgroundColor={true}
                        // regExp={/^[0-9]*$/}
                        regExp={/^[a-zA-Z0-9]{1,32}$/}
                        rules={{
                          required:
                            "  Account Number " +
                            errorMessages.error_autocomplete_message,
                          // pattern: {
                          //   value: /^[a-zA-Z0-9]{1,32}$/,
                          //   value: /^(?!0+$)\d{9,32}$/,
                          //   message: "Please Enter a valid Account Number",
                          // },
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      IFSC Code
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "ifsccode",
                        }}
                        TextFieldProps={{
                          placeholder: "IFSC Code",
                          fullWidth: true,
                          inputProps: { maxLength: 11 },
                        }}
                        // backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "  Beneficiary IFSC  " +
                            errorMessages.error_autocomplete_message,

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

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Nickname
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "nickname",
                        }}
                        TextFieldProps={{
                          placeholder: "Nickname",
                          fullWidth: true,
                          inputProps: {
                            maxLength: 10
                          }
                        }}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "Nickname" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Full Name
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "fullname",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          placeholder: "Full Name",
                          fullWidth: true,
                          inputProps: {
                            maxLength: 50
                          }
                        }}
                        regExp={/^[a-zA-Z ]+$/}
                        rules={{
                          required:
                            " Full Name" +
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
                      Mobile Number
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "mobilenum",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Mobile Number",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          inputProps: {
                            minLength: 10,
                            maxLength: 10
                          }
                        }}
                        // backgroundColor={true}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Mobile Number" +
                        //     errorMessages.error_autocomplete_message,
                        //   pattern: {
                        //     value: /^[0-9]{10}$/,
                        //     message: "Please Enter valid Mobile Number",
                        //   },
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>



                <Grid item xs={12} sm={12} md={12}></Grid>

                <Grid item xs={12} sm={12} md={12}></Grid>
              </Grid>
            </div>

            <div className={classes.payment1mobileprepaidbutton}>
              <ColorButton2 variant="contained" type="button" onClick={reset}>
                Reset
              </ColorButton2>
              <ColorButton1 variant="contained" type="submit">
                Add Beneficiary
              </ColorButton1>
            </div>
          </Box>
          {/* <div className={classes.accountBeneficiaryuppercontainer}>
            <div className={classes.uppercontainerheading}>Other Bank Beneficiary List</div>
            <div className={classes.uppercontainercontent}>
              {filteredbene &&
                filteredbene.map((benelist, index) => {
                  return (
                    <BeneficiaryExternalCardCorporate
                      benelist={benelist}
                      index={index}
                      accno={watch("accno")?.value}
                    />
                  );
                })}
            </div>
          </div> */}
            {open ? (
              <AddBeneficiaryOtp
                open={open}
                handleClose={handleClose}
                payLoad={payLoad}
                response={response}
              // fileData={airtelFile}
              // airtelFileUpload={airtelFileUpload}
              // setAirtelFile={setAirtelFile}
              />
            ) : null}
        </div>

    </>
  );
};

export default AccountBeneficiaryCorporate;
