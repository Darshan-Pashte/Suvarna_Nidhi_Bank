// import React from "react";
// import classes from "../Statements/Statements.module.css";
// import axios from "axios";
// import grid1logo from "../../../../assets/CardsPics/grid1logo.png";

// import { useNavigate } from "react-router-dom";
// // import { Field, Form, Formik } from 'formik';
// // import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
// import { useForm, Controller } from "react-hook-form";
// import { Box, Grid, TextField, Typography } from "@mui/material";
// import { useContext, useState } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import styled from "styled-components";
// import { Button } from "@mui/base";
// import { RemoveRedEye } from "@mui/icons-material";

// // import { useForm, Controller } from 'react-hook-form';
// import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import TextFieldForm from "../../../../components/common/textFieldForm";
// import { postApiData } from "../../../../components/utilities/nodeApiServices";
// import { apiList } from "../../../../components/utilities/nodeApiList";
// import { errorMessages } from "../../../../components/utilities/formValidation";
// import AutocompleteForm from "../../../../components/common/autuCompleteForm";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// // import { userData } from "./userDataHome";

// import DataTable from "./RecentTrans";

// import Switch from "@mui/material/Switch";
// // import DataTable from "./tableTab2Statement";
// import Checkbox from "@mui/material/Checkbox";

// const labelcheck = { inputProps: { "aria-label": "Checkbox demo" } };
// const labelswitch = { inputProps: { "aria-label": "Switch demo" } };

// const defaultFormData = {
//   email: "",
//   password: "",
// };

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: " #DAE2F6",
//     color: "#323232",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 13,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// function createData(
//   name,
//   account,
//   accountType,
//   balance,
//   withdrawable,
//   currency,
//   uncleared,
//   amb
// ) {
//   return {
//     name,
//     account,
//     accountType,
//     balance,
//     withdrawable,
//     currency,
//     uncleared,
//     amb,
//   };
// }

// const Statements = () => {
//   const [valueTable, setValueTable] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValueTable(newValue);
//   };
//   // const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [accountType, setAccountType] = useState([]);
//   const [selectedAccountNo, setSelectedAccountNo] = useState("");
//   const [miniStatementData, setMiniStatementData] = useState([]);
//   const [selectedAccountBalance, setSelectedAccountBalance] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [isLoading, setIsloading] = useState(false);
//   const { loading, error, isAuthenticated, user } = useSelector(
//     (state) => state.auth
//   );

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     getValues,
//     register,
//     watch,
//     reset,
//     formState: { isSubmitting, errors },
//   } = useForm({
//     defaultValues: defaultFormData,
//     mode: "onChange",
//   });
//   const navigate = useNavigate();
//   const handlleNavigate = (route) => {
//     navigate(route);
//   };
//   const popupAlert = (message, msgtype, msgicon) => {
//     {
//       Swal.fire({
//         title: msgtype,
//         text: message,
//         icon: msgicon,
//       });
//     }
//   };

//   // useEffect(() => {
//   //   if (error) {
//   //     popupAlert("Please Enter Valid Credentials", "Error", "error");
//   //     dispatch(clearErrors());
//   //   }

//   //   if (isAuthenticated) {
//   //     navigate("/dashboard")
//   //   }
//   // }, [dispatch, error, navigate, isAuthenticated,popupAlert]);
//   // const { dispatch: authDispatch } = useContext(AuthContext);
//   // const dispatchSetUser = (payload) => {
//   //   authDispatch({ type: SET_USER, payload });
//   // };
//   // const [passwordInput, setPasswordInput] = useState('password');

//   // useEffect(() => {
//   //   if(user){
//   //     const fetchAccountData = async () => {
//   //       try {
//   //         setIsloading(true);

//   //         const response = await postApiData(apiList.FETCHACC, {
//   //           custNo: user.userId,
//   //           sessionId: user.sessionId,
//   //         });
//   //         //Set data in Account Type
//   //         setAccountType(response);
//   //         setIsloading(false);
//   //       } catch (error) {
//   //         console.error("Error fetching data:", error);
//   //         setIsloading(false);
//   //       }
//   //     };
//   //     fetchAccountData();
//   //   }



//   // }, [user.userId, user.sessionId]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       setIsloading(true);
//   //       const response = await postApiData(apiList.FETCH_MINI_STATEMENT, {
//   //         custNo: user.userId,
//   //         accNo: selectedAccountNo, // Here we are setting the selected account
//   //         sessionId: user.sessionId,
//   //         brCode: user.accountDetails[0].brCode,
//   //         acType: "casa", // Using "CASA " as mentioned in API documentation
//   //       });

//   //       setMiniStatementData(response);

//   //       const selectedAccount = accountType?.accountlst.find(
//   //         (account) => account.accNo === selectedAccountNo
//   //       );
//   //       if (selectedAccount) {
//   //         setSelectedAccountBalance(parseFloat(selectedAccount.accBal));
//   //       }
//   //       setIsloading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //       setIsloading(false);
//   //     }
//   //   };

