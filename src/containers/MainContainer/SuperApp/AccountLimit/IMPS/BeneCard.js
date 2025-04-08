import * as React from 'react';
import classes from "./AccountLimit.module.css";
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material';

export default function BeneCard({ benelist , index, accno}) {
  const navigate = useNavigate()
  const handleNavigate = (route) => {
    navigate(route, { state: {benelist, accno} })
  }
  return (

    <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>handleNavigate("/fundtransfer/impsdetails")}>
                  <div className={classes.beneficiarycard}>
                    <div className={classes.beneficiarycardtitle}>
                      {benelist?.nickname}
                    </div>
                    <div className={classes.beneficiarycardinfo}>
                      {benelist?.accNo}
                    </div>
                  </div>
    </Grid>
  );
}