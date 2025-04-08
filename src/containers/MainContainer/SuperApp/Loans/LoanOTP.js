import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../../../Login/Login.module.css";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { TextField, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import OTPInput from "react-otp-input";
import { useState } from "react";
import Loader from "../../../../components/common/loader";
import TimerComponent from "../../../../components/common/TimerComponent";

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

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
  backgroundColor: "var(--button-color)",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "183px",
  height: "50px",
  "&:hover": {
    background: "var(  --button-hover-color)",
    color: "white",
  },
}));

const defaultFormData = {
  username: "",
  password: "",
  cpassword: "",
};

export default function LoanOTP({
  open,
  handleClose,
  responseData,
  payloads,
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
    setValue("username", responseData);
    // setLastLogin(sessionStorage.getItem("lastLogin"))
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);
  const [otp, setOtp] = useState("");
  // const [isLoading, setisLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();

  const [isLoading, setIsloading] = useState(false);

  const [isOtpEntered, setIsOtpEntered] = useState(false);

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
  // console.log("payloads",payloads);
  // console.log("responseData",responseData);
  // console.log("otp",otp);

  const onSubmits = async (data) => {
    setIsloading(true);
    const payload = {
      custNo: payloads?.custNo,
      sessionId: payloads?.sessionId,
      accNo: payloads.accNo,
      tpin: payloads?.tpin,
      amount: payloads?.amount,
      brCode: payloads?.brCode,
      loanActno: payloads?.loanActno,
      loanBrCode: payloads?.loanBrCode,
      remark: payloads?.remark,
      rrno: responseData?.rrn,
      strotp: otp,
    };

    // console.log("payload",payload);
    const response = await postApiData(apiList.LOANPAYMENT, payload);
    if (response?.status == true) {
      setIsloading(false);
      handleClose();
      popupAlert(response.message, "Success", "success");
      reset();
      setIsloading(false);
    } else {
      setIsloading(false);
      popupAlert(response.message, "Error", "error");
      setIsloading(false);
    }
  };

  return (
    <div>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

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
        >
          <div className={classes.updatepass}>Please Enter OTP</div>
          <OTPInput
            value={otp}
            // onChange={setOtp}

            onChange={(otpValue) => {
              const otpVal= otpValue.replace(/\D/g, ''); // Remove non-numeric characters
              setOtp(otpVal);
              setIsOtpEntered(otpVal.length > 3);
            }}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputType="password"
            inputStyle={{
              width: "70px",
              marginBottom: "10px",
              marginTop: "10px",
              height: "70px",
              fontSize: "20px",
              borderRadius: "5px",
              borderColor:
                "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
            }}
            containerStyle={{
              display: "flex",
              justifyContent: "space-between",
            }}
          />
          <TimerComponent
            Case="Minutes"
            setOtp={handleClose}
            Time={response?.otpTimer}
          />
          <ColorButton
            loading={isLoading}
            variant="contained"
            type="submit"
            disabled={!isOtpEntered}
          >
            Submit
          </ColorButton>
        </Box>
      </Modal>
    </div>
  );
}
