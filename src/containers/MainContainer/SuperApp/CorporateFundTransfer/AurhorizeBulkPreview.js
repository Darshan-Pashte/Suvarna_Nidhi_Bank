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
  Tooltip,
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
import UploadContainer from "../../../../components/common/uploadContainer";
import FinancialOverview from "../../corporatePages/home/FinancialOverview/FinancialOverview";
import GoBackButton from "../../../../components/common/GoBackButton";
import UploadIcon from "../../../../assets/upload.svg";
import refresh from "../../../../assets/refresh.svg";
import { DataGrid } from "@mui/x-data-grid";
import MUIDataTable from "mui-datatables";
import OtpCorporateModal from "./otpModalBulkTranfer";
import { processBase64Format } from "../../../../components/common/fileUploadHelper";
import { processBase64FormatBase64 } from "../../../../components/common/fileUploadHelperBase64";
import GridTablePagination from "../../../../components/common/gridTablePagination";
import VisibilityIcon from '@mui/icons-material/Visibility';



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

const AuthorizeBulkPreview = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );


  // const options = {
  //   // filterType: "dropdown",
  //   filterType: "checkbox",
  //   responsive: "stacked",
  //   // responsive: 'standard',
  //   filter: false,
  //   download: false,
  //   print: false,
  //   checkbox: false,
  //   // selectableRows: 'single',
  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => {
  //   //   setSelectedRows(currentRowsSelected);
  //   // },


  // };



  const [bulkUploadList, setBulkUploadList] = useState([]);
  const [totalRecord, settotalRecord] = useState(0);
  const [airtelFile, setAirtelFile] = useState(null);
  const [airtelFileUpload, setAirtelFileUpload] = useState([]);
  const [payloadData, setPayloadData] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [goPageNumber, setGoPageNumber] = useState(10);
  const [responseData, setResponseData] = useState({});


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
    responsive: "standard",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,
    customFooter: () => {
      return (
        <GridTablePagination
          currentPage={currentPage}
          totalCount={totalRecord}
          pageSize={goPageNumber}
          control={control}
          bulkNumberList={responseData?.bulkfilelst}
          onPageChange={(page) => {
            getTransactionListView(page)
          }}
        />
      );
    },
  };


  const handleFileChangeAirtelFile = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setAirtelFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        dataURL: reader.result,
      });
      setAirtelFileUpload(["bulkpayment", processBase64FormatBase64(reader.result)])
    }
    // setAirtelFile(selectedFile);
  };

  const [selectedRow, setSelectedRow] = useState(null);

  console.log("user", user)
  // Handle row click event
  const handleRowClick = (rowData) => {
    // Store the selected row data in the state
    setSelectedRow(rowData);
    if (user?.userRole == "MAKER") {
      navigate(`/payments/bulkFundTransferPreview`, { state: rowData });
    } else if (user?.userRole == "CHECKER") {
      navigate(`/checkerbulkview/checkpreview`, { state: rowData });
    } else {
      navigate(`/authorizebulkview/authpreview`, { state: rowData });
    }
    // Navigate to the preview page
  };

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));
  // const accountList = accList && accList?.map(item => ({ "code": item.accNo, "value": item.accNo }));
  const defaultFormData = {
    tranferType: "Internal",
    accountNumber: "",
    tranferMethod: "IMPS",
    remark: "",
  };


  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    resetField,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  // console.log("accountNumber", watch("accountNumber")?.value);

  const [isLoading, setIsloading] = useState(false);
  // console.log("transferType", watch("tranferType"));
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

  // useEffect(() => {
  //   getBulkUploadList()
  // }, []);

  const navigate = useNavigate()

  const onDownloadExcel = async (data) => {
    try {
      const response = await fetch(apiList.CORPORATE_BULKUPLOAD_SAMPLE);
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Sample File.csv`;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      // console.log(err);
    }
  };

  // const getBulkUploadList = async (data) => {
  //   setIsloading(true);
  //   try {
  //     const payload = {
  //       username: user?.userId,
  //       sessionId: user?.sessionId,
  //     };

  //     const response = await postApiData(
  //       apiList.CORPORATE_TRANSACTION_VIEW + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
  //       payload
  //     );
  //     if (response.status) {
  //       setBulkUploadList(response.data.bulkfilelst)
  //     } else {
  //       // SweetAlertPopup(response.message, "Error", "error");
  //     }
  //     setIsloading(false);
  //   } catch (err) {
  //     // console.log(err);
  //     setIsloading(false);
  //   }
  // };

  const onSubmit = (data) => {
    let payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      // fromDt: convertDate(data.fromDate, 1),
      // toDt: convertDate(data.toDate, 1),
      fromDt: data.fromDate,
      toDt: data.toDate,
      // status: data.status,
      // transtype: data.transtype ? data.transtype : "all",
      // transtype: data.transtype ? data.transtype.code :"all",
    };
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }

  useEffect(() => {
    if (goPageNumber) {
      getTransactionListView(1, payloadData);
    }
  }, [goPageNumber]);

  // useEffect(() => {
  //   getTransactionListView(1, payloadData);
  // }, []);

  const getTransactionListView = async (currentPage, payData = payloadData) => {

    var { fromDt = "", toDt = "", transtype = "", status = "" } = payData
    setCurrentPage(currentPage)
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        fromDt: fromDt ? convertDate(fromDt, 1) : convertDate(new Date(), 1),
        toDt: toDt ? convertDate(toDt, 1) : convertDate(new Date(), 1)
      };

      const response = await postApiData(
        `${apiList.CORPORATE_BULKUPLOAD_LIST}?pageNo=1&pageSize=10`,
        payload
      );

      if (response.status == true) {
        setResponseData(response.data)
        settotalRecord(response.data.totalRecords)
      } else {
        setResponseData("")
        settotalRecord("")
        // SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const getTransactionList = (currentpages, payloadDatachild) => {
    // console.log("payloadDatachild", payloadDatachild)
    getTransactionListView(currentpages, payloadDatachild)
    setPayloadData(payloadDatachild);
  }

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "150px",
    height: "40px",
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
    width: "150px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));


  const columns = [
    // {
    //   name: 'Sr. No.',
    //   label: 'Sr. No.',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "View",
      label: "Preview",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }) => {
          const color = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();
  
          const svgContent = `
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_18_946)">
                <path d="M13 5.6875C4.875 5.6875 1.625 13 1.625 13C1.625 13 4.875 20.3125 13 20.3125C21.125 20.3125 24.375 13 24.375 13C24.375 13 21.125 5.6875 13 5.6875Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 17.0625C15.2437 17.0625 17.0625 15.2437 17.0625 13C17.0625 10.7563 15.2437 8.9375 13 8.9375C10.7563 8.9375 8.9375 10.7563 8.9375 13C8.9375 15.2437 10.7563 17.0625 13 17.0625Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_18_946">
                  <rect width="26" height="26" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          `;
          const encodedSvg = "data:image/svg+xml," + encodeURIComponent(svgContent);
  
          // Assuming 'status' is the last column, we get it directly from rowData
          const status = rowData[rowData.length - 1];
          const isDisabled = status === 'Processing...';
  
          return (
            <img
              src={encodedSvg}
              alt="Eye Icon"
              onClick={() => !isDisabled && handleRowClick(rowData)}
              style={{ cursor: isDisabled ? "" : "pointer", opacity: isDisabled ? 0.5 : 1 }}
              title={isDisabled ? "" : "View Details"}
            />
          );
        },
      },
    },
    {
      name: 'fileName',
      label: 'File Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'totalamount',
      label: 'Total Amount',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const style = {
            display: "flex",
            justifyContent: "flex-end"
          };

          return (
            <div style={style}>
              ₹ {value}
            </div>
          );
        },
      },
    },
    {
      name: 'transferMehtod',
      label: 'Transfer Method',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'fromAccount',
      label: 'From Account',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdBy',
      label: 'Created By',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdDate',
      label: 'Created Date',
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
  ]

  const apiData = [
    {
      status: true,
      msg: "Success",
      transhistory: [
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },

        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "NEFT",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "NEFT",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },
      ],
    },
  ];



  const apiRows =
    apiData[0]?.transhistory.map((row, index) => ({ ...row, id: index })) || [];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      {/* <div className={classes.gridtitle}>Bulk Payment Preview</div> */}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
            Bulk Payment Preview
            </div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>
        <div className={classes.cardsBox}>
          <div className={classes.accountstatement}>
            <Box
              className={classes.mainContainer}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
                style={{ padding: "1vw" }}
              >
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>
                      From Date<sup className={classes.required}>*</sup>
                    </div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "fromDate",
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
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>
                      To Date<sup className={classes.required}>*</sup>
                    </div>
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
                        minDate: watch("fromDate"),
                      }}
                      required={false}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <div
                    className={classes.frowtext}
                    style={{ visibility: "hidden" }}
                  >
                    button
                  </div>

                  <ColorButton1 variant="contained" type="submit">
                    Apply
                  </ColorButton1>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={9}></Grid>
              <Grid container>
                <Grid
                  sx={{
                    paddingTop: "1rem",
                    // margin: "2rem",
                    // paddingLeft: "1rem",
                 
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  {/* <div className={classes.gridimage}>
                  <Tooltip title="Refresh">
                    <img src={refresh} alt="headerLogo" className={classes.imgRecent} onClick={()=>getBulkUploadList()} />
                  </Tooltip>
                </div> */}
                  {/* <Box sx={{ height: 400, width: "100%" }}> */}
                  {/* <DataGrid
                      rows={apiRows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    /> */}
                  <MUIDataTable
                    title={"Recent Bulk Upload Transaction"}
                    // data={data ? data : []}
                    data={responseData?.bulkfilelst}
                    columns={columns}
                    options={{
                      ...options,
                      // onRowClick: (rowData) => {
                      //   // console.log("rowData", rowData)
                      //   handleRowClick(rowData)
                      // },
                    }}

                  />
                  {/* </Box> */}
                </Grid>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={3}></Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
              <Grid item xs={12} sm={12} md={3}>
                <ColorButton2 variant="contained" type="button">
                  Remove
                </ColorButton2>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <ColorButton1 variant="contained" type="button" onClick={()=>navigate("/payments/bulkFundTransferPreview")}>
                  Preview
                </ColorButton1>
              </Grid> */}

            </Box>
            {open ? (
              <OtpCorporateModal
                open={open}
                handleClose={handleClose}
                payloadData={payloadData}
                fileData={airtelFile}
                airtelFileUpload={airtelFileUpload}
                setAirtelFile={setAirtelFile}
                Transfertype={watch("tranferType")}
              />
            ) : null}
          </div>
        </div >
      </div>
    </>
  );
};

export default AuthorizeBulkPreview;
