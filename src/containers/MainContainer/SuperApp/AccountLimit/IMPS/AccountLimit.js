import React from 'react'
import classes from './AccountLimit.module.css'


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


import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountLimitIMPS from './AccountLimitIMPS';
import { useForm } from 'react-hook-form';
import AccountLimitNEFT from '../NEFT/AccountLimitNEFT';
import AccountBeneficiary from '../Beneficiary/AccountBeneficiary';

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
const AccountLimit = () => {

  const [valuetab, setValuetab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValuetab(newValue);
  };

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";


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
    // defaultValues: defaultFormData,
    mode: "onChange",
  });

  const filteredData=[
    {
      code:0,
      value:'392387650080214',
    },
    {
      code:1,
      value:'492387650080214',
    },
    {
      code:2,
      value:'592387650080214',
    },
  ]
  return (
    <div className={classes.mainpagePayment}>

      <div className={classes.mainpayment}>

        {/* <div className={classes.accountlimithead1}>
          Account
        </div> */}

        <div className={classes.accountlimitrightside}>
          {/* <div className={classes.accountlimithead2}>
            Update Account Limit
          </div> */}
{/* 
          <div className={classes.accountlimitaccinfo}>
            <div className={classes.accountlimitaccno}>
              Account
            </div>
            <div className={classes.frowdataaff}>

              <div className={classes.widthtfield}>
                <AutocompleteForm

                  controlerProps={{
                    control: control,
                    name: "phototype",
                  }}
                  TextFieldProps={{
                    style: { width: "18vw" },

                    placeholder: "Account Number",
                    onKeyDown: (event) => {
                      //const regex = /^[a-zA-Z]*$/;
                      const regex = /^[a-zA-Z\s]*$/;
                      const isBackspace = event.keyCode === 8;
                      const isValidInput = regex.test(event.key);

                      if (!isValidInput && !isBackspace) {
                        event.preventDefault();
                      }
                    },
                  }}
                  rules={{
                    required:
                      "Operator/Biller " +
                      errorMessages.error_autocomplete_message,
                  }}
                    data={filteredData}
                  required={true}
                />
              </div>
            </div>
          </div> */}
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
              {/* <Tabs
                value={valuetab}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
              >
                <Tab label="IMPS" {...a11yProps(0)} />
                <Tab label="NEFT" {...a11yProps(1)} />
                <Tab label="Beneficiary Management" {...a11yProps(2)} />

              </Tabs> */}
            </Box>

           
            <CustomTabPanel value={valuetab} index={0}>
              <AccountLimitIMPS />
            </CustomTabPanel>
            <CustomTabPanel value={valuetab} index={1}>
              <AccountLimitNEFT />
            </CustomTabPanel>
            <CustomTabPanel value={valuetab} index={2}>
              <AccountBeneficiary />
            </CustomTabPanel>
          </Box>
        </div>



      </div>
    </div>
  );
};

export default AccountLimit;


