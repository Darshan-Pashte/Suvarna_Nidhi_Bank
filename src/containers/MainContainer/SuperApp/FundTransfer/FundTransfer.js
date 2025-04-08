import { Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import classes from '../FundTransfer/FundTransfer.module.css'

import SavingAccount from "../../../../assets/AccountsPics/SavingAccount.svg";
import CurrentAccount from "../../../../assets/AccountsPics/CurrentAccount.svg";

const FundTransfer = () => {
  return (
   <>
    <div className={classes.FundTransfermainpage}>

    <div className={classes.fundhtransfereader}>
    Funds Transfer
    </div>
    <Box>
          <Stack spacing={2}>
            <Typography className={classes.savingsAccountSubHeading}>
            Initiate payment
            </Typography>
            <Grid container className={classes.accountsSecondGrid}>
              <Grid
                
                style={{ cursor: "pointer" }}
                className={classes.accountsMarginGrid}
                item
                sm={2}
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
                  src={SavingAccount}
                />
                <Typography className={classes.iconsTypography}>
                Single payment
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType2}
                  src={CurrentAccount}
                />
                <Typography className={classes.iconsTypography}>
                Multi payment
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
    <Box>
          <Stack spacing={2}>
            <Typography className={classes.savingsAccountSubHeading}>
            Initiate payment
            </Typography>
            <Grid container className={classes.accountsSecondGrid}>
              <Grid
                
                style={{ cursor: "pointer" }}
                className={classes.accountsMarginGrid}
                item
                sm={2}
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
                  src={SavingAccount}
                />
                <Typography className={classes.iconsTypography}>
                Single payment
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType2}
                  src={CurrentAccount}
                />
                <Typography className={classes.iconsTypography}>
                Multi payment
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        </div>
   </>
  )
}

export default FundTransfer
