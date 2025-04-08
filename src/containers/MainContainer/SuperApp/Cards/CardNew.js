import React from "react";
import classes from "../Cards/Cards.module.css";
import axios from "axios";
import grid1logo from "../../../../assets/CardsPics/grid1logo.png";
import CardPic from "./CardPic";
import CardManagement from "./CardManagement";
import RegeneratePIN from "./RegeneratePIN";
import eye from "./eye.png";
import visible from "./visible.png";
// import Cards from "../../../../assets/CardsPics/Cards.svg";
import pin from "../../../../assets/CardsPics/pin.svg";

import OTPInput from "react-otp-input";

import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
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
  Divider,
} from "@mui/material";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/authSlice";

import { useEffect } from "react";
import styled from "styled-components";

import { RemoveRedEye } from "@mui/icons-material";

import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";

import Loader from "../../../../components/common/loader";

import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import GoBackButton from "../../../../components/common/GoBackButton";
import Cards from "./Cards";

const CardNew = () => {
  const [selectedAccountNo, setSelectedAccountNo] = useState("");
  const [accountNo, setAccountNo] = useState([]);
  const [accountName, setAccountName] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);
  const [extraCardDetails, setExtraCardDetails] = useState([]);
  const [showUnmasked, setShowUnmasked] = useState(false);

  const [cardNumber, setCardNumber] = useState("");

  const [showCardStatus, setShowCardStatus] = useState(true);
  const [showRegeneratePin, setShowRegeneratePin] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTPIN, setDialogTPIN] = useState("");

  const [isBlockUnblockDisabled, setIsBlockUnblockDisabled] = useState(false);

  const [isCardClicked, setIsCardClicked] = useState(true);
  const [isRegeneratePinClicked, setIsRegeneratePinClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/auth/login");
  };

  const handleCardImageClick = () => {
    setIsCardClicked(true);
    setShowCardStatus(true);
    setShowRegeneratePin(false);
    setIsRegeneratePinClicked(false);
  };

  const handleRegeneratePinImageClick = () => {
    setIsRegeneratePinClicked(true);
    setShowCardStatus(false);
    setShowRegeneratePin(true);
    setIsCardClicked(false);
  };

  const [tpin, setTpin] = useState("");
  const [tpinError, setTpinError] = useState("");

  const validateTpin = (tpinValue) => {
    if (!tpinValue) {
      return "Enter Valid TPIN";
    } else if (tpinValue.length !== 4) {
      return "TPIN must be 4 digits";
    }

    return "";
  };

  const handleTpinChange = (event) => {
    setTpin(event.target.value);
    const validationResult = validateTpin(event.target.value);
    setTpinError(validationResult);
  };

  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [cardBlockStatus, setCardBlockStatus] = useState({
    status: false,
    message: "",
  });

  const handleTPINDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogTPIN("");
  };

  // API to fetch account number which is to be passed in getList API payload
  useEffect(() => {
    const fetchAccountNo = async () => {
      try {
        setIsloading(true);
        const response = await axios.post(apiList.ACCOUNTLIST, {
          custNo: user.userId,
          sessionId: user.sessionId,
        });

        // console.log("responseresponse", response);
        if (response.data.status == false) {
          if (response.data.respCode == "IS") {
            handleLogout();
            setIsloading(false);
          } else {
            SweetAlertPopup(response.data.message, "Error", "error");
            setIsloading(false);
          }
        } else {
          // SweetAlertPopup(response?.message, "Success", "success");
          const accountNumbers =
            response.data.data?.accountlst?.map((account) => account.accNo) ||
            [];
          setAccountNo(accountNumbers);

          const accountHolder =
            response.data.data?.accountlst?.map((account) => account.accName) ||
            [];
          setAccountName(accountHolder);
          setIsloading(false);
        }
        // if (response.status === true) {
        //   SweetAlertPopup(response?.message, "Success", "success");
        // } else if (response?.respCode === "IS") {
        //   handleLogout();
        //   SweetAlertPopup(response?.message, "Error", "error");
        // }

        // if (response?.respCode === "IS") {
        //   handleLogout();
        //   SweetAlertPopup(response?.message, "Error", "error");
        // } else {
        //   SweetAlertPopup(response?.message, "Error", "error");
        // }

        // const accountNumbers =
        //   response.data.data?.accountlst?.map((account) => account.accNo) || [];
        // setAccountNo(accountNumbers);

        // const accountHolder =
        //   response.data.data?.accountlst?.map((account) => account.accName) ||
        //   [];
        // setAccountName(accountHolder);

        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    fetchAccountNo();
  }, [user.userId, user.sessionId]);

  //Handle the drop down and updating Selected Account
  const handleAccountDropDown = (event) => {
    setSelectedAccountNo(event.target.value);
  };

  //For auto select of first account
  useEffect(() => {
    if (accountNo.length > 0) {
      setSelectedAccountNo(accountNo[1]);
    }
  }, [accountNo]);

  useEffect(() => {
    // Reset card number when account number changes
    setCardNumber("");
  }, [selectedAccountNo]);

  //API for extra Card details

  const handleCardDetailsSubmit = async () => {
    const validationResult = validateTpin(tpin);
    if (validationResult) {
      setTpinError(validationResult);
      return;
    }
    try {
      setIsloading(true);

      const cardNoFromGetListAPI = cardDetails?.[0]?.cardNo || "";
      const response = await axios.post(apiList.CARDDETAILS, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNoFromGetListAPI,
        tpin: tpin,
        accNo: selectedAccountNo,
      });

      const extraCardDetailsAPI = response.data.data?.cardData || [];
      setExtraCardDetails(extraCardDetailsAPI);
      setCardNumber(extraCardDetailsAPI.cardNo);
      if (response.data.status == false) {
        SweetAlertPopup(response.data.message, "Error", "error");
      } else {
        const extraCardDetailsAPI = response.data.data?.cardData || [];
        setExtraCardDetails(extraCardDetailsAPI);
        setShowUnmasked(true);
        // console.log("Debit card pin set successfully");
      }

      setTpin("");
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching extra card details:", error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    setShowUnmasked(false);
  }, [selectedAccountNo]);

  const fetchCardDetails = async () => {
    try {
      setIsloading(true);
      const response = await axios.post(apiList.CARDLIST, {
        custNo: user.userId,
        sessionId: user.sessionId,

        accNo: selectedAccountNo,
      });

      const cardDetails = response.data.data?.cardData || [];

      if (response.data.status == false) {
        SweetAlertPopup(response.data.message, "Error", "error");
        setIsBlockUnblockDisabled(true);
      } else {
        // console.log("...");
        setIsBlockUnblockDisabled(false);
      }

      setCardDetails(cardDetails);

      setIsloading(false);
    } catch (error) {
      SweetAlertPopup("Please try connecting again.", "Error", "error");

      setIsloading(false);
    }
  };

  useEffect(() => {
    if (selectedAccountNo && user.userId && user.sessionId) {
      fetchCardDetails(selectedAccountNo);
    }
  }, [selectedAccountNo, user.userId, user.sessionId]);

  const handleBlockUnblock = async () => {
    try {
      setIsloading(true);

      const cardNo = cardDetails.length > 0 ? cardDetails[0].cardNo : "";
      const action =
        cardDetails[0].status === "Current Card Status : ACTIVE"
          ? "BLOCK"
          : "UNBLOCK";

      const response = await axios.post(apiList.CARDBLOCKUNBLOCK, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNo,
        status: action,
        tpin: dialogTPIN,
      });

      if (response.data.status == true) {
        const successMessage = `Dear Customer, as per your request your card no ${cardDetails?.[0]?.maskedcardNo} has been ${action} successfully.`;
        SweetAlertPopup(successMessage, "Success", "success");
      } else {
        const errorMessage =
          response.data.message ||
          "There was an error processing your request. Please try again later.";
        SweetAlertPopup(errorMessage, "Error", "error");
      }

      setCardBlockStatus(response.data);
      setIsloading(false);
      // Refresh card details after blocking/unblocking
      fetchCardDetails();
    } catch (error) {
      SweetAlertPopup(
        "Unable to connect to the server. Please check your internet connection and try again.",
        "Error",
        "error"
      );
      console.error("Error fetching data:", error);
      setIsloading(false);
    } finally {
      setIsloading(false);
      // Close the dialog and reset the TPIN input
      setIsDialogOpen(false);
      setDialogTPIN("");
    }
  };

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.cardsmainpage}>
        <div className={classes.cardscontent}>
          {/* DropDownList */}
          <Grid container style={{ padding: "0.1vw" }}>
            <Grid item xs={12} sm={6} md={5}>
              <div className={classes.gridcontent}>
                <Box sx={{ margin: ".3rem" }}>
                  <Typography>
                    Select Account{" "}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedAccountNo}
                      onChange={handleAccountDropDown}
                      style={{ width: 357, height: 40 }}
                    >
                      {accountNo.map((accNumber) => (
                        <MenuItem key={accNumber} value={accNumber}>
                          {accNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <Grid item xs={12} sm={6} md={5}></Grid>
            </Grid>
          </Grid>

          {/* Headings */}
          <Grid
          container
            columnSpacing={3}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >
             <Grid item xs={12} sm={12} md={6} >
              <div className={classes.gridtitle}>Debit Card</div>
              <div className={classes.cardsBoxCard}>
                {isLoading ? (<Loader loading={true} />) : (<><Loader loading={false} /><Cards/></>)}
              </div>  
            </Grid>


            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.gridtitle}>Generate PIN</div>
              <div className={classes.cardsBox}>
                <div className={classes.accountstatement}></div>
              </div>
            </Grid>
          </Grid>

          {/* Debit Card container and Button Container*/}
      

          {/* Card Status container which is to be renderd based on click of card image */}

          {showCardStatus && (
            <Grid className={classes.cardStatusMainConatiner} container>
              <Grid
                className={classes.cardStatusMainBox}
                item
                xs={12}
                sm={6}
                md={6}
              >
                <Box className={classes.cardBlockStatusMainBox}>
                  <div className={classes.cardBlockStatusTypography}>
                    Card Block & Unblock
                  </div>
                  <Divider />
                  <Box className={classes.cardBlockStatusFlex}>
                    {cardBlockStatus.message !== undefined && (
                      <Typography
                        sx={{
                          color:
                            cardDetails[0]?.status ===
                            "Current Card Status : ACTIVE"
                              ? "green"
                              : "red",
                        }}
                      >
                        Card is{" "}
                        {cardDetails[0]?.status ===
                        "Current Card Status : ACTIVE"
                          ? "Active"
                          : "Inactive"}
                      </Typography>
                    )}

                    <Button
                      disabled={isBlockUnblockDisabled}
                      variant="contained"
                      color={
                        cardDetails[0]?.status ===
                        "Current Card Status : ACTIVE"
                          ? "primary"
                          : "secondary"
                      }
                      sx={{
                        backgroundColor:
                          cardDetails[0]?.status ===
                          "Current Card Status : ACTIVE"
                            ? "#183883"
                            : "",
                      }}
                      onClick={handleTPINDialog}
                    >
                      {cardDetails[0]?.status === "Current Card Status : ACTIVE"
                        ? "Block Card"
                        : "Unblock Card"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Dialog 
              open={isDialogOpen}
              // onClose={handleDialogClose}
              >
                <DialogTitle className={classes.OtpTypography}>
                  Enter TPIN<span className={classes.requiredStar}>*</span>
                </DialogTitle>
                <DialogContent>
                  <OTPInput
                    value={dialogTPIN}
                    // onChange={setDialogTPIN}
                    // onChange={(otpValue) => {
                    //   setDialogTPIN(otpValue);
                    //   setIsOtpEntered(otpValue.length > 3);
                    // }}
                    onChange={(otpValue) => {
                      const numericOtpValue = otpValue.replace(/\D/g, ''); // Remove non-numeric characters
                      setDialogTPIN(numericOtpValue);
                      setIsOtpEntered(numericOtpValue.length > 3);
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
                    onClick={handleDialogClose}
                    variant="outlined"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!isOtpEntered}
                    onClick={handleBlockUnblock}
                    variant="contained"
                    sx={{ backgroundColor: "#183883" }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={12} sm={6} md={5}></Grid>
            </Grid>
          )}

          {/* Regenerate PIN container which is to be renderd based on click of regenerate Pin image */}
          {showRegeneratePin && (
            <Grid className={classes.regeneratePinMainContainer} container>
              <Grid
                className={classes.cardStatusMainBox}
                item
                xs={12}
                sm={6}
                md={6}
              >
                <Box className={classes.regeneratePinMainBox}>
                  <div className={classes.generatePinTypography}>
                    Generate Pin
                  </div>
                  <Divider />
                  <RegeneratePIN cardNumber={cardNumber} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={5}></Grid>
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default CardNew;