//   //   if (selectedAccountNo) {
//   //     fetchData();
//   //   }
//   // }, [
//   //   selectedAccountNo,
//   //   user.userId,
//   //   user.sessionId,
//   //   user.accountDetails,
//   //   accountType,
//   // ]);

//   useEffect(() => {
//     if (accountType?.data?.accountlst.length > 0) {
//       setSelectedAccountNo(accountType.data.accountlst[0].accNo);
//     }
//   }, [accountType]);

//   //Adding ministatemnet data to apiRows

//   const apiRows =
//     (miniStatementData?.data?.miniStatement || [])
//       .slice(0, 10)
//       .map((row, index) => ({
//         ...row,
//         id: index,
//       })) || [];
//   const onSubmit = async (data) => {
//     const payload = {
//       username: data.email,
//       password: data.password,
//     };
//     const response = await postApiData(apiList.LOGIN, payload);
//     // console.log("response", response);
//     setUserId(data?.email);
//     if (response.status == false) {
//       if (response.respCode == "NEW") {
//         handleOpen();
//       } else {
//         popupAlert(response.message, "Error", "error");
//       }
//     } else {
//       // dispatchSetUser({
//       //   user: data?.email,
//       //   token: response?.data?.sessionId,
//       //   username: data?.email,
//       // });
//       // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
//       // sessionStorage.setItem("menu", response?.data?.menu);
//       sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);

//       // sessionStorage.setItem("username", JSON.stringify(data.email));
//       navigate("/dashboard");
//       // navigate("/dashboard",{ state: { username: data.email} });
//     }
//     // if (window.location.href.includes("/dashboard")) {
//     //   window.location.reload();
//     // }
//   };

//   const ColorButton1 = styled(Button)(({ theme }) => ({
//     color: "#FFFFFF",
//     // backgroundColor: "#F84B67",
//     // backgroundColor: "#323232",
//     background: "#183883;",
//     border: "1px solid #CCC",
//     borderRadius: "8px",
//     paddingLeft: "15px",
//     paddingRight: "15px",
//     width: "183px",
//     height: "40px",
//     "&:hover": {
//       background: "#808080",
//       color: "white",
//     },
//   }));

//   return (
//     <>
//       <div className={classes.cardsmainpage}>
//         <div className={classes.statementheader}>
//           {/* <div className={classes.statementhead1}>Account Statements </div> */}
//           <div>
//             {/* <div>Closing balance : {selectedAccountBalance.toFixed(2)}</div> */}
//           </div>
//         </div>

//         <div className={classes.cardscontent}>
//           <Grid
//             container
//             columnSpacing={4}
//             rowSpacing={2}
//             style={{ padding: "0.1vw" }}
//           >
//             <Grid item xs={12} sm={12} md={12}>
//               <Box className={classes.tableMainBox}>
//                 <Box
//                   sx={{
//                     borderBottom: 1,
//                     borderColor: "divider",
//                     backgroundColor: "var(--primary-color)",
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Tabs
//                     value={valueTable}
//                     onChange={handleChange}
//                     aria-label="basic tabs example"
//                     indicatorColor="primary"
//                   >
//                     <Tab style={{ color: 'var(--common-heading-color)' }} label="Recent Transactions" {...a11yProps(0)} />
//                     {/* <Tab label="Annual Account Statements" {...a11yProps(1)} />
//                     <Tab label="Combined Statement" {...a11yProps(2)} />
//                     <Tab label="Other Statements" {...a11yProps(3)} /> */}
//                   </Tabs>
//                 </Box>
//                 <div className={classes.tabContent}>
//                   <CustomTabPanel value={valueTable} index={0}>
//                     <DataTable 
//                     ></DataTable>
//                   </CustomTabPanel>
//                 </div>
//                 <CustomTabPanel value={valueTable} index={1}>
//                   Item Two
//                 </CustomTabPanel>
//                 <CustomTabPanel value={valueTable} index={2}>
//                   Item Three
//                 </CustomTabPanel>
//               </Box>
//             </Grid>
//           </Grid>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Statements;


