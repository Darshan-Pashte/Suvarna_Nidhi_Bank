import classes from "./Transactionbrowse.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import MUIDataTable from "mui-datatables";
import DatePickerForm from "../../../../../components/common/datePickerForm";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import {
    ShankarSirUrl,
    ShankarSirUrlServer,
    apiList,
} from "../../../../../components/utilities/nodeApiList";
import { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import Loader from "../../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";

import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../../../store/authSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { convertDate } from "../../../../../components/utilities/convertDate";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import GridTablePagination from "../../../../../components/common/gridTablePagination";
// import TransactionView from "./TransactionView";
import { jsPDF } from "jspdf";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import maheshbanklogo from "../../../../../assets/Banks/Mahesh/images/Logo.svg";

const defaultFormData = {
    rrnno: "",
    remAccno: "",
    beneAccno: "",
    activityStatus: "",
    responseCode: "",
    transType: "",
    companyId: "",
    activityStatus: "",
    fromDate: "",
    toDate: "",
    custNo: "",
    rrn: "",
    amount: "",
    transstatus: ""

};



const TransactionBrowse = () => {
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

    const navigate = useNavigate();
    //   const { state: user } = useContext(AuthContext);
    const [username, setUserName] = useState("");
    const [token, setToken] = useState("");
    const { loading, error, isAuthenticated, menu, userRole, sessionId, user } = useSelector((state) => state.auth);
    const [isLoading, setIsloading] = useState(false)
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);
    const [payloadData, setPayloadData] = useState({});
    const [responseData, setResponseData] = useState({});
    const [totalRecord, settotalRecord] = useState(0);
    const [goPageNumber, setGoPageNumber] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowDataToDisplay, setRowDataToDisplay] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [bankNamee, setbankNamee] = useState("");
    const [message, setMessage] = useState("");
    const [atmMasterList, setAtmMasterList] = useState([]);
