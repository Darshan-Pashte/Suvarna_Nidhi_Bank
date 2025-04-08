import classes from '../../MainContainer/corporatePages/home/CorporateHome.module.css'

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import TextFieldForm from "../../../../components/common/textFieldForm";
import TextFieldForm from "../../../components/common/textFieldForm";

import { Box, Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../components/common/datePickerForm";
import { postApiData } from "../../../components/utilities/nodeApiServices";
import ServerInstance, { apiList } from "../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../components/utilities/formValidation";
import { convertDate } from "../../../components/utilities/convertDate";
import AutocompleteForm from '../../../components/common/autuCompleteForm';
import SweetAlertPopup from '../../../components/common/sweetAlertPopup';
import Loader from '../../../components/common/loader';
import { compareTextAndReturnObject } from '../../../components/common/commonArray';
import payments from "../../../assets/TransferFunds/payments.svg"
import drive_folder_upload from "../../../assets/TransferFunds/drive_folder_upload.svg"
import file_copy from "../../../assets/TransferFunds/file_copy.svg"
import cloud_upload from "../../../assets/TransferFunds/cloud_upload.svg"

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const ApprovalNotification = ({ accList }) => {
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

      const response = await postApiData(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success")
        reset()
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
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className={classes.Sbox}>
          <div>
            <div className={classes.formbox}>
              <div className={classes.textApproval}>
                <div className={classes.fundsText}>
                  <div>
                    <img src={payments} alt="payments" />
                  </div>
                  <div>
                    Fund Transfer Requests
                  </div>
                </div>
                {/* <div className={classes.fundsNumber}>
                  5
                </div> */}
              </div>
              <Divider />
              <div className={classes.textApproval}>

                <div className={classes.fundsText}>
                  <div>
                    <img src={cloud_upload} alt="cloudUpload" />
                  </div>
                  Bulk Upload Requests
                </div>
                {/* <div className={classes.fundsNumber}>
                  10
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  )
}

export default ApprovalNotification
