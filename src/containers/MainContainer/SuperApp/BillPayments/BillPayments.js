import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import classes from "./BillPayments.module.css";

import FixedDeposit from "../../../../assets/AccountsPics/FixedDeposit.svg";
import RecurringDeposits from "../../../../assets/AccountsPics/RecurringDeposits.svg";

import APY from "../../../../assets/InvestmentPics/APY.svg";
import Demat from "../../../../assets/InvestmentPics/Demat.svg";
import MutualFunds from "../../../../assets/InvestmentPics/MutualFunds.svg";
import NPS from "../../../../assets/InvestmentPics/NPS.svg";
import Stocks from "../../../../assets/InvestmentPics/Stocks.svg";
import TaxSavingDeposit from "../../../../assets/InvestmentPics/TaxSavingDeposit.svg";

import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Fastag from "../../../../assets/BillPayments/Fastag.svg";
import Gas from "../../../../assets/BillPayments/Gas.svg";
import House from "../../../../assets/BillPayments/House.svg";
import Insurance from "../../../../assets/BillPayments/Insurance.svg";
import PhoneBill from "../../../../assets/BillPayments/PhoneBill.svg";
import School from "../../../../assets/BillPayments/School.svg";
import Water from "../../../../assets/BillPayments/Water.svg";

export default function BillPayments() {
  const navigate = useNavigate();

  return (
    <Box className={classes.mainBox}>
      <Typography className={classes.savingsAccount}>Bill payments</Typography>
      <Box>
        <Stack spacing={2}>
          <Grid container>
            <Grid item sm={3}>
              <Typography className={classes.savingsAccountSubHeading}>
                Recharge & bill payments
              </Typography>
            </Grid>
            <Grid item sm={7}>
              <Box className={classes.savingsAccountSubHeading}>
                <img src={Fastag} />
                <img src={Gas} />
                <img src={House} />
                <img src={Insurance} />
                <img src={PhoneBill} />
                <img src={School} />
                <img src={Water} />
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Button className={classes.Button}>Add Biller</Button>
            </Grid>
          </Grid>

          <Grid container className={classes.accountsSecondGrid}>
            <Grid
              className={classes.accountsMarginGrid}
              item
              sm={2}
              onClick={() => navigate("/electricityBill")}
              style={{ cursor: "pointer" }}
              sx={{
                "&:hover": {
                  backgroundColor: "",
                  cursor: "pointer",
                  "& .addIcon": {
                    color: "purple",
                  },
                },
              }}
            >
              <img
                className={classes.iconImagesPaddingType1}
                src={FixedDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Electricity
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={RecurringDeposits}
              />
              <Typography className={classes.iconsTypography}>Gas</Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>Water</Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Mobile recharge Prepaid/postpaid
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Landline/ Broadbrand
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Credit card
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Fastag
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Education fee
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Box>
        <Stack spacing={2}>
          <Typography className={classes.savingsAccountSubHeading}>
            Utilities
          </Typography>
          <Grid container className={classes.accountsSecondGrid}>
            <Grid
              className={classes.accountsMarginGrid}
              item
              sm={2}
              onClick={() => navigate("/joinus")}
              style={{ cursor: "pointer" }}
              sx={{
                "&:hover": {
                  backgroundColor: "",
                  cursor: "pointer",
                  "& .addIcon": {
                    color: "purple",
                  },
                },
              }}
            >
              <img className={classes.iconImagesStockMarket} src={Demat} />
              <Typography className={classes.iconsTypography}>Demat</Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img className={classes.iconImagesStockMarket} src={Stocks} />
              <Typography className={classes.iconsTypography}>
                Insurance
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesStockMarket}
                src={MutualFunds}
              />
              <Typography className={classes.iconsTypography}>
                Subscriptions
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesStockMarket}
                src={MutualFunds}
              />
              <Typography className={classes.iconsTypography}>
                Clubs & Associates
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesStockMarket}
                src={MutualFunds}
              />
              <Typography className={classes.iconsTypography}>Tax</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
