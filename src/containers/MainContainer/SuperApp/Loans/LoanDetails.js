import React, { useState } from "react";
import classes from "../Loans/loans.module.css";
import GoBackButton from "../../../../components/common/GoBackButton";
import Loader from "../../../../components/common/loader";
import { Box, Grid } from "@mui/material";
import { Button } from "@mui/base";
import styled from "styled-components";
import { useLocation } from "react-router-dom";



const LoanDetails = () => {

  const [isLoading, setIsloading] = useState(false);
  const {state}=useLocation();
  console.log("stateloan",state)

  // const loanListfrom=location.state?.loanList || 'Unknown';





  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "123px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <div className={classes.Payment1MobilePrepaidMainPage}>
      <div className={classes.redrow}>
        <div style={{display:"flex", gap:'5px'}}>
          <GoBackButton/>
              <div className={classes.SubHeading}>
              Loan Accounts details
              </div>
              </div>
             
      </div>

        <Box
          className={classes.tableMainBoxLoan}
          component="form"
        >
          <div className={classes.firsttabinfo}>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "0.1vw" }}
            >
            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Loan Account Number
              </div>
              <div className={classes.boldtext}>
              {state.loanAccNo}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Loan Branch Code
              </div>
              <div className={classes.boldtext}>
              {state.loanbrCode}
              </div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Loan Amount 
              </div>
              <div className={classes.boldtext}>
              {state.loanAmount}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Balance
              </div>
              <div className={classes.boldtext}>
              {state.balance}

              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              EMI
              </div>
              <div className={classes.boldtext}>
              {state.EMI}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Interest Rate (% .p.a)
              </div>
              <div className={classes.boldtext}>
              {state.interestRate}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Loan Holder Name
              </div>
              <div className={classes.boldtext}>
              {state.accHolderName}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Account Type
              </div>
              <div className={classes.boldtext}>
              {state.accType}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Account Status
              </div>
              <div className={classes.boldtext}>
              {state.accStatus}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Sanction Date
              </div>
              <div className={classes.boldtext}>
              {state.sanctionDate}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Sanction Amount
              </div>
              <div className={classes.boldtext}>
              {state.sanctionAmt}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Disbursal Status
              </div>
              <div className={classes.boldtext}>
              {state.disbursalStatus}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Total Disbursed Amount
              </div>
              <div className={classes.boldtext}>
              {state.totalDisbursedAmt}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Installment Start
              </div>
              <div className={classes.boldtext}>
              {state.installmentStart}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Outstanding Amount
              </div>
              <div className={classes.boldtext}>
              {state.outstandingAmt}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Current Month EMI
              </div>
              <div className={classes.boldtext}>
              {state.currentMonthEMI}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Interest Applied Upto Date
              </div>
              <div className={classes.boldtext}>
              {state.interestAppliedUptoDate}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Unutilized Limit
              </div>
              <div className={classes.boldtext}>
              {state.unutilisedLimit}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.maintext}>
              Expiry Date
              </div>
              <div className={classes.boldtext}>
              {state.expDate}
              </div>
            </Grid>



            </Grid>
          </div>

         
        </Box>

       
      </div>
    </>
  );
};

export default LoanDetails;
