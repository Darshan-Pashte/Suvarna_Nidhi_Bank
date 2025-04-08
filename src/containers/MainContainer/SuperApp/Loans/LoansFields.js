
import React from "react";
import classes from '../Loans/loans.module.css'

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import GoBackButton from "../../../../components/common/GoBackButton";
import Loader from "../../../../components/common/loader";



const defaultFormData = {
  email: "",
  password: "",
  anincome:"",
  loantype:"",
  altmobileno:""
};

const LoansFields = () => {
    // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isLoading, setIsloading] = useState(false);

  const [depositList, setDepositList] = useState([]);


  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );




  const loantypedata=[
    {
code:0,
value:'Gold Loan'
  },
    {
code:1,
value:'Home Loan'
  },
]
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
  const navigate = useNavigate();
  const handlleNavigate = (route) => {
    navigate(route)
}
  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  
  
  const onSubmit = async (data) => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        annualIncome:data?.anincome,
        loantype:data?.loantype,
        alternateMob:data?.altmobileno,
      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHLOAN, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setDepositList(response?.data?.schemeCodelist);
      setValue("depaccount", response?.data?.accountNo);

      if(response?.status== true){
        SweetAlertPopup(response?.message, "Success", "success");
        reset()
        setIsloading(false);
      }
      else{
        SweetAlertPopup(response?.message, "Error", "error");
        setIsloading(false);
      }
      

    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
     background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "123px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
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
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));


  return (
  <>

{isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}


  <div className={classes.Payment1MobilePrepaidMainPage}>
    <GoBackButton/>
  <div className={classes.mainupperheader}>Apply For Loan</div>
         
  <Box
            className={classes.tableMainBox}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <div className={classes.firsttabinfo}>
            <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: '0.1vw' }}
              >





              <Grid item xs={12} sm={6} md={4} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                  Annual Income 
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "anincome",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter Annual Income",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9.]*$/}
                      rules={{
                        required:
                          "Annual Income" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
             
             
              <Grid item xs={12} sm={6} md={4} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                 Loan Type
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                  <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "loantype",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter Loan Type",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z/ ]+$/}
                      rules={{
                        required:
                          "Loan Type" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>



              <Grid item xs={12} sm={6} md={4} >
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
             Alternate Mobile Number
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "altmobileno",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter  Alternate Mobile Number",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        inputProps : {maxLength: 10}
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9]+$/}
                      rules={{
                        required:
                          "Alternate Mobile Number" +
                          errorMessages.error_autocomplete_message,
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please Enter valid Mobile Number",
                          },
                      }}
                      required={true}
                    />
                  </div>
    
                </div>
          
              </Grid>

            
              </Grid>
              </div>

              <div className={classes.payment1mobileprepaidbutton} >
              
                <ColorButton1 variant="contained" type="submit">
            Apply
                </ColorButton1>
              
             
        
            </div>
            
          </Box>
  </div>
  
  
  </>
  )
}

export default LoansFields