import classes from '../Home/AccountStatementHome.module.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Grid, Menu, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import ServerInstance, { apiList } from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from '../../../../components/common/autuCompleteForm';
import SweetAlertPopup from '../../../../components/common/sweetAlertPopup';
import Loader from '../../../../components/common/loader';
import { compareTextAndReturnObject } from '../../../../components/common/commonArray';
import GridTablePagination from "../../../../components/common/gridTablePagination";
import MUIDataTable from 'mui-datatables';
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const Statements = ({ accList }) => {

  const [atmMasterList, setAtmMasterList] = useState([]);
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(user, 'user')
  // console.log("accList", accList)

  // const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo }));
  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
      name: item.name,
      acctype: item.acctype,
    }));
  // const accountList = accList && accList?.map(item => ({ "code": item.accNo, "value": item.accNo }));

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

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (accountList) {
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
    }
  }, []);

  useEffect(() => {
    const accountNumber = watch("accountNumber");
    if (accountNumber) {
      const account = accountList.find(
        (acc) => acc.value === watch("accountNumber").value
      );
      if (account) {
        // console.log("Set value run");KY
        // setValue("acctype", account.acctype);
        setValue('acctype', account?.name);

      }
    }
  }, [watch("accountNumber"), accountList]);

  // useEffect(() => {
  //   setValue("fromDate", new Date())
  //   setValue("toDate", new Date())
  // }, []);


  const navigate = useNavigate();
  const [openingBalance, setOpeningBalance] = useState("");
  const [branchDetails, setBranchDetails] = useState("");
  const [custDetails, setCustDetails] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [responseData, setResponseData] = useState("");


  const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
  console.log("bankContactInfo", bankContactInfo);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [payloaddata, setPayloadData] = React.useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (route) => {
    setAnchorEl(null);
    navigate(route)
  };


  const links = {
    textDecoration: "none",
    color: "#000",
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "131%" /* 20.96px */,
  };


  const handleNavigate = (data) => {
    // console.log('data',data)
    navigate('/dashboard/viewstatement', { state: data });
  };

  // const { state: user } = useContext(AuthContext);
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );

  // useEffect(()=>{
  //   setValue("fromDate", new Date())
  //   setValue("toDate", new Date())
  // },[])


  const payFromAccount = [
    {
      code: "01",
      value: "PDF "
    },
    {
      code: "02",
      value: "CSV "
    },

  ]

  const accountHomebank = [
    {
      code: "01",
      value: "0000487123256871486 - Rakesh Tr  "
    },
    {
      code: "02",
      value: "0000487123256871486 - Mahesh Tr  "
    },
    {
      code: "03",
      value: "0000487123256871486 - Ramesh Tr  "
    },

  ]


  const columns = [
    // {
    //   name: "srno",
    //   label: "Sr No",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, tableMeta) => {
    //       return tableMeta.rowIndex + 1; 
    //     },
    //   },
    // },

    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {

          const buttonStyles = {
            width: '7vw',
            textAlign: 'center',
            // whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '0.8rem'
          };


          // const dt = new Date(value);


          return (
            <div style={buttonStyles}>{value}</div>)

        }





      },
    },


    {
      name: "particulars",
      label: "Particulars",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Conditionally set the text color and background color
          const buttonStyles = {
            width: '35vw',
            textAlign: 'center',
            // whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '0.8rem'
          };

          return (
            <div style={buttonStyles}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "instruments",
      label: "Instruments",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Conditionally set the text color and background color
          const buttonStyles = {
            width: '6vw',
            textAlign: 'center',
            // whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '12px'
          };

          return (
            <div style={buttonStyles}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "drAmt",
      label: "Dr Amount",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Conditionally set the text color and background color
          const buttonStyles = {
            width: '4vw',
            textAlign: 'center',
            // whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '12px'
          };

          return (
            <div style={buttonStyles}>
              {value}
            </div>
          );
        },
      },
    },

    {
      name: "crAmt",
      label: "Cr Amount",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Conditionally set the text color and background color
          const buttonStyles = {
            width: '4vw',
            textAlign: 'center',
            // whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '12px'
          };

          return (
            <div style={buttonStyles}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "totalDrCr",
      label: "Total Amount",
      options: {
        filter: true,
        sort: false,

        // customBodyRender: (value, tableMeta, updateValue) => {
        //   // Conditionally set the text color and background color
        //   const buttonStyles = {
        // width:'80px',
        //     textAlign:'center',
        //     // whiteSpace: 'pre-wrap',
        //     wordBreak: 'break-word',
        //     textAlign:'center',
        //     display:'flex',
        //     justifyContent:'center'
        //   };

        //   return (
        //     <div style={buttonStyles}>
        //       {value}
        //     </div>
        //   );
        // },
        customBodyRender: (value, tableMeta, updateValue) => {
          // Conditionally set the text color and background color
          const buttonStyles = {
            width: '6vw',
            textAlign: 'center',
            // whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '12px'
          };

          return (
            <div style={buttonStyles}>
              {value}
            </div>
          );
        },
      },
    },
    // {
    //   name: "status",
    //   label: "Dr/Cr",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },

  ];



  const options = {
    textLabels: {
      body: {
        noMatch: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "larger",
            }}
          >
            {/* <img src={NoData} alt="no" /> */}
            <svg
              width="125"
              height="149"
              viewBox="0 0 125 149"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.0221 132.434C33.4829 135.11 35.5946 137.116 36.7177 137.785L42.5 135L38.0659 130.428L34.0221 132.434Z"
                stroke="#042879"
              />
              <path
                d="M99.5639 127.991H39.2383V82.7697H99.5007L99.5639 127.991Z"
                fill="white"
                stroke="#042879"
              />
              <path
                d="M36.044 142.467C36.044 141.397 36.4933 139.123 36.7179 137.785C33.3484 136.447 34.0223 132.434 33.3484 132.434C32.6744 132.434 27.957 133.103 27.957 135.109C27.957 137.116 34.0223 147.149 36.7179 147.818C39.4136 148.487 40.0875 147.149 39.4136 146.48C38.9371 146.007 36.044 143.805 36.044 142.467Z"
                stroke="#042879"
              />
              <path
                d="M57.5811 76.5178L113.357 76.5179L99.9558 82.9158L41.6568 81.8237L57.5811 76.5178Z"
                fill="#042879"
                stroke="#042879"
                stroke-linejoin="round"
              />
              <path
                d="M115.5 119.411L100.5 127.655V83.3368L115.5 77.2431V119.411ZM14.4997 98.6331L12.8121 103.1L10.1756 102.577C10.0889 102.161 10.0029 101.606 9.97349 101.039C9.93502 100.297 9.99938 99.6283 10.2071 99.216C10.5965 98.4431 11.0059 97.8738 11.2624 97.5621L14.4997 98.6331Z"
                fill="white"
                stroke="#042879"
              />
              <path
                d="M3.02175 110.362C4.10001 109.292 7.9638 105.011 9.76091 103.004C8.41307 99.6602 11.1087 96.9847 11.1087 96.9847C11.1087 96.9847 6.39133 94.9781 5.71741 94.9781C5.0435 94.9781 1 107.686 1 109.693C1 111.7 1.67392 111.7 3.02175 110.362Z"
                stroke="#042879"
              />
              <path
                d="M101.266 83.1942L115.37 76.6126L124.249 86.8481L110.62 95.8222L101.266 83.1942Z"
                fill="white"
                stroke="#042879"
              />
              <path
                d="M62.3765 98.6163C62.3765 98.6164 62.3746 98.6176 62.3708 98.6196C62.3746 98.6171 62.3764 98.6162 62.3765 98.6163ZM89.031 68.5944C93.5499 72.6858 96.6116 78.271 97.4462 82.4383L89.3677 82.4384C89.3023 82.409 89.2141 82.3529 89.0745 82.2481C89.0403 82.2224 89.0031 82.1939 88.9631 82.1633C88.8154 82.05 88.6305 81.9082 88.4208 81.7751C87.8585 81.4182 87.0924 81.1008 85.9116 81.1008C85.5466 81.1008 85.2556 81.3045 85.0431 81.5293C84.8266 81.7582 84.6326 82.0692 84.4548 82.4249C84.0976 83.1396 83.7531 84.1429 83.419 85.3324C82.7488 87.7185 82.0925 90.9573 81.4606 94.3857C81.1069 96.305 80.758 98.2996 80.4182 100.243C80.1522 101.764 79.8917 103.253 79.6387 104.65C79.0585 107.854 78.5156 110.584 78.0199 112.224C77.7986 112.956 77.2031 113.883 76.2588 114.969C75.3235 116.044 74.082 117.234 72.6231 118.49C69.7059 121.001 65.9538 123.748 62.1287 126.334C58.3054 128.92 54.4187 131.339 51.2374 133.193C49.6466 134.121 48.2348 134.906 47.0973 135.5C46.155 135.991 45.4193 136.342 44.9302 136.536C42.8879 134.483 39.3665 130.621 37.4852 128.53C43.7099 124.639 55.6284 117.175 57.2091 116.129C57.5714 115.89 57.8941 115.427 58.1828 114.906C58.4835 114.362 58.7902 113.673 59.0943 112.895C59.7031 111.337 60.319 109.375 60.8687 107.402C61.4189 105.428 61.9057 103.433 62.2553 101.803C62.4301 100.988 62.5713 100.261 62.6691 99.6726C62.765 99.095 62.8246 98.619 62.8246 98.3223C62.8246 98.2311 62.8149 98.0696 62.7206 97.9198C62.6672 97.8348 62.5858 97.753 62.4725 97.7011C62.3614 97.6502 62.2526 97.6429 62.1656 97.6521C62.0094 97.6686 61.8845 97.7418 61.8125 97.7898C61.7296 97.845 61.6485 97.9139 61.5722 97.9858C61.2749 98.2662 60.8749 98.7616 60.4186 99.3706C59.6678 100.373 58.7003 101.771 57.6654 103.266C57.4278 103.609 57.1866 103.958 56.9437 104.308C55.6371 106.19 54.2768 108.121 53.1193 109.581C52.5394 110.312 52.0213 110.91 51.5938 111.322C51.3795 111.529 51.2002 111.676 51.0574 111.769C50.9223 111.857 50.8633 111.867 50.8635 111.868C50.8635 111.868 50.865 111.868 50.868 111.868C50.646 111.868 49.9184 111.809 48.7698 111.697C47.6367 111.586 46.1252 111.427 44.3623 111.234C40.8369 110.847 36.3108 110.325 31.8055 109.782C27.2998 109.238 22.817 108.674 19.3774 108.205C17.6572 107.97 16.2009 107.759 15.1343 107.586C14.6004 107.499 14.1686 107.423 13.8518 107.359C13.693 107.327 13.568 107.299 13.4757 107.275C13.4505 107.268 13.4298 107.262 13.4129 107.257C13.4075 107.233 13.4018 107.198 13.3977 107.149C13.3815 106.955 13.403 106.663 13.4716 106.272C13.6076 105.497 13.9054 104.455 14.2936 103.297C15.0194 101.13 16.0368 98.6268 16.8062 96.859C20.2907 97.3021 25.4115 97.9099 29.9109 98.3517C32.2412 98.5804 34.4101 98.7652 36.1004 98.8591C36.9449 98.906 37.6765 98.9307 38.252 98.9262C38.8003 98.922 39.2798 98.8924 39.5685 98.7969C39.777 98.728 39.9812 98.5945 40.1692 98.4453C40.3636 98.2911 40.572 98.0946 40.7897 97.8676C41.2254 97.4133 41.7252 96.809 42.262 96.1074C43.3369 94.7025 44.5875 92.8718 45.8118 90.9863C48.2576 87.2195 50.6281 83.1882 51.3145 81.8257C51.3759 81.7039 51.4442 81.5656 51.5199 81.4122C53.1013 78.2093 57.9356 68.4183 71.2433 64.0162C78.093 61.7504 84.3128 64.3226 89.031 68.5944ZM13.4271 107.303C13.4271 107.303 13.4263 107.302 13.425 107.299C13.4265 107.302 13.4272 107.303 13.4271 107.303Z"
                fill="white"
                stroke="#042879"
              />
              <path
                d="M54 76.5C59.8406 80.7361 68.4999 90.8574 84 83.5"
                stroke="#042879"
              />
              <ellipse
                cx="79.1739"
                cy="32.7739"
                rx="15.5001"
                ry="15.3837"
                fill="#FFE4E5"
              />
              <path
                d="M44.3047 38.1254C44.3047 41.9091 41.2131 44.9828 37.3916 44.9828C33.57 44.9828 30.4785 41.9091 30.4785 38.1254C30.4785 34.3417 33.57 31.2679 37.3916 31.2679C41.2131 31.2679 44.3047 34.3417 44.3047 38.1254Z"
                stroke="#ED3237"
              />
              <ellipse
                cx="53.5654"
                cy="7.35744"
                rx="7.41307"
                ry="7.35744"
                fill="#FFE4E5"
              />
              <path
                d="M115.74 45.4826C115.74 48.1581 113.553 50.3334 110.848 50.3334C108.143 50.3334 105.957 48.1581 105.957 45.4826C105.957 42.8071 108.143 40.6317 110.848 40.6317C113.553 40.6317 115.74 42.8071 115.74 45.4826Z"
                stroke="#ED3237"
              />
              <path
                d="M79.08 27.704C80.136 27.704 80.9893 28.0027 81.64 28.6C82.2907 29.1973 82.616 29.9973 82.616 31C82.616 32.12 82.2693 32.952 81.576 33.496C80.8827 34.0293 79.944 34.296 78.76 34.296L78.712 35.816H77.448L77.384 33.288H77.848C78.904 33.288 79.7307 33.128 80.328 32.808C80.9253 32.488 81.224 31.8853 81.224 31C81.224 30.36 81.032 29.8533 80.648 29.48C80.264 29.1067 79.7467 28.92 79.096 28.92C78.4347 28.92 77.912 29.1013 77.528 29.464C77.1547 29.816 76.968 30.3013 76.968 30.92H75.592C75.592 30.28 75.736 29.72 76.024 29.24C76.312 28.7493 76.7173 28.3707 77.24 28.104C77.7733 27.8373 78.3867 27.704 79.08 27.704ZM78.072 39.096C77.7947 39.096 77.56 39 77.368 38.808C77.176 38.616 77.08 38.3813 77.08 38.104C77.08 37.8267 77.176 37.592 77.368 37.4C77.56 37.208 77.7947 37.112 78.072 37.112C78.3387 37.112 78.5627 37.208 78.744 37.4C78.936 37.592 79.032 37.8267 79.032 38.104C79.032 38.3813 78.936 38.616 78.744 38.808C78.5627 39 78.3387 39.096 78.072 39.096Z"
                fill="#042879"
              />
            </svg>

            <div style={{ fontSize: "15px" }}>
              {" "}
              Sorry, no matching records found.
            </div>
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "standard",
    filter: true,
    download: true,
    onDownload: (buildHead, buildBody, columns, allData) => {
      try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Bank Statement");
        // Add the bank name at the top
        const bankNameRow = worksheet.addRow([`${bankContactInfo?.BANKname}`]); // Replace "Bank Name" with the actual bank name
        worksheet.mergeCells("A1:F1"); // Merge cells for the bank name across 6 columns

        // Style the bank name row
        bankNameRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D9D9D9" }, // Light blue background
          };
          cell.font = { bold: true, size: 14 }; // Bold, larger font, black color
          cell.alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

        // Add an empty row after the bank name
        // worksheet.addRow([]);


        // Add additional information row
        // const additionalInfo = worksheet.addRow(["Branch Details", "", "Customer Details", "", "Account Number", ""]);
        const additionalInfoHeader = worksheet.addRow(["Branch Details", "", "Customer Details", "", `For Period :${accountDetails?.fromDate} to ${accountDetails?.toDate}`, ""]);
        //branch details
        const branchDetailsName = `${branchDetails?.brName}`;
        // const branchDetailsIFSC = `${branchDetails?.ifscCode}`;
        const branchDetailsAdd1 = `${branchDetails?.add1}`;
        const branchDetailsAdd2 = `${branchDetails?.add2}`;
        const branchDetailsAdd3 = `${branchDetails?.add3}`;
        const branchDetailsPincode = `${branchDetails?.pinCode}`;
        const branchDetailstelNo = `${branchDetails?.telNo}`;


        // const customerDetailsFormatted = `${custDetails?.custName}\n${custDetails?.add1}\n${custDetails?.add2}\n${custDetails?.add3}`;

        const customerDetailsName = `${custDetails?.custName}`;
        const customerDetailsAdd1 = `${custDetails?.add1}`;
        const customerDetailsAdd2 = `${custDetails?.add2}`;
        const customerDetailsAdd3 = `${custDetails?.add3}`;

        // const accountDetailsAccountNo = `${accountDetails?.acctno}`;
        const accountDetailsAccountNo = `${responseData?.virtualAccNo}`;
        const brCodeAccountDetails = `${branchDetails?.brCode}`;
        const accountDetailsFormatted = `${accountDetails?.openingBalance || "0.00"}`;
        const debitAmountFormatted = `${accountDetails?.drAmt || "0.00"}`;                // Debit Amount
        const creditAmountFormatted = `${accountDetails?.crAmt || "0.00"}`;               // Credit Amount
        const lastStmt = atmMasterList[atmMasterList.length - 1];
        const newBal = `${lastStmt?.totalDrCr}`;
        const totalAmountFormatted = `${newBal}`;


        const additionalInfoRow = worksheet.addRow([`Name: ${branchDetailsName}\nAddress: ${branchDetailsAdd1}\n${branchDetailsAdd2}\n${branchDetailsAdd3}\nPincode: ${branchDetailsPincode}\nContact No.:${branchDetailstelNo}`, "", `Name: ${customerDetailsName}\nAddress: ${customerDetailsAdd1}\n${customerDetailsAdd2}\n${customerDetailsAdd3}`, "", `Account No: ${accountDetailsAccountNo}\nBr Code: ${brCodeAccountDetails}\nOpening Balance: ${accountDetailsFormatted}\nDR Balance: ${debitAmountFormatted}\nCR Balance: ${creditAmountFormatted}\nNew Balance: ${totalAmountFormatted}`]);
        worksheet.mergeCells("A2:B2"); // Merge Branch Info cells
        worksheet.mergeCells("C2:D2"); // Merge Customer Name cells
        worksheet.mergeCells("E2:F2"); // Merge Account Number cells

        worksheet.mergeCells("A3:B3"); // Merge Branch Info cells
        worksheet.mergeCells("C3:D3"); // Merge Customer Name cells
        worksheet.mergeCells("E3:F3");


        // Style the additional info row with background and bold text
        additionalInfoHeader.eachCell((cell, colNumber) => {
          if (colNumber <= 6) {  // Apply styling to the first three columns only (Branch, Customer Name, Account Number)
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "D9D9D9" }, // Gray background
            };
            cell.font = { bold: true, color: { argb: "000000" } }; // Black bold text
            cell.alignment = { horizontal: "left", vertical: "middle", wrapText: true }; // Center alignment
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          }
        });

        additionalInfoRow.eachCell((cell, colNumber) => {
          if (colNumber <= 6) {  // Apply styling to the first three columns only (Branch, Customer Name, Account Number)
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFFFFFF" },
            };
            cell.font = { bold: true, color: { argb: "000000" } }; // Black bold text
            cell.alignment = { horizontal: "left", vertical: "top", wrapText: true }; // Center alignment
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          }
        });
        additionalInfoRow.height = 120; // Adjust this value as needed for the number of lines


        // Add headers
        const headerRow = worksheet.addRow(columns.map((column) => column.label));

        // Apply styles to the header row and add borders
        headerRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D9D9D9" }, // Gray background
          };
          cell.font = { bold: true, color: { argb: "000000" } }; // Black bold text
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }; // Center alignment
          // Add borders to header cells
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

        // Add data rows
        atmMasterList.forEach((rowData) => {
          const row = worksheet.addRow([
            rowData.date, // Date
            rowData.particulars, // Narration
            rowData.instruments, // Instrument Number
            rowData.drAmt, // Debit Amount
            rowData.crAmt, // Credit Amount
            rowData.totalDrCr, // Total Amount
          ]);

          // Apply borders to data rows
          row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }; // Center alignment
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        });

        // Auto-Adjust column widths
        worksheet.columns.forEach((column) => {
          column.width = 30; // Adjust width for better readability
        });

        // Write workbook to a buffer and trigger download
        // workbook.xlsx.writeBuffer().then((buffer) => {
        //   const blob = new Blob([buffer], { type: "application/octet-stream" });
        //   saveAs(blob, "Bank_Statement.xlsx");
        // });

        const fromDate = accountDetails?.fromDate?.replace(/-/g, "") || "startDate"; // Replace dashes or use a default value
        const toDate = accountDetails?.toDate?.replace(/-/g, "") || "endDate"; // Replace dashes or use a default value
        const fileName = `Bank_Statement_${fromDate}_to_${toDate}.xlsx`;
    
        // Write workbook to a buffer and trigger download
        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: "application/octet-stream" });
          saveAs(blob, fileName);
        });
        // Prevent the default CSV download
        return false;
      } catch (error) {
        console.error("Error generating Excel file:", error);
      }
    },

    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: true,

  };

  const onSubmit = async (data) => {
    console.log('data', data);
  
    const fromDate = data?.fromDate?._d || new Date();
    const toDate = data?.toDate?._d || new Date();
  
    // Calculate the difference in time between the two dates
    const diffInTime = toDate.getTime() - fromDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  
    console.log('Difference in days:', diffInDays);
  
    if (diffInDays > 31) {
      SweetAlertPopup(
        'You are allowed to fetch a statement for a maximum of 31 days.',
        'Error',
        'error'
      );
      setAtmMasterList([]);
    } else {
      setIsloading(true);
      try {
        const payload = {
          custNo: user?.userId,
          accNo: data.accountNumber.value,
          sessionId: user?.sessionId,
          fromDate: convertDate(data.fromDate, 4) || convertDate(new Date(), 4),
          toDate: convertDate(data.toDate, 4) || convertDate(new Date(), 4),
          acType: data?.acctype,
          brCode: data.accountNumber.code,
        };
  
        const response = await postApiData(apiList.STATEMENT, payload);
        console.log('response', response);
  
        if (response.status) {
          setAtmMasterList(response?.data?.statement.acctStmts);
          setOpeningBalance(response?.data?.statement.openingBalance || "0.00");
          setBranchDetails(response?.data?.statement?.branchDetails);
          setCustDetails(response?.data?.statement?.custDetails);
          setAccountDetails(response?.data?.statement);
          setResponseData(response?.data);
        } else {
          setAtmMasterList([]);
          SweetAlertPopup(response?.message, 'Error', 'error');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsloading(false);
      }
    }
  };
  
  



  // const onSubmit = async (data) => {
  //   console.log('data', data)



  //   const result1 = getDayOfYear(data?.fromDate?._d);
  //   const result2 = getDayOfYear(data?.toDate?._d ? data?.toDate?._d : new Date());
  //   // new Date(watch("fromDate")?._d).getdate
  //   console.log('result111', result1)
  //   console.log('resul222', result2)



  //   if (result2 - result1 > 31) {
  //     SweetAlertPopup('You are allowed to fetch a statement for a maximum of 31 days.', 'Error', 'error')
  //     setAtmMasterList([]);
  //   }
  //   else {
  //     setIsloading(true);
  //     try {
  //       const payload = {
  //         custNo: user?.userId,
  //         accNo: data.accountNumber.value,
  //         sessionId: user?.sessionId,
  //         fromDate: convertDate(data.fromDate, 4) ? convertDate(data.fromDate, 4) : convertDate(new Date(), 4),
  //         toDate: convertDate(data.toDate, 4) ? convertDate(data.toDate, 4) : convertDate(new Date(), 4),
  //         acType: data?.acctype,
  //         // fromDate: "20220101",
  //         // toDate: "20231122",
  //         brCode: data.accountNumber.code
  //       };

  //       // handleNavigate(data)
  //       const response = await postApiData(apiList.STATEMENT, payload);
  //       console.log('response', response)
  //       // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
  //       if (response.status) {
  //         setAtmMasterList(response?.data?.statement.acctStmts);
  //         setOpeningBalance(response?.data?.statement.openingBalance || "0.00");
  //         setBranchDetails(response?.data?.statement?.branchDetails);
  //         setCustDetails(response?.data?.statement?.custDetails)
  //         setAccountDetails(response?.data?.statement)

  //         // setValue('toDate', null)
  //         // SweetAlertPopup(response.message, "Success", "success")
  //         // reset()
  //       } else {
  //         setAtmMasterList([]);
  //         // setValue('toDate', null)
  //         // SweetAlertPopup(response.message, "Error", "error");
  //         SweetAlertPopup(response?.message, "Error", "error");

  //       }
  //       setIsloading(false);
  //     } catch (err) {
  //       // console.log(err);
  //       setIsloading(false);

  //     }
  //   }

  // };



  // function addDaysToDate(dateString, daysToAdd) {
  //   const dateParts = dateString.split('-'); // Split the input date string into [YYYY, MM, DD]
  //   const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Create a date object

  //   // Check if the date is valid
  //   if (isNaN(date.getTime())) {
  //     throw new Error('Invalid date');
  //   }

  //   // Add the days
  //   date.setDate(date.getDate() + daysToAdd);
  //   return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  // }
  // // Usage:
  // const resultDate = addDaysToDate(convertDate(watch('fromDate'), 4), 31);
  // console.log('resultDate',resultDate); // Outputs: 2024-07-11





  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "20px",
    paddingBottom: "20px",
    // width: "500px",
    height: "50px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "10vw",
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


  const getDayOfYear = (date) => {
    const startOfYear = new Date(date?.getFullYear(), 0, 1); // January 1st of the same year
    const diffInMilliseconds = date - startOfYear; // Difference in milliseconds
    const dayNumber = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Convert to days
    return dayNumber;
  };

  // Example Usage:

  // const dayOfYear = getDayOfYear(watch("fromDate")?._d);
  // const dayOfYear1 = getDayOfYear(new Date());

  // console.log(dayOfYear); // Output: 338
  // console.log(dayOfYear1);




  // const result1 = getDayOfYear(watch("fromDate")?._d)
  // // new Date(watch("fromDate")?._d).getdate
  // console.log('result1', result1)
  // const result2 = getDayOfYear(new Date())
  // console.log('result2', result2)

  //   const newresult=result2 - result1 < 31 ? 'YEs' : 'no'
  // console.log('newresult',newresult)
  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>

        <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
          {/* <GoBackButton /> */}
          <div className={classes.SubHeading}>
            Statement
          </div>
        </div>
      </div>

      <div className={classes.sbox}>
        <Box
          className={classes.mainContainer}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className={classes.Sbox}>
            <div>
              <div className={classes.formbox}>
                <Grid
                  container
                  columnSpacing={1}
                  rowSpacing={2}
                // style={{ padding: '0.1vw' }}
                >

                  <Grid item xs={12} sm={12} md={2.5}>
                    <div className={classes.widthtfield}>
                      <div className={classes.frowtext}>Account Number<sup className={classes.required}>*</sup></div>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "accountNumber",
                        }}
                        TextFieldProps={{
                          placeholder: "Select Account Number",
                          onKeyDown: (event) => {
                            // const regex = /^[0-9]*$/;
                            const regex = /^[a-zA-Z0-9]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            const currentInputValue = event.target.value;

                            // Maximum length constraint
                            const maxLength = 32; // Set your max length here
                            const isMaxLengthReached = currentInputValue.length >= maxLength;

                            if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required: "Account Number " + errorMessages.error_autocomplete_message,

                          // maxLength: {
                          //   value: 32, // Set your max length here
                          //   message: "Account Number must be no more than 10 digits long",
                          // },
                        }}
                        data={accountList}
                        required={true}
                      />

                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Account Holder Name
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


                  <Grid item xs={12} sm={12} md={4}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>From Date<sup className={classes.required}>*</sup></div>
                        <DatePickerForm
                          controlerProps={{
                            control: control,
                            name: "fromDate",
                          }}
                          TextFieldProps={{
                            showInfoText: 'kmlkk',
                            //   fullWidth: true,
                          }}
                          DatePickerProps={{
                            // label: "From Date",
                            fullWidth: true,
                            maxDate: new Date()

                          }}

                          // showInfoText='Please select a date range that falls within the 31 days.'
                          required={false}
                        />
                        {/* <div className={classes.showInfoText}>
                    Please select a date range that falls within the 31 days
                  </div> */}
                      </div>


                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>To Date<sup className={classes.required}>*</sup></div>
                        <DatePickerForm
                          controlerProps={{
                            control: control,
                            name: "toDate",
                          }}
                          TextFieldProps={{
                            //   fullWidth: true,
                          }}
                          DatePickerProps={{
                            // label: "From Date",
                            fullWidth: true,
                            minDate: watch("fromDate")?._d,
                            // maxDate: resultDate?._d
                            maxDate: new Date()
                            // maxDate:
                            //   watch("fromDate")
                            //     ?
                            //     // result2 - result1 > 31 
                            //     // ?
                            //       new Date(new Date(watch("fromDate")?._d).setDate(new Date(watch("fromDate")?._d).getDate() + 31))
                            //       : new Date(), // Set maxDate to 30 days after fromDate
                          }}

                          required={false}
                        />
                      </div>
                    </div>

                    <div className={classes.showInfoText}>
                      Please select a date range that falls within the 31 days
                    </div>
                  </Grid>

                  {/* <div className={classes.showInfoText}>
                    Please select a date range that falls within the 31 days
                  </div> */}

                  {/* <Grid item xs={12} sm={12} md={12}></Grid> */}

                  <Grid item xs={12} sm={12} md={1}>
                    <div className={classes.buttonBox} >

                      <ColorButton2 variant="contained" type="submit" style={{ marginTop: "3vh", marginLeft: "1vw" }}
                      >
                        View
                      </ColorButton2>
                    </div>
                  </Grid>


                </Grid>

                {/* <div style={{display:'flex',justifyContent:'flex-end'}}> 
                <div className={classes.buttonBox} >
                     
                      <ColorButton2 variant="contained" type="submit" style={{ marginTop: "3vh", marginLeft: "1vw",width:'50px'}}
                        >
                        View
                      </ColorButton2>
                    </div>
                </div> */}

              </div>
            </div>



            <div className={classes.parentcompstatement}>
              <div className={classes.Sbox2}>
                {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
                <div style={{ width: "100%", marginBottom: "10px", overflowY: "scroll", height: "65vh" }}>
                  <MUIDataTable
                    // title={`Opening Balance: ${parseFloat(openingBalance).toFixed(2)}`}
                    title={`Opening Balance: ${openingBalance ? parseFloat(openingBalance).toFixed(2) : ""}`}
                    data={atmMasterList}
                    columns={columns}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>


    </>
  )
}

export default Statements

