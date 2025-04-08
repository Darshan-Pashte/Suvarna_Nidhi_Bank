import React from 'react'
import classes from '../NewCheckBook/NewCheckBook.module.css'


import { Grid } from '@mui/material'
import { styled, Button } from "@mui/material";
import TextFieldForm from '../../../../components/common/textFieldForm';
import { errorMessages } from "../../../../components/utilities/formValidation";
import { useForm } from 'react-hook-form';
import NewCheckBook from './NewCheckBook';

const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
     background: "var(--button-color)",
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
  
const NewCheckBookSummary = () => {

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
        Account Details
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
                    Account
                    </div>
                    <div className={classes.uppername}>
                    Mahesh (INR) - 030212452562959 
                    </div>
 
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Number of leaves
                    </div>
                    <div className={classes.uppername}>
                    25
                    </div>
                   
                  </div>
                </Grid>


                <Grid item xs={12} sm={12} md={12} >
                <div className={classes.profileupperheader1}>
                Address Details
        </div>
                    </Grid>
                <Grid item xs={12} sm={12} md={6} >
                  <div className={classes.uppercontainer}>
                    <div className={classes.uppertitle}>
                    Delivery Address
                    </div>
                    <div className={classes.uppername}>
                    Vardhaman chember, M G Road Vashi
                    </div>
                
                  </div>
                </Grid>
              
              


              
                <Grid item xs={12} sm={12} md={8}>

</Grid>
                




                <Grid item xs={12} sm={12} md={12}>
                <div className={classes.payment1mobileprepaidbutton} >
                <ColorButton2 variant="contained" type="submit">
                Back to Edit
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

export default NewCheckBookSummary
