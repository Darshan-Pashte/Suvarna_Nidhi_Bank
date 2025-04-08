import React, { useContext, useEffect } from "react";
import classes from "../Loans/loans.module.css";

import { useState } from "react";

import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SavingAccount from "../../../../assets/AccountsPics/SavingAccount.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import Loader from "../../../../components/common/loader";
import { Button } from "@mui/base";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { useForm } from "react-hook-form";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import AccountStatementHome from "../Home/AccountStatementHome";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GridTablePagination from "../../../../components/common/gridTablePagination";
import Eye from "./Eye.svg"
import Disbursement from "./Disbursement.svg"
import Repayment from "./Repayment.svg"
// import Finance_app from "./Finance_app.svg"
import GoBackButton from "../../../../components/common/GoBackButton";
import { ConnContext } from "../../../../context/ConContext";

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

//   const rows = userData[0].transhistory.map((data) =>
//     createData(...Object.values(data))
//   );

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
  accountNumber: "",
};

const Loans = () => {
  const { useFormData, defaultFormData, setLoanAccounts, loanAccounts, setApiStore, apiStore, setCustNoContext, custNoContext, setlLoanAccountLoad, loanAccountLoad } = useContext(ConnContext);
  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useFormData;

  // const [value, setValue] = React.useState(0);
  const [Finance_app, setFinance_app] = useState(null);
  const bankName = process.env.REACT_APP_FLAVOUR;



  useEffect(() => {
    const importedImage = async () => {
      const Finance_app = await import(`../../../../assets/Banks/${bankName}/images/Finance_app.svg`);
      setFinance_app(Finance_app.default);
    };
    importedImage();
  }, [bankName]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const navigate = useNavigate();

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  // const [loanAccounts, setLoanAccounts] = useState([]);
  const [loanDisb, setLoanDisb] = useState([]);

  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  const loanAccList =
    Array.isArray(loanAccounts) &&
    loanAccounts?.map((item) => ({ code: item.loanbrCode, value: item.loanAccNo })) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [goPageNumber, setGoPageNumber] = useState(10);


  useEffect(() => {
    if (loanAccList)
      setValue(
        "accountNumber",
        loanAccList
          ? compareTextAndReturnObject(loanAccList, loanAccList[0]?.value)
          : ""
      );
    setApiStore(true)
  }, []);

  useEffect(() => {
    setValue("fromDate", new Date());
    setValue("toDate", new Date());
  }, []);

  useEffect(() => {
    setValue("accountNumber", "")
  }, []);

  const handleProcess = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        accType: "LOAN",
        accNo: watch('accountNumber')?.value,
        sessionId: user?.sessionId,
        fromDt: convertDate(watch('fromDate'), 4),
        toDt: convertDate(watch('toDate'), 4),

      };
      const response = await postApiData(apiList.PDF_GENERATE, payload);
      console.log("response", response);
      if (response?.status) {
        SweetAlertPopup(response?.message, "Success", "success")
        // reset()
        // setIsloading(false);
      } else {
        SweetAlertPopup(response?.message, "Error", "error")
        // setIsloading(false);
      }

      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);

    }
  };





  const handleRepayment = async (rowData) => {
    console.log("rowData", rowData);
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        acctNo: rowData[3],
        // acctNo:"005300400002343"
      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHLOANREPAYMENT, payload);
      console.log("response", response);
      if (response?.status == true) {
        setLoanDisb(response?.data?.repaymentSchedule);
        navigate("/loans/repaymentdetails", {
          state: response?.data?.repaymentSchedule,
        });
        setIsloading(false);

      } else {
        setLoanDisb([]);
        SweetAlertPopup(response?.message, "Error", "error");
        setIsloading(false);

      }

      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (!apiStore)
      getDeposit();
    setApiStore(true)
  }, [!apiStore]);

  const getDeposit = async (currentPage) => {
    // console.log("currentPage", currentPage);
    setCurrentPage(currentPage);
    // console.log("data", data);
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
      };

      const response = await postApiData(
        apiList.FETCHLOANINFO +
        `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );
      console.log("loanRespone", response);
      if (response?.status == true) {
        // setApiStore(true)
        setlLoanAccountLoad(true)
        setLoanAccounts(response?.data?.loanDeatils);
        // settotalRecord(response?.data?.totalRecords);
        //             setIsloading(false);
        // settotalRecord(response.data.totalRecords)
      } else {
        setLoanAccounts([]);
        // SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };
  const handleDisbursement = async (rowData) => {
    console.log("rowData", rowData);
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        acctNo: rowData[3],
      };
      setIsloading(true);
      const response = await postApiData(
        apiList.FETCHLOANDISBURSEMENT,
        payload
      );
      console.log("response", response);
      if (response?.status == true) {
        setLoanDisb(response?.data?.loanAcctDetails);
        navigate("/loans/disbursementdetails", { state: response?.data });
        // navigate("/loans/disbursementdetails",{state:{state1:response?.data?.loanAcctDetails,state2:response?.data?.loanDisbursementDetails}})
        // settotalRecord(response?.data?.totalRecords);
        //             setIsloading(false);
        // settotalRecord(response.data.totalRecords)
        setIsloading(false);
      } else {
        setLoanDisb([]);
        SweetAlertPopup(response?.message, "Error", "error");
        setIsloading(false);

      }
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      // if(response.status == false)
      // SweetAlertPopup(response?.message,"Error","error")

      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        fromDate: convertDate(data.fromDate, 9),
        toDate: convertDate(data.toDate, 9),
        // fromDate: "20220101",
        // toDate: "20231122",
        brCode: data.accountNumber.code,
      };

      const response = await postApiData(
        apiList.LOAN_ACCOUNT_STATEMENT_DOWNLOAD,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success");
        // reset()
      } else {
        SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
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
    width: "103px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  const ColorButton3 = styled(Button)(({ theme }) => ({
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
  const columns = [
    {
      name: "View",
      label: "View",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "100px" } }),
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const color = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();

          // Define the SVG with the dynamic stroke color
          const svgContent = `
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_18_946)">
                <path d="M13 5.6875C4.875 5.6875 1.625 13 1.625 13C1.625 13 4.875 20.3125 13 20.3125C21.125 20.3125 24.375 13 24.375 13C24.375 13 21.125 5.6875 13 5.6875Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 17.0625C15.2437 17.0625 17.0625 15.2437 17.0625 13C17.0625 10.7563 15.2437 8.9375 13 8.9375C10.7563 8.9375 8.9375 10.7563 8.9375 13C8.9375 15.2437 10.7563 17.0625 13 17.0625Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_18_946">
                  <rect width="26" height="26" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          `;
          const encodedSvg =
            "data:image/svg+xml," + encodeURIComponent(svgContent);

          return (
            <img
              src={encodedSvg}
              alt="Eye Icon"
              onClick={() =>
                navigate("/loans/loandetails", { state: loanAccounts[rowIndex] })
              }
              style={{ cursor: "pointer" }}
              title="View Loan Details"
            />
          );
        },
      },
    },

    {
      name: "Disbursement ",
      label: "Disbursement ",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const color = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();

          // Define the SVG with the dynamic stroke color
          const svgContent = `
           <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame 1000003641" clip-path="url(#clip0_18_1014)">
<path id="Vector 125" d="M5.76578 17.3765H1.52002V22.2288H7.58539C8.19193 22.2288 8.79847 22.8353 10.0115 23.4419C11.2246 24.0484 13.0933 23.6808 13.6508 23.4419C17.8965 21.6223 19.1096 21.0157 22.7488 19.1961C25.4613 17.8399 23.4482 15.2072 21.5358 16.1634C20.9933 16.4347 15.4063 18.9249 14.8638 19.1961C13.6508 19.8026 13.0442 19.8026 12.4377 19.1961C11.9525 18.7109 11.2246 18.5896 8.19193 18.5896C10.0115 18.5896 12.6214 18.3261 13.6508 17.983C15.4704 17.3765 14.8638 15.5569 13.6508 15.5569L8.19193 15.5569C7.33416 15.5569 6.37232 17.3765 5.76578 17.3765Z" stroke="${color}" stroke-width="1.5"/>
<path id="Rectangle 1270" d="M11.5 4V9H15.5V4" stroke="${color}" stroke-width="1.5"/>
<path id="Polygon 2" d="M12.2545 4.63922H9.97363L13.6506 1L17.3275 4.63922H14.7499" stroke="${color}" stroke-width="1.5"/>
<path id="Rectangle 1271" d="M4.55273 17.983V16.77V9.49152C4.55273 8.82155 5.09585 8.27844 5.76581 8.27844H11.8312M15.4704 8.27844H21.5358C22.2057 8.27844 22.7489 8.82155 22.7489 9.49152V15.5569" stroke="${color}" stroke-width="1.5"/>
<circle id="Ellipse 513" cx="14" cy="12" r="1.5" stroke="${color}"/>
</g>
<defs>
<clipPath id="clip0_18_1014">
<rect width="26" height="26" fill="white"/>
</clipPath>
</defs>
</svg>

          `;
          const disbursementSvg =
            "data:image/svg+xml," + encodeURIComponent(svgContent);

          return (
            <img
              src={disbursementSvg}
              alt="Disbursement Icon"
              // onClick={() => navigate("/loans/loandetails",{state:loanAccounts[rowIndex]})}
              onClick={() => handleDisbursement(rowData)}
              style={{ cursor: "pointer" }}
              title="Disbursement Details"
            />
          );
        },
      },
    },

    {
      name: "Repayment ",
      label: "Repayment ",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

          // Define the SVG with the dynamic stroke color
          const svgContent = `
           <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="13" cy="13" r="10.25" stroke="${color}" stroke-width="1.5"/>
<path d="M13 19C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7C9.68629 7 7 9.68629 7 13" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14.318 11.234V11.332H15.13V11.906H14.276C14.2247 12.2187 14.1267 12.4683 13.982 12.655C13.842 12.837 13.6413 12.97 13.38 13.054C13.1187 13.1333 12.7803 13.173 12.365 13.173V13.614C12.365 13.8707 12.4187 14.0737 12.526 14.223C12.638 14.3723 12.8247 14.447 13.086 14.447C13.562 14.447 13.8 14.1787 13.8 13.642H14.535C14.5303 14.1133 14.402 14.4703 14.15 14.713C13.9027 14.951 13.5433 15.07 13.072 15.07C12.6007 15.07 12.239 14.9393 11.987 14.678C11.7397 14.4167 11.616 14.0503 11.616 13.579V12.62C12.134 12.62 12.5143 12.606 12.757 12.578C12.9997 12.5453 13.1793 12.48 13.296 12.382C13.4173 12.284 13.4967 12.1253 13.534 11.906H11.322V11.332H13.569V11.234V10.709H11.322V10.128H15.13V10.709H14.318V11.234Z" stroke="${color}"/>
<path d="M14.4767 16L12.263 18.7391L15.0025 20.9522" stroke="${color}" stroke-linecap="round"/>
</svg>

          `;
          const repaymentSvg = 'data:image/svg+xml,' + encodeURIComponent(svgContent);

          return (
            <img
              src={repaymentSvg}
              alt="Repayment Icon"
              onClick={() => handleRepayment(rowData)}
              style={{ cursor: "pointer" }}
              title="Repayment Details"
            />
          );
        },
      },
    },

    {
      name: "loanAccNo",
      label: "Loan Account no.",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "loanAmount",
      label: "Loan Amount",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const style = {
            display: "flex",
            justifyContent: "flex-end",
          };

          return (
            <div style={style}>
              ₹ {value}
            </div>
          );
        },
      },
    },
    {
      name: "balance",
      label: "Balance",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const style = {
            display: "flex",
            justifyContent: "flex-end",
          };

          return (
            <div style={style}>
              ₹ {value}
            </div>
          );
        },
      },
    },
    {
      name: "EMI",
      label: "EMI",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const style = {
            display: "flex",
            justifyContent: "flex-end",
          };

          return (
            <div style={style}>
              ₹ {value}
            </div>
          );
        },
      },
    },
    {
      name: "interestRate",
      label: "Interest Rate (%)",
      options: {
        filter: true,
        sort: false,
      },
    },
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
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,
    // customFooter: () => {
    //   return (
    //     <GridTablePagination
    //       currentPage={currentPage}
    //       totalCount={totalRecord}
    //       pageSize={goPageNumber}
    //       control={control}
    //       onPageChange={(page) => {
    //         getDeposit(page);
    //       }}
    //     />
    //   );
    // },
  };


  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div style={{ display: "flex", gap: "5px" }}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Loan Details
          </div>
        </div>
      </div>
      <div className={classes.sbox}>
        <div className={classes.mainloanpage}>
          <div className={classes.mainpagePayment}>
            <div className={classes.loaninfo}>



              <div className={classes.Sbox2}>
                <div style={{ width: "100%", marginBottom: "10px" }}>
                  <MUIDataTable
                    title={"Loan Account Summary"}
                    data={loanAccountLoad && loanAccounts ? loanAccounts : []}
                    columns={columns}
                    options={options}
                  />
                </div>
              </div>
            </div>

            <Grid
              container
              columnSpacing={3}
              rowSpacing={2}
              style={{ padding: "0.1vw" }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <Grid item xs={12} sm={12} md={12} ><div className={classes.gridtitle}>Hi,{user?.customerName} <span style={{fontWeight:'400'}}>(Welcome to Mahesh Bank) </span></div> </Grid> */}

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.gridtitle}>Account Statement</div>
                <div className={classes.cardsBox}>
                  <div className={classes.Sbox}>
                    <div>
                      <div className={classes.formbox}>
                        <Grid
                          container
                          columnSpacing={4}
                          rowSpacing={2}
                          style={{ padding: "0.1vw" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.widthtfield}>
                              <div className={classes.frowtext}>
                                Account Number
                                <sup className={classes.required}>*</sup>
                              </div>
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
                                    const regex = /^[a-zA-Z0-9]*$/;
                                    // const regex = /^[0-9]*$/;
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
                                    "Account No." +
                                    errorMessages.error_autocomplete_message,
                                  // maxLength: {
                                  //   value: 32, // Set your max length here
                                  //   message:
                                  //     "Account Number must be no more than 10 digits long",
                                  // },
                                }}
                                // data={accountHomebank}
                                data={loanAccountLoad ? loanAccList : []}
                                required={true}
                              />
                            </div>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6}>
                            <div className={classes.frowdata11}>
                              <div className={classes.frowtext}>
                                From Date<sup className={classes.required}>*</sup>
                              </div>
                              <DatePickerForm
                                controlerProps={{
                                  control: control,
                                  name: "fromDate",
                                }}
                                TextFieldProps={
                                  {
                                    //   fullWidth: true,
                                  }
                                }
                                DatePickerProps={{
                                  // label: "From Date",
                                  fullWidth: true,
                                  maxDate: new Date(),
                                }}
                                required={false}
                              />
                            </div>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6}>
                            <div className={classes.frowdata11}>
                              <div className={classes.frowtext}>
                                To Date<sup className={classes.required}>*</sup>
                              </div>
                              <DatePickerForm
                                controlerProps={{
                                  control: control,
                                  name: "toDate",
                                }}
                                TextFieldProps={
                                  {
                                    //   fullWidth: true,
                                  }
                                }
                                DatePickerProps={{
                                  // label: "From Date",
                                  fullWidth: true,
                                  minDate: watch("fromDate"),
                                  maxDate: new Date(),
                                }}
                                required={false}
                              />
                            </div>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}></Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.buttonBox}>
                              <ColorButton3 variant="contained" type="button" onClick={handleProcess}>
                                Process PDF
                              </ColorButton3>


                              <ColorButton3 variant="contained" type="button" onClick={() => navigate('/loans/viewstatement', { state: "LOAN" })}>
                                View PDF
                              </ColorButton3>


                              {/* <ColorButton3 variant="contained" type="submit">
                                Send to mail
                              </ColorButton3> */}
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.gridtitle}>Loan Payment</div>
                <div className={classes.cardsBoxss}>
                  <Box className={classes.accountsMarginBox}>
                    <div className={classes.FinanceImage}>
                      <img src={Finance_app} alt="Finance_app" />
                    </div>
                    <div className={classes.payment1mobileprepaidbutton}>
                      <ColorButton3
                        onClick={() =>
                          navigate("/loans/loanspayment", {
                            state: { loanList: loanAccList },
                          })
                        }
                        variant="contained"
                        type="button"
                      >
                        Pay Now
                      </ColorButton3>
                    </div>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loans;
