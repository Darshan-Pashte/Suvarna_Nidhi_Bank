import * as React from "react";
import Box from "@mui/material/Box";
import classes from "./ForgetPassword.module.css";
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
import { useDispatch } from "react-redux";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { errorMessages } from "../../components/utilities/formValidation";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import { LoadingButton } from "@mui/lab";
import TimerComponent from "../../components/common/TimerComponent";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 380,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: "30px",
// };

const ColorButton1 = styled(Button)(({ theme }) => ({
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
  // backgroundColor: "#323232",
  background: "var(--button-color)",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "143px",
  height: "35px",
  "&:hover": {
    background: "#808080",
    color: "white",
  },
}));

const defaultFormData = {
  username: "",
  password: "",
  cpassword: "",
};

export default function ForgetPassOTP({
  open,
  handleOpen,
  handleClose,
  userId,
  payloads,
  custNo,
  response,
}) {
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

  React.useEffect(() => {
    setValue("username", userId);
    // setLastLogin(sessionStorage.getItem("lastLogin"))
  }, []);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordfirst, setShowPasswordfirst] = React.useState(false);

  const [otp, setOtp] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordfirst = () =>
    setShowPasswordfirst((show) => !show);

  const [isloading, setloading] = useState(false);
  const [tries, setTries] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const inputRefs = React.useRef([]);


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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    '@media (max-width: 568px)': {
      // width: 280,
      height: "100%",
      gap: "10px",
      display:"flex",
      justifyContent:"center",
      padding: "2px 28px 2px 28px"
    },
  };




  const handleFocus = () => {
    // Clear the input value on focus
    setOtp("");
    setIsOtpEntered(false);
  };

  // const [userName, setUserName] = React.useState("");

  // React.useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"))
  // }, []);
  // console.log("payloads",payloads);
