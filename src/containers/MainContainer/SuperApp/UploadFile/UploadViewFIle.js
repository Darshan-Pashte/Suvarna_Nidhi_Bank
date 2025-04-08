import React from 'react'
import classes from '../UploadFile/UploadFile.module.css'
import DataTableLower from '../CorporateHome/tableTab2Home'
import DataTableUpload from './tableTab2Statement'



const UploadViewFIle = () => {
  return (
   <>
       
       <div className={classes.cardsmainpage}>
       <div className={classes.maintabbelowheading}> View Uploaded File Details</div>
       
        <DataTableUpload/>
        </div>
   </>
  )
}

export default UploadViewFIle
