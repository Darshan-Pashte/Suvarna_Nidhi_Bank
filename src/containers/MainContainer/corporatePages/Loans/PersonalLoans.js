import React, { useState } from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import classes from "./personalLoans.module.css";

import EMI from "../../../../assets/LoanPics/EMI.svg";
import FixedInterest from "../../../../assets/LoanPics/FixedInterest.svg";
import nonRefundable from "../../../../assets/LoanPics/nonRefundable.svg";

import Slider from "@mui/material/Slider";

export default function PersonalLoans() {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [loanTenure, setLoanTenure] = useState(12);
  const interestRate = 21;

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = loanTenure;

    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return emi.toFixed(2);
  };

  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  return (
    <Box className={classes.mainBox}>
      <Grid container>
        <Grid item sm={7}>
          <Stack spacing={4}>
            <Typography className={classes.moveSlider}>
              Move Slider to choose your loan amount and loan tenure
            </Typography>
            <Typography className={classes.loanAmountTyography}>
              Loan amount (Amount has to be in multiple of 5000)
            </Typography>
            <Box sx={{ width: 500 }}>
              <Slider
                size="small"
                defaultValue={20000}
                aria-label="Small"
                valueLabelDisplay="on"
                min={10000}
                max={75000}
                onChange={handleLoanAmountChange}
              />
            </Box>
            <Grid container>
              <Grid item sm={9}>
                <Typography className={classes.loanAmountTyography}>
                  Min ₹ 10,000
                </Typography>
              </Grid>

              <Grid item sm={3}>
                <Typography className={classes.loanAmountTyography}>
                  Max. ₹ 75,000
                </Typography>
              </Grid>
            </Grid>
            <Typography className={classes.selectTenureTypography}>
              Select Tenure
            </Typography>
            <Box sx={{ width: 500 }}>
              <Slider
                size="small"
                defaultValue={12}
                aria-label="Small"
                valueLabelDisplay="on"
                min={6}
                max={24}
                onChange={handleLoanTenureChange}
              />
            </Box>
            <Grid container>
              <Grid item sm={9}>
                <Typography className={classes.loanAmountTyography}>
                  Min 6 Months
                </Typography>
              </Grid>

              <Grid item sm={3}>
                <Typography className={classes.loanAmountTyography}>
                  Max. 24 Months
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item sm={5}>
          <Box className={classes.secondGridMainBox}>
            <Stack sx={{ margin: "2rem" }} spacing={3}>
              <Grid container className={classes.accountsMainHeadingFlex}>
                <Grid item sm={4}>
                  <img src={EMI} />
                </Grid>

                <Grid item sm={6}>
                  <Stack spacing={1}>
                    <Typography className={classes.moveSlider}>EMI</Typography>
                    <Typography className={classes.EMItypography}>
                      ₹{calculateEMI()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container className={classes.accountsMainHeadingFlex}>
                <Grid item sm={4}>
                  <img src={FixedInterest} />
                </Grid>

                <Grid item sm={6}>
                  <Stack spacing={1}>
                    <Typography className={classes.moveSlider}>
                      Fixed Interest rate
                    </Typography>
                    <Typography className={classes.loanAmountTyography}>
                      21% * p.a.
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container className={classes.accountsMainHeadingFlex}>
                <Grid item sm={4}>
                  <img src={nonRefundable} />
                </Grid>

                <Grid item sm={6}>
                  <Stack spacing={1}>
                    <Typography className={classes.moveSlider}>
                      Non - refundable processing fee
                    </Typography>
                    <Typography className={classes.loanAmountTyography}>
                      ₹2,500 (Inc. Service Tax/ GST)
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Typography sx={{ paddingTop: "2rem" }} className={classes.moveSlider}>
        Give your family an assurance of protection. Secure their financial
        future from unforeseen events by taking a life insurance cover against
        your loan.
      </Typography>
    </Box>
  );
}