const [receiptData, setReceiptData] = useState([]);
    const [logoBase64, setLogoBase64] = useState(null);
     const [selectedAccountName, setSelectedAccountName] = useState("");
    useEffect(() => {
        // Convert logo SVG to base64 using a simple method
        const logo = new Image();
        logo.src = maheshbanklogo;
        logo.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = logo.width;
            canvas.height = logo.height;
            ctx.drawImage(logo, 0, 0);
            setLogoBase64(canvas.toDataURL("image/png")); // Store base64 data
        };
    }, []);
    //   useEffect(() => {
    //         // Convert logo SVG to base64 using a simple method
    //         const logo = new Image();
    //         logo.src = maheshbanklogo;
    //         logo.onload = () => {
    //             const canvas = document.createElement("canvas");
    //             const ctx = canvas.getContext("2d");
    //             canvas.width = logo.width;
    //             canvas.height = logo.height;
    //             ctx.drawImage(logo, 0, 0);
    //             setLogoBase64(canvas.toDataURL("image/png")); // Store base64 data
    //         };
    //     }, []);

    const allOption = {
        code: "",
        value: "All"
    };

    const banksCode = [{
        code: "",
        value: "All"
    }]

    const TransactionType = [
        {
            code: "",
            value: "All"
        },
        // {
        //   code: "IMPS",
        //   value: "IMPS"
        // },
        {
            code: "RTGS",
            value: "RTGS"
        },
        {
            code: "NEFT",
            value: "NEFT"
        },
        {
            code: "INTERNAL",
            value: "WITHIN BANK",
        },
    ]

    const ResponseCode = [
        {
            code: "",
            value: "All"
        },
        {
            code: "S",
            value: "Success"
        },
        {
            code: "F",
            value: "Failed"
        },
    ]

    const Status = [
        {
            code: "",
            value: "All"
        },
        {
            code: "SUCCESS",
            value: "Success"
        },
        {
            code: "FAILURE",
            value: "Fail"
        },
    ]
    useEffect(() => {
        if ((initialLoad && Status.length > 0)) {
            setValue(
                "transstatus",
                Status
                    ? compareTextAndReturnObject(Status, Status[0]?.value)
                    : ""
            );
            setInitialLoad(false);
        }
    }, [initialLoad, Status]);

    const openModal = (rowData) => {

        console.log("rowData", rowData)

        var modifiedRowData = [...rowData];
        modifiedRowData[2] = rowData[2] == "INTERNAL" ? "WITHIN BANK" : rowData[2];
        const headers = columns && columns
            ?.filter(
                (column) => column?.label !== "View"
            )
            .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
            headers: headers,
            rowData: modifiedRowData,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    console.log("atmMasterList", atmMasterList)
    const handleNavigate = (route, rowData ,selectedAccountName) => {
        navigate(route, { state: { rowData: rowData , selectedAccountName : selectedAccountName } });
      };


      console.log("selectedAccountName",selectedAccountName)
    const columns = [
        // {
        //     name: "View",
        //     label: "Receipt",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRender: (value, { rowData }, tableMeta) => {
        //             return (
        //                 <Button sx={{ color: "black" }} onClick={() => openModal(rowData)}> <VisibilityIcon /></Button>
        //             );
        //         },
        //     }
        // },

        {
            name: "Download",
            label: "View Receipt",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, { rowIndex }, tableMeta) => {

                    return (
                        <Button type="button" sx={{ color: "black" }}
                        onClick={() => handleNavigate("/fundtransfer/transactionreceipt", atmMasterList[rowIndex] ,selectedAccountName)
                        }>
                        <ReceiptLongIcon/>
                      </Button>
                    
                    );
                },
            }
        },

        {
            name: "transactiondate",
            label: "Transaction Date",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    if (!value) return ''; // If no value, return empty string

                    // Format the date with toLocaleString in 'en-GB' format
                    const formattedDate = new Date(value).toLocaleString('en-GB', {
                        day: '2-digit',          // Day in two-digit format
                        month: 'short',          // Month as a 3-letter abbreviation (e.g., "Mar")
                        year: 'numeric',         // Full year (e.g., "2025")
                        hour: '2-digit',         // Hour in two-digit format (24-hour)
                        minute: '2-digit',       // Minute in two-digit format
                        second: '2-digit',       // Second in two-digit format
                        hour12: false            // Ensure 24-hour format (no AM/PM)
                    });

                    return formattedDate;  // Return the formatted date
                }
            }
        },

        {
            name: "transType",
            label: "Transaction Type",
            options: {
                filter: true,
                sort: false,
                // customBodyRender: (value, { rowData }, tableMeta) => {
                //     return value == "INTERNAL" ? "WITHIN BANK" : value
                // },
            }
        },
        {
            name: "remAccno",
            label: "Remitter A/C No",
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            name: "benAccno",
            label: "Beneficiary A/C No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "benIfsccd",
            label: "Beneficiary IFSC",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "benName",
            label: "Beneficiary Name",
            options: {
                filter: true,
                sort: false,
                // display: false
            }
        },
        {
            name: "amount",
            label: "Transaction Amount",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <div style={{ textAlign: "right" }}>{value}</div>;
                },
            }
        },

        {
            name: "cbsrrn",
            label: "RRN",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "responseCode",
            label: "Response Code",
            options: {
                filter: true,
                sort: false,
                // display: false
            }
        },
        // {
        //     name: "responseDesc",
        //     label: "Message",
        //     options: {
        //         filter: true,
        //         sort: false,
        //     }
        // },

    ];


    const ResponseResult = [
        {
            code: "ALL",
            value: "ALL",
        },
        {
            code: "IMPS",
            value: "IMPS",
        },
        {
            code: "INTERNAL",
            value: "WITHIN BANK",
        },
        {
            code: "NEFT",
            value: "NEFT",
        },
        {
            code: "RTGS",
            value: "RTGS",
        },

    ];
    const handleLogout = () => {
        dispatch(logout());
        sessionStorage.clear()
        localStorage.clear()
        navigate("/auth/login")
    };

    const create = () => {
        navigate("/accounts/accountadd")
    };

    const updatedUserList = [allOption, ...banksCode];
    useEffect(() => {
        setUserName(sessionStorage.getItem("username"));
        setToken(sessionStorage.getItem("TOKEN"));
    }, []);

    useEffect(() => {
        if ((initialLoad && ResponseResult.length > 0)) {
            setValue(
                "transtype",
                ResponseResult
                    ? compareTextAndReturnObject(ResponseResult, ResponseResult[0]?.value)
                    : ""
            );
            setInitialLoad(false);
        }
    }, [initialLoad, ResponseResult]);





    console.log(message);


    // useEffect(() => {
    //   getTransactionListView(1, payloadData);
    // }, []);
