import React from "react";
import classes from "../ServiceRequest/ServiceRequest.module.css";
import { useState } from "react";
import '../Payments/Payment.css'
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
import ServiceChild1 from "./ServiceChild1";
import ServiceChild2 from "./ServiceChild2";
import ServiceChild3 from "./ServiceChild3";

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
const ServiceRequest = () => {

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
   
      <div className={classes.mainlower}>
      <div className={classes.servicerequestheader}>
     Service Request
     </div>
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
              <Tab label="Popular Services" {...a11yProps(0)} />
              <Tab label="Statement & Passbook" {...a11yProps(1)} />
              <Tab label="Cheque Requests" {...a11yProps(2)} />
              <Tab label="Account Services" {...a11yProps(3)} />
              <Tab label="Help & Support" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
   <ServiceChild1/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <ServiceChild2/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <ServiceChild3/>

          </CustomTabPanel>
        </Box>
      </div>


      
    </div>
    </div>
  );
};

export default ServiceRequest;
