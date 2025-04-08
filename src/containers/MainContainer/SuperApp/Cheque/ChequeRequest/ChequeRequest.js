import React from "react";
import classes from "./AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Modal } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";
import { useLocation } from "react-router-dom/dist";
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
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import RedioButtonFormRequired from "../../../../../components/common/RedioButtonFormRequired";
import GoBackButton from "../../../../../components/common/GoBackButton";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const defaultFormData = {
  accountNumber: "",
  acctype: "",
  accName: "",
  noofcheckbook: "1",
  deliveryday: "",
};
const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  [theme.breakpoints.down('sm')]: {
    width: '90%', // Adjust width for small screens
    p: 2, // Reduce padding
    gap: "20px", // Reduce gap
  },
  [theme.breakpoints.down('md')]: {
    width: '80%', // Adjust width for medium screens
  },
});
const ChequeRequest = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();


  const [bene, setBene] = useState("");
  const { state } = useLocation();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  console.log('user', user)
  const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo, 'name': item.name, 'acctype': item.acctype }));
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const bankNames = process.env.REACT_APP_FLAVOUR;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    resetField,
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

  const resetForm = () => {
    resetField("noofcheckbook")
    resetField("deliveryday")
  }

  // const onSubmit = async (data) => {
  //   const payload = {
  //     custNo: user?.userId,
  //     sessionId: user?.sessionId,
  //     accNo: data.accountNumber.value,
  //     noofcheqbook: data.noofcheckbook,
  //     deliveryday: data.deliveryday,
  //     addtype: "2"
  //   };
  //   setIsloading(true)
  //   const response = await postApiData(apiList.CHEQUEBOOKREQUEST, payload);
  //   // console.log("response", response);
  //   if (response?.status == true) {
  //     SweetAlertPopup(response?.message, "Success", "success");
  //     reset();
  //     setIsloading(false)
  //   } else {
  //     SweetAlertPopup(response?.message, "Error", "error");
  //     setIsloading(false)
  //   }
  // };

  const [open, setOpen] = useState(false);


  // Open Confirmation Modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
  };

  // API Call on Confirm
  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: data.accountNumber.value,
      noofcheqbook: data.noofcheckbook,
      deliveryday: data.deliveryday,
      addtype: "2",
    };

    setIsloading(true);
    setOpen(false); // Close modal before API call

    try {
      const response = await postApiData(apiList.CHEQUEBOOKREQUEST, payload);
      if (response?.status) {
        SweetAlertPopup(response?.message, "Success", "success");
        reset();
      } else {
        SweetAlertPopup(response?.message, "Error", "error");
      }
    } catch (error) {
      SweetAlertPopup("Something went wrong", "Error", "error");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (accountList) {
      // setValue("accName", accName)
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
    }
  }, []);
  useEffect(() => {
    setValue("deliveryday", "6")
  }, [])



  useEffect(() => {
    const accountNumber = watch('accountNumber');
    if (accountNumber) {
      const account = accountList.find(acc => acc.value === watch('accountNumber').value);
      if (account) {
        console.log("Set value run");
        setValue('acctype', account.acctype);
        setValue('accName', account.name);
        setValue("deliveryday", "6")
      }
    }
  }, [watch('accountNumber'), accountList]);
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
    width: "133px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));



  return (
    <>

      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              ChequeBook Request
            </div>
          </div>
        </div>



      </div>
      <div className={classes.sbox}>
        <div className={classes.Payment1MobilePrepaidMainPage}>

          <div>


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
                  <Grid item xs={12} sm={12} md={3}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Account Number
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.widthtfield}>
                        <AutocompleteForm
                          controlerProps={{
                            control: control,
                            name: "accountNumber",
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
                              "Account " +
                              errorMessages.error_autocomplete_message,
                            // maxLength: {
                            //   value: 32, // Set your max length here
                            //   message: "Account Number must be no more than 10 digits long",
                            // },
                          }}
                          data={accountList}
                          required={true}
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Account Type
                      </div>
                      <div className={classes.widthtfield}>
                        <TextFieldForm
                          controlerProps={{
                            control: control,
                            name: "acctype",
                            rows: 5,
                            maxRows: 10,
                          }}
                          TextFieldProps={{
                            // label: "Branch",
                            placeholder: " Account Type ",
                            //   style: { width: "130%" },
                            fullWidth: true,
                            // style:{border:'3px solid #ECECEC'}
                            disabled: true,

                          }}
                          backgroundColor={true}
                          regExp={/^[0-9A-Za-z]*$/}
                          // rules={{
                          //   required:
                          //     "  Account Number " +
                          //     errorMessages.error_autocomplete_message,
                          // }}
                          required={false}
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Account Holder Name
                      </div>
                      <div className={classes.widthtfield}>
                        <TextFieldForm
                          controlerProps={{
                            control: control,
                            name: "accName",
                            rows: 5,
                            maxRows: 10,
                          }}
                          TextFieldProps={{
                            // label: "Branch",
                            placeholder: " Account Holder Name",
                            //   style: { width: "130%" },
                            fullWidth: true,
                            // style:{border:'3px solid #ECECEC'}
                            disabled: true,

                          }}
                          backgroundColor={true}
                          regExp={/^[a-zA-Z0-9]+$/}
                          // rules={{
                          //   required:
                          //     "  Account Holder Name  " +
                          //     errorMessages.error_autocomplete_message,
                          //   // pattern: {
                          //   //   value: /^[A-Z]{4}0[0-9]{7}$/,
                          //   //   message: "Please Enter valid format of IFSC Number",
                          //   // },
                          // }}
                          required={false}
                        />
                      </div>
                    </div>
                  </Grid>

                  {
                    bankNames !== 'Bhagini' && (
                      <Grid item xs={12} sm={12} md={3}>
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
                                placeholder: "No of ChequeBook",
                                //   style: { width: "130%" },
                                fullWidth: true,
                                // inputProps: { maxLength: 11 },
                                inputProps: { maxLength: 6 }
                              }}
                              // backgroundColor={true}
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
                    )
                  }

                  {bankNames !== 'Bhagini' && (
                    <Grid item xs={12} sm={12} md={4}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Delivery day
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <RedioButtonFormRequired
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
                            rules={
                              { required: "Delivery Day is required" }
                            }
                            errorMessage={"Delivery Day is required"}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>
                  )

                  }

                </Grid>
              </div>

              <div className={classes.payment1mobileprepaidbutton}>
                <ColorButton2 onClick={() => { reset() }}>
                  Reset
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit" onClick={handleOpen}>
                  Submit
                </ColorButton1>

                <Modal
                  open={open}
                  // onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={(theme) => style(theme)}
                    component={"form"}
                    className={classes.mainbox}
                    style={{ borderRadius: "16px", padding: "16px" }}
                  >

                    <div className={classes.statementmodal}>
                      <div className={classes.headingModalStatement}>
                        <div className={classes.cancelButton}>
                          <IconButton aria-label="close" onClick={handleClose} style={{ color: 'red' }}>
                            <HighlightOffIcon />
                          </IconButton>
                        </div>
                        <div>
                          Are you sure you want to proceed with the cheque book request?
                        </div>

                      </div>
                      {/* <div className={classes.cancelButton}>
                    <IconButton aria-label="close" onClick={handleCloseModal}>
                      <HighlightOffIcon />
                    </IconButton>
                  </div> */}
                    </div>
                    <div className={classes.buttonDownloadStatement}>
                      <ColorButton1 onClick={handleClose}>
                        Cancel
                      </ColorButton1>
                      <ColorButton2 onClick={handleSubmit(onSubmit)} >
                        Accept
                      </ColorButton2>
                    </div>
                  </Box>
                </Modal>
                {/* <Dialog open={open} onClose={handleClose}>
                  <IconButton aria-label="close" onClick={handleClose} style={{ color: 'red' }}>
                    <HighlightOffIcon />
                  </IconButton>
                  <DialogContent>
                    <Typography>Are you sure you want to proceed?</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} color="primary" disabled={isLoading}>
                      {isLoading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Accept"}
                    </Button>
                  </DialogActions>
                </Dialog> */}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChequeRequest;