console.log("User = ",user)

    const accNo = watch("accNo");
    console.log("user", user);
    const accountList =
        user?.accountDetails &&
        user?.accountDetails?.map((item) => ({
            code: item.brCode,
            // value: item.accNo,
            value: item.virtualAccNo,
            name: item.name,
            acctype: item.acctype,
        }));

    useEffect(() => {
        if (accNo) {
            const account = accountList.find(
                (acc) => acc.value === watch("accNo").value
            );
            if (account) {
                setSelectedAccountName(account.name);
                setValue("acctype", account.acctype);
                setValue("accName", account.name); // Optional: keep form state in sync
            }
        }
    }, [watch("accNo"), accountList]);

    const closeSignModal = () => {
        setIsModalOpen(false);
    };

    const filteredData = bankNamee && bankNamee
        ?.filter(item => item.hasOwnProperty('companyName'))
        ?.map(item => ({ "code": item.companyId, "value": item.companyName }))

    const result = [allOption, ...filteredData];

    useEffect(() => {
        if (accountList) {
            setValue("accNo", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
        }
    }, []);


    const onSubmit = (data) => {

        let payload = {

            custNo: user?.userId,
            sessionId: user?.sessionId,
            accNo: data?.accNo,
            fromDt: convertDate(data.fromDt, 1)
                ? convertDate(data.fromDt, 1)
                : convertDate(new Date(), 1),
            toDt: convertDate(data.toDt, 1)
                ? convertDate(data.toDt, 1)
                : convertDate(new Date(), 1),

        };
        // console.log("payload", payload);
        getTransactionList(1, payload);

    };


    const getTransactionListView = async (currentPage, data = payloadData) => {
        // console.log("currentPage", currentPage);
        setCurrentPage(currentPage);
        // console.log("data", data);
        setIsloading(true);
        try {

            const payload = {
                custNo: user?.userId,
                sessionId: user?.sessionId,
                accNo: data?.accNo?.value,
                fromDt: data?.fromDt,
                toDt: data?.toDt,
            };

            const response = await postApiData(
                apiList.TRANSACTIONBROWSE +
                `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
                payload,
            );

            if (response?.status == true) {
                setAtmMasterList(response?.data?.translist);
                setReceiptData(response?.data);
                settotalRecord(response?.data?.totalRecords);
            } else {
                setAtmMasterList([]);
                // SweetAlertPopup(response.message, "Error", "error");
                SweetAlertPopup(response?.message, "Error", "error");
            }
            setIsloading(false);
        } catch (err) {
            console.log(err);
            setIsloading(false);
        }
    };


    const getTransactionList = (currentpages, payloadDatachild) => {
        getTransactionListView(currentpages, payloadDatachild);
        setPayloadData(payloadDatachild);
    };

    const ColorButton = styled(Button)(({ theme }) => ({
        // color: "#FFFFFF",
        color: "#000000",
        // backgroundColor: "#F84B67",
        // backgroundColor: "#323232",
        backgroundColor: "#fff",
        border: "1px solid #000",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "183px",
        height: "38px",
        "&:hover": {
            background: "#808080",
            color: "white",
        },
    }));



    const ColorButton1 = styled(Button)(({ theme }) => ({
        color: "#fff",
        // backgroundColor: "#F84B67",
        backgroundColor: "var(--button-color)",
        border: "1px solid #CCC",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "183px",
        height: "38px",
        "&:hover": {
            background: "var(--button-hover-color)",
            color: "white",
        },
    }));

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
                        {message ? message : "Sorry, no matching records found"}
                    </div>
                ),
            },
        },
        filterType: "dropdown",
        responsive: "standard",
        filter: true,
        download: false,
        print: false,
        // checkbox:false,
        selectableRows: false,
        customFooter: () => {
            return (
                <GridTablePagination
                    currentPage={currentPage}
                    totalCount={totalRecord}
                    pageSize={goPageNumber}
                    onPageChange={(page) => {
                        console.log("page", page)
                        getTransactionListView(page)
                    }} />
            );
        },
    };

    return (
        <>
            {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
            <Box
                className={classes.mainContainer}
                component="form"

                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={classes.Sbox}>
                    <div className={classes.bluerow}>
                        <div className={classes.bluerowtext}>Transfer History</div>
                        <div style={{ display: "flex", gap: "10px" }}></div>
                    </div>
                    <div>
                        <div className={classes.formbox}>
                            <Grid container columnSpacing={1} rowSpacing={1}>

                                <Grid item xs={12} sm={12} md={3}>
                                    <div className={classes.frowdataaff}>
                                        <div className={classes.frowtextaff}>
                                            Account Number<sup className={classes.required}>*</sup>
                                        </div>
                                        <AutocompleteForm
                                            controlerProps={{
                                                control: control,
                                                name: "accNo",
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

                                                // maxLength: {
                                                //   value: 32, // Set your max length here
                                                //   message:
                                                //     "Account Number must be no more than 10 digits long",
                                                // },
                                            }}
                                            data={accountList}
                                            required={true}
                                        />
                                        {/* <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div> */}
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2.5}>
                                    <div className={classes.frowdata1aff}>
                                        <div className={classes.frowtextaff}>
                                            From Date<sup className={classes.required}>*</sup>
                                        </div>

                                        <DatePickerForm
                                            controlerProps={{
                                                control: control,
                                                name: "fromDt",
                                            }}
                                            TextFieldProps={{
                                                fullWidth: true,
                                            }}
                                            DatePickerProps={{
                                                // label: "From Date",
                                                fullWidth: true,
                                                maxDate: new Date(),
                                            }}
                                            // rules={{
                                            //     required:
                                            //       "From Date " + errorMessages.error_autocomplete_message,
                                            //   }}
                                            required={false}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2.5}>
                                    <div className={classes.frowdata1aff}>
                                        <div className={classes.frowtextaff}>
                                            To Date<sup className={classes.required}>*</sup>
                                        </div>
                                        <DatePickerForm
                                            controlerProps={{
                                                control: control,
                                                name: "toDt",
                                            }}
                                            TextFieldProps={{
                                                fullWidth: true,
                                            }}
                                            DatePickerProps={{
                                                // label: "To Date",
                                                fullWidth: true,
                                                minDate: watch("fromDate"),
                                                maxDate: new Date(),
                                            }}
                                            // rules={{
                                            //     required:
                                            //       "To Date " + errorMessages.error_autocomplete_message,
                                            //   }}
                                            required={false}
                                        />
                                    </div>
                                </Grid>




                                <Grid item xs={12} sm={6} md={3} style={{ paddingTop: "28px", display: "flex", gap: "10px" }}>
                                    <ColorButton1 variant="contained" type="submit">
                                        Submit
                                    </ColorButton1>

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.parentcomp}>
                        <div className={classes.Sbox2}>
                            {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
                            <div style={{ width: "100%", marginBottom: "10px" }}>
                                <MUIDataTable
                                    title={" Transaction Report"}
                                    data={atmMasterList}
                                    columns={columns}
                                    options={options}
                                />
                            </div>
                        </div>
                        {/* 
            {isModalOpen ? (
              <TransactionView
                open={isModalOpen}
                handleClose={closeModal}
                closeSignModal={closeSignModal}
                rowDataToDisplay={rowDataToDisplay}
                show={"2"}
                title={"Transaction Report"}
              />
            ) : null} */}

                    </div>
                </div>

            </Box>

        </>
    );
};

export default TransactionBrowse;