console.log("username", custNo)
  function handleResetPass() {
    navigate("/auth/login", { state: { custNo: custNo, otp: otp } });
  }

  const onSubmits = async (data) => {
    const payload = {
      username: custNo,
      otp: otp,
      newpassword: data.confirmpassword,
    };
    setloading(true);
    const response = await postApiData(
      apiList.CORPORATE_SET_NEW_PASSWORD,
      payload
    );
    // console.log(response, "response")
    if (response?.status == true) {
      handleClose();
      handleResetPass();
      SweetAlertPopup(response.message, "Success", "success");
      setloading(false);
    }
    else if (response.status == false) {
      if (response?.respCode == "OE") {
        popupAlert(response.message, "Error", "error");
        setloading(false);
        handleClose();
        handleFocus();
        setloading(false);
        reset();
      } else {
        setloading(false);
        // handleClose();
        handleFocus();
        //  popupAlert(response.message, "Error", "error")
        // seShowtMsg(true)
        setMsg(response.message);
        setTries(response?.data?.otpAttempt + 1);
        //   handleClose();
        SweetAlertPopup(response.message, "Error", "error");
        setloading(false);
      }
    }
    reset()
  };

  const passwordMatchValidation = (value) => {
    const newPassword = getValues("password");
    return (
      newPassword === value ||
      "New password and confirm password does not match !"
    );
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && otp[index] === '') { // Backspace key code is 8
      if (index !== 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
         sx={style}
          component={"form"}
          onSubmit={handleSubmit(onSubmits)}
          className={classes.mainbox}
          style={{ borderRadius: "16px" }}
        >
          <div className={classes.otpContent}>
            <div className={classes.otpheading}>OTP Verification</div> <div className={classes.cancelButton}>
              <IconButton aria-label="delete" onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.otpheading1}>
            Enter the verification code we just sent to your number.
          </div>

          <OTPInput
            value={otp}
            onChange={(otpValue) => {
              const otpVal= otpValue.replace(/\D/g, ''); // Remove non-numeric characters
              setOtp(otpVal);
              setIsOtpEntered(otpVal.length > 3);
            }}

            numInputs={4}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
      
            inputType="password"
            inputStyle={{
              width: "60px",
              marginBottom: "10px",
              marginTop: "10px",
              height: "50px",
              fontSize: "20px",
              borderRadius: "9px",
              borderColor:
                "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
            }}
            containerStyle={{
              display: "flex",
              justifyContent: "space-between",
            }}
          />
          {tries ? (
            <div style={{ color: "red", marginTop: "-10px" }}>
              You have {tries} attempt left
            </div>
          ) : null}
          <TimerComponent
            Case="Minutes"
            setOtp={handleClose}
            Time={response?.otpTime}
          />

          <div className={classes.frowdataaff} style={{ width: "100%" }}>
            <div className={classes.frowtextaff}>
              Password
              <sup className={classes.required}>*</sup>
            </div>

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required:
                  "Password " + errorMessages.error_autocomplete_message,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,16}$/,
                    message: "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character (!@#$^&*._|-), and be between 8 and 16 characters in length.",
                  },
              }}
              render={({ field, fieldState }) => {
                const handleInputChange = (event) => {
                  // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                  // const regex = /^[a-zA-Z$@#.&0-9*/-]+$/;
                  const regex = /^[a-zA-Z0-9!@#$^&*._|-]+$/;
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
                    placeholder="Please Enter Password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    sx={{
                      "& fieldset": { border: "none" },
                      ".MuiInputBase-root": {
                        marginTop: "3px",
                        borderRadius: "6px",
                        position: "relative",
                        backgroundColor: "#FFF",
                        // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                        border: "1px solid",
                        fontSize: "13px",
                        height: "2px",
                        color: "#888",
                        fontWeight: "500",
                        padding: "16px 0px",
                      },
                    }}
                    inputProps={{ minLength: 3, maxLength: 16 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={handleInputChange}
                  />
                );
              }}
            />
          </div>

          <div className={classes.frowdataaff} style={{ width: "100%" }}>
            <div className={classes.frowtextaff}>
              Confirm Password
              <sup className={classes.required}>*</sup>
            </div>

            <Controller
              name="confirmpassword"
              control={control}
              defaultValue=""
              rules={{
                required:
                  "Password " + errorMessages.error_autocomplete_message,
                  // pattern: {
                  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,16}$/,
                  //   message: "",
                  // },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,16}$/,
                    message: "",
                  },
                validate: passwordMatchValidation,
              }}
              render={({ field, fieldState }) => {
                const handleInputChange = (event) => {
                  // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                  // const regex = /^[a-zA-Z$@#.&0-9*/-]+$/;
                  const regex = /^[a-zA-Z0-9!@#$^&*._|-]+$/;
                  const { name, value } = event.target;
                  const isValidInput = regex.test(value) || value === "";
                  if (!isValidInput) {
                    event.preventDefault();
                    return;
                  }
                  field.onChange(value);
                };

                const preventCopyPaste = (event) => {
                  event.preventDefault();
                };

                return (
                  <TextField
                    id="standard-adornment-password"
                    fullWidth="true"
                    placeholder="Confirm Password"
                    type={showPasswordfirst ? "text" : "password"}
                    {...field}
                    sx={{
                      "& fieldset": { border: "none" },
                      ".MuiInputBase-root": {
                        marginTop: "3px",
                        borderRadius: "6px",
                        position: "relative",
                        backgroundColor: "#FFF",
                        // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                        border: "1px solid",
                        fontSize: "13px",
                        height: "2px",
                        color: "#888",
                        fontWeight: "500",
                        padding: "16px 0px",
                      },
                    }}
                    inputProps={{ minLength: 3, maxLength: 16, onCopy: preventCopyPaste, onPaste: preventCopyPaste }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordfirst}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPasswordfirst ? (
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
                  />
                );
              }}
            />
          </div>

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isloading}
            disabled={!isOtpEntered}
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
              width: "115px",
              height: "32px",
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
                width: "95%",
                height: "38px",
              },
            }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
