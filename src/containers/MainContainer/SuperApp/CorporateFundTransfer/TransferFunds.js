import classes from "../CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import {
  Box,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import ServerInstance, {
  apiList,
} from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import Loader from "../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import RadioGroupForm from "../../../../components/common/RedioButtonForm";
// import FinancialOverview from "../CorporateHome/FinancialOverview";
import FinancialOverview from "../../corporatePages/home/FinancialOverview/FinancialOverview";
import GoBackButton from "../../../../components/common/GoBackButton";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import MUIDataTable from "mui-datatables";
import { LoadingButton } from "@mui/lab";


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
  accName: "",
  acctype: "",
};

const TransferFunds = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [beneficiaryList, setBeneficiaryList] = useState([])
  const [accountBalance, setAccountBalance] = useState({})
  const [responseData, setResponseData] = useState({})

  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false
  };

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

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
  const [isAccountBalance, setIsAccountBalance] = useState(false);

  useEffect(() => {
    if (accountList) {
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : "");
    }
  }, []);

  useEffect(() => {
   if(watch("transferType")){
    setValue('beneAccNo', "");
    setValue('beneName', "");
    setValue('benIFSC', "");
   }else{
    setValue('beneAccNo', "");
    setValue('beneName', "");
    setValue('benIFSC', "");
   }
  }, [watch("transferType")]);

  useEffect(() => {
    if(!watch("accountNumber")){
     setAccountBalance("")
    }
   }, [!watch("accountNumber")]);

  console.log("accountList", accountList);
  console.log("user", user);


  const accountListNew = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo, 'name': item.custName, 'acctype': item.acctype }));

  console.log("accountListNew", accountListNew);
  useEffect(() => {
    const accountNumber = watch('accountNumber');
    if (accountNumber) {
      const account = accountListNew.find(acc => acc.value === watch('accountNumber').value);
      if (account) {
        console.log("Set value run", account);
        setValue('acctype', account.acctype);
        setValue('accName', account.name);
      }
    }
  }, [watch('accountNumber'), accountListNew]);


  const navigate = useNavigate();

  // console.log("Transfer Type", watch("transferType"));

  // useEffect(() => {
  //   Bene();
  //   getTransactionListView()
  // }, []);


  // useEffect(() => {
  //   if (watch("accountNumber")) {
  //     fetchBalance();
  //   }
  // }, [watch("accountNumber")]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await Bene(); 
  //       await getTransactionListView();
  //       if (watch("accountNumber")) {
  //         await fetchBalance(); 
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [watch("accountNumber")]);



  useEffect(() => {
    if (watch("accountNumber")) {
      if (isAccountBalance)
        fetchBalance();
    }
  }, [watch("accountNumber"), isAccountBalance]);

  useEffect(() => {
    getFundTranferDetails()
  }, [])



  const getFundTranferDetails = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        accountNo: watch("accountNumber")?.value,
        // accountNo: "",
        op: "single",
        fromDt: convertDate(new Date(), 1),
        toDt: convertDate(new Date(), 1),
        status: "M",
        transtype: "all",
      };
      const response = await postApiData(apiList.CORPORATE_FUND_TRANFER_DETAILS_COMMON + `?pageNo=${1}&pageSize=${10}`, payload);
      // console.log("responseBene", response);
      if (response?.status == true) {
        setIsAccountBalance(true)
        setBeneficiaryList(response?.data.beneficiary);
        setResponseData(response?.data)
        setIsloading(false);
      } else {
        // SweetAlertPopup(response.message, "Error", "error");
      }
    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }
  };

  const Bene = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        // accNo: watch("accountNumber")?.value
        accNo: ""
      };
      const response = await postApiData(apiList.CORPORATE_BENEFICIARYBROWSE, payload);
      // console.log("responseBene", response);
      if (response?.status == true) {
        setBeneficiaryList(response?.data.beneficiary);
        setIsloading(false);
      } else {
        // SweetAlertPopup(response.message, "Error", "error");
      }
    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }
  };

  const fetchBalance = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        accNo: watch("accountNumber").value,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.CORPORATE_FETCH_BALANCE, payload);
      if (response?.status == true) {
        setAccountBalance(response?.data);
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }
  };


  // const beneficiaryListUpdate =
  //   beneficiaryList &&
  //   beneficiaryList?.map((item) => ({
  //     code: item.accNo,
  //     value: item.nickname,
  //   }));

  const externalList = (beneficiaryList || []).filter((item) => item.beneType == "E").map((ele) => ({ code: ele.accNo, value: ele.nickname, name: ele.name, benIFSC: ele.ifsc }))
  externalList.push({ code: "other", value: "Other" })

  const internalList = (beneficiaryList || []).filter((item) => item.beneType == "I").map((ele) => ({ code: ele.virtualAccNo, value: ele.nickname, name: ele.name, benIFSC: ele.ifsc }));

  // useEffect(() => {
  //   const accountNumber = watch('beneAccNo');
  //   if (accountNumber) {
  //     if (accountNumber?.code === "other") {
  //       setValue('benAccount', "");
  //       setValue('beneName', "");
  //       setValue('benIFSC', "");
  //     } else {
  //       let account = internalList.find(acc => acc?.value === accountNumber.value);

  //       if (!account) {
  //         account = externalList.find(acc => acc?.value === accountNumber.value);
  //       }

  //       if (account) {
  //         console.log("Set value run", account);
  //         setValue('benAccount', account?.code);
  //         setValue('beneName', account?.name);
  //         setValue('benIFSC', account?.benIFSC);
  //       }
  //     }
  //   }
  // }, [watch('beneAccNo'), internalList, externalList]);


  useEffect(() => {
    const accountNumber = watch('beneAccNo');
    if (accountNumber) {
      if (accountNumber?.code === "other") {
        setValue('benAccount', "");
        setValue('beneName', "");
        setValue('benIFSC', "");
      } else {
        let account = internalList.find(acc => acc?.value === accountNumber.value);

        if (!account) {
          account = externalList.find(acc => acc?.value === accountNumber.value);
        }

        if (account) {
          console.log("Set value run", account);
          setValue('benAccount', account?.code);
          setValue('beneName', account?.name);
          setValue('benIFSC', account?.benIFSC);
        } else {
          setValue('benAccount', "");
          setValue('beneName', "");
          setValue('benIFSC', "");
        }
      }
    } else {
      setValue('benAccount', "");
      setValue('beneName', "");
      setValue('benIFSC', "");
    }
  }, [watch('beneAccNo'), internalList, externalList]);




  const handleNavigate = () => {
    navigate("/beneficiarymanagements/addexternal");
  };

  const getTransactionListView = async () => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        fromDt: convertDate(new Date(), 1),
        toDt: convertDate(new Date(), 1),
        status: "M",
        transtype: "all",
      };

      const response = await postApiData(
        apiList.CORPORATE_TRANSACTION_VIEW + `?pageNo=${1}&pageSize=${10}`,
        payload
      );

      // console.log("viewResponse", response)

      if (response.status == true) {
        setResponseData(response.data)
        setIsloading(false);
      } else {
        // SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        transferType: data.transferType,
        transferMethod: watch("transferType") == "other" ? data.transferMethod : "INTERNAL",
        amount: data.amount,
        remark: data.remark,
        beneName: data.beneName.trim(),
        beneNickname: data.beneAccNo.value,
        beneAccNo: data.benAccount,
        beneIfsc: data.benIFSC
      };

      console.log("payload", payload)

      const response = await postApiData(
        apiList.CORPORATE_FUND_TRANFER,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status == true) {
        SweetAlertPopup(response.message, "Success", "success");
        setIsloading(false);
        reset();
        getTransactionListView();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      // console.log(err);
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
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const columns = [
    {
      name: 'srNo',
      label: 'Sr. No.',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transdate',
      label: 'Transaction Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'rrnNo',
      label: 'RRN No',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'transactiontype',
      label: 'Transaction Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'cbsreceivedDate',
      label: 'CBS Received Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'cbsSendDate',
      label: 'CBS Send Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },

    {
      name: 'cbsRrn',
      label: 'CBS RRN',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'responsedesc',
      label: 'Narration',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },

    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{ textAlign: "right" }}>₹ {value}</div>;
        },
      },
    },
    {
      name: 'remmitterAccNo',
      label: 'Remitter A/C No',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'beneName',
      label: 'Beneficiary Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'beneAccNo',
      label: 'Beneficiary A/C No',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'beneifsc',
      label: 'Beneficiary IFSC',
      options: {
        filter: true,
        sort: false,
      },
    },
    
    {
      name: 'remmitterbrCode',
      label: 'Remitter Code',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmittermob',
      label: 'Remitter Mo No.',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
  
    {
      name: 'activitystatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        responsive: "stanadard"
      },
    },

  ];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", alignItems:"center",gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Fund Transfer
            </div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>
        <Grid container>

          {/* <Grid item xs={12} sm={12} md={2}>
          <div className={classes.paymentMainHeading}>Payments</div>
        </Grid>
        <Grid item xs={12} sm={12} md={8}></Grid>
        <Grid item xs={12} sm={12} md={2}>
          <ColorButton1 variant="contained" type="button" onClick={handleNavigate}>
            Add Beneficiary
          </ColorButton1>
        </Grid> */}
        </Grid>
        {/* <div className={classes.gridtitle}></div> */}

        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
            // style={{ padding: "1vw" }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Transfer Type
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
                        //   label: "Own Account",
                        //   value: "Own Account",
                        // },
                        {
                          label: "Within Bank",
                          value: "internal",
                        },
                        {
                          label: "Other Bank",
                          value: "other",
                        },
                      ]}
                      errorMessage={
                        "Tranfer Type" + errorMessages.error_autocomplete_message
                      }
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    From Account Number<sup className={classes.required}>*</sup>
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
                        const isMaxLengthReached = currentInputValue.length >= maxLength;

                        if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                          event.preventDefault();
                        }
                      },
                    }}
                    rules={{
                      required:
                        "Account Number " +
                        errorMessages.error_autocomplete_message,
                      // maxLength: {
                      //   value: 32, // Set your max length here
                      //   message: "Account Number must be no more than 10 digits long",
                      // },
                    }}
                    // data={accountHomebank}
                    data={accountList}
                    required={true}
                  />
                  <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Type
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "acctype",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Account Type",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        // style:{border:'3px solid #ECECEC'}
                        // disabled: state?.rowData[3] ? true : false,
                        inputProps: { maxLength: 32 },
                        disabled: true
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9A-Za-z]*$/}
                      rules={{
                        required:
                          "  Account Type " +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Account Holder Name
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "accName",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Account Holder Name ",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        disabled: true
                        // style:{border:'3px solid #ECECEC'}
                        // disabled: state?.rowData[4] ? true : false,

                      }}
                      backgroundColor={true}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "  Account Holder Name  " +
                          errorMessages.error_autocomplete_message,

                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>


              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    Beneficiary Nickname<sup className={classes.required}>*</sup>
                  </div>
                  <AutocompleteForm
                    controlerProps={{
                      control: control,
                      name: "beneAccNo",
                    }}
                    TextFieldProps={{
                      placeholder: "Select Beneficiary Nickname",
                      onKeyDown: (event) => {
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
                      required:
                        "Beneficiary Nickname " +
                        errorMessages.error_autocomplete_message,
                      maxLength: {
                        value: 32, // Set your max length here
                        message: "Beneficiary Name must be no more than 10 digits long",
                      },
                    }}
                    // data={accountHomebank}
                    data={watch("transferType") == "internal" ? internalList : externalList}
                    required={true}
                  />
                </div>
              </Grid>


              <Grid item xs={12} sm={12} md={4}>
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
                        // pattern: {
                        //   value: /^[a-zA-Z0-9]{1,32}$/,
                        //   message: "Please Enter a valid  Beneficiary Account No.",
                        // },
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              {
                watch("transferType") == "other" ? <Grid item xs={12} sm={12} md={4}>
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
                          placeholder: "Beneficiary IFSC",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps: { maxLength: 11 },
                          disabled: watch("beneAccNo")?.code == "other" ? false : true
                        }}
                        backgroundColor={watch("beneAccNo")?.code == "other" ? false : true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "  Beneficiary IFSC  " +
                            errorMessages.error_autocomplete_message,

                          pattern: {
                            value: /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/,
                            message:
                              "Please enter a valid IFSC code",
                          },
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid> : ""
              }


              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Beneficiary Name
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "beneName",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        placeholder: "Benficiary Name",
                        // style: { width: "33vw" },
                        fullWidth: true,
                        inputProps: { maxLength: 50 },
                        disabled: watch("beneAccNo")?.code == "other" ? false : true
                        // style:{border:'3px solid #ECECEC'}
                      }}
                      backgroundColor={watch("beneAccNo")?.code == "other" ? false : true}
                      regExp={/^[a-zA-Z ]+$/}
                      rules={{
                        required:
                          "Beneficiary Name" +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Divider />
              {watch("transferType") == "other" ? <Grid item xs={12} sm={12} md={12}>
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
                        {
                          label: "IMPS",
                          value: "IMPS",
                        },
                        {
                          label: "NEFT",
                          value: "NEFT",
                        },
                        {
                          label: "RTGS",
                          value: "RTGS",
                        },
                      ]}
                    // errorMessage={
                    //   errorMessages.error_type_message + "Delivery day"
                    // }
                    // r
                    />
                  </div>
                </div>
              </Grid> : null}
              <Grid item xs={12} sm={12} md={4}>
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
                        inputProps: {
                          maxLength: 14,
                          style: { textAlign: 'right' }
                        },
                        inputLabelProps: {
                          style: { textAlign: 'right' },
                        },
                      }}
                      // backgroundColor={true}
                      regExp={/^[0-9.]*$/}
                      // regExp={/^\d{1,11}(\.\d{1,2})?$/}
                      rules={{
                        required: "Amount is required",
                        validate: {
                          positiveAmount: value => parseFloat(value) > 0 || "Amount must be greater than zero",
                        },
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

              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Remarks
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
                          maxLength: 100
                        }
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

              <Grid item xs={12} sm={12} md={3} marginTop={3}>
                <ColorButton1 variant="contained" type="submit" >
                  SUBMIT
                </ColorButton1>

              </Grid>


              {/* <Grid item xs={12} sm={12} md={9}></Grid> */}
              <Grid item xs={12} sm={12} md={12} style={{ padding: "1vw" ,marginLeft:"30px",width:"100%"}}>
                {/* <div style={{ marginBottom: "20px" }}> */}
                  <MUIDataTable
                    title={"Approval Pending Transaction"}
                    // data={data ? data : []}
                    data={responseData?.translist ? responseData?.translist : []}
                    columns={columns}
                    options={options}
                  />
                {/* </div> */}
              </Grid>

            </Grid>
          </Box>
        </div>

      </div>

    </>
  );
};

export default TransferFunds;
