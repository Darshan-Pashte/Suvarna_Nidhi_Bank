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

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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

import { Padding, RemoveRedEye } from "@mui/icons-material";

import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm1 from "../../../../components/common/AutoCompleteFormNew";

import Loader from "../../../../components/common/loader";

import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import GoBackButton from "../../../../components/common/GoBackButton";
import DatePickerForm from "../../../../components/common/datePickerForm";
import TextFieldForm from "../../../../components/common/textFieldForm";
import TextFieldFormNew from "../../../../components/common/textFieldFormNew";
import Textfield from "../../../../components/common/textField";
import ToggleButton from "../../../../components/common/ToggleButton";
import TextFiledNew from "../../../../components/common/TextFiledNew";
import ToggleSwitch from "../../../../components/common/ToggleButton";
import ExpiryDateField from "../../../../components/common/ExpiryDateField";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
// import { useForm } from "react-hook-form";

const NewCard = () => {
  const [selectedAccountNo, setSelectedAccountNo] = useState("");
  const [accountNo, setAccountNo] = useState([]);
  const [accountNoup, setAccountNoup] = useState([]);
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

  console.log("accountNoup", accountNoup);
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

  const defaultFormData = {
    announcement: "",
    fromDate: null,
    toDate: null,
    toggleSwitch: "",
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

  useEffect(() => {
    const fetchAccountNo = async () => {
      try {
        setIsloading(true);
        const response = await postApiData(apiList.ACCOUNTLIST, {
          custNo: user.userId,
          sessionId: user.sessionId,
        });

        console.log("responseresponse", response);
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

          const accountNumbersup =
            response.data?.accountlst?.map((account) => ({
              code: account.accNo,
              value: account.accNo,
            })) || [];
          setAccountNoup(accountNumbersup);

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

  console.log("carddetails", cardDetails)

  //For auto select of first account
  useEffect(() => {
    if (accountNo.length > 0) {
      setSelectedAccountNo(accountNo[0]);
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

      const cardNoFromGetListAPI = cardDetails?.cardNo || "";

      const response = await postApiData(apiList.CARDDETAILS, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNoFromGetListAPI,
        tpin: tpin,
        accNo: selectedAccountNo,
      });
      console.log("card Response", response);

      const extraCardDetailsAPI = response.data?.cardData || [];
      setExtraCardDetails(extraCardDetailsAPI);
      setCardNumber(extraCardDetailsAPI.cardNo);
      if (response.status == false) {
        SweetAlertPopup(response.message, "Error", "error");

        if (response.respCode == "IS") {
          sessionStorage.clear();
          localStorage.clear();
          window.location.reload();
        }
      } else {
        const extraCardDetailsAPI = response.data?.cardData || [];
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

  useEffect(() => {
    const accountNumber = watch("accountNumber");
    if (accountNumber) {
      setSelectedAccountNo(accountNumber.code);
    }
  }, [watch("accountNumber")]);

  useEffect(() => {
    if (selectedAccountNo) {
      fetchCardDetails();
    }
  }, [selectedAccountNo]);


  // useEffect(() => {
  //   if (cardDetails) {
  //     setValue("accountNumber", cardStatus);
  //   }
  // }, [cardDetails]);

  useEffect(() => {
    if (cardDetails) {
      const cardStatus =
        cardDetails.status === "Current Card Status : ACTIVE" ? false : true;
      setValue("toggleSwitch", cardStatus);
    }
  }, [cardDetails]);

  useEffect(() => {
    const toggleSwitchStatus = watch("toggleSwitch");
    const cardStatus =
      cardDetails?.status === "Current Card Status : ACTIVE" ? false : true;
    if (toggleSwitchStatus !== cardStatus) {
      handleTPINDialog();
    }
  }, [watch("toggleSwitch")]);

  const fetchCardDetails = async () => {
    try {
      setIsloading(true);
      const response = await postApiData(apiList.CARDLIST, {
        custNo: user.userId,
        sessionId: user.sessionId,
        accNo: selectedAccountNo,
      });

      if (response.status) {
        setIsBlockUnblockDisabled(false);
        setCardDetails(response.data.cardData[0]);
      } else {
        setCardDetails(null);
        SweetAlertPopup(response.message, "Error", "error");
        setIsBlockUnblockDisabled(true);
      }

      setIsloading(false);
    } catch (error) {
      SweetAlertPopup("Please try connecting again.", "Error", "error");
      setIsloading(false);
    }
  };

  const handleBlockUnblock = async () => {
    try {
      setIsloading(true);

      const cardNo = cardDetails?.cardNo || "";
      const action = watch("toggleSwitch") ? "BLOCK" : "UNBLOCK";

      const response = await postApiData(apiList.CARDBLOCKUNBLOCK, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNo,
        status: action,
        tpin: dialogTPIN,
      });

      if (response.status) {
        const successMessage = `Dear Customer, as per your request your card no ${cardDetails?.maskedcardNo} has been ${action} successfully.`;
        SweetAlertPopup(successMessage, "Success", "success");
      } else {
        const errorMessage =
          response.message ||
          "There was an error processing your request. Please try again later.";
        SweetAlertPopup(errorMessage, "Error", "error");
      }

      setIsloading(false);
      fetchCardDetails();
    } catch (error) {
      SweetAlertPopup(
        "Unable to connect to the server. Please check your internet connection and try again.",
        "Error",
        "error"
      );
      setIsloading(false);
    } finally {
      setIsloading(false);
      setIsDialogOpen(false);
      setDialogTPIN("");
    }
  };

  useEffect(() => {
    console.log("watch(toggleSwitch)", watch("toggleSwitch"));
  }, [watch("toggleSwitch")]);



  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrows}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <GoBackButton />
            <div className={classes.SubHeading}>Cards</div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>
        <div className={classes.cardsmainpage} style={{ overflowX: "hidden" }}>
          <div className={classes.tabAutocomplete}>
            <div className={classes.SubHeading1}>Account No.</div>
            <div className={classes.completeForm}>
              <AutocompleteForm
                controlerProps={{
                  control: control,
                  name: "accountNumber",
                }}
                TextFieldProps={{
                  // style: { width: "28vw" },


                  placeholder: "Select Account Number",
                  onKeyDown: (event) => {
                    //const regex = /^[a-zA-Z]*$/;
                    // const regex = /^[0-9]*$/;
                    const regex = /^[a-zA-Z0-9]*$/;
                    const isBackspace = event.keyCode === 8;
                    const isValidInput = regex.test(event.key);
                    const currentInputValue = event.target.value;
                    const maxLength = 32;
                    const isMaxLengthReached =
                      currentInputValue.length >= maxLength;
                    if (
                      (!isValidInput && !isBackspace) ||
                      (isMaxLengthReached && !isBackspace)
                    ) {
                      event.preventDefault();
                    }
                  },
                }}
                rules={{
                  required:
                    "Account Number " + errorMessages.error_autocomplete_message,
                  // maxLength: {
                  //   value: 32, // Set your max length here
                  //   message: "Account Number must be no more than 10 digits long",
                  // },
                }}
                // data={accountHomebank}
                data={accountNoup}
                required={true}
              />
            </div>
          </div>
          <Box sx={{ display: "flex" }}>
            {/* <GoBackButton /> */}
            {/* <div className={classes.cardMainHeading}>Cards</div> */}
          </Box>

          <div className={classes.cardscontent}>
            {/* DropDownList */}
            <Grid container style={{ padding: "0.1vw" }}>
              <Grid item xs={12} sm={6} md={5}>
                <div className={classes.gridcontent}>
                  <Box sx={{ margin: ".3rem" }}>

                  </Box>
                </div>
                <Grid item xs={12} sm={6} md={5}></Grid>
              </Grid>
            </Grid>
            {cardDetails && cardDetails.cardNo ? <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <div className={classes.OuterCard}>
                <div className={classes.debitcardText}>Debit Card</div>
                <div className={classes.OuterCard}>
                  <div className={classes.grid1container} style={{ width: "100%" }}>
                    <div className={classes.grid1containerup}>
                      <div className={classes.grid1containerleft}></div>
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
                        <div className={classes.cardNumbertext}>
                          Card Number
                        </div>
                        <div className={classes.cardNumberNum}>
                          {showUnmasked ? (
                            <div
                              className={classes.cardholdername}
                              style={{
                                fontSize: "12px",
                                marginBottom: "-18px",
                              }}
                            >
                              {cardDetails?.cardNo}
                            </div>
                          ) : (
                            <div
                              className={classes.cardholdername}
                              style={{
                                fontSize: "12px",
                                marginBottom: "-18px",
                              }}
                            >
                              {cardDetails?.maskedcardNo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {!showUnmasked && (
                      <div
                        className={classes.cardholdername}
                        style={{ fontSize: "12px", marginBottom: "-18px" }}
                      >
                        To View Card Details :
                      </div>
                    )}
                    <div className={classes.grid1lowerinfo}>
                      {!showUnmasked && (
                        <div className={classes.grid1lowerinfo}>
                          <TextField
                            error={!!tpinError}
                            helperText={tpinError}
                            value={tpin}
                            sx={{
                              maxWidth: "222px",
                            }}
                            onChange={handleTpinChange}
                            InputProps={{
                              style: { color: "white", borderColor: "white" },
                            }}
                            InputLabelProps={{
                              style: { color: "white", borderColor: "white" },
                            }}
                            placeholder="Enter TPIN"
                            style={{ marginBottom: "0.4rem" }}
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
                        </div>
                      )}
                      <div className={classes.showDetails}>
                        {!showUnmasked && (
                          <Button
                            className={classes.submitTpinBtn}
                            onClick={handleCardDetailsSubmit}
                          >
                            Show Details
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className={classes.grid1lowerinfo}>
                      {showUnmasked && (
                        <div className={classes.cardholdername}>
                          Card Holder name
                          <div className={classes.cardinfo}>
                            {extraCardDetails.cardName}
                          </div>
                        </div>
                      )}

                      {!(
                        cardDetails?.status ===
                        "Current Card Status : ACTIVE" && showUnmasked
                      ) && (
                          <div className={classes.cardHolderNameParent}>
                            <span className={classes.cardHolderName}>
                              Card Holder Name
                            </span>{" "}
                            <span className={classes.CardHolderText}>
                              XXXXXXXXXXXX
                            </span>
                          </div>
                        )}
                    </div>

                    <div className={classes.expiryDateandcvvParent}>
                      <div className={classes.expirydate}>
                        {cardDetails?.status ===
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
                          cardDetails?.status ===
                          "Current Card Status : ACTIVE" && showUnmasked
                        ) && (
                            <div className={classes.expiryDatePar}>
                              <span className={classes.expiryText}>
                                Expiry Date
                              </span>{" "}
                              <span className={classes.expiryDate}>XX/XX</span>
                            </div>
                          )}
                      </div>

                      <div className={classes.cvv}>
                        {cardDetails?.status ===
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
                          cardDetails?.status ===
                          "Current Card Status : ACTIVE" && showUnmasked
                        ) && (
                            <div className={classes.cvvParent}>
                              {" "}
                              <span className={classes.cvvText}>CVV</span>{" "}
                              <span className={classes.cvvNo}>XXX</span>
                            </div>
                          )}
                      </div>

                      {/* <div>
                  <ToggleButton/>
                </div> */}

                      {cardDetails ? (
                        <div className={classes.cardblkunblktglbtnParent}>
                          <div className={classes.cardBlkunblkText}>
                            Card Block/Unblock
                          </div>

                          <div>
                            <Controller
                              name="toggleSwitch"
                              control={control}
                              render={({ field }) => (
                                <ToggleSwitch
                                  {...field}
                                  checked={field.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  label=" "
                                />
                              )}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={classes.debitcardText}>Generate Pin</div>
                <RegeneratePIN cardNumber={cardNumber} />
              </div>
            </div> : ""}

          </div>

        </div>
      </div>

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
            onChange={(otpValue) => {
              const numericOtpValue = otpValue.replace(/\D/g, ""); // Remove non-numeric characters
              setDialogTPIN(numericOtpValue);
              console.log("dialogTPIN", dialogTPIN);
              setIsOtpEntered(numericOtpValue.length === 4); // Adjust for 4-digit OTP
            }}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputType="password" // Optional, for numeric keyboard on mobile
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

    </>
  );
};

export default NewCard;
