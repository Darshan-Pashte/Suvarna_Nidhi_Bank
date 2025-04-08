import React from "react";
import classes from "../Settings/Settings.module.css";

import grid1logo from "../../../../assets/CardsPics/grid1logo.png";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography } from "@mui/material";
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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { userData } from "./userDataHome";



import Switch from "@mui/material/Switch";

import Checkbox from "@mui/material/Checkbox";
import AccountService from "./AccountService";
import Profile from "./Profile";
import UpdateTPINModal from "./UpdateTPINModal";
import UpdatePassword from "../../../Login/updatePasswordModal";
import ForgetTPINModal from "./ForgetTPINModel";
import GoBackButton from "../../../../components/common/GoBackButton";
import Loader from "../../../../components/common/loader";

const labelcheck = { inputProps: { "aria-label": "Checkbox demo" } };
const labelswitch = { inputProps: { "aria-label": "Switch demo" } };

const defaultFormData = {
  email: "",
  password: "",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #DAE2F6",
    color: "#323232",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

function createData(
  name,
  account,
  accountType,
  balance,
  withdrawable,
  currency,
  uncleared,
  amb
) {
  return {
    name,
    account,
    accountType,
    balance,
    withdrawable,
    currency,
    uncleared,
    amb,
  };
}


const Settings = () => {
  const [valueTable, setValueTable] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTable(newValue);
  };
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [customarName, setCustomarName] = useState("");
  const [customarNo, setCustomarNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [status, setStatus] = useState("");
  const [mobile, setMobile] = useState("");
  const [Data, setData] = useState("");

  const [msg, setMsg] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [isModalOpenTPIN, setIsModalOpenTPIN] = useState(false);
  const [isModalOpenForgetTPIN, setIsModalOpenForgetTPIN] = useState(false);
  const [response, setResponse] = useState("");

  const openModalForgetTPIN = () => {
    setIsModalOpenForgetTPIN(true);
  };

  const closeModalForgetTPIN = () => {
    setIsModalOpenForgetTPIN(false);
  };

  const openModalTPIN = () => {
    setIsModalOpenTPIN(true);
  };

  const closeModalTPIN = () => {
    setIsModalOpenTPIN(false);
  };


  const openModalForgetTPINOTP = async () => {
    try {
      const payload = {
        otp: '',
        custNo: user?.userId,
        sessionId: user?.sessionId,
        tpin: 1111

      };
      setIsloading(true);
      const response = await postApiData(apiList.FORGOTTPIN, payload);
      // console.log("response", response);
      if (response.status == true) {
        setMsg(response.message)
        openModalForgetTPIN()
        setResponse(response)
      }
      // setShowBal(response.data?.accBa);  
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }

  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getProfileList();
  }, []);

  const getProfileList = async () => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHPROFILE, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setCustomarNo(response?.data?.profile?.custNo);
      setCustomarName(response?.data?.profile?.custName);
      setEmail(response?.data?.profile?.email);
      setaddress(response?.data?.profile?.address);
      setPan(response?.data?.profile?.pan);
      setAadhar(response?.data?.profile?.aadhar);
      setStatus(response?.data?.profile?.status);
      setMobile(response?.data?.profile?.mobileno);
      setData(response?.data?.profile);
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
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
    background: "var(--primary-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "177px",
    height: "40px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "var(--button-color)",
      border: "1px solid #CCC",
      borderRadius: "12px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
    },
  }));

  return (
    <>
       {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Profile Settings
            </div>
          </div>
        </div>


      </div>
      <div className={classes.sbox}>
        <div className={classes.cardsmainpage}>
          <div className={classes.uupercontet}>
            <div className={classes.changebuttons}>
              <ColorButton1 variant="contained" type="submit" onClick={openModalTPIN}>
                Update TPIN
              </ColorButton1>
              <ColorButton1 variant="contained" type="submit" onClick={openModal}>
                Update Password
              </ColorButton1>
              <ColorButton1 variant="contained" type="submit" onClick={openModalForgetTPINOTP}>
                Forgot TPIN?
              </ColorButton1>
            </div>
          </div>

          <div className={classes.cardscontent}>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "0.1vw" }}
            >


              <Grid item xs={12} sm={12} md={12}>

                <Box>

                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      // backgroundColor: " var(--primary-color)",
                      borderRadius: "16px",
                      padding: "10px",
                      width: "100%",
                      marginTop: "10px"
                    }}
                  >
                    <div className={classes.settingDetails}>
                      <div className={classes.detailsHeading1}>
                        Personal details
                      </div>
                      <div className={classes.details}>
                        <div className={classes.firstrow}>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              user name
                            </div>
                            <div className={classes.contentdetails}>
                              {customarName}
                            </div>
                          </div>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              Address
                            </div>
                            <div className={classes.contentdetails}>
                              {address}
                            </div>
                          </div>

                        </div>
                        <div className={classes.secondrow}>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              Home Branch
                            </div>
                            <div className={classes.contentdetails}>
                              {Data?.branchName}
                            </div>
                          </div>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              Home Branch Address
                            </div>
                            <div className={classes.contentdetails}>
                              {Data?.branchAdd}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className={classes.settingDetails}>
                      <div className={classes.detailsHeading}>
                        Contact details
                      </div>
                      <div className={classes.details}>
                        <div className={classes.firstrow}>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              contact no.
                            </div>
                            <div className={classes.contentdetails}>
                              {mobile}
                            </div>
                          </div>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              communication address
                            </div>
                            <div className={classes.contentdetails}>
                              {address}
                            </div>
                          </div>

                        </div>
                        <div className={classes.secondrow}>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              Email address
                            </div>
                            <div className={classes.contentdetails}>
                              {email}
                            </div>
                          </div>
                          <div className={classes.content}>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={classes.settingDetails}>
                      <div className={classes.detailsHeading}>
                        Documents
                      </div>
                      <div className={classes.details}>
                        <div className={classes.firstrow}>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              Pan card no.
                            </div>
                            <div className={classes.contentdetails}>
                              {pan}
                            </div>
                          </div>
                          <div className={classes.content}>

                          </div>

                        </div>
                        <div className={classes.secondrow}>
                          <div className={classes.content}>
                            <div className={classes.contentHeading}>
                              Aadhar card no.
                            </div>
                            <div className={classes.contentdetails}>
                              {aadhar}
                            </div>
                          </div>
                          <div className={classes.content}>

                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <Tabs
                    value={valueTable}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    indicatorColor="primary"
                  >
                    <Tab style={{ color: 'var(--common-heading-color)' }} label="Profile Settings" {...a11yProps(0)} />
                   
                  </Tabs> */}
                    {isModalOpen ? (
                      <UpdatePassword
                        open={isModalOpen}
                        handleClose={closeModal}
                        userId={userId}
                      />
                    ) : null}


                    {isModalOpenTPIN ? (
                      <UpdateTPINModal
                        openTPIN={isModalOpenTPIN}
                        handleCloseTPIN={closeModalTPIN}
                        userId={userId}
                      />
                    ) : null}


                    {isModalOpenForgetTPIN ? (
                      <ForgetTPINModal
                        openTPIN={isModalOpenForgetTPIN}
                        handleCloseTPIN={closeModalForgetTPIN}
                        msg={msg}
                        response={response}
                      />
                    ) : null}
                  </Box>

                  {/* <CustomTabPanel value={valueTable} index={0}>
                  <Profile />
                </CustomTabPanel> */}
                </Box>


              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
