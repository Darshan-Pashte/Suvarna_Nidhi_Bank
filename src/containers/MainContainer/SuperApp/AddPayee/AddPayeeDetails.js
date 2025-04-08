import classes from '../AddPayee/AddPayee.module.css'

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { is } from "immutable";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from '../../../../components/common/autuCompleteForm';

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const AddPayeeDetails = () => {
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

  const [announcementList, setAnnouncementList] = useState([]);
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);


  useEffect(() => {
    // if (banksCode) {
    setValue("fromDate", new Date())
    setValue("toDate", new Date())

    // }
  }, []);


  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate("/announcement/announcementBrowseList", { state: data });
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
      value: "Mahesh Bank"
    },

  ]

  const accountHomebank = [
    {
      code: "01",
      value: "Mahesh (INR) - 030212452562959  "
    },

  ]

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        // userid: user.username,
        userid: username,
        channel: "admin",
        sessionId: token,
        announcement: data.announcement,
        fromdt: data.fromDate ? convertDate(data.fromDate, 9) : convertDate(new Date(), 9),
        todate: data.toDate ? convertDate(data.toDate, 9) : convertDate(new Date(), 9),

      };
      const response = await postApiData(apiList.ANNOUNCEMENT_LIST, payload);
      handleNavigate(response?.data?.ansmentlist?.reverse());
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


  return (
    <>
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
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: '0.1vw' }}
              >

                <Grid item xs={12} sm={12} md={12}><sup className={classes.required}>*</sup>Indicates Mandatory Fields</Grid>


                <Grid item xs={12} sm={12} md={12}><div className={classes.uppertitle}>Payee Details</div></Grid>

                <Grid item xs={12} sm={12} md={5}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>Name<sup className={classes.required}>*</sup></div>


                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "name",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter name of payee",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}

                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Name" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />


                  </div>
                </Grid>


                <Grid item xs={12} sm={12} md={5}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>Nickname <sup className={classes.required}>*</sup></div>


                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "nickname",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter nickname of payee",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}

                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Nickname" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />


                  </div>
                </Grid>



                <Grid item xs={12} sm={12} md={12}><div className={classes.uppertitle}>Account Details</div></Grid>

                <Grid item xs={12} sm={12} md={5}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>Account Number<sup className={classes.required}>*</sup></div>


                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "accountnumber",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Enter account number",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        inputProps: { minLength: 1, maxLength: 32 },
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Account Number" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />


                  </div>
                </Grid>


                <Grid item xs={12} sm={12} md={5}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>Confirm account number <sup className={classes.required}>*</sup></div>


                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "confaccnumber",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                        // label: "Branch",
                        placeholder: "Re-enter account number",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        inputProps: { minLength: 1, maxLength: 32 },
                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Account Number" + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />


                  </div>
                </Grid>


                {/* <Grid item xs={12} sm={12} md={7}></Grid> */}
                <Grid item xs={12} sm={12} md={5} >
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Payee Bank
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "payeebank",
                        }}
                        TextFieldProps={{
                          // style: { width: "28vw" },

                          placeholder: "Select payee bank",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[0-9]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Payee bank " + errorMessages.error_autocomplete_message,
                        }}
                        data={payFromAccount}
                        required={true}
                      />
                    </div>
                  </div>

                </Grid>



                {/* <Grid item xs={12} sm={12} md={7}></Grid> */}



                {/* <Grid item xs={12} sm={12} md={7}></Grid> */}

                <Grid item xs={12} sm={12} md={5} >
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      IFSC Code
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "ifsc",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{

                          // label: "Branch",
                          placeholder: "Enter IFSC Code",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            " IFSC Code" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                    <div className={classes.gridlowertextnetwork} style={{ textDecoration: 'underline' }}>
                      Lookup
                    </div>
                  </div>
                </Grid>





                {/* <Grid item xs={12} sm={12} md={7}></Grid> */}

                <Grid item xs={12} sm={12} md={5} >
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Remarks
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.widthtfield}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "remarks",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{

                          // label: "Branch",
                          placeholder: "Enter Remarks",
                          //   style: { width: "130%" },
                          fullWidth: true,
                          // style:{border:'3px solid #ECECEC'}

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "Remarks" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>


              </Grid>
              <div className={classes.payment1mobileprepaidbutton} >
                <ColorButton2 variant="contained" type="submit">
                  Reset
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit">
                  Continue
                </ColorButton1>



              </div>
            </div>
          </div>

        </div>
      </Box>



    </>
  )
}

export default AddPayeeDetails
