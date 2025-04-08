import classes from "../SuperApp/CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';


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

import SweetAlertPopup from "../../../components/common/sweetAlertPopup";
import Loader from "../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../components/common/commonArray";


import MUIDataTable from "mui-datatables";
// import OtpCorporateModal from "./otpModalBulkTranfer";

import { processBase64FormatBase64 } from "../../../components/common/fileUploadHelperBase64";

const defaultFormData = {
    tranferType: "Internal",
    accountNumber: "",
    tranferMethod: "IMPS",
    remark: "",
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

const CheckerPreview = ({ accList }) => {
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
        selectableRows: false
    };

    const [bulkUploadList, setBulkUploadList] = useState([]);
    const [airtelFile, setAirtelFile] = useState(null);
    const [airtelFileUpload, setAirtelFileUpload] = useState([]);
    const [payloadData, setPayloadData] = useState("");
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
        // Store the selected row data in the state
        setSelectedRow(rowData);

        // Navigate to the preview page
        navigate(`/checkerview/checkerpreviewdetails`, { state: rowData });
    };

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

    useEffect(() => {
        getBulkUploadList()
    }, []);

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

    const getBulkUploadList = async (data) => {
        setIsloading(true);
        try {
            const payload = {
                username: user?.userId,
                sessionId: user?.sessionId,
            };

            const response = await postApiData(
                apiList.CORPORATE_BULKUPLOAD_LIST,
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
                username: user?.userId,
                sessionId: user?.sessionId,
                smsType: "COR_TXN_PREVIEW"
            };

            const response = await postApiData(
                apiList.CORPORATE_BULKUPLOAD_OTP,
                payload
            );

            if (response.status) {
                handleOpen()
                setPayloadData(data)
                // setAirtelFile("bulkpayment","")
                reset()
                // SweetAlertPopup(response.message, "Success", "success");
            } else {
                // SweetAlertPopup(response.message, "Error", "error");
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
                customBodyRender: (value, { rowData }, tableMeta) => {
                    return (
                        <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} onClick={() => handleRowClick(rowData)}> <VisibilityIcon /></Button>
                    );
                },
            }
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
            <Grid container>
                {/* <Grid item xs={12} sm={12} md={2}> */}
                {/* <GoBackButton></GoBackButton> */}
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={12} md={2}> */}
                <div className={classes.paymentMainHeading}>Payments</div>
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={12} md={5}></Grid>
        <Grid item xs={12} sm={12} md={3}></Grid> */}
            </Grid>
            <div className={classes.gridtitle}>Bulk Payment Preview</div>
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
                            rowSpacing={4}
                            style={{ padding: "1vw" }}
                        >
                        </Grid>
                        <Grid container>
                            <Grid
                                sx={{
                                    paddingTop: "1rem",
                                    // margin: "2rem",
                                    // paddingLeft: "1rem",
                                    marginLeft: '1rem'
                                }}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                            >
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
                                    // title={"Announcement List"}
                                    // data={data ? data : []}
                                    data={bulkUploadList}
                                    columns={columns}
                                    options={{
                                        ...options,
                                        // onRowClick: (rowData) => {
                                        //     // console.log("rowData", rowData)
                                        //     handleRowClick(rowData)
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
                    {/* {open ? (
                        <OtpCorporateModal
                            open={open}
                            handleClose={handleClose}
                            payloadData={payloadData}
                            fileData={airtelFile}
                            airtelFileUpload={airtelFileUpload}
                            setAirtelFile={setAirtelFile}
                            Transfertype={watch("tranferType")}
                        />
                    ) : null} */}
                </div>
            </div >
        </>
    );
};

export default CheckerPreview;
