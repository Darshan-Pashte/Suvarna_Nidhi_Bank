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
import { Controller, useForm } from "react-hook-form";
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
import attach from '../../../../assets/attach.svg'
import VisibilityIcon from '@mui/icons-material/Visibility';

import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';



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

const BulkTransfer = ({ accList }) => {
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

  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,
  };

  const optionsPopup = ['Sample CSV', 'Sample TEXT'];


  const [bulkUploadList, setBulkUploadList] = useState([]);
  const [airtelFile, setAirtelFile] = useState(null);
  const [airtelFileUpload, setAirtelFileUpload] = useState([]);
  const [payloadData, setPayloadData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // Handle row click event
  const handleRowClick = (rowData) => {
    console.log("rowData", rowData)
    // Store the selected row data in the state
    setSelectedRow(rowData);
    // Navigate to the preview page
    rowData[6] != "Processing..." && navigate(`/payments/bulkFundTransferPreview`, { state: rowData });
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
    tranferMethod: "NEFT",
    remark: "",
    bulkpayment: "",
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

  const [openPopup, setOpenPopup] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [accountBalance, setAccountBalance] = useState({})
  const [isAccountBalance, setIsAccountBalance] = useState(false);



  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenPopup(false);
  };

  const handleToggle = () => {
    setOpenPopup((prevOpen) => !prevOpen);
  };

  const handleClosePopup = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenPopup(false);
  };

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
  //   if (watch("accountNumber")) {
  //     fetchBalance();
  //   }
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
console.log("dataList",responseData)
  const getFundTranferDetails = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        accountNo: watch("accountNumber")?.value,
        // accountNo: "",
        op: "bulk",
        fromDt: convertDate(new Date(), 1),
        toDt: convertDate(new Date(), 1),
        status: "M",
        transtype: "all",
      };
      const response = await postApiData(apiList.CORPORATE_FUND_TRANFER_DETAILS_COMMON + `?pageNo=${1}&pageSize=${10}`, payload);
      // console.log("responseBene", response);
      setIsAccountBalance(true)
      if (response?.status == true) {
        // setBeneficiaryList(response?.data.beneficiary);
        setBulkUploadList(response?.data?.bulkfilelst)
        setResponseData(response?.data)
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

  // useEffect(() => {
  //   getBulkUploadList()
  // }, []);

  const navigate = useNavigate()

  const resetData = () => {
    reset()
    setValue(
      "accountNumber",
      accountList
        ? compareTextAndReturnObject(accountList, accountList[0]?.value)
        : ""
    );
    setAirtelFile(null)
    setAirtelFileUpload([])
  }

  const onDownloadExcel = async (data) => {
    try {
      const response = await fetch(`${apiList.CORPORATE_BULKUPLOAD_SAMPLE}?fileType=csv`);
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

  const onDownloadText = async (data) => {
    try {
      const response = await fetch(`${apiList.CORPORATE_BULKUPLOAD_SAMPLE}?fileType=txt`);
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Sample File.txt`;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      // console.log(err);
    }
  };

  const getBulkUploadList = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        fromDt: convertDate(new Date(), 1),
        toDt: convertDate(new Date(), 1)
      };

      const response = await postApiData(
        `${apiList.CORPORATE_BULKUPLOAD_LIST}?pageNo=1&pageSize=10`,
        payload
      );

      if (response.status) {
        setBulkUploadList(response.data.bulkfilelst)
      } else {
        // SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const onSubmit = async (data) => {

    if (!airtelFile) {
      SweetAlertPopup('Please select a file before submitting.', "Error", "error");
      return;
    }
    setIsloading(true);

    // console.log("data", data)
    try {
      const payload = {
        // username: user?.userId,
        // sessionId: user?.sessionId,
        // smsType: data?.tranferType == "Internal" ? "COR_BULK_UPLOAD_WITHIN_TXN" : data?.tranferMethod == "NEFT" ? "COR_BULK_UPLOAD_NEFT_TXN" : data?.tranferMethod == "IMPS" ? "COR_BULK_UPLOAD_IMPS_TXN" : data?.tranferMethod == "RTGS" && "COR_BULK_UPLOAD_RTGS_TXN"


        username: user?.userId,
        sessionId: user?.sessionId,
        accountNo: data.accountNumber.value,
        uploadtype: data.tranferType,
        transferMethod:
          data.tranferType == "Other"
            ? data.tranferMethod
            : "INTERNAL",
        remark: data.remark,
        fileName: airtelFile.name,
        // otp: otp,
        // csvFile: "QmVuZWZpY2lhcnkgTmFtZXxBbW91bnR8TW9iaWxlIE51bWJlcnxFeHBpcnkgRGF0ZQpURVNUfDEyMHw3MDU3KioqKioyfDI4LzEwLzIwMjIKVEVTVDF8MTE0fDc4OTQqKioqKjB8MzAvMTAvMjAyMg=="
        csvFile: airtelFileUpload[1],
      };

      const response = await postApiData(
        apiList.CORPORATE_BULK_UPLOAD_AMT_OTP,
        payload
      );

      console.log("otpbulk", response)

      if (response.status) {
        handleOpen()
        setPayloadData(data)
        setResponseData(response)
        // setAirtelFile("bulkpayment","")
        resetField("remark")
        setIsloading(false);
        // SweetAlertPopup(response.message, "Success", "success");
      } else {
        resetField("remark")
        setIsloading(false);
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

  const ColorButton3 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "10px",
    paddingRight: "10px",
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
    // {
    //   name: "View",
    //   label: "Preview",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, { rowData }, tableMeta) => {
    //       const color = getComputedStyle(document.documentElement)
    //       .getPropertyValue("--primary-color")
    //       .trim();

    //     // Define the SVG with the dynamic stroke color
    //     const svgContent = `
    //       <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <g clip-path="url(#clip0_18_946)">
    //           <path d="M13 5.6875C4.875 5.6875 1.625 13 1.625 13C1.625 13 4.875 20.3125 13 20.3125C21.125 20.3125 24.375 13 24.375 13C24.375 13 21.125 5.6875 13 5.6875Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //           <path d="M13 17.0625C15.2437 17.0625 17.0625 15.2437 17.0625 13C17.0625 10.7563 15.2437 8.9375 13 8.9375C10.7563 8.9375 8.9375 10.7563 8.9375 13C8.9375 15.2437 10.7563 17.0625 13 17.0625Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //         </g>
    //         <defs>
    //           <clipPath id="clip0_18_946">
    //             <rect width="26" height="26" fill="white"/>
    //           </clipPath>
    //         </defs>
    //       </svg>
    //     `;
    //     const encodedSvg =
    //       "data:image/svg+xml," + encodeURIComponent(svgContent);
    //       return (
    //         <img
    //           src={encodedSvg}
    //           alt="Eye Icon"
    //           onClick={() => handleRowClick(rowData)}
    //           style={{ cursor: "pointer" }}
    //           title="View Loan Details"
    //         />
    //         // <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} onClick={() => handleRowClick(rowData)}> <VisibilityIcon /></Button>
    //       );
    //     },
    //   }
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
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
            Bulk Payment Upload
            </div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>
      {/* <div className={classes.gridtitle}>Bulk Payment Upload</div> */}
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
                        name: "tranferType",
                      }}
                      data={[
                        // {
                        //   label: "Own Account",
                        //   value: "Own Account",
                        // },
                        {
                          label: "Within Bank",
                          value: "Internal",
                        },
                        {
                          label: "Other Bank",
                          value: "Other",
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
                      // style: { width: "28vw" },

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

              {/* <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    Choose File<sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.uploadContainer}>
                    <div className={classes.chooseFile}>
                      <input type="file" name="bulkpayment" className={classes.inputfile} accept=".csv" onChange={handleFileChangeAirtelFile} />
                    </div>

                    <div className={classes.uploadFile}>
                      <img src={UploadIcon} alt="upload file" />
                    </div>
                  </div>
                </div>
              </Grid> */}
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
                        multiline: true,
                        rows: 2,
                        inputProps: {
                          maxLength: 100
                        }
                      }}
                      regExp={/^[a-zA-Z0-9., ]+$/}
                      rules={{
                        required:
                          "Remark" +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={5}>
                <div className={classes.boxes}>
                  <div className={classes.mainCard1}>
                    <div className={classes.cardimage}>
                      <img src={attach} alt='dv' />
                    </div>
                    <label htmlFor="file-input" className={classes.fileInputLabel}>
                      <div className={classes.card_UpperText}>
                        Attach/File Upload
                        <Controller
                          name="bulkpayment"
                          control={control}
                          render={({ field }) => (
                            <>
                              <input
                                name="bulkpayment"
                                type="file"
                                {...field}
                                id="file-input"
                                className={classes.inputfile}
                                accept=".csv, .txt, .text"
                                onChange={handleFileChangeAirtelFile}
                              />
                            </>
                          )}
                        />
                      </div>

                    </label>
                  </div>
                  {airtelFile?.name}
                </div>
              </Grid>

              {watch("tranferType") != "Other" ? <Grid item xs={12} sm={12} md={3}>
                
              </Grid> : null}
              {watch("tranferType") == "Other" ? <Grid item xs={12} sm={12} md={3}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Transfer Method
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <RadioGroupForm
                      controlerProps={{
                        control: control,
                        name: "tranferMethod",
                      }}
                      data={[
                        // {
                        //   label: "IMPS",
                        //   value: "IMPS",
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
                    // errorMessage={
                    //   errorMessages.error_type_message + "Delivery day"
                    // }
                    // required={true}
                    />
                  </div>
                </div>
              </Grid> : null}


              
              <Grid item xs={0} sm={0} md={2}></Grid>
              <Grid item xs={12} sm={12} md={8} >
                <div className={classes.buttonFile}>
                  <div>
                    <ColorButton3 variant="contained" onClick={onDownloadExcel}>
                      Sample File CSV
                    </ColorButton3>

                  </div>
                  <div>
                    <ColorButton3 variant="contained" onClick={onDownloadText}>
                      Sample File Text
                    </ColorButton3>

                  </div>
                 
                  <div>
                    {/* <ColorButton1 variant="contained" onClick={() => resetField("remark")}> */}
                    <ColorButton1 variant="contained" onClick={() => resetData()}>
                      Reset
                    </ColorButton1>
                  </div>
                  <div>
                    <ColorButton1 variant="contained" type="submit" >
                      Submit
                    </ColorButton1>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2}></Grid>
            </Grid>




            <Grid item xs={12} sm={12} md={9}></Grid>

            {/* <Grid item xs={12} sm={12} md={12}>
              <div className={classes.addNewSinglePaymentBG}>
                <div className={classes.addNewSinglePaymentButton}>
                  ⨁ Add Other Single Payment
                </div>

              </div>
            </Grid> */}


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
                  data={bulkUploadList ? bulkUploadList : []}
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
              responses={responseData}
            />
          ) : null}
        </div>
      </div >
      </div>
    </>
  );
};

export default BulkTransfer;
