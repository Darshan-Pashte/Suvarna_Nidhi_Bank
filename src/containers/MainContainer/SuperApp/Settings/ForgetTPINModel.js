import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../../../Login/Login.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { errorMessages } from "../../../../components/utilities/formValidation";

import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { TextField, styled } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import Loader from "../../../../components/common/loader";
import { useState } from "react";
// import { loginSuccess } from "../../store/authSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoadingButton } from "@mui/lab";
import OTPInput from "react-otp-input/lib";
import TimerComponent from "../../../../components/common/TimerComponent";
import { logout } from '../../../../../src/store/authSlice';
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  borderRadius: "17px",
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

const ColorButton1 = styled(LoadingButton)(({ theme }) => ({
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
}));

const defaultFormData = {
  username: "",
  password: "",
  cpassword: "",
};

export default function ForgetTPINModal({
  openTPIN,
  handleCloseTPIN,
  msg,
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

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const { userType } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);

  const [showPassword1, setShowPassword1] = React.useState(false);

  const [showPassword2, setShowPassword2] = React.useState(false);

  const [isLoading, setIsloading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleFocus = () => {
    // Clear the input value on focus
    setOtp("");
    setIsOtpEntered(false);
  };

  const [isOtpEntered, setIsOtpEntered] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const dispatch = useDispatch();

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
  const handleLogout = async (data) => {
    if (userType === "corporate") {
        try {
            setIsloading(true);
            const payload = {
                username: user?.userId,
                sessionId: user?.sessionId
            };
            const response = await postApiData(apiList.LOGOUT, payload);
            console.log(response);
            if (response?.status === true) {
                dispatch(logout());
                navigate("/auth/login");
                setIsloading(false);
            }
        } catch (error) {
            console.log("An error occurred");
            setIsloading(false);
        }
    } else {
        try {
            setIsloading(true);
            const payload = {
                custNo: user?.userId,
                sessionId: user?.sessionId
            };
            const response = await postApiData(apiList.LOGOUT_INTERNET, payload);
            console.log(response);
            if (response?.status === true) {
                dispatch(logout());
                navigate("/auth/login");
                setIsloading(false);
            }
        } catch (error) {
            console.log("An error occurred");
            setIsloading(false);
        }
    }
};

  const onSubmits = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      otp: otp,
      oldTpin: data.oldtpin,
      tpin: data.newpassword,
    };
    setIsloading(true);
    const response = await postApiData(apiList.FORGOTTPIN, payload);
    if (response.status == true) {
      handleCloseTPIN();
      SweetAlertPopup(response.message, "Success", "success");
      setIsloading(false);
      await handleLogout(data);
    } else {
      handleCloseTPIN();
      SweetAlertPopup(response.message, "Error", "error");
      setIsloading(false);
    }
  };

  const passwordMatchValidation = (value) => {
    const newPassword = getValues("newpassword");
    return newPassword === value || "New TPIN and confirm TPIN does not match!";
  };

  //   rules={{
  //     required: "Password " + errorMessages.error_autocomplete_message,
  //     pattern: {
  //       // value: /^\d{4}$/,
  //       value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  //       message: "Password does not meet requirements",
  //     },
  //     validate: passwordMatchValidation,
  //   }}

  return (
    <div>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <Modal
        open={openTPIN}
        // onClose={handleCloseTPIN}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component={"form"}
          onSubmit={handleSubmit(onSubmits)}
          className={classes.mainbox}
        >
          <div className={classes.otpContent}>
            <div className={classes.updatetpinheader}>Forgot TPIN</div>
            <div className={classes.cancelButton}>
              <IconButton aria-label="delete" onClick={handleCloseTPIN}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          </div>
          <div
            style={{
              color: "var(--button-color)",
              fontWeight: "500",
              margin: "-15px 0",
            }}
          >
            {msg}
          </div>

          <div className={classes.updatepass}>
            Enter OTP<sup className={classes.required}>*</sup>
          </div>
          <OTPInput
            value={otp}
            // onChange={setOtp}

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
              // borderColor:'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
            }}
            containerStyle={{
              display: "flex",
              justifyContent: "space-between",
            }}
          />
          <TimerComponent
            Case="Minutes"
            setOtp={handleCloseTPIN}
            Time={response?.otpTime}
          />
          <div className={classes.updatepass}>
            New TPIN<sup className={classes.required}>*</sup>
          </div>
          <Controller
            name="newpassword"
            control={control}
            defaultValue=""
            // regExp={/^[0-9]*$/}

            rules={{
              required: "  Tpin " + errorMessages.error_autocomplete_message,
              inputProps: { maxLength: 4 },
              pattern: {
                value: /^\d{4}$/,
                message: "Please Enter valid TPIN",
              },
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                const regex = /^[0-9]*$/;
                const { name, value } = event.target;

                // Additional check to disallow entry of "0000"
                if (value === "0000") {
                  event.preventDefault();
                  return;
                }

                const isValidInput = regex.test(value) || value === "";
                if (!isValidInput) {
                  event.preventDefault();
                  return;
                }
                field.onChange(value);

                // const { name, value } = event.target;
                // const isValidInput = regex.test(value) || value === "";
                // if (!isValidInput) {
                //   event.preventDefault();
                //   return;
                // }
                // field.onChange(value);
              };
              return (
                <TextField
                  id="standard-adornment-password"
                  fullWidth="true"
                  placeholder="Please Enter New TPIN"
                  type={showPassword1 ? "text" : "password"}
                  {...field}
                  inputProps={{ maxLength: 4 }}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
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

          <div className={classes.updatepass}>
            Confirm TPIN <sup className={classes.required}>*</sup>
          </div>
          <Controller
            name="confirmpass"
            control={control}
            defaultValue=""
            rules={{
              required: "TPIN " + errorMessages.error_autocomplete_message,
              pattern: {
                value: /^\d{4}$/,
                message: "Please Enter valid TPIN",
              },
              validate: passwordMatchValidation,
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                const regex = /^[0-9]*$/;
                const { name, value } = event.target;

                // Additional check to disallow entry of "0000"
                if (value === "0000") {
                  event.preventDefault();
                  return;
                }

                const isValidInput = regex.test(value) || value === "";
                if (!isValidInput) {
                  event.preventDefault();
                  return;
                }
                field.onChange(value);

                // const { name, value } = event.target;
                // const isValidInput = regex.test(value) || value === "";
                // if (!isValidInput) {
                //   event.preventDefault();
                //   return;
                // }
                // field.onChange(value);
              };
              return (
                <TextField
                  id="standard-adornment-password"
                  fullWidth="true"
                  placeholder="Please Confirm TPIN"
                  type={showPassword2 ? "text" : "password"}
                  {...field}
                  inputProps={{ maxLength: 4 }}
                  sx={{
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": {
                      marginTop: "3px",
                      borderRadius: "6px",
                      position: "relative",
                      // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                      backgroundColor: "#FFF",
                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",

                      border: "1px solid",
                      // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                      // borderColor: 'red',
                      fontSize: "13px",
                      height: "2px",
                      color: "#888",
                      fontWeight: "500",

                      // width: '520px',
                      padding: "16px 0px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
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

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            disabled={!isOtpEntered}
            sx={{
              color: "#FFFFFF",
              // backgroundColor: "#F84B67",
              // backgroundColor: "#323232",
              background: "var(--button-color)",
              border: "1px solid #CCC",
              borderRadius: "8px",
              paddingLeft: "15px",
              paddingRight: "15px",
              width: "133px",
              height: "35px",
              "&:hover": {
                background: "var(--button-hover-color)",
                color: "white",
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
