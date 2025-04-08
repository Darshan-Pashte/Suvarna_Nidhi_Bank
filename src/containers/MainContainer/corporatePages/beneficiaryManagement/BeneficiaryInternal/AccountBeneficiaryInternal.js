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
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from "@mui/lab";



import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import BeneficiaryCard from "../Beneficiary/BeneficiaryCard";
import Loader from "../../../../../components/common/loader";
import BeneficiaryInternalCardCorporate from "./BeneficiaryInternalCard";
import AddBeneficiaryInternalOtp from "./AddBeneficiaryInternalOtp";

import CachedIcon from '@mui/icons-material/Cached';
import { useDebounce } from "../../../../Login/debounce";
import Textfield from "../../../../../components/common/textField";
import GoBackButton from "../../../../../components/common/GoBackButton";
// import { Console } from "console";

const defaultFormData = {
  accnumber: "",
  password: "",
  ifsccode: '',
  nickname: "",
  fullname: "",
  mobilenum: '',
  tpin: "",
  accName: ""
};

const AccountBeneficiaryInternalCorporate = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsloading] = useState(false);
  const [bene, setBene] = useState("");
  const [validateResponse, setValidateResponse] = useState();
  const [validateResponseFalse, setValidateResponseFalse] = useState();
  const [payLoad, setPayload] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState([]);
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

  const debouncedSearchTerm = useDebounce(watch("accnumber"), 3000);

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

  const handleExt = () => {
    window.location.reload()
  }



  // useEffect(() => {
  //   Bene();
  // }, []);

  useEffect(() => {
    if (watch("accnumber") && /^[0-9]{9,32}$/.test(watch("accnumber")))
      validateAccount();
  }, [debouncedSearchTerm]);

  // const handlerefresh = () => {
  //   Bene();
  //   window.location.reload()
  // }


  const validateAccount = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        accNo: watch("accnumber")
      };
      const response = await postApiData(apiList.CORPORATE_INTERNAL_BENE_VALAIDATE, payload);
      console.log("responsevalidate", response);
      if (response?.status == true) {
        setValidateResponse(response);
        setValidateResponseFalse(response.status);
        setValue("accName", response?.data?.acctHolderName)
        setIsloading(false);
      } else {
        SweetAlertPopup(response?.message, "", "error")
        setValue("accnumber", "")
        setValue("accName", "")
        setIsloading(false);
      }
      setIsloading(false);
    } catch (err) {
      console.log("err", err)
    }
  };

  const Bene = async (data) => {
    setIsloading(true);
    const payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      accNo: ""
    };
    const response = await postApiData(apiList.CORPORATE_BENEFICIARYBROWSE, payload);
    // console.log("responseBene", response);
    if (response?.status == true) {
      setBene(response?.data.beneficiary);
    }
    setIsloading(false);
  };

  // const onSubmit = async (data) => {
  //   const payload = {
  //     username: user?.userId,
  //     sessionId: user?.sessionId,
  //     accNo: data.accnumber,
  //     nickname: data.nickname,
  //     mobileNo: data.mobilenum,

  //   };
  //   setIsloading(true);
  //   const response = await postApiData(apiList.CORPORATE_BENEFICIARYADDINTERNAL, payload);
  //   console.log("response", response);
  //   if (response?.status == true) {
  //     SweetAlertPopup(response?.message, "Success", "success")
  //     // handleExt()
  //     setIsloading(false);
  //     // reset();
  //   } else {
  //     SweetAlertPopup(response?.message, "Error", "error")
  //     // handleExt()
  //     setIsloading(false);
  //     // reset();
  //   }
  //   // if (window.location.href.includes("/dashboard")) {
  //   //   window.location.reload();
  //   // }
  // };

  const onSubmit = async (data) => {
    setIsloading(true);
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
    // console.log('data',data)
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
      reset();
      setPayload(data)

      // reset();
    } else {
      SweetAlertPopup(response?.message, "Error", "error")
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


  const filteredbene = bene && bene.filter((item) => item.beneType == "I");

  return (
    <>

      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Add Within Bank Beneficiary
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
        {/* <div className={classes.accountlimitimpxheading}>Add Within Bank Beneficiary</div> */}
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
                    {/* <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "accnumber",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Account Number",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}
                          inputProps: { minLength: 9, maxLength: 32 },
                        }}
                        // backgroundColor={true}
                        // regExp={/^(?!0+$)\d+$/}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Account Number " +
                            errorMessages.error_autocomplete_message,
                          pattern: {
                            value: /^(?!0+$)\d{9,32}$/,
                            message: "Please Enter a valid Account Number",
                          },
                        }}
                        required={true}
                      /> */}
                    <Controller
                      name="accnumber" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "Account Number " +
                          errorMessages.error_autocomplete_message,
                        pattern: {
                          // value: /^(?!0+$)\d{9,32}$/,
                          value: /^[a-zA-Z0-9]{1,32}$/, 
                          // value: /^[a-zA-Z0-9]{1,32}$/,
                          message: "Please Enter a valid Account Number",
                        },
                      }}
                      render={({ field, fieldState }) => {
                        
                        const handleInputChange = (event) => {
                          const regex = /^[a-zA-Z0-9]*$/; // Alphanumeric regex
                          const { value } = event.target;
                    
                          // Restrict input to valid alphanumeric characters and a maximum of 32
                          if (!regex.test(value)) {
                            event.preventDefault();
                            return;
                          }
                    
                          if (value.length > 32) {
                            return; // Prevent typing beyond 32 characters
                          }
                    
                          field.onChange(value); 
                        //   // const regex = /^[0-9]+$/;
                        //   const regex = /^[a-zA-Z0-9]*$/;
                        //   const { name, value } = event.target;
                        //   const uppercaseValue = value.toUpperCase();
    
                        //   const isValidInput =
                        //     regex.test(uppercaseValue) || uppercaseValue === "";
    
                        //   if (!isValidInput) {
                        //     event.preventDefault();
                        //     return;
                        //   }
                        //   field.onChange(uppercaseValue);
                        };
                        return (
                          <Textfield
                            id="standard-adornment-password"
                            fullWidth="true"
                            disabled={validateResponseFalse ? true : false}
                            placeholder="Account Number"
                            // type={showPassword ? "text" : "password"}
                            {...field} // Spread the 'field' props to bind it to the form's state
                            sx={{
                              "& fieldset": { border: "none" },
                              ".MuiInputBase-root": {
                                borderRadius: "6px",
                                padding: "4px 8px",
                                height: "30px",
                                //   backgroundColor: "rgb(238, 239, 247)",
                                backgroundColor: !validateResponseFalse ? "#FFF" : "#EEEFF7",
                                fontSize: "13px",

                                color: "#888",
                                fontWeight: "500",
                                border: "1px solid",
                                marginTop: '4px',
                                "@media (max-width: 568px)": {
                                  padding: "20px 10px"
                                },
                                //   width:'130%'
                              },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                  // onClick={handleClickShowPassword}
                                  // onMouseDown={handleMouseDownPassword}
                                  >
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                              inputProps: { minLength: 1, maxLength: 32 },
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            onChange={handleInputChange}

                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </Grid>

              {/* <Grid item xs={12} sm={6} md={4}>
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
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter IFSC Code",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          inputProps: { maxLength: 11 },
                        }}
                        backgroundColor={true}
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
                </Grid> */}

              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Holder Name in CBS
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
                        placeholder: " Account Holder Name",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        disabled: true
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      // rules={{
                      //   required:
                      //     "Nickname" + errorMessages.error_autocomplete_message,
                      // }}
                      required={false}
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
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Enter Nickname",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        inputProps: {
                          maxLength: 10
                        }
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      // backgroundColor={true}
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

              {/* <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
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
                        placeholder: "Enter TPIN",
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
                </div>
              </Grid> */}
              <Grid item xs={12} sm={12} md={6} marginTop={3}>
                <div className={classes.payment1mobileprepaidbutton}>
                  <ColorButton2 variant="contained" type="button" onClick={reset}>
                    Reset
                  </ColorButton2>
                  {/* <ColorButton1 variant="contained" type="submit" disabled={validateResponse?.status == true ? false : true}>
                      Add Beneficiary
                    </ColorButton1> */}
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    disabled={validateResponse?.status == true ? false : true}
                    loading={isLoading}
                    // disabled={watch(defaultFormData) !== "" ? true: false}
                    sx={{
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
                    }}
                  >
                    Add Beneficiary
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
          </div>

        </Box>
        {/* <div className={classes.accountBeneficiaryuppercontainer}>
            <div className={classes.uppercontainerheading}>Within Bank Beneficiary List</div>
            <div className={classes.uppercontainercontent}>
              {filteredbene &&
                filteredbene.map((benelist, index) => {
                  return (
                    <BeneficiaryInternalCardCorporate
                      benelist={benelist}
                      index={index}
                      accno={watch("accno")?.value}
                    />
                  );
                })}
            </div>
          </div> */}
        {open ? (
          <AddBeneficiaryInternalOtp
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
export default AccountBeneficiaryInternalCorporate;
