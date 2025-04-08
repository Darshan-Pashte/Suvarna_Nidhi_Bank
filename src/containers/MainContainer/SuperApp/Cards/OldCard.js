import React from "react";
import classes from "../Cards/Cards.module.css";
import axios from "axios";
import grid1logo from "../../../../assets/CardsPics/grid1logo.png";
import CardPic from "./CardPic";
import CardManagement from "./CardManagement";
import RegeneratePIN from "./RegeneratePIN";
import eye from "./eye.png";
import visible from "./visible.png";
import Cards from "../../../../assets/CardsPics/Cards.svg";
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

const OldCard = () => {
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
      <div className={classes.cardsmainpage} style={{overflowX:'hidden'}}>
        <Box sx={{ display: "flex" }}>
          {/* <GoBackButton /> */}
          <div className={classes.cardMainHeading}>Cards</div>
        </Box>
        <div className={classes.cardscontent}>
          {/* DropDownList */}
          <Grid container style={{ padding: "0.1vw" }}>
            <Grid item xs={12} sm={6} md={5}>
              <div className={classes.gridcontent}>
                <Box sx={{ margin: ".3rem" }}>
                  <Typography sx={{ fontWeight: "500" }}>
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
            className={classes.secondContainer}
            container
            style={{ padding: "0.1vw" }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <Typography className={classes.secondContainerHeadings}>
                Debit Card
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Typography className={classes.secondContainerHeadings}>
                Service Request
              </Typography>
            </Grid>
          </Grid>

          {/* Debit Card container and Button Container*/}
          <Grid className={classes.secondContainer} container>
            {/* Debit Card Container */}
            <Grid
              className={classes.secondContainerFirstBox}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <div className={classes.cardImagemMainDiv}>
                <div className={classes.grid1container}>
                  <div className={classes.grid1containerup}>
                    <div className={classes.grid1containerleft}>
                      Mahesh Sahakari Bank Ltd., Pune
                    </div>
                    <div className={classes.grid1logo}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1134_1914)">
                          <path
                            d="M34.3489 12.9553H32.072C31.3648 12.9553 30.8388 13.1478 30.528 13.8527L26.1523 23.7622H29.2471C29.2471 23.7622 29.7519 22.4298 29.8663 22.1379C30.2051 22.1379 33.2119 22.1425 33.6402 22.1425C33.7281 22.5199 33.9994 23.7622 33.9994 23.7622H36.7334L34.3489 12.9553ZM30.7145 19.9247C30.957 19.3039 31.8885 16.9027 31.8885 16.9027C31.8726 16.9323 32.1288 16.2774 32.2812 15.8704L32.4797 16.8027C32.4797 16.8027 33.0444 19.3843 33.1627 19.9247H30.7145Z"
                            fill="white"
                          />
                          <path
                            d="M23.916 15.016C24.8802 15.0009 25.579 15.2116 26.1217 15.4299L26.3877 15.5549L26.7864 13.2113C26.2028 12.9923 25.2879 12.7573 24.1465 12.7573C21.2344 12.7573 19.1819 14.224 19.1659 16.3258C19.147 17.8788 20.628 18.7459 21.7468 19.2636C22.8951 19.7942 23.2801 20.1315 23.2748 20.6052C23.2657 21.329 22.3592 21.661 21.5126 21.661C20.3324 21.661 19.7056 21.4981 18.7377 21.0948L18.358 20.922L17.9434 23.3422C18.6331 23.6446 19.9057 23.9046 21.2268 23.9182C24.3246 23.9182 26.3377 22.469 26.3589 20.2232C26.3718 18.9945 25.5858 18.0569 23.8827 17.2876C22.8519 16.7859 22.2213 16.4524 22.2273 15.946C22.2273 15.4966 22.7624 15.016 23.916 15.016Z"
                            fill="white"
                          />
                          <path
                            d="M14.993 12.9436L13.1504 23.7566H16.0973L17.9414 12.9436H14.993Z"
                            fill="white"
                          />
                          <path
                            d="M6.36738 13.7295C6.19609 13.0709 5.69963 12.8746 5.08341 12.8511H0.51446L0.476562 13.0663C4.03213 13.9289 6.38482 16.0072 7.36106 18.5062L6.36738 13.7295Z"
                            fill="white"
                          />
                          <path
                            d="M10.6826 12.9556L7.79632 20.3298L7.48859 19.2163C6.91937 17.8748 5.30341 15.948 3.40625 14.7338L6.04545 23.7512L9.16367 23.7459L13.8046 12.9534L10.6826 12.9556Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1134_1914">
                            <rect
                              width="36.256"
                              height="36.256"
                              fill="white"
                              transform="translate(0.478516 0.210327)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className={classes.grid1containerup}>
                    <div className={classes.grid1containerleft}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="37"
                        height="29"
                        viewBox="0 0 37 29"
                        fill="none"
                      >
                        <path
                          d="M33.8984 28.2488H2.3505C1.05488 28.2488 0 27.1938 0 25.8912V2.3577C0 1.06208 1.05488 0.00720215 2.3505 0.00720215H33.8913C35.194 0.00720215 36.2489 1.06208 36.2489 2.3577V25.8912C36.2489 27.1938 35.194 28.2488 33.8984 28.2488Z"
                          fill="#FFC738"
                        />
                        <path
                          d="M33.899 0.00720215H18.125V28.2488H33.8989C35.2016 28.2488 36.2494 27.1939 36.2494 25.8983V2.35776C36.2495 1.06214 35.1946 0.00720215 33.899 0.00720215Z"
                          fill="#FFB42E"
                        />
                        <path
                          d="M36.2489 14.613V13.6431H23.583V9.35979L26.8539 6.08888H36.2489C36.2489 5.75612 36.2135 5.43043 36.1569 5.11895H26.6486C26.5212 5.11895 26.3937 5.1756 26.3088 5.26762L22.8963 8.67305H18.613V0.00720215H17.6431V8.66586H13.4093L10.0039 5.26042C9.91183 5.16841 9.78439 5.11176 9.65694 5.11176H0.0990916C0.0424424 5.43037 0.00707373 5.756 0.00707373 6.08169H9.4587L12.6659 9.28888V13.6288H0V14.5988H12.6659V18.9387L9.4587 22.1671H0.00707373C0.00707373 22.4999 0.0425018 22.8256 0.0990916 23.137H9.66402C9.79146 23.137 9.91891 23.0804 10.0109 22.9884L13.4164 19.5829H17.6501V28.2416H18.6201V19.583H22.9034L26.3159 22.9885C26.4008 23.0805 26.5283 23.1372 26.6557 23.1372H36.164C36.2206 22.8185 36.256 22.4929 36.256 22.1672H26.8469L23.576 18.8963V14.613H36.2489ZM22.6131 18.6131H13.6358V9.63585H22.606V18.6131H22.6131Z"
                          fill="#C66D4E"
                        />
                        <path
                          d="M36.2494 14.613V13.6431H23.5835V9.35979L26.8545 6.08888H36.2494C36.2494 5.75612 36.214 5.43043 36.1574 5.11895H26.6491C26.5217 5.11895 26.3942 5.1756 26.3093 5.26762L22.8968 8.67305H18.6135V0.00720215H18.125V9.63579H22.6137V18.6131H18.125V28.2417H18.6135V19.583H22.8968L26.3093 22.9885C26.3942 23.0805 26.5217 23.1372 26.6491 23.1372H36.1574C36.2141 22.8185 36.2494 22.5 36.2494 22.1672H26.8474L23.5765 18.8963V14.613H36.2494Z"
                          fill="#AF5A35"
                        />
                      </svg>
                    </div>
                    <div className={classes.grid1logo}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="37"
                        viewBox="0 0 24 37"
                        fill="none"
                      >
                        <path
                          d="M14.2193 35.9448C13.8045 35.53 13.8045 34.8575 14.2193 34.4427C23.2153 25.4467 23.2153 10.8092 14.2193 1.81326C13.8045 1.39844 13.8045 0.725934 14.2193 0.311115C14.6341 -0.103705 15.3066 -0.103705 15.7215 0.311115C18.1264 2.71605 19.9886 5.52065 21.2564 8.64695C22.4807 11.666 23.1015 14.8559 23.1015 18.128C23.1015 21.4001 22.4807 24.59 21.2564 27.6091C19.9886 30.7354 18.1264 33.54 15.7215 35.9449C15.3067 36.3596 14.6341 36.3596 14.2193 35.9448Z"
                          fill="white"
                        />
                        <path
                          d="M9.66854 31.394C9.25372 30.9791 9.25372 30.3066 9.66854 29.8918C16.1551 23.4053 16.1551 12.8507 9.66854 6.36416C9.25372 5.94934 9.25372 5.27684 9.66854 4.86202C10.0834 4.4472 10.7559 4.4472 11.1707 4.86202C14.7141 8.40547 16.6656 13.1168 16.6657 18.128C16.6657 23.1393 14.7141 27.8506 11.1707 31.394C10.7559 31.8087 10.0834 31.8087 9.66854 31.394Z"
                          fill="white"
                        />
                        <path
                          d="M5.11776 26.8434C4.70294 26.4286 4.70294 25.756 5.11776 25.3412C9.09501 21.364 9.09501 14.8926 5.11776 10.9153C4.70294 10.5005 4.70294 9.82798 5.11776 9.41317C5.53257 8.99835 6.20508 8.99835 6.6199 9.41317C11.4254 14.2187 11.4254 22.0378 6.6199 26.8434C6.20515 27.2582 5.53257 27.2582 5.11776 26.8434Z"
                          fill="white"
                        />
                        <path
                          d="M0.566974 22.292C0.152155 21.8772 0.152155 21.2047 0.566974 20.7898C2.03485 19.322 2.03485 16.9335 0.566974 15.4657C0.152155 15.0508 0.152155 14.3783 0.566974 13.9635C0.981793 13.5487 1.6543 13.5487 2.06912 13.9635C4.36528 16.2597 4.36528 19.9958 2.06912 22.292C1.65437 22.7068 0.981793 22.7068 0.566974 22.292Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={classes.grid1number}>
                    <div>
                      <div>
                        {cardDetails[0]?.status ===
                        "Current Card Status : ACTIVE" ? (
                          showUnmasked ? (
                            extraCardDetails.cardNo
                          ) : (
                            cardDetails?.[0]?.maskedcardNo
                          )
                        ) : (
                          <span>Card is not active</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.grid1lowerinfo}>
                    {!showUnmasked && (
                      <div className={classes.grid1lowerinfo}>
                        <TextField
                          error={!!tpinError}
                          helperText={tpinError}
                          value={tpin}
                          onChange={handleTpinChange}
                          InputProps={{
                            style: { color: "white", borderColor: "white" },
                          }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          placeholder="Enter TPIN"
                          style={{ marginBottom: "1rem" }}
                          required
                          inputProps={{
                            maxLength: 4,
                            type: "password",
                            // type: "text",
                            pattern: "\\d*",
                            onInput: (e) => {
                              e.target.value = e.target.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 4);
                            },
                          }}
                        />

                        {cardDetails[0]?.status ===
                          "Current Card Status : ACTIVE" &&
                          !showUnmasked && (
                            <Button
                              style={{ color: "white", borderColor: "white" }}
                              onClick={handleCardDetailsSubmit}
                            >
                              Submit TPIN
                            </Button>
                          )}

                        {cardDetails[0]?.status !==
                          "Current Card Status : ACTIVE" &&
                          !showUnmasked && <span></span>}
                      </div>
                    )}
                  </div>
                  <div className={classes.grid1lowerinfo}>
                    {cardDetails[0]?.status ===
                      "Current Card Status : ACTIVE" &&
                      showUnmasked && (
                        <div className={classes.cardholdername}>
                          Card Holder name
                          <div className={classes.cardinfo}>
                            {extraCardDetails.cardName}
                          </div>
                        </div>
                      )}

                    {!(
                      cardDetails[0]?.status ===
                        "Current Card Status : ACTIVE" && showUnmasked
                    ) && <span>Card Holder Name</span>}
                    <div className={classes.expirydate}>
                      {cardDetails[0]?.status ===
                        "Current Card Status : ACTIVE" &&
                        showUnmasked && (
                          <div className={classes.cardholdername}>
                            Expiry Date
                            <div className={classes.cardinfo}>
                              {extraCardDetails.expDate}
                            </div>
                          </div>
                        )}

                      {!(
                        cardDetails[0]?.status ===
                          "Current Card Status : ACTIVE" && showUnmasked
                      ) && <span>Expiry Date</span>}
                    </div>

                    <div className={classes.cvv}>
                      {cardDetails[0]?.status ===
                        "Current Card Status : ACTIVE" &&
                        showUnmasked && (
                          <div className={classes.cardholdername}>
                            CVV
                            <div className={classes.cardinfo}>
                              {extraCardDetails.cvv}
                            </div>
                          </div>
                        )}

                      {!(
                        cardDetails[0]?.status ===
                          "Current Card Status : ACTIVE" && showUnmasked
                      ) && <span>CVV</span>}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            {/* Button Container */}
            <Grid
              className={classes.secondContainerSecondBox}
              item
              xs={12}
              sm={6}
              md={5}
            >
              <Grid className={classes.secondContainerInsideBox} container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5}
                  onClick={handleCardImageClick}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    sx={{
                      minWidth: 180,
                      minHeight: 100,
                      borderRadius: 5,
                      backgroundColor: isCardClicked ? "#ECECEC" : "#F9F9F9",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <img src={Cards} alt="Card Status" />

                      <Typography className={classes.cardStatusTypography}>
                        Card status
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5}
                  onClick={handleRegeneratePinImageClick}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    sx={{
                      minWidth: 180,
                      minHeight: 100,
                      borderRadius: 5,
                      backgroundColor: isRegeneratePinClicked
                        ? "#ECECEC"
                        : "#F9F9F9",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <img src={pin} alt="Generate PIN" />

                      <Typography className={classes.generatePinTypographyCard}>
                        Generate Pin
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

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

export default OldCard;
