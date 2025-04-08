import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../../../../Login/Login.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { Grid, TextField, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Textfield from "../../../../../components/common/textField";
import { useDebounce } from "../../../../Login/debounce";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
  backgroundColor: "#323232",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "183px",
  height: "50px",
  "&:hover": {
    background: "#808080",
    color: "white",
  },
}));

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
    background: "var(--button-hover-color)",
    color: "white",
  },
}));

const defaultFormData = {
  accnumber: "",
  nickname: "",
  mobilenum: "",
  tpin: "",
};

export default function AddinternalBeneficiary({ open, handleClose, userId }) {
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

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const debouncedSearchTerm = useDebounce(watch("accnumber"), 3000);

  React.useEffect(() => {
    setValue("username", userId);
    // setLastLogin(sessionStorage.getItem("lastLogin"))
  }, []);

  const [verificationResult, setVerificationResult] = useState(null);
  const [messege, setMessege] = useState();
  const [messegeColor, setMessegeColor] = useState();
  // Watch the account number field
  const accountNumber = watch("accnumber");

  const [tpin, setTpin] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const [showPassword1, setShowPassword1] = React.useState(false);

  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();

  const [isOtpEntered, setIsOtpEntered] = useState(false);

  const [isloading, setIsloading] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  // const [userName, setUserName] = React.useState("");

  // React.useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"))
  // }, []);

  const handleExt = () => {
    window.location.reload();
  };

  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: data.accnumber,
      nickname: data.nickname,
      mobileNo: data.mobilenum,
      tpin: data.tpin,
    };
    setIsloading(true);
    const response = await postApiData(apiList.BENEFICIARYADDINTERNAL, payload);
    // console.log("response", response);
    if (response?.status == true) {
      handleClose();
      SweetAlertPopup(response?.message, "Success", "success");
      reset();
      setIsloading(false);
    } else if (response?.data?.tpinAttempt >= 0) {
      SweetAlertPopup(
        response?.message +
          "\n" +
          (response?.data?.tpinAttempt + 1) +
          " Attempts Remaining",
        "Error",
        "error"
      );
      setIsloading(false);
    } else {
      handleClose();

      SweetAlertPopup(response?.message, "Error", "error");
      // handleExt()
      //   Bene()
      setIsloading(false);
      // reset();
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
  };

  // console.log("userId", userId);

  // React.useEffect(() => {
  //   // Function to verify the account number
  //   const verifyAccountNumber = async () => {
  //     setISloading(true);
  //     const payload = {
  //       accNo: watch("accnumber") ? watch("accnumber") : "",
  //       custNo: user?.userId,
  //       sessionId: user?.sessionId,
  //     };
  //     try {
  //       const response = await postApiData(
  //         apiList.VERIFYINTERNALBENEFICIARY,
  //         payload
  //       );
  //       setVerificationResult(response.data);
  //       setMessege(response.message);
  //       setMessegeColor(response.status);
  //       console.log("verify", response);
  //     } catch (error) {
  //       console.error("Error verifying account number:", error);
  //       setVerificationResult({
  //         success: false,
  //         message: "Verification failed",
  //       });
  //     }
  //   };

  //   // Check if the account number is valid before making the API call
  //   if (accountNumber && /^[0-9]{9,32}$/.test(accountNumber)) {
  //     verifyAccountNumber();
  //   }
  // }, [debouncedSearchTerm]);

  const verifyAccountNumber = async () => {
    setIsloading(true);
    const payload = {
      accNo: watch("accnumber"),
      custNo: user?.userId,
      sessionId: user?.sessionId,
    };
    try {
      const response = await postApiData(
        apiList.VERIFYINTERNALBENEFICIARY,
        payload
      );
      if (response.status) {
        setVerificationResult(response.data);
        setMessege(response.message);
        setMessegeColor(response.status);
        setValue("accName", response?.data?.acctHolderName)
        console.log("verify", response);
        setIsloading(false);
      }else{
        SweetAlertPopup(response?.message, "", "error")
        setValue("accnumber", "")
        setValue("accName", "")
        setIsloading(false);
      }
      setIsloading(false);
    } catch (error) {
      console.error("Error verifying account number:", error);
      setVerificationResult({
        success: false,
        message: "Verification failed",
      });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className={classes.box1}
          // className={classes.mainbox}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.firsttabinfo} style={{ width: "100%" }}>
            <div className={classes.otpContent}>
              <div className={classes.modalupperheading}>Add Beneficiary</div>
              <div className={classes.cancelButton}>
                <IconButton aria-label="delete" onClick={handleClose}>
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </div>
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
                    placeholder: "Enter Account Number ",
                    //   style: { width: "130%" },
                    fullWidth: true,
                    // style:{border:'3px solid #ECECEC'}
                    inputProps: { minLength: 9, maxLength: 32 },
                  }}
                  // backgroundColor={true}
                  regExp={/^[0-9]+$/}
                  rules={{
                    required: "Account Number is required",
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
                        disabled={messegeColor ? true : false}
                        fullWidth="true"
                        placeholder="Account Number"
                        // type={showPassword ? "text" : "password"}
                        {...field} // Spread the 'field' props to bind it to the form's state
                        sx={{
                          "& fieldset": { border: "none" },
                          ".MuiInputBase-root": {
                            borderRadius: "6px",

                            height: "30px",
                            //   backgroundColor: "rgb(238, 239, 247)",
                            backgroundColor: !messegeColor ? "#FFF" : "#EEEFF7",
                            fontSize: "13px",

                            color: "#888",
                            fontWeight: "500",
                            border: "1px solid",
                            marginTop: "4px",
                            "@media (max-width: 600px)": {
                              padding: "20px 0px 20px 0px",  
                            },
                            //   width:'130%'
                          },
                        }}
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton
                        //         aria-label="toggle password visibility"
                        //         // onClick={handleClickShowPassword}
                        //         // onMouseDown={handleMouseDownPassword}
                        //       >
                        //         <SearchIcon onClick={verifyAccountNumber} />
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        //   inputProps: { minLength: 9, maxLength: 32 },
                        // }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={handleInputChange}
                      />
                    );
                  }}
                />
              </div>
              <div
                className={
                  messegeColor
                    ? `${classes.trueresponse}`
                    : `${classes.falseresponse}`
                }
              >
                {messege}
              </div>
            </div>

            {messegeColor ? (
              <>
               <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Holder Name in CBS
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
                          placeholder: " Account Holder Name in CBS",
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
                        inputProps: { maxLength: 10 },
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      // backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      // regExp={/^[a-zA-Z0-9 ]+$/}

                      //   rules={{
                      //     required:
                      //       "Nickname" + errorMessages.error_autocomplete_message,
                      //       pattern: {
                      //         value: /^[0-9]{10}$/,
                      //         message: "Please Enter valid Mobile Number",
                      //       },
                      //   }

                      // }

                      rules={{
                        required:
                          "Nickname" + errorMessages.error_autocomplete_message,
                        pattern: {
                          value: /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/,
                          message:
                            "Please enter a combination of letters and numbers",
                        },
                      }}
                      required={true}
                    />
                  </div>
                </div>

                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Mobile Number
                    {/* <sup className={classes.required}>*</sup> */}
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
                        inputProps: { maxLength: 10 },
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9]+$/}
                      rules={{
                        pattern: {
                          value: /^(?!0+$)\d{10}$/,
                          message: "Please Enter valid Mobile Number",
                        },
                      }}
                      required={true}
                    />
                  </div>
                </div>

                <div className={classes.grid4title}>
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
                              height: "34px",
                              color: "#888",
                              fontWeight: "500",

                              // width: '520px',
                              padding: "16px 0px",
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
              </>
            ) : null}
          </div>

          {!messegeColor && (
            <div className={classes.payment1mobileprepaidbutton}>
              <div className={classes.button} style={{ padding: "0" }}>
                <LoadingButton
                  onClick={verifyAccountNumber}
                  variant="contained"
                  type="button"
                  disabled = {!watch('accnumber') ? true : false}
                  // disabled={messegeColor ? false : true}
                  loading={isloading}
                  sx={{
                    color: "#FFFFFF",
                    // color:'var(--button-color)',
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    backgroundColor: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "175px",
                    height: "37px",
                    "&:hover": {
                      // background: "#808080",
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
                  }}
                >
                  Validate
                </LoadingButton>
              </div>
            </div>
          )}

          {messegeColor && (
            <div className={classes.payment1mobileprepaidbutton}>
              {/* <ColorButton2 variant="contained" type="button" onClick={reset}>
              Reset
            </ColorButton2> */}
              {/* <ColorButton1 variant="contained" type="submit">
              Add Beneficiary
            </ColorButton1> */}

              <div className={classes.button} style={{ padding: "0" }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  disabled={messegeColor ? false : true}
                  loading={isloading}
                  // disabled={watch(defaultFormData) !== "" ? true: false}
                  sx={{
                    color: "#FFFFFF",
                    // color:'var(--button-color)',
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    backgroundColor: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "175px",
                    height: "37px",
                    "&:hover": {
                      // background: "#808080",
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
                  }}
                >
                  Add Beneficiary
                </LoadingButton>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
