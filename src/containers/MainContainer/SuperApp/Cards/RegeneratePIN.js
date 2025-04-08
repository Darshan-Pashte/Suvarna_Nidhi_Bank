import React from "react";
import classes from "../Cards/Cards.module.css";
import axios from "axios";

import {
  Box,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
  Typography,
  MuiAlert,
  Stack,
} from "@mui/material";

import { useContext, useState } from "react";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OTPInput from "react-otp-input";

import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";

import Loader from "../../../../components/common/loader";
import TimerComponent from "../../../../components/common/TimerComponent";
import styled from "styled-components";

const RegeneratePIN = ({ cardNumber }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log("resp", cardNumber)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [otp, setOtp] = useState("");
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [newPin, setNewPin] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState("");
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [isOtpEntered1, setIsOtpEntered1] = useState(false);

  const validateExpiryDate = (expiryDate) => {
    const month = expiryDate.substring(2, 4);
    const year = expiryDate.substring(0, 2);

    if (month < "01" || month > "12") {
      return false;
    }
    if (year.length > 0 && year.length < 2) {
      return false;
    }

    return true;
  };

  console.log("response", response)

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        expiryDate: value,
      }));

      if (value.length === 4 && !validateExpiryDate(value)) {
        SweetAlertPopup(
          "Please enter a valid expiry date (YYMM)",
          "Error",
          "error"
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    const isNumericInput = /^[0-9]$/.test(e.key);
    const isAllowedKey = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ].includes(e.key);

    if (!isNumericInput && !isAllowedKey) {
      e.preventDefault();
    }
  };
  // API call to generate PIN
  const handlePINSubmit = async (e) => {
    e.preventDefault();

    if (cardNumber.length !== 16) {
      SweetAlertPopup(
        "Please enter a valid 16-digit card number",
        "Error",
        "error"
      );
      return;
    }

    if (formData.cvv.length !== 3) {
      SweetAlertPopup("Invalid CVV", "Error", "error");
      return;
    }

    if (!formData.expiryDate || formData.expiryDate.length !== 4) {
      SweetAlertPopup("Please enter a valid expiry date", "Error", "error");
      return;
    }

    try {
      setIsloading(true);

      const pinGenerationResponse = await postApiData(apiList.CARDGENERATEPOTP, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: formData.cardNumber,
        cvv: formData.cvv,
        expdate: formData.expiryDate,
      });

      console.log("pinGeneration", pinGenerationResponse)

      const pinGenerationData = pinGenerationResponse;
      if (pinGenerationResponse?.respCode == "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      if (pinGenerationData.status == true) {
        setOtp(pinGenerationData.otp);
        setResponse(pinGenerationResponse)
        setOpenOtpDialog(true);
      } else {
        SweetAlertPopup(pinGenerationData.message, "Error", "error");
      }
      setIsloading(false);
    } catch (error) {
      SweetAlertPopup(
        "There was an error processing your request. Please try again later.",
        "Error",
        "error"
      );
      setIsloading(false);
    }
  };
  // API call with OTP
  const handleOtpSubmit = async () => {
    try {
      setIsloading(true);
      const pinSettingResponse = await postApiData(apiList.CARDOTP, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: formData.cardNumber,
        otp: otp,
      }); console.log('pinSettingResponse', pinSettingResponse);

      const pinSettingData = pinSettingResponse;
      if (pinSettingResponse?.respCode == "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      if (pinSettingData.status) {
        setPinDialogOpen(true);
        setOpenOtpDialog(false);
      } else {
        setOpenOtpDialog(false);
        SweetAlertPopup(pinSettingData.message, "Error", "error");
      }
      setIsloading(false);
    } catch (error) {
      // SweetAlertPopup(pinSettingData.message, "Error", "error");
      setIsloading(false);
    }
  };
  // API call for setting New Pin
  const handlePinSubmit = async () => {
    if (newPin === "0000") {
      setNewPin("");
      setPinDialogOpen(false);
      SweetAlertPopup(
        "PIN cannot be '0000'. Please enter a different PIN.",
        "Error",
        "error"
      );

      return;
    }
    try {
      setIsloading(true);

      const pinSubmissionResponse = await postApiData(apiList.CARDPIN, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNumber,
        cardPin: newPin,
      });

      const pinSubmissionData = pinSubmissionResponse;
      if (pinSubmissionResponse?.respCode == "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      if (pinSubmissionData.status) {
        setFormData({
          cardNumber: "",
          cvv: "",
          expiryDate: "",
        });
        setOtp("");
        setNewPin("");
        setPinDialogOpen(false);
        SweetAlertPopup(
          "Your debit card pin has been successfully set.",
          "Success",
          "success"
        );
        // console.log("Debit card pin set successfully");
      } else {
        setPinDialogOpen(false);
        SweetAlertPopup("Please try connecting again.", "Error", "error");
      }

      setIsloading(false);
    } catch (error) {
      setPinDialogOpen(false);
      SweetAlertPopup("Please try again.", "Error", "error");

      console.error("Error setting debit card pin:", error);
      setIsloading(false);
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
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));
  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.gridinfo}>
        <div className={classes.grid4container}>
          <form onSubmit={handlePINSubmit}>
            <div className={classes.grid3name}>
              You can regenerate your PIN for your card here
            </div>

            <Stack spacing={1} className={classes.grid4content}>
              <div className={classes.grid4title}>
                Enter Card Number<span className={classes.requiredStar}>*</span>
              </div>
              <div className={classes.frow1aff}>
                <TextField
                  name="cardNumber"
                  value={formData.cardNumber}
                  // value={cardNumber || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  inputProps={{
                    maxLength: 16,
                    pattern: "[0-9]*",
                  }}
                  placeholder="Card Number"

                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>

                <div>
                  <div className={classes.grid4title}>
                    Enter Card CVV<span className={classes.requiredStar}>*</span>
                  </div>
                  <div className={classes.frow1aff}>
                    <TextField
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      fullWidth
                      inputProps={{
                        maxLength: 3,
                        pattern: "[0-9]*",
                      }}
                      placeholder="Enter Card CVV"
                    />
                  </div>
                </div>
                <div>
                  <div className={classes.grid4title}>
                    Enter Card Expiry Date
                    <span className={classes.requiredStar}>*</span>
                  </div>
                  <div className={classes.frow1aff}>
                    <TextField
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      // onKeyDown={handleKeyDown}
                      fullWidth
                      inputProps={{
                        maxLength: 4,
                        pattern: "[0-9]*",
                      }}
                      placeholder="YYMM"
                    />
                  </div>
                </div>





              </div>


            </Stack>
            <div className={classes.grid3button}>
              <ColorButton1 variant="contained" type="submit">
                Submit
              </ColorButton1>
            </div>
          </form>
          <Dialog open={openOtpDialog}
          // onClose={() => setOpenOtpDialog(false)}
          >
            <DialogContent>
              <Typography className={classes.OtpTypography}>
                OTP Verification<span className={classes.requiredStar}>*</span>
              </Typography>
              <OTPInput
                value={otp}
                // onChange={setOtp}

                onChange={(otpValue) => {
                  const otpVal = otpValue.replace(/\D/g, ''); // Remove non-numeric characters
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
                }}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              />
              <TimerComponent
                Case="Minutes"
                setOtp={setOpenOtpDialog}
                Time={response?.data?.otpTime}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenOtpDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleOtpSubmit}
                disabled={!isOtpEntered}
                sx={{ backgroundColor: "#EE1C25" }}
              >
                Submit OTP
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={pinDialogOpen}
          // onClose={() => setPinDialogOpen(false)}
          >
            <DialogContent>
              <Typography className={classes.OtpTypography}>
                Enter PIN<span className={classes.requiredStar}>*</span>
              </Typography>

              <OTPInput
                value={newPin}
                // onChange={setNewPin}

                onChange={(otpValue) => {
                  const otpValu = otpValue.replace(/\D/g, ''); // Remove non-numeric characters
                  setNewPin(otpValu);
                  setIsOtpEntered1(otpValu.length > 3);
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
                }}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setPinDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handlePinSubmit}
                disabled={!isOtpEntered1}
                sx={{ backgroundColor: "#EE1C25" }}
              >
                Submit PIN
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default RegeneratePIN;
