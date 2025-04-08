import React from 'react'
import classes from '../AccountLimit/IMPS/AccountLimit.module.css'
import { Box, Button, Slider, TableCell, TableRow, Typography, tableCellClasses } from '@mui/material'

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';


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



const SetAccLimitNEFT = ({accountLimit,accnumber}) => {
    
    const [loanAmount, setLoanAmount] = useState(20000);
  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
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
 
 
 
 <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              //  min={1000}
              min={accountLimit?.perTrnAmt}
              max={Number(accountLimit?.bankPerTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Per Day Transaction Max Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerTrnAmt}</div>
          </div>
        </div>
      </div>

      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Day Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              min={accountLimit?.perDayTrnAmt}
              max={Number(accountLimit?.bankPerDayTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Max Transaction Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmt}</div>
          </div>
        </div>
      </div>

     

      <div className={classes.payment1mobileprepaidbutton}>
        {/* <ColorButton2 variant="contained" type="submit">
          Reset
        </ColorButton2> */}
        <ColorButton1 variant="contained" type="submit">
        Submit
        </ColorButton1>
      </div>
 
 
 
 </>
  )
}

export default SetAccLimitNEFT
