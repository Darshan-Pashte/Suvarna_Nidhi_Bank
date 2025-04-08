import React from "react";
import classes from "./AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
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
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import RadioGroupForm from "../../../../../components/common/RedioButtonForm";
import Loader from "../../../../../components/common/loader";

const defaultFormData = {
  accnumber: "",
  password: "",
  noofcheckbook: "",
  ifsccode: "",
  nickname: "",
  fullname: "",
  mobilenum: "",
  tpin: "",
  deliveryday: "",
};

const ChequeRequestCorporate = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bene, setBene] = useState("");

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
    navigate(route);
  };
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [isLoading, setIsloading] = useState(false);

  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  useEffect(() => {
    Bene();
  }, []);

  const Bene = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
    };
    setIsloading(true)
    const response = await postApiData(apiList.BENEFICIARYBROWSE, payload);
    // console.log("responseBene", response);
    if (response?.status == true) {
      setBene(response?.data.beneficiary);
      setIsloading(false)
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: data.accno1.value,
      noofcheqbook: data.noofcheckbook,
      deliveryday: data.deliveryday,
      addtype : "2"
    };
    setIsloading(true)
    const response = await postApiData(apiList.CHEQUEBOOKREQUEST, payload);
    // console.log("response", response);
    if (response?.status == true) {
      SweetAlertPopup(response?.message, "Success", "success");
      reset();
      setIsloading(false)
    } else {
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false)
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "133px",
    height: "35px",
    "&:hover": {
      background: "#808080",
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
    width: "133px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  return (
    <>

{isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <div className={classes.Payment1MobilePrepaidMainPage}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.accountlimitimpxheading}>
            ChequeBook Request5
          </div>
          *Indicates Mandatory Fields
          <Box
            className={classes.box1}
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
                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Account Number
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "accno1",
                        }}
                        TextFieldProps={{
                          style: { width: "100%" },

                          placeholder: "Account Number",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            // const regex = /^[0-9]*$/;
                            const regex = /^[a-zA-Z0-9]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Account " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={accountList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                    No of ChequeBook
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "noofcheckbook",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Branch",
                          placeholder: "Enter No of ChequeBook",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // inputProps: { maxLength: 11 },
                        }}
                        backgroundColor={true}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "No of ChequeBook" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                    Delivery day
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <RadioGroupForm
                        controlerProps={{
                          control: control,
                          name: "deliveryday",
                        }}
                        data={[
                          {
                            label: "Any Day",
                            value: "6",
                          },
                          {
                            label: "Weekend",
                            value: "1",
                          },
                        ]}
                        errorMessage={errorMessages.error_type_message + "Delivery day"}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                </Grid>
            </div>

            <div className={classes.payment1mobileprepaidbutton}>
              <ColorButton2 onClick={()=>{reset()}}>
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

export default ChequeRequestCorporate;
