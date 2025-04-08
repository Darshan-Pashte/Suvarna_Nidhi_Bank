import React from "react";
import classes from "./ElectricityBill.module.css";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography, Stack } from "@mui/material";
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
import TextFieldForm from "../../../../components/common/textFieldForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import RightClickIcon from "../../../../assets/BillPayments/RightClickIcon.svg";

import Checkbox from "@mui/material/Checkbox";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const defaultFormData = {
  email: "",
  password: "",
};

const SuccessBill = () => {
  const [tabvalue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
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

  // useEffect(() => {
  //   if (error) {
  //     popupAlert("Please Enter Valid Credentials", "Error", "error");
  //     dispatch(clearErrors());
  //   }

  //   if (isAuthenticated) {
  //     navigate("/dashboard")
  //   }
  // }, [dispatch, error, navigate, isAuthenticated,popupAlert]);
  // const { dispatch: authDispatch } = useContext(AuthContext);
  // const dispatchSetUser = (payload) => {
  //   authDispatch({ type: SET_USER, payload });
  // };
  // const [passwordInput, setPasswordInput] = useState('password');

  const onSubmit = async (data) => {
    const payload = {
      username: data.email,
      password: data.password,
    };
    const response = await postApiData(apiList.LOGIN, payload);
    // console.log("response", response);
    setUserId(data?.email);
    if (response.status == false) {
      if (response.respCode == "NEW") {
        handleOpen();
      } else {
        popupAlert(response.message, "Error", "error");
      }
    } else {
      // dispatchSetUser({
      //   user: data?.email,
      //   token: response?.data?.sessionId,
      //   username: data?.email,
      // });
      // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
      // sessionStorage.setItem("menu", response?.data?.menu);
      sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);

      // sessionStorage.setItem("username", JSON.stringify(data.email));
      navigate("/dashboard");
      // navigate("/dashboard",{ state: { username: data.email} });
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
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
    width: "183px",
    height: "40px",
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
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          <Box
            sx={{
              marginLeft: "6rem",
              marginRight: "6rem",
              marginBottom: "6rem",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: " #DAE2F6",
                borderRadius: 2,
              }}
            >
              <Tabs
                value={tabvalue}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="secondary"
              >
                {/* <Tab label="Bill payments" {...a11yProps(0)} /> */}
              </Tabs>
            </Box>
            <CustomTabPanel
              className={classes.tableMainBox}
              value={tabvalue}
              index={0}
            >
              <div className={classes.Payment1MobilePrepaidMainPage}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <Box>
                      <Stack spacing={3}>
                        <img
                          className={classes.RighgtClickPic}
                          src={RightClickIcon}
                        />
                        <Typography className={classes.PaymentSuccesfullTypo}>
                          Payment Successful
                        </Typography>
                        <Typography className={classes.PaymentSuccesfull}>
                          ₹ 2,147
                        </Typography>
                      </Stack>
                    </Box>
                    <Grid container>
                      <Grid item sm={4}>
                        <Stack spacing={3}>
                          <Typography className={classes.leftSideDes}>
                            Reference ID
                          </Typography>
                          <Typography className={classes.leftSideDes}>
                            Paid to account
                          </Typography>
                          <Typography className={classes.leftSideDes}>
                            Amount
                          </Typography>
                          <Typography className={classes.leftSideDes}>
                            From account
                          </Typography>
                          <Typography className={classes.leftSideDes}>
                            On
                          </Typography>
                          <Typography className={classes.leftSideDes}>
                            Nickname
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item sm={8}>
                        <Stack spacing={3}>
                          <Typography className={classes.RightSideDes}>
                            AB123456789
                          </Typography>
                          <Typography className={classes.RightSideDes}>
                            Maharashtra State Electricity Distribution Company
                            Limited
                          </Typography>
                          <Typography className={classes.RightSideDes}>
                            ₹ 2,147
                          </Typography>
                          <Typography className={classes.RightSideDes}>
                            ABC- XXXXXXX0310
                          </Typography>
                          <Typography className={classes.RightSideDes}>
                            08/11/2023
                          </Typography>
                          <Typography className={classes.RightSideDes}>
                            Bill
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <div className={classes.ButtonMainDiv}>
                      <Button
                        onClick={() => navigate("/billPayments")}
                        style={{ cursor: "pointer" }}
                        sx={{
                          "&:hover": {
                            backgroundColor: "",
                            cursor: "pointer",
                            "& .addIcon": {
                              color: "purple",
                            },
                          },
                        }}
                        className={classes.Button}
                      >
                        Back to bill payments
                      </Button>
                    </div>
                  </Stack>
                </Box>
              </div>
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SuccessBill;
