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
import UpdateCorporatePassword from "../../../Login/UpdateCorporatePassword";
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


const SettingsCorporate = () => {
  const [valueTable, setValueTable] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTable(newValue);
  };
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState({
    customarName: "",
    customarNo: "",
    email: "",
    address: "",
    companyName: "",
    mobileno: "",
    pan: "",
    aadhar: "",
    status: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

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


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    getProfileList();
  }, []);

  const getProfileList = async () => {
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
      };
      setIsloading(true);
      const response = await postApiData(apiList.CORPORATE_FETCHPROFILE, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      // setCustomarNo(response?.data?.profile?.username);
      // setCustomarName(response?.data?.profile?.custName);
      // setEmail(response?.data?.profile?.email);
      // setaddress(response?.data?.profile?.address);
      // setCompanyName(response?.data?.profile?.companyName);
      // setPan(response?.data?.profile?.pan);
      // setAadhar(response?.data?.profile?.aadhar);
      // setStatus(response?.data?.profile?.status);

      setProfile({
        customarNo: response?.data?.profile?.username,
        customarName: response?.data?.profile?.custName,
        email: response?.data?.profile?.email,
        address: response?.data?.profile?.address,
        companyName: response?.data?.profile?.companyName,
        mobileno: response?.data?.profile?.mobileno,
        pan: response?.data?.profile?.pan,
        aadhar: response?.data?.profile?.aadhar,
        status: response?.data?.profile?.status,
      });

      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };
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

      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", gap: '5px' }}>
            {/* <GoBackButton /> */}
            <div className={classes.SubHeading}>
              Profile Settings
            </div>
          </div>
        </div>


      </div>
      <div className={classes.sbox}>
        {/* <div className={classes.cardsheader}>Profile Settings</div> */}

        <div className={classes.changebuttons}>
          <ColorButton1 variant="contained" type="submit" onClick={openModal}>
            Update Password
          </ColorButton1>

        </div>



        <div className={classes.cardscontent}>
          <Grid
            container
            columnSpacing={4}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >


            <Grid item xs={12} sm={12} md={12}>

              <Box className={classes.tableMainBox}>

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
                            User Name
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.customarName}
                          </div>
                        </div>
                        <div className={classes.content}>
                          <div className={classes.contentHeading}>
                            Home Branch
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.address}
                          </div>
                        </div>

                      </div>
                      <div className={classes.secondrow}>
                        <div className={classes.content}>
                          <div className={classes.contentHeading}>
                            Company Name
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.companyName}
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
                            Email Address
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.email}
                          </div>
                        </div>
                        <div className={classes.content}>
                          <div className={classes.contentHeading}>
                            Communication Address
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.address}
                          </div>
                        </div>

                      </div>
                      <div className={classes.secondrow}>
                        <div className={classes.content}>
                          <div className={classes.contentHeading}>
                            Contact Number
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.mobileno}
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
                            {profile.pan}
                          </div>
                        </div>
                        <div className={classes.content}>

                        </div>

                      </div>
                      <div className={classes.secondrow}>
                        {/* <div className={classes.content}>
                          <div className={classes.contentHeading}>
                            Aadhar card no.
                          </div>
                          <div className={classes.contentdetails}>
                            {profile.aadhar}
                          </div>
                        </div> */}
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
                    <UpdateCorporatePassword
                      open={isModalOpen}
                      handleClose={closeModal}
                      userId={userId}
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

    </>
  );
};

export default SettingsCorporate;
