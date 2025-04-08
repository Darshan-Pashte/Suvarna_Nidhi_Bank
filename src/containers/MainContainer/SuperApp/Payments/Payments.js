import React from "react";
import classes from "../Payments/Payments.module.css";
import { useState } from "react";
import '../Payments/Payment.css'
import Payments1 from "./Payments1";
import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Payment1MobilePrepaid from "./Payment1MobilePrepaid";

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
const Payments = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";
  return (
    <div className={classes.mainpagePayment}>

        <div className={classes.mainpayment}>
      <div className={classes.mainupper}>
        <div className={classes.mainupperheader}>Payment</div>
        <div className={classes.mainupperheader1}>Shortcuts</div>

        <div className={classes.mainupperboxes}>
          <div className={classes.mainupperbox1}>
            <div className={classes.box1icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle cx="25" cy="25" r="25" fill="#FEB135" />
                <path
                  d="M35.2498 34.5V33.5625C35.2498 33.4886 35.2352 33.4155 35.2069 33.3472C35.1787 33.279 35.1372 33.217 35.085 33.1648C35.0328 33.1125 34.9708 33.0711 34.9025 33.0428C34.8343 33.0145 34.7611 33 34.6873 33C34.6134 33 34.5402 33.0145 34.472 33.0428C34.4038 33.0711 34.3417 33.1125 34.2895 33.1648C34.2373 33.217 34.1958 33.279 34.1676 33.3472C34.1393 33.4155 34.1248 33.4886 34.1248 33.5625L34.1676 34.7771L34.1248 31.6875C34.1248 31.5383 34.0655 31.3952 33.96 31.2898C33.8545 31.1843 33.7114 31.125 33.5623 31.125C33.4131 31.125 33.27 31.1843 33.1645 31.2898C33.059 31.3952 32.9998 31.5383 32.9998 31.6875V34.875L32.4486 34.3238C32.3382 34.2135 32.194 34.1432 32.0391 34.1242C31.8842 34.1052 31.7274 34.1384 31.5936 34.2188C31.4679 34.2941 31.3766 34.4155 31.3391 34.5571C31.3016 34.6987 31.3207 34.8493 31.3926 34.977C32.0972 36.2295 32.5078 36.9454 32.6248 37.125C32.6492 37.1626 32.6737 37.2001 32.6983 37.2375C32.9033 37.5487 33.1823 37.8041 33.5103 37.9809C33.8384 38.1576 34.2052 38.2501 34.5778 38.25H34.4998H35.2498C35.8466 38.25 36.4189 38.0129 36.8408 37.591C37.2628 37.169 37.4998 36.5967 37.4998 36V34.3125C37.4998 34.1633 37.4406 34.0202 37.3351 33.9148C37.2296 33.8093 37.0865 33.75 36.9373 33.75C36.7881 33.75 36.6451 33.8093 36.5396 33.9148C36.4341 34.0202 36.3748 34.1633 36.3748 34.3125M35.2498 34.4548C35.2498 34.3057 35.1778 33.7323 35.4145 33.5398C35.6513 33.3472 35.6631 33.375 35.8123 33.375C35.9614 33.375 36.1045 33.4343 36.21 33.5398C36.3155 33.6452 36.3748 33.7883 36.3748 33.9375V34.5"
                  stroke="#183883"
                  stroke-width="0.5625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31 37.5H21C18.8998 37.5 17.8497 37.5 17.0475 37.0913C16.3419 36.7317 15.7683 36.1581 15.4087 35.4525C15 34.6503 15 33.6002 15 31.5V18.5C15 16.3998 15 15.3497 15.4087 14.5475C15.7683 13.8419 16.3419 13.2683 17.0475 12.9087C17.8497 12.5 18.8998 12.5 21 12.5H25.0147C25.9319 12.5 26.3905 12.5 26.8221 12.6036C27.2048 12.6955 27.5705 12.847 27.9061 13.0526C28.2845 13.2845 28.6088 13.6088 29.2574 14.2574L33.2426 18.2426C33.8912 18.8912 34.2155 19.2155 34.4474 19.5939C34.653 19.9295 34.8045 20.2952 34.8964 20.6779C35 21.1095 35 21.5681 35 22.4853C35 22.8971 35 27.6667 35 30.5M27.5 12.8368V18C27.5 18.7001 27.5 19.0501 27.6362 19.3175C27.7561 19.5527 27.9473 19.7439 28.1825 19.8638C28.4499 20 28.7999 20 29.5 20H34.6632"
                  stroke="#183883"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M22 23H28" stroke="#183883" stroke-linecap="round" />
                <path d="M22 25H28" stroke="#183883" stroke-linecap="round" />
                <path
                  d="M23 28L26 31"
                  stroke="#183883"
                  stroke-linecap="round"
                />
                <path
                  d="M23 27.5C22.7239 27.5 22.5 27.7239 22.5 28C22.5 28.2761 22.7239 28.5 23 28.5V27.5ZM25 25.5C25 26.6046 24.1046 27.5 23 27.5V28.5C24.6569 28.5 26 27.1569 26 25.5H25ZM23 23.5C24.1046 23.5 25 24.3954 25 25.5H26C26 23.8431 24.6569 22.5 23 22.5V23.5Z"
                  fill="#183883"
                />
              </svg>
            </div>
            <div className={classes.box1text}>Due bills</div>
          </div>

          <div className={classes.mainupperbox1}>
            <div className={classes.box1icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle cx="25" cy="25" r="25" fill="#FEB135" />
                <path
                  d="M25 21V25L27 27M16.0498 24C16.2739 21.8001 17.3001 19.7596 18.9325 18.268C20.565 16.7763 22.6895 15.9379 24.9007 15.9126C27.1119 15.8874 29.255 16.6771 30.9211 18.131C32.5872 19.585 33.6597 21.6015 33.934 23.7957C34.2083 25.99 33.6651 28.2084 32.4082 30.0278C31.1512 31.8471 29.2684 33.14 27.1191 33.6599C24.9697 34.1797 22.7042 33.89 20.7548 32.8461C18.8054 31.8022 17.3085 30.0771 16.5498 28M16.0498 33V28H21.0498"
                  stroke="#183883"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={classes.box1text}>Bill History</div>
          </div>

          <div className={classes.mainupperbox1}>
            <div className={classes.box1icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle cx="25" cy="25" r="25" fill="#FEB135" />
                <path
                  d="M18.5 33.5V17.5C18.5 16.9696 18.7107 16.4609 19.0858 16.0858C19.4609 15.7107 19.9696 15.5 20.5 15.5H30.5C31.0304 15.5 31.5391 15.7107 31.9142 16.0858C32.2893 16.4609 32.5 16.9696 32.5 17.5V33.5L29.5 31.5L27.5 33.5L25.5 31.5L23.5 33.5L21.5 31.5L18.5 33.5Z"
                  stroke="#183883"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M23 20H29" stroke="#183883" stroke-linecap="round" />
                <path d="M23 22H29" stroke="#183883" stroke-linecap="round" />
                <path
                  d="M24 25L27 28"
                  stroke="#183883"
                  stroke-linecap="round"
                />
                <path
                  d="M24 24.5C23.7239 24.5 23.5 24.7239 23.5 25C23.5 25.2761 23.7239 25.5 24 25.5V24.5ZM26 22.5C26 23.6046 25.1046 24.5 24 24.5V25.5C25.6569 25.5 27 24.1569 27 22.5H26ZM24 20.5C25.1046 20.5 26 21.3954 26 22.5H27C27 20.8431 25.6569 19.5 24 19.5V20.5Z"
                  fill="#183883"
                />
              </svg>
            </div>
            <div className={classes.box1text}>Quick Recharge</div>
          </div>

          <div className={classes.mainupperbox1}>
            <div className={classes.box1icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle cx="25" cy="25" r="25" fill="#FEB135" />
                <path
                  d="M27.5 13.75V18.75C27.5 19.0815 27.6317 19.3995 27.8661 19.6339C28.1005 19.8683 28.4185 20 28.75 20H33.75M27.5 13.75H18.75C18.087 13.75 17.4511 14.0134 16.9822 14.4822C16.5134 14.9511 16.25 15.587 16.25 16.25V33.75C16.25 34.413 16.5134 35.0489 16.9822 35.5178C17.4511 35.9866 18.087 36.25 18.75 36.25H27.5M27.5 13.75L33.75 20M33.75 20V29.5M21.25 18.75H22.5M21.25 26.25H28.75M26.25 31.25H28.75"
                  stroke="#183883"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.25 32.75V31.8125C31.25 31.5639 31.3488 31.3254 31.5246 31.1496C31.7004 30.9738 31.9389 30.875 32.1875 30.875H34.0625C34.3111 30.875 34.5496 30.9738 34.7254 31.1496C34.9012 31.3254 35 31.5639 35 31.8125V32.75M32.1875 35.5625H34.0625M33.125 34.625V36.5M29.375 33.6875C29.375 33.4389 29.4738 33.2004 29.6496 33.0246C29.8254 32.8488 30.0639 32.75 30.3125 32.75H35.9375C36.1861 32.75 36.4246 32.8488 36.6004 33.0246C36.7762 33.2004 36.875 33.4389 36.875 33.6875V37.4375C36.875 37.6861 36.7762 37.9246 36.6004 38.1004C36.4246 38.2762 36.1861 38.375 35.9375 38.375H30.3125C30.0639 38.375 29.8254 38.2762 29.6496 38.1004C29.4738 37.9246 29.375 37.6861 29.375 37.4375V33.6875Z"
                  stroke="#183883"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={classes.box1text}>My Billers</div>
          </div>
        </div>
      </div>

      <div className={classes.mainlower}>
      <Box className={classes.tableMainBox}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: " #DAE2F6",
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="secondary"
            >
              <Tab label="Bill Pay & Recharge" {...a11yProps(0)} />
              <Tab label="Payment & Transfer" {...a11yProps(1)} />
              <Tab label="Cardless Cash Withdrawal" {...a11yProps(2)} />
              <Tab label="Send money abroad" {...a11yProps(3)} />
              <Tab label="eTax" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
    <Payments1/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </div>


      
    </div>
    </div>
  );
};

export default Payments;
