import classes from "../SuperApp/CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { postApiData } from "../../../components/utilities/nodeApiServices";
import ServerInstance, {
  apiList,
} from "../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";

import Loader from "../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../components/common/commonArray";
import GoBackButton from "../../../components/common/GoBackButton";

import MUIDataTable from "mui-datatables";

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const AuthorizePreviewDetails = ({ accList }) => {
  const { state } = useLocation()
  const [responseData, setResponseData] = useState({})
  // console.log("state", state)
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

  // const options = {
  //   filterType: "dropdown",
  //   // filterType: "checkbox",
  //   responsive: "stacked",
  //   // responsive: 'standard',
  //   filter: false,
  //   download: false,
  //   print: false,
  //   checkbox: false,
  //   // selectableRows: 'multiple',
  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => {
  //   //   setSelectedRows(currentRowsSelected);
  //   // },


  // };

  const options = {
    textLabels: {
      body: {
        noMatch: (
          <div
            style={{
              display: "flex",
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "larger"
            }}
          >
            Sorry, no matching records found
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "stacked",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,

  };
  const rows = [
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],

    // Add more rows as needed
  ];

  const columns = [

    // {
    //   name: '',
    //   label: '',
    //   options: {
    //     filter: true,
    //     sort: true,
    //     checkbox:true,
    //     customBodyRenderLite: (dataIndex) => {
    //       return (
    //         <input
    //           type="checkbox"
    //           checked={false} // You can set the checked state here based on your logic
    //         />
    //       );
    //     },

    //   },
    // },
    // {
    //   name: 'srNo',
    //   label: 'Sr. No.',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'batchCode',
      label: 'Batch Code',
      options: {
        filter: true,
        sort:false,
      },
    },
    // {
    //   name: 'Total Records',
    //   label: 'Total Records',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },

    {
      name: 'fromAccount',
      label: 'From Account',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'ToAccount',
      label: 'To Account',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Amount',
      label: 'Total Amount',
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
    // {
    //   name: 'Transfer Method',
    //   label: 'Transfer Method',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Request By',
    //   label: 'Request By',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: 'transactionDate',
      label: 'Date & Time',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'remark',
      label: 'Remark',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
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


  useEffect(() => {
    onSubmit()
  }, [])
  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        fileName: state[1],
        status: "all",
      };

      const response = await postApiData(
        apiList.CORPORATE_BULKUPLOAD_PREVIEW,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
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
        <Grid item xs={12} sm={12} md={1}>
          <GoBackButton></GoBackButton>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={2}> */}
        <div className={classes.paymentMainHeading}>Payments</div>
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={12} md={5}></Grid> */}
      </Grid>
      <div className={classes.gridtitle}>Preview</div>

      <div className={classes.cardsBox}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
          // component="form"
          // onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "1vw" }}
            >
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Transfer Type
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {responseData?.filesummary?.transfertype}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Total Amount
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  ₹  {responseData?.filesummary?.totalAmount}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Total Record
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {responseData?.filesummary?.totalrecord}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Request By
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {responseData?.filesummary?.requestBy}
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "1vw" }}
            >
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Batch Code
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {responseData?.filesummary?.batchCode}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Transfer Method
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {responseData?.filesummary?.transferMethod}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
            </Grid>
          </Box>
        </div>
      </div>

      <div className={classes.cardsBox}>
        <div className={classes.accountstatement}>
          {/* <Box
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
          </Box> */}
          <div className={classes.mainupper}>
            {/* <div className={classes.bluerow}>Announcement Browse List</div> */}
            <div style={{ width: '100%', marginBottom: '2vh' }}>
              <MUIDataTable
                // title={"Announcement List"}
                // data={data ? data : []}
                data={responseData?.fileList}
                columns={columns}
                options={options}
              />
              <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: "0.1vw" }}
              >
                <Grid item xs={12} sm={4} md={9}></Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <div
                    className={classes.frowtext}
                    style={{ visibility: "hidden" }}
                  >
                    button
                  </div>

                  {/* <ColorButton2 variant="contained" type="submit">
                    View Batch Status
                  </ColorButton2> */}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorizePreviewDetails;
