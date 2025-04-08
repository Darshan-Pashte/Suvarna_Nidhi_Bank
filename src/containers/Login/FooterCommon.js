import React from 'react'
import classes from '../../containers/Login/Login.module.css'

const FooterCommon = () => {

  const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
  console.log("bankContactInfo",bankContactInfo);
  return (
   <>
   <div className={classes.footercommonmain}>
   <div className={classes.bottomcopyrightinfo}>
            <div className={classes.bottominfo}>
              Copyright 2024 | All Rights Reserved By {bankContactInfo?.BANKname}
            </div>
            <div>
              Developed by Saraswat Infotech Private Limited.
            </div>
          </div>
   </div>
   
   
   </>
  )
}

export default FooterCommon
