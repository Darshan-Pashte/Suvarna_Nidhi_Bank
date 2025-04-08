import classes from './AccountStatementHome.module.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Grid, Menu, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import ServerInstance, { apiList } from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from '../../../../components/common/autuCompleteForm';
import SweetAlertPopup from '../../../../components/common/sweetAlertPopup';
import Loader from '../../../../components/common/loader';
import { compareTextAndReturnObject } from '../../../../components/common/commonArray';

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const AccountStatementHome = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(user, 'user')
  // console.log("accList", accList)

  const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo }));
  // const accountList = accList && accList?.map(item => ({ "code": item.accNo, "value": item.accNo }));

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

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (accountList) {
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
    }
  }, []);


  useEffect(() => {
    setValue("fromDate", new Date())
    setValue("toDate", new Date())
  }, []);


  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [payloaddata, setPayloadData] = React.useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (route) => {
    setAnchorEl(null);
    navigate(route)
  };


  const links = {
    textDecoration: "none",
    color: "#000",
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "131%" /* 20.96px */,
  };


  const handleNavigate = (data) => {
    // console.log('data',data)
    navigate('/dashboard/viewstatement', { state: data });
  };

  // const { state: user } = useContext(AuthContext);
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );

  // useEffect(()=>{
  //   setValue("fromDate", new Date())
  //   setValue("toDate", new Date())
  // },[])


  const payFromAccount = [
    {
      code: "01",
      value: "PDF "
    },
    {
      code: "02",
      value: "CSV "
    },

  ]

  const accountHomebank = [
    {
      code: "01",
      value: "0000487123256871486 - Rakesh Tr  "
    },
    {
      code: "02",
      value: "0000487123256871486 - Mahesh Tr  "
    },
    {
      code: "03",
      value: "0000487123256871486 - Ramesh Tr  "
    },

  ]

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        fromDate: convertDate(data.fromDate, 9),
        toDate: convertDate(data.toDate, 9),
        // fromDate: "20220101",
        // toDate: "20231122",
        brCode: data.accountNumber.code
      };

      // handleNavigate(data)
      const response = await postApiData(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success")
        // reset()
      } else {
        SweetAlertPopup(response.message, "Error", "error")

      }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);

    }
  };


  const handleProcess = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        accNo: watch('accountNumber').value,
        accType:"CASA",
        sessionId: user?.sessionId,
        fromDt: convertDate(watch('fromDate'), 4),
        toDt: convertDate(watch('toDate'), 4),

      };

      // handleNavigate(data)
      const response = await postApiData(apiList.PDF_GENERATE, payload);
      // console.log('response',response)
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success")
        // reset()
      } else {
        SweetAlertPopup(response.message, "Error", "error")

      }
      setIsloading(false);
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
    paddingTop: "20px",
    paddingBottom: "20px",
    // width: "500px",
    height: "50px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "8rem",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      width: "100%",
      height: "35px",
      
    },
  }));


  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className={classes.Sbox}>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={1}
                rowSpacing={2}
                // style={{ padding: '0.1vw' }}
              >
              
                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.widthtfield}>
                    <div className={classes.frowtext}>Account Number<sup className={classes.required}>*</sup></div>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "accountNumber",
                      }}
                      TextFieldProps={{
                        placeholder: "Select Account Number",
                        onKeyDown: (event) => {
                          // const regex = /^[0-9]*$/;
                          const regex = /^[a-zA-Z0-9]*$/;
                          const isBackspace = event.keyCode === 8;
                          const isValidInput = regex.test(event.key);

                          const currentInputValue = event.target.value;

                          // Maximum length constraint
                          const maxLength = 32; // Set your max length here
                          const isMaxLengthReached = currentInputValue.length >= maxLength;

                          if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                            event.preventDefault();
                          }
                        },
                      }}
                      rules={{
                        required: "Account Number " + errorMessages.error_autocomplete_message,
                       
                        // maxLength: {
                        //   value: 32, // Set your max length here
                        //   message: "Account Number must be no more than 10 digits long",
                        // },
                      }}
                      data={accountList}
                      required={true}
                    />

                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>From Date<sup className={classes.required}>*</sup></div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "fromDate",
                      }}
                      TextFieldProps={{
                        //   fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                        maxDate: new Date()

                      }}
                      required={false}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>To Date<sup className={classes.required}>*</sup></div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={{
                        //   fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                        minDate: watch("fromDate")?._d,
                        maxDate: new Date()
                      }}
                      required={false}
                    />
                  </div>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={12}></Grid> */}

                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.buttonBox}>
                    <ColorButton2 variant="contained" type="button" onClick={handleProcess}>
                      Process Pdf
                    </ColorButton2>

                    <ColorButton2 variant="contained" type="button" onClick={() => navigate('/account/viewstatement',{state:"CASA"})}>
                      View Pdf
                    </ColorButton2>
                    {/* <ColorButton2 variant="contained" type="submit">
                      Send to mail
                    </ColorButton2> */}
                  </div>
                </Grid>

              </Grid>

            </div>
          </div>

        </div>
      </Box>


    </>
  )
}

export default AccountStatementHome
