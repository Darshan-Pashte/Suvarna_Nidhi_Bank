import React from 'react'
import classes from '../CorporateFundTransfer/CorporateFundTransfer.module.css'

import { Grid } from '@mui/material'
import { styled, Button } from "@mui/material";
import TextFieldForm from '../../../../components/common/textFieldForm';
import { errorMessages } from "../../../../components/utilities/formValidation";
import { useForm } from 'react-hook-form';

const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));


const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#707070",
  
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#FFF",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const defaultFormData = {
    announcement: "",
    fromDate: null,
    toDate: null,
  };
  
const WithinBankSummary = () => {

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        register,
        watch,
        reset,
        formState: { isSubmitting, errors },
      } = useForm({
        defaultValues: defaultFormData,
        mode: "onChange",
      });
  return (
    <>
    
    <div className={classes.profilemainpage}>
      <div className={classes.profileupper}>
        <div className={classes.profileupperheader}>
        Summary Details
        </div>
        <div className={classes.profileupperheader1}>
        Transaction Details
        </div>
        <div className={classes.profileuppercontent}>
        <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: '0.1vw',marginBottom:'30px' }}
              >
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    From Account
                    </div>
                    <div className={classes.uppername}>
                    030212452562959 
                    </div>
 
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    To Account
                    </div>
                    <div className={classes.uppername}>
                    895232579324873
                    </div>
                   
                  </div>
                </Grid>


                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Transaction Type
                    </div>
                    <div className={classes.uppername}>
                    Funds transfer within ABC Bank
                    </div>
                
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Pay from account
                    </div>
                    <div className={classes.uppername}>
                    ABC Bank
                    </div>
                    
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Payee Type
                    </div>
                    <div className={classes.uppername}>
                    Personal Payee
                    </div>
                    
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Nickname  
                    </div>
                    <div className={classes.uppername}>
                    Ramesh
                    </div>
                  
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Amount
                    </div>
                    <div className={classes.uppername}>
                    ₹ 3,800
                    </div>
                  
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Remarks
                    </div>
                    <div className={classes.uppername}>
                    Tour Expenditure
                    </div>
                  
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Payment Date
                    </div>
                    <div className={classes.uppername}>
                    16/11/2023
                    </div>
                  
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>

                </Grid>


            
            
                <Grid item xs={12} sm={12} md={6}>

</Grid>

<Grid item xs={12} sm={12} md={12}>

</Grid>

<Grid item xs={12} sm={12} md={12}>
<div className={classes.profileupperheader}>
Amount Details
        </div>
</Grid>

                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Amount (INR)
                    </div>
                    <div className={classes.uppername}>
                    INR 3,800
                    </div>
                   
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Transaction Currency
                    </div>
                    <div className={classes.uppername}>
                    INR
                    </div>
                  
                  </div>
                </Grid>
              



                <Grid item xs={12} sm={12} md={6}>

</Grid>
                <Grid item xs={12} sm={12} md={12}>

</Grid>

<Grid item xs={12} sm={12} md={12}>
<div className={classes.profileupperheader}>
Approver Details
        </div>
</Grid>

                <Grid item xs={12} sm={12} md={4} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Role ID (INR)
                    </div>
                    <div className={classes.uppername}>
                    4370
                    </div>
                   
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={2}>

</Grid>
              
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Authority
                    </div>
                    <div className={classes.uppername}>
                    1 Maker + 1 Checker + 1 Authorizer
                    </div>
                   
                  </div>
                </Grid>
              
                <Grid item xs={12} sm={12} md={4} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Follow Hierarchy
                    </div>
                    <div className={classes.uppername}>
                    Yes
                    </div>
                   
                  </div>
                </Grid>
              


              
                <Grid item xs={12} sm={12} md={8}>

</Grid>
                <Grid item xs={12} sm={12} md={12}>

</Grid>

<Grid item xs={12} sm={12} md={12}>
<div className={classes.profileupperheader}>
Select Approver
        </div>
</Grid>

                <Grid item xs={12} sm={12} md={4} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Approver User ID
                    </div>
                    <div className={classes.uppername}>
                    56
                    </div>
                   
                  </div>
                </Grid>
              

                              <Grid item xs={12} sm={12} md={2}>

</Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Remarks
                    </div>
                    <div className={classes.uppername}>
                    Within ABC Bank done successfully
                    </div>
                   
                  </div>
                </Grid>
              
                <Grid item xs={12} sm={12} md={6} >
                 
                </Grid>


                <Grid item xs={12} sm={12} md={12}>
                <div className={classes.payment1mobileprepaidbutton} >
                <ColorButton2 variant="contained" type="submit">
           Back
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit">
                Submit
                </ColorButton1>
              
             
        
            </div>
</Grid>








                </Grid>
             
        </div>
      </div>

    
    
    </div>
    
    
    </>
  )
}

export default WithinBankSummary
