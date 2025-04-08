import React from 'react'
import classes from '../UploadFile/UploadFile.module.css'
import DataTableLower from '../CorporateHome/tableTab2Home'
import DataTableUpload from './tableTab2Statement'



const UploadApproveReject = () => {
  return (
   <>
       
       <div className={classes.cardsmainpage}>
       <div className={classes.maintabbelowheading}> Approve / Reject Uploaded File</div>
       
        <DataTableUpload/>
        </div>
   </>
  )
}
export default UploadApproveReject
