import React from "react";
import classes from "../../Account/FixedDeposit/OpenDeposit.module.css";

import { useLocation, useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
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
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import Loader from "../../../../../components/common/loader";
import GoBackButton from "../../../../../components/common/GoBackButton";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";



const OpendepositeChild1 = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const defaultFormData = {
    amt: "",
    months: "",
    days:"",
    disinstr:"",
    tpin:"",
    disposalInstruction:"",
    openUnderAcc:"",
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
  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  const [accList, setAccList] = useState([]);
  const [balance, setBalance] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [depositList, setDepositList] = useState([]);

  const [lookupList, SetLookupList] = useState([])

  const [showAcc, SetShowAcc] = useState(false);

  const { state } = useLocation();
  // console.log("state", state);




  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

//   const days = [];
// for (let i = 1; i <= 31; i++) {
//   days.push({ code: i, value: i.toString() });
// }

// console.log(days);


const days = [
  { code: '00', value: '00' },
  { code: '01', value: '01' },
  { code: '02', value: '02' },
  { code: '03', value: '03' },
  { code: '04', value: '04' },
  { code: '05', value: '05' },
  { code: '06', value: '06' },
  { code: '07', value: '07' },
  { code: '08', value: '08' },
  { code: '09', value: '09' },
  { code: '10', value: '10' },
  { code: '11', value: '11' },
  { code: '12', value: '12' },
  { code: '13', value: '13' },
  { code: '14', value: '14' },
  { code: '15', value: '15' },
  { code: '16', value: '16' },
  { code: '17', value: '17' },
  { code: '18', value: '18' },
  { code: '19', value: '19' },
  { code: '20', value: '20' },
  { code: '21', value: '21' },
  { code: '22', value: '22' },
  { code: '23', value: '23' },
  { code: '24', value: '24' },
  { code: '25', value: '25' },
  { code: '26', value: '26' },
  { code: '27', value: '27' },
  { code: '28', value: '28' },
  { code: '29', value: '29' },
  { code: '30', value: '30' },
  { code: '31', value: '31' },
].sort((a, b) => a.code - b.code);  // Sorting by `code`

console.log(days);

    
    console.log(days);
    
    useEffect(() => {
      if (days) {
        setValue("days", compareTextAndReturnObject(days, days[0]?.value))
      }
  
    }, [days]);

  // const disposalInstructionList =
  // user?.accountDetails &&
  // user?.accountDetails?.map((item) => ({
  //   code: item.brCode,
  //   value: item.accNo,
  // }));

  useEffect(() => { getLookUp() }, []);
  // useEffect(() => {
  //   if(state.depositList.accountNo){
  //     setValue("openUnderAcc",state.depositList.accountNo)
  //   }else{
  //     setValue("openUnderAcc","")
  //   }
  // }, [state]);


  const getLookUp = async (data) => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,


      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHDEPOSITLOOKUP, payload);
      // console.log("Lookupresponse", response);
      // setShowBal(response.data?.accBal);
      SetLookupList(response?.data?.disposalInstructionJson);
      //   setValue("depaccount", response?.data?.accountNo);

      //   if (response?.status == true) {
      //     SetShowAcc(true);
      //   }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };


  const onSubmit = async (data) => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        // depoType: state?.code,
        accountNumber: state?.accountNumber?.accNo,
        branchCode: state?.accountNumber?.brCode,
        schemeCode: state?.details?.code,
        schemeType: state?.details?.code,
        tenureDays: data?.days?.code,
        tenureMonths: data?.months,
        openUnderAcc: state?.depositList.accountNo ? state.depositList.accountNo:"",
        amount: data?.amt,
        tpin: data?.tpin,
        disposalInstruction: data?.disinstr.value
      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHCASHCERT, payload);
      if(response.status){
        SweetAlertPopup(response.message,"Success","success")
        reset()
      }else{
        SweetAlertPopup(response.message,"Error","error")
      }
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setDepositList(response?.data?.schemeCodelist);
      // setValue("depaccount", response?.data?.accountNo);

      // if (response?.status == true) {
      //   SetShowAcc(true);
      // }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  //   const onSubmit = () => {};

  const ColorButton1 = styled(Button)(({ theme }) => ({
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
    width: "153px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  return (
    <>
    {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
    <div className={classes.redrow}>
      <div>
        <div style={{display:"flex", gap:'5px'}}>
          <GoBackButton/>
      <div className={classes.SubHeading}>
      Fixed Deposit / Cash Certificate
              </div>
              </div>
              </div>

            </div>
        <div className={classes.sbox}>
      <div className={classes.Payment1MobilePrepaidMainPage}>
      
      
       
        <Box
         
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

              <Grid item xs={12} sm={12} md={12}>
               <span className={classes.mainupperheader1}>Amount</span> (Min ₹ 1.0 Max ₹ 99999999999)
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Enter amount
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amt",
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Enter amount",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        inputProps: {
                          maxLength: 19,
                        },
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9.]+$/}
                      rules={{
                        required: "Amount is required",
                        pattern: {
                          value: /^\d{1,16}(?:\.\d{1,2})?$/,
                          message: "Please Enter a valid Amount",
                        },
                      }}
                      required={true}
                    />
                     {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "openUnderAcc",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Enter amount",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        type:"hidden",
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      // backgroundColor={true}
                      // regExp={/^[a-zA-Z0-9]+$/}
                      // rules={{
                      //   required:
                      //     "Amount" + errorMessages.error_autocomplete_message,
                      // }}
                      required={false}
                    /> */}
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}></Grid>

              <Grid item xs={12} sm={12} md={12} className={classes.mainupperheader1}>
                Tenture
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Enter months
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "months",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Enter months",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9 ]+$/}
                      rules={{
                        required:
                          "Months" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Enter days
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                  <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "days",
                        }}
                        TextFieldProps={{
                          style: { width: "100%" },

                          placeholder: "Enter Days",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[0-9]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Days" +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={days}
                        required={true}
                      />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Disposal Instruction
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "disinstr",
                      }}
                      TextFieldProps={{
                        // style: { width: "28vw" },

                        placeholder: "Select Instructions",
                        onKeyDown: (event) => {
                          //const regex = /^[a-zA-Z]*$/;
                          const regex = /^[a-zA-Z\s]*$/;
                          const isBackspace = event.keyCode === 8;
                          const isValidInput = regex.test(event.key);

                          if (!isValidInput && !isBackspace) {
                            event.preventDefault();
                          }
                        },
                      }}
                      rules={{
                        required:
                          "Instructions " +
                          errorMessages.error_autocomplete_message,
                      }}
                      data={lookupList}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              {/* <Grid item xs={12} sm={12} md={6} ></Grid> */}

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowtextaff}>Enter TPIN  <sup className={classes.required}>*</sup></div>
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
                            message: "TPIN must contain only digits and have at least 4 digits",
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
                              marginTop:'4px',
                              borderRadius: "6px",
                              height: "35px",
                              //   backgroundColor: "rgb(238, 239, 247)",
                              backgroundColor: "#FFF",
                              fontSize: '13px',
                             
                              color: '#888',
                              fontWeight:'500',
                              border: '1px solid',
                            },
                          }}
                          inputProps={{ maxLength: 4,minLength:4 }}
                          
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
              </Grid>

              <Grid item xs={12} sm={12} md={6}></Grid>
            </Grid>
          </div>

          {/* <div className={classes.payment1mobileprepaidbutton}>
            <ColorButton1 variant="contained" type="button" onClick={reset}>
              Reset
            </ColorButton1>
          </div> */}
          <div className={classes.payment1mobileprepaidbutton}>
            <ColorButton2 variant="contained" type="button" onClick={reset}>
              Reset
            </ColorButton2>
            <ColorButton1 variant="contained" type="submit">
              Submit
            </ColorButton1>
          </div>
        </Box>
      </div>
      </div>
    </>
  );
};

export default OpendepositeChild1;
