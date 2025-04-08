import React from "react";
import classes from "./PaymentSuccess.module.css";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Divider, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Success from "../../../../assets/success.svg";
import { Margin } from "@mui/icons-material";

const PaymentSuccess = () => {
  return (
    <>
      <Box className={classes.mainbox}>
        <div className={classes.toppart}>
          <div className={classes.successlogo}>
            <img src={Success} alt="Success Logo" />
          </div>
          <div className={classes.ammount}>₹ 6632</div>
          <div className={classes.heading}>Transaction Successful</div>
        </div>

        <div className={classes.divider}>
          <Divider />
        </div>
        <div className={classes.bottompart}>
        <div className={classes.redtext}>
            To
          </div>
        <Grid
          container
          columnSpacing={3}
          rowSpacing={2}
          style={{ padding: "1vw" }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.text}>Beneficiary name</div>
          </Grid>
        </Grid>
        </div>
      </Box>
    </>
  );
};

export default PaymentSuccess;
