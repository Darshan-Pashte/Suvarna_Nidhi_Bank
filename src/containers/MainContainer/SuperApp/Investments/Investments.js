import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";
import classes from "./investments.module.css";

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

export default function Investments() {
  const navigate = useNavigate();
  return (
    <Box className={classes.mainBox}>
      <Typography className={classes.savingsAccount}>Investments</Typography>
      <Box>
        <Stack spacing={2}>
          <Typography className={classes.savingsAccountSubHeading}>
            Deposit
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
              <img
                className={classes.iconImagesPaddingType1}
                src={FixedDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Fixed Deposit
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={RecurringDeposits}
              />
              <Typography className={classes.iconsTypography}>
                Recurring Deposits
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesPaddingType2}
                src={TaxSavingDeposit}
              />
              <Typography className={classes.iconsTypography}>
                Tax Saving Deposit
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Box>
        <Stack spacing={2}>
          <Typography className={classes.savingsAccountSubHeading}>
            Invest in Stock market
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
                Stocks
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img
                className={classes.iconImagesStockMarket}
                src={MutualFunds}
              />
              <Typography className={classes.iconsTypography}>
                Mutual Funds
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Box>
        <Stack spacing={2}>
          <Typography className={classes.savingsAccountSubHeading}>
            Government schemes
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
              <img className={classes.iconImagesPaddingType1} src={NPS} />
              <Typography className={classes.iconsTypography}>
                National pension scheme
              </Typography>
            </Grid>
            <Grid className={classes.accountsMarginGrid} item sm={2}>
              <img className={classes.iconImagesPaddingType2} src={APY} />
              <Typography className={classes.iconsTypography}>
                Atal pension yojana
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
