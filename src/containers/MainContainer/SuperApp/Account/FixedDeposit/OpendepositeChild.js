
import React from "react";
import classes from './OpenDeposit.module.css'

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
import Loader from "../../../../../components/common/loader";
import GoBackButton from "../../../../../components/common/GoBackButton";



const defaultFormData = {
  email: "",
  password: "",
};

const OpendepositeChild = () => {
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
    navigate(route)
  }
  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };






  const [accList, setAccList] = useState([])
  const [balance, setBalance] = useState("")
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [depositList, setDepositList] = useState({})

  const [showAcc, SetShowAcc] = useState(false)

  const { state } = useLocation()

  const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo }));

  useEffect(() => {
    getFetchDeposite()
  }, [])

  const getFetchDeposite = async () => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        depoType: state?.code,
      };
      setIsloading(true)
      const response = await postApiData(apiList.FETCHDEPOSITACCNO, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setDepositList(response?.data)
      setValue('depaccount', response?.data?.accountNo)
      if (response?.status == true) {
        SetShowAcc(true)
      }
      setIsloading(false)


    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }

  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "8rem",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      width: "100%",
      height: "35px",
      
    },
  }));

  const onSubmit = async (data) => {
    navigate("/account/opendepositchild1", {
      state: { depositList: depositList ? depositList : [], details: state, accountNumber: { accNo: watch("account")?.value, brCode: watch("account")?.code } },

    })
  };


  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
      <div>
        <div style={{display:"flex",alignItems:"center", gap:'5px'}}>
          <GoBackButton/>
      <div className={classes.SubHeading}>
      Open New Deposit
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
              style={{ padding: '0.1vw' }}
            >

              <Grid item xs={12} sm={12} md={3} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Select from Account
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "account",
                      }}
                      TextFieldProps={{
                        // style: { width: "28vw" },

                        placeholder: "Select Account",
                        onKeyDown: (event) => {
                          //const regex = /^[a-zA-Z]*$/;
                          // const regex = /^[0-9]*$/;
                          const regex = /^[a-zA-Z0-9]*$/;
                          const isBackspace = event.keyCode === 8;
                          const isValidInput = regex.test(event.key);
                          const currentInputValue = event.target.value;
                          const maxLength = 32;
                          const isMaxLengthReached = currentInputValue.length >= maxLength;
                          if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                            event.preventDefault();
                          }
                        },
                      }}
                      rules={{
                        required:
                          "Account " + errorMessages.error_autocomplete_message,
                        maxLength: {
                          value: 32, // Set your max length here
                          // message: "Account Number must be no more than 10 digits long",
                        },
                      }}
                      data={accountList}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>


              {/* <Grid item xs={12} sm={12} md={6} ></Grid> */}

              {
                showAcc ? <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Select from Deposit Account
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>


                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "depaccount",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{

                          // label: "Branch",
                          placeholder: "Enter Deposit Account",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "Deposit Account" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />

                    </div>
                  </div>
                </Grid> : null
              }

              <Grid item xs={12} sm={12} md={3} >
                <div className={classes.payment1mobileprepaidbutton} >
                  <ColorButton1 variant="contained" type="submit">
                    Continue
                  </ColorButton1>
                </div>
              </Grid>

            </Grid>
          </div>


        </Box>
      </div>
      </div>


    </>
  )
}

export default OpendepositeChild




