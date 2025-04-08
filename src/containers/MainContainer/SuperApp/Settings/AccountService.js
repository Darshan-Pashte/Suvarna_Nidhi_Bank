import React from 'react'
import classes from '../Settings/Settings.module.css'
import Switch from '@mui/material/Switch';

import Checkbox from '@mui/material/Checkbox';

const labelcheck = { inputProps: { 'aria-label': 'Checkbox demo' } };    
const labelswitch = { inputProps: { 'aria-label': 'Switch demo' } };

const AccountService = () => {
  return (
    <>
    
    <div className={classes.mainaccountservicepage}>
        <div className={classes.accountserviceheader}>
            <div className={classes.accountserviceheaderleft}>
                Account Services
            </div>
            <div className={classes.accountserviceheaderright}>
              <div className={classes.accountserviceheaderrighttext}> Savings</div>
               <div className={classes.accountserviceheaderrightblock}>
               392387650080214<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6 9L12 15L18 9" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
               </div>
            </div>
        </div>

        <div className={classes.accountservicemid}>
            <div className={classes.accountservicemidleft}>
            Printed paper Statements
            </div>
            <div className={classes.accountservicemidright}>Deregister
     
              
            </div>
        </div>
        <div className={classes.accountservicemidline}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="980" height="2" viewBox="0 0 1002 2" fill="none">
  <path d="M0 1H1002" stroke="black" stroke-width="0.5"/>
</svg> */}
<hr/>
        </div>

<div className={classes.accountservicelowerfirst}>
Apply for Passbook
    <div className={classes.accountservicelower}>
            <div className={classes.accountservicelowerleft}>
            Please collect your passbook from your <span> nearest branch.</span>
            </div>
            <div className={classes.accountservicelowerright}>
            <Switch {...labelswitch} />
            </div>
        </div>
</div>
        
    </div>
    
    </>
  )
}

export default AccountService