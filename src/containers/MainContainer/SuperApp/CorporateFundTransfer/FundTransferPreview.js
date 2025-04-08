import classes from "../CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import {
  Box,
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
import GoBackButton from "../../../../components/common/GoBackButton";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const FundTransferPreview = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  // console.log(user, "user");
  // console.log("accList", accList);

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

  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Record Found</Box>
      </StyledGridOverlay>
    );
  }

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
        custNo: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        fromDate: convertDate(data.fromDate, 9),
        toDate: convertDate(data.toDate, 9),
        // fromDate: "20220101",
        // toDate: "20231122",
        brCode: data.accountNumber.code,
      };

      const response = await postApiData(
        apiList.ACCOUNT_STATEMENT_DOWNLOAD,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success");
        reset();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
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

  const columns = [
    { field: "id", headerName: "Sr. No.", width: 60 },
    {
      field: "databaseID",
      headerName: "ID",
      width: 50,
    },
    {
      field: "batchCode",
      headerName: "Batch Code",
      type: "number",
      width: 100,
    },
    {
      field: "from",
      headerName: "From",
      type: "number",
      width: 100,
    },
    {
      field: "to",
      headerName: "To",
      type: "number",
      width: 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 110,
    },
    {
      field: "scheduleTime",
      headerName: "Schedule Time",
      type: "number",
      width: 130,
    },
    {
      field: "beneficiaryName",
      headerName: "Beneficiary Name",
      type: "number",
      width: 150,
    },
    {
      field: "remark",
      headerName: "Remark",
      type: "number",
      width: 70,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 100,
    },
  ];

  const apiData = [
    {
      status: true,
      msg: "Success",
      transhistory: [
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },

        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
      ],
    },
  ];

  const apiRows =
    apiData[0]?.transhistory.map((row, index) => ({ ...row, id: index })) || [];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <Grid container>
        <Grid item xs={12} sm={12} md={2}>
          <GoBackButton></GoBackButton>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <div className={classes.paymentMainHeading}>Payments</div>
        </Grid>
        <Grid item xs={12} sm={12} md={5}></Grid>
      </Grid>
      <div className={classes.gridtitle}>Preview</div>
      <div className={classes.cardsBox}>
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
              style={{ padding: "3vw" }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    From Date
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={
                        {
                          //   fullWidth: true,
                        }
                      }
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                      }}
                      required={false}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    To Date
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={
                        {
                          //   fullWidth: true,
                        }
                      }
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                      }}
                      required={false}
                    />
                  </div>
                </div>
              </Grid>

              <Grid
                className={classes.fundPreviewApplyButton}
                item
                xs={12}
                sm={12}
                md={4}
              >
                <ColorButton1 variant="contained" type="submit">
                  Apply
                </ColorButton1>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className={classes.cardsBox}>
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
              style={{ padding: "3vw" }}
            >
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Transfer Type
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  Other Bank
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Total Amount
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  ₹ 20,00,000.00
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Total Record
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  10 Record
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Request By
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  Ramesh Chauhan
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "3vw" }}
            >
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Batch Code
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  2023202000792
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Transfer Method
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  IMPS
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Status
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {" "}
                  Awaiting Approval
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
            </Grid>
          </Box>
        </div>
      </div>

      <div className={classes.cardsBox}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={apiRows}
                    columns={columns}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default FundTransferPreview;
