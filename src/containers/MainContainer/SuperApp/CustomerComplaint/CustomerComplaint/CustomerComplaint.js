import React from "react";
import classes from "./AccountLimit.module.css";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";


import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import { useSelector } from "react-redux";
import GoBackButton from "../../../../../components/common/GoBackButton";
import { DataContext } from "../../../../../context/LoaderContext";

const defaultFormData = {
  category: "",
  subject: "",
  message: "",
};

const ComplaintList = [
  {
    code: "Financial",
    value: "Financial",
  },
  {
    code: "Non Financial",
    value: "Non Financial",
  },
  {
    code: "Other",
    value: "Other",
  },
];

const CustomerComplaint = () => {
  // const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const { link, bankEmail, bankAddress } = useContext(DataContext);

  const [isLoading, setIsloading] = useState(false);

  const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);


  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const resetForm = () => {
    resetField("noofcheckbook")
    resetField("deliveryday")
  }

  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      category: data.category.value,
      subject: data.subject,
      message: data.message,
    };

    setIsloading(true)
    const response = await postApiData(apiList.CUSTOMERCOMPLAINT, payload);
    // console.log("response", response);
    if (response?.status == true) {
      SweetAlertPopup(response?.message, "Success", "success");
      reset();
      setIsloading(false)
    } else {
      SweetAlertPopup(response?.message, "Error", "error");
      setIsloading(false)
    }
  };

  useEffect(() => {
    if (ComplaintList) {
      // setValue("accName", accName)
      setValue("category", ComplaintList ? compareTextAndReturnObject(ComplaintList, ComplaintList[0]?.value) : '')
    }
  }, []);

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "173px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "var(--button-color)",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
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
    width: "173px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "#FFF",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
    },
  }));



  return (
    <>

      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Raise Complaint
            </div>
          </div>
        </div>


      </div>
      <div className={classes.sboxs}>
        <div className={classes.Payment1MobilePrepaidMainPage}>
          {/* <GoBackButton /> */}
          <div className={classes.tableMainBoxInner}>
            <Box
              className={classes.box1}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={classes.mainDIv}>
                <div className={classes.firstDiv} >
                  <Grid
                    container
                    columnSpacing={3}
                    rowSpacing={3}
                    style={{ padding: "0.1vw" }}
                  >



                    <Grid item xs={12} sm={12} md={11}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Category
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <AutocompleteForm
                            controlerProps={{
                              control: control,
                              name: "category",
                            }}
                            TextFieldProps={{
                              style: { width: "100%" },

                              placeholder: "Category",
                              onKeyDown: (event) => {
                                //const regex = /^[a-zA-Z]*$/;
                                const regex = /^[0-9]*$/;
                                const isBackspace = event.keyCode === 8;
                                const isValidInput = regex.test(event.key);
                                const currentInputValue = event.target.value;
                                const maxLength = 32;
                                const isMaxLengthReached = currentInputValue.length >= maxLength;
                                if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                                  event.preventDefault();
                                }
                              },
                            }}
                            rules={{
                              required:
                                "Category " +
                                errorMessages.error_autocomplete_message,
                            }}
                            data={ComplaintList}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>


                    <Grid item xs={12} sm={12} md={11}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Subject
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <TextFieldForm
                            controlerProps={{
                              control: control,
                              name: "subject",
                              rows: 5,
                              maxRows: 10,
                            }}
                            TextFieldProps={{
                              // label: "Branch",
                              placeholder: "Subject",
                              //   style: { width: "130%" },
                              fullWidth: true,
                              // multiline: true,
                              // rows: 3,
                              // inputProps: { maxLength: 11 },
                            }}
                            // backgroundColor={true}
                            regExp={/^[A-Za-z.,0-9 ]+$/}
                            rules={{
                              required:
                                "Subject" +
                                errorMessages.error_autocomplete_message,
                            }}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={11}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Message
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <TextFieldForm
                            controlerProps={{
                              control: control,
                              name: "message",
                              rows: 5,
                              maxRows: 10,
                            }}
                            TextFieldProps={{
                              // label: "Branch",
                              placeholder: "Message",
                              //   style: { width: "130%" },
                              fullWidth: true,
                              multiline: true,
                              rows: 3,
                              // inputProps: { maxLength: 11 },
                            }}
                            // backgroundColor={true}
                            regExp={/^[A-Za-z.,0-9 ]+$/}
                            rules={{
                              required:
                                "Message " +
                                errorMessages.error_autocomplete_message,
                            }}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}></Grid>


                    <Grid item xs={12} sm={12} md={5}>
                      <div className={classes.payment1mobileprepaidbutton}>
                        <ColorButton2 onClick={() => { reset() }}>
                          Reset
                        </ColorButton2>
                        <ColorButton1 variant="contained" type="submit">
                          Submit
                        </ColorButton1>
                      </div>
                    </Grid>

                  </Grid>
                </div>
                <div className={classes.secondDiv}>
                  <div className={classes.rightBankingHead}>
                    <div className={classes.rightBanking}>Internet Banking Sil Support Team</div>
                    <div >
                      <div style={{ padding: "10px" }}> <span style={{ fontWeight: "600" }}>Helpdesk:</span> <span>{bankContactInfo?.ContactNo}</span></div>
                      <div style={{ padding: "10px" }}><span style={{ fontWeight: "600" }}>Office Hours:</span> <span>{bankContactInfo?.OfficeHours}
                        (Office remains closed on Sundays and every 2nd and 4th Saturday)
                      </span></div>
                      <div style={{ padding: "10px" }}><span style={{ fontWeight: "600" }}>Address:</span> <span>{bankContactInfo?.address}</span></div>
                      <div style={{ padding: "10px" }}><span style={{ fontWeight: "600" }}>Email:</span> <span>{bankContactInfo?.email}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerComplaint;
