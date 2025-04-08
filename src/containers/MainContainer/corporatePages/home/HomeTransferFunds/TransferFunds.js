import classes from "../CorporateHome.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../../components/common/datePickerForm";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import ServerInstance, {
  apiList,
} from "../../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import { convertDate } from "../../../../../components/utilities/convertDate";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import RadioGroupForm from "../../../../../components/common/RedioButtonForm";
import GoBackButton from "../../../../../components/common/GoBackButton";

const defaultFormData = {
  transferType: "internal",
  accountNumber: "",
  beneAccNo: "",
  transferMethod: "IMPS",
  amount: "",
  ifsc: "",
  remark: "",
  benAccount: "",
  benIFSC: "",
};
const TransferFunds = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  // console.log(user, 'user')
  // console.log("accList", accList)

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));
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
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const [accountBalance, setAccountBalance] = useState({});

  useEffect(() => {
    if (accountList) {
      setValue(
        "accountNumber",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

  useEffect(() => {
    setValue("fromDate", new Date());
    setValue("toDate", new Date());
  }, []);

  useEffect(() => {
    Bene();
  }, []);

  useEffect(() => {
    if (watch("accountNumber")) {
      fetchBalance();
    }
  }, [watch("accountNumber")]);

  const Bene = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        accNo: watch("accountNumber")?.value,
      };
      const response = await postApiData(
        apiList.CORPORATE_BENEFICIARYBROWSE,
        payload
      );
      if (response?.status == true) {
        setBeneficiaryList(response?.data.beneficiary);
        setIsloading(false);
      } else {
        // SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      //   console.log(err)
      setIsloading(false);
    }
  };

  const fetchBalance = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        accNo: watch("accountNumber") ? watch("accountNumber")?.value : "",
        sessionId: user?.sessionId,
      };
      const response = await postApiData(
        apiList.CORPORATE_FETCH_BALANCE,
        payload
      );
      if (response?.status == true) {
        setAccountBalance(response?.data);
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      //   console.log(err)
      setIsloading(false);
    }
  };

  const externalList = (beneficiaryList || [])
    .filter((item) => item.beneType == "E")
    .map((ele) => ({ code: ele.accNo, value: ele.nickname }));
  externalList.push({ code: "other", value: "Other" });

  const internalList = (beneficiaryList || [])
    .filter((item) => item.beneType == "I")
    .map((ele) => ({ code: ele.accNo, value: ele.nickname }));

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
      value: "PDF ",
    },
    {
      code: "02",
      value: "CSV ",
    },
  ];

  const accountHomebank = [
    {
      code: "01",
      value: "0000487123256871486 - Rakesh Tr  ",
    },
    {
      code: "02",
      value: "0000487123256871486 - Mahesh Tr  ",
    },
    {
      code: "03",
      value: "0000487123256871486 - Ramesh Tr  ",
    },
  ];

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        transferType: data.transferType,
        transferMethod: data.transferMethod,
        amount: data.amount,
        remark: data.remark,
        beneNickname: data.beneAccNo.value,
        beneAccNo: data.benAccount,
        beneIfsc: data.benIFSC,
      };

      const response = await postApiData(
        apiList.CORPORATE_FUND_TRANFER,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status == true) {
        SweetAlertPopup(response.message, "Success", "success");
        setIsloading(false);
        setAccountBalance("");
        reset();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      //   console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "133px",
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
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Financial Overview
            </div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>
        <Box
          className={classes.mainContainer}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
        
            <div>
              <div className={classes.formbox}>
                <Grid
                  container
                  columnSpacing={4}
                  rowSpacing={2}
                  style={{ padding: "0.1vw" }}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Delivery day
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.widthtfield}>
                        <RadioGroupForm
                          controlerProps={{
                            control: control,
                            name: "transferType",
                          }}
                          data={[
                            // {
                            //     label: "Own Account",
                            //     value: "6",
                            // },
                            {
                              label: "Internal",
                              value: "internal",
                            },
                            {
                              label: "Other Bank",
                              value: "other",
                            },
                          ]}
                          errorMessage={
                            errorMessages.error_type_message + "Delivery day"
                          }
                          required={true}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.frowdata11}>
                      <div className={classes.frowtext}>
                        From Account Number
                        <sup className={classes.required}>*</sup>
                      </div>
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
                            const isMaxLengthReached =
                              currentInputValue.length >= maxLength;

                            if (
                              (!isValidInput && !isBackspace) ||
                              (isMaxLengthReached && !isBackspace)
                            ) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Account Number " +
                            errorMessages.error_autocomplete_message,
                          maxLength: {
                            value: 32, // Set your max length here
                            // message:
                            //   "Account Number must be no more than 10 digits long",
                          },
                        }}
                        // data={accountHomebank}
                        data={accountList}
                        required={true}
                      />
                      <div className={classes.availablebalance}>
                        Available Balance:{" "}
                        <span className={classes.balace}>
                          ₹ {accountBalance?.accBal}
                        </span>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.frowdata11}>
                      <div className={classes.frowtext}>
                        To Account Number<sup className={classes.required}>*</sup>
                      </div>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "beneAccNo",
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
                            const isMaxLengthReached =
                              currentInputValue.length >= maxLength;

                            if (
                              (!isValidInput && !isBackspace) ||
                              (isMaxLengthReached && !isBackspace)
                            ) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Account Number " +
                            errorMessages.error_autocomplete_message,
                          maxLength: {
                            value: 32, // Set your max length here
                            message:
                              "Account Number must be no more than 10 digits long",
                          },
                        }}
                        // data={accountHomebank}
                        data={
                          watch("transferType") == "internal"
                            ? internalList
                            : externalList
                        }
                        required={true}
                      />
                    </div>
                  </Grid>
                  {watch("beneAccNo")?.value == "Other" ? (
                    <>
                      <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.frowdataaff}>
                          <div className={classes.frowtextaff}>
                            Beneficiary Account No.
                            <sup className={classes.required}>*</sup>
                          </div>
                          <div className={classes.widthtfield}>
                            <TextFieldForm
                              controlerProps={{
                                control: control,
                                name: "benAccount",
                                rows: 5,
                                maxRows: 10,
                              }}
                              TextFieldProps={{
                                // label: "Name",
                                placeholder: "Beneficiary Account No",
                                // style: { width: "33vw" },
                                fullWidth: true,
                                inputProps: { minLength: 1, maxLength: 32 },
                                disabled: watch("beneAccNo")?.code == "other" ? false : true
                              }}
                              backgroundColor={watch("beneAccNo")?.code == "other" ? false : true}
                              regExp={/^[a-zA-Z0-9]{1,32}$/}
                              rules={{
                                required: " Beneficiary Account No. is required",
                                pattern: {
                                  value: /^[a-zA-Z0-9]{1,32}$/,
                                  message: "Please Enter a valid  Beneficiary Account No.",
                                },
                              }}
                              required={true}
                            />
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.frowdataaff}>
                          <div className={classes.frowtextaff}>
                            Beneficiary IFSC No.
                            <sup className={classes.required}>*</sup>
                          </div>
                          <div className={classes.widthtfield}>
                            <TextFieldForm
                              controlerProps={{
                                control: control,
                                name: "benIFSC",
                                rows: 5,
                                maxRows: 10,
                              }}
                              TextFieldProps={{
                                // label: "Name",
                                placeholder: "Enter IFSC",
                                // style: { width: "33vw" },
                                fullWidth: true,
                              }}
                              regExp={/^[a-zA-Z0-9]+$/}
                              required={true}
                            />
                          </div>
                        </div>
                      </Grid>
                    </>
                  ) : null}

                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Transfer Method
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.widthtfield}>
                        <RadioGroupForm
                          controlerProps={{
                            control: control,
                            name: "transferMethod",
                          }}
                          data={[
                            // {
                            //     label: "IMPS",
                            //     value: "IMPS",
                            // },
                            {
                              label: "NEFT",
                              value: "NEFT",
                            },
                            {
                              label: "RTGS",
                              value: "RTGS",
                            },
                          ]}
                          errorMessage={
                            errorMessages.error_type_message + "Delivery day"
                          }
                          required={true}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Amount
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.widthtfield}>
                        <TextFieldForm
                          controlerProps={{
                            control: control,
                            name: "amount",
                            rows: 5,
                            maxRows: 10,
                          }}
                          TextFieldProps={{
                            // label: "Name",
                            placeholder: "₹ 0.00",
                            // style: { width: "33vw" },
                            fullWidth: true,
                            // inputProps: { maxLength: 14 },
                            inputProps: {
                              maxLength: 14,
                              style: { textAlign: "right" },
                            },
                            inputLabelProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          // backgroundColor={true}
                          regExp={/^[0-9.]*$/}
                          // regExp={/^\d{1,11}(\.\d{1,2})?$/}
                          rules={{
                            required: "Amount is required",
                            pattern: {
                              value: /^\d{1,14}(?:\.\d{1,2})?$/,
                              message: "Please Enter a valid Amount",
                            },
                          }}
                          required={true}
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Remark
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.widthtfield}>
                        <TextFieldForm
                          controlerProps={{
                            control: control,
                            name: "remark",
                            rows: 5,
                            maxRows: 10,
                          }}
                          TextFieldProps={{
                            // label: "Name",
                            placeholder: "Remark",
                            // style: { width: "33vw" },
                            fullWidth: true,
                            inputProps: {
                              maxLength: 100,
                            },
                          }}
                          rules={{
                            required: "Remark is required",
                          }}
                          regExp={/^[a-zA-Z0-9., ]+$/}
                          required={true}
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}></Grid>
                  <Grid item xs={12} sm={12} md={10}></Grid>
                  <Grid item xs={12} sm={7} md={2}>
                    <div className={classes.payment1mobileprepaidbutton}>
                      <ColorButton1 variant="contained" type="submit">
                        Submit
                      </ColorButton1>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
      
        </Box>
      </div>
    </>
  );
};

export default TransferFunds;
