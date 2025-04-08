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
  
const WithinBankPreview = () => {

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
        Confirm the details before submission
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
                <ColorButton2 variant="contained" type="submit">
           Back to Edit
                </ColorButton2>
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
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "4370",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
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
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "1 Maker + 1 Checker + 1 Authorizer",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                    </div>
                   
                  </div>
                </Grid>
              
                <Grid item xs={12} sm={12} md={4} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Follow Hierarchy
                    </div>
                    <div className={classes.uppername}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Yes",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
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
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "56",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
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
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Within ABC Bank done successfully",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                    </div>
                   
                  </div>
                </Grid>
              
                <Grid item xs={12} sm={12} md={6} >
                 
                </Grid>


                <Grid item xs={12} sm={12} md={12}>
                <ColorButton1 variant="contained" type="submit">
         LOOKUP
                </ColorButton1>
</Grid>


                <Grid item xs={12} sm={12} md={12}>

</Grid>

<Grid item xs={12} sm={12} md={12}>
<div className={classes.profileupperheader}>
Confirmation Details
        </div>
</Grid>

<Grid item xs={12} sm={12} md={12}>
<div className={classes.profileupperheader1}>
OTP has been generated and sent to your registered mobile number +91 XXXXX XXXX38 
        </div>
</Grid>

<Grid item xs={12} sm={12} md={2}>

</Grid>

<Grid item xs={12} sm={12} md={2}>
<div className={classes.uppername}>
One time password
        </div>
</Grid>

<Grid item xs={12} sm={12} md={3}>
<div className={classes.uppername}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "123456",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Amount" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                    </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                <ColorButton2 variant="contained" type="submit">
       Resend OTP
                </ColorButton2>
</Grid>

<Grid item xs={12} sm={12} md={12}>
            
</Grid>
<Grid item xs={12} sm={12} md={12}>
            
</Grid>

<Grid item xs={12} sm={12} md={12}>
                <ColorButton1 variant="contained" type="submit">
         SUBMIT
                </ColorButton1>
</Grid>

                </Grid>
             
        </div>
      </div>

    
    
    </div>
    
    
    </>
  )
}

export default WithinBankPreview
