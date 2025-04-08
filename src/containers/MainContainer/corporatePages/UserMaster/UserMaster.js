import React, { useCallback } from "react";
import classes from "./AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Switch from '@mui/material/Switch';

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import Loader from "../../../../components/common/loader";
import MUIDataTable from "mui-datatables";
import BulkUploadViewModal from "../../SuperApp/CorporateFundTransfer/BulkUploadViewModal";

// import TextFieldForm from "../../../../../components/common/textFieldForm";
// import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
// import { postApiData } from "../../../../../components/utilities/nodeApiServices";
// import { apiList } from "../../../../../components/utilities/nodeApiList";
// import { errorMessages } from "../../../../../components/utilities/formValidation";
// import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
// import RadioGroupForm from "../../../../../components/common/RedioButtonForm";
// import Loader from "../../../../../components/common/loader";
// import MUIDataTable from "mui-datatables";
// import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";

const defaultFormData = {
    accno1: "",
    noofcheckbook: "",
    tpin: "",
    chequeNo: ""
};

const UserMaster = () => {

    const [isLoading, setIsloading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [rowDataToDisplay, setRowDataToDisplay] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);

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

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const [checkedRows, setCheckedRows] = useState({});

    const handleSwitchChange = useCallback((rowIndex, checked,rowData) => {
        setCheckedRows((prevCheckedRows) => ({ ...prevCheckedRows, [rowIndex]: checked }));
        SwalCall(rowData,rowIndex)
    }, []);


    useEffect(() => {
        if (accountList) {
            // setValue("accName", accName)
            setValue("accno1", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
        }
    }, []);

    useEffect(() => {
        onSubmit()
    }, [])



    const onSubmit = async (data) => {
        const payload = {
            username: user?.userId,
            sessionId: user?.sessionId,
        };
        setIsloading(true)
        const response = await postApiData(apiList.BROWSE_CORPORATE_USER, payload);
        // console.log("response", response);
        if (response?.status == true) {
            setUserList(response.data.lstUsers)
            reset();
            setIsloading(false)
        } else {
            SweetAlertPopup(response?.message, "Error", "error");
            setIsloading(false)
        }
    };

    const ColorButton1 = styled(Button)(({ theme }) => ({
        color: "#FFFFFF",
        // backgroundColor: "#F84B67",
        // backgroundColor: "#323232",
        background: "var(--button-color)",
        border: "1px solid #CCC",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "133px",
        height: "31px",
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
        width: "133px",
        height: "31px",
        "&:hover": {
            background: "var(--button-hover-color)",
            color: "white",
        },
    }));

    const openModal = (rowData) => {
        // console.log("rowDta", rowData)
        const modifiedRowData = [...rowData];
        const headers = columns
            ?.filter((column) => column?.label !== "View" && column?.label !== "Active/Inactive")
            .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
            headers: headers,
            rowData: modifiedRowData,
        });
        setOpen(true);
    };


    const SwalCall = (rowData,rowIndex) => {
        console.log("rowData from popou",rowData);
        Swal.fire({
            title: `Do You want to ${rowData[10]==="Active" ?  "Suspend" :"Activate"}` + " " + rowData[3],
            icon: "question",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Accept",
            denyButtonText: `Cancel`,
            cancelButtonText: "Cancel",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleCreateAccount(rowData, rowData[10]==="Active" ?  "D" : "A");
            } else if (result.isDenied) {
                handleCancelAction(rowData,rowIndex);
            }
        });
    };

    const handleCancelAction = (rowData, rowIndex) => {
        setCheckedRows((prevCheckedRows) => ({ ...prevCheckedRows, [rowIndex]: rowData[10] !== "Suspended" }));
      };

    const handleCreateAccount = async (rowData,para) => {
        try {
            setIsloading(true);
            const payload = {
                username: user?.userId,
                sessionId: user?.sessionId,
                updateUsername: rowData[3],
                updateStatus: para,
            };
            const response = await postApiData(apiList.UPDATE_CORPORATE_USER, payload);
            console.log("response", response?.status);
            console.log("rowdata", rowData);

            if (response?.status === true) {
                SweetAlertPopup(response?.message, "Success", "success");
                // onSubmit();
                setUserList(response.data.lstUsers)
                setIsloading(false);
            } else {
                SweetAlertPopup(response?.message, "", "error");
                setIsloading(false);
            }
            // reset()
        } catch (err) {
            console.log(err);
            setIsloading(false);
        }
    };

    const columns = [
        {
            name: "View",
            label: "View",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, { rowData }, tableMeta) => {
                    return (
                        <Button sx={{ color: "black" }} onClick={() => openModal(rowData)}>
                            {" "}
                            <VisibilityIcon />
                        </Button>
                    );
                },
                setCellProps: () => ({
                    style: {
                        width: "60px", // Adjust the width as needed
                        maxWidth: "60px",
                        minWidth: "60px",
                    },
                }),
            },
        },
        // {
        //     name: "Active/Inactive",
        //     label: "Active/Inactive",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
        //             const isSuspended =
        //                 rowData[columns.findIndex((col) => col.name === "status")] ===
        //                 "Suspended";
        //             return (
        //                 <Button
        //                     sx={{ color: "black" }}
        //                     onClick={() => SwalCall(userList[rowIndex])}
        //                     disabled={isSuspended}
        //                 >
        //                     <Switch
        //                         checked={checked}
        //                         onChange={handleChange}
        //                         inputProps={{ 'aria-label': 'controlled' }}
        //                     />

        //                     {/* <DeleteIcon /> */}
        //                 </Button>
        //             );
        //         },
        //         setCellProps: () => ({
        //             style: {
        //                 width: "60px",
        //                 maxWidth: "60px",
        //                 minWidth: "60px",
        //             },
        //         }),
        //     },
        // },
        {
            name: "Active/Inactive",
            label: "Active/Inactive",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
                    const status = rowData[columns.findIndex((col) => col.name === "status")];
                    const checked = checkedRows[rowIndex] !== undefined ? checkedRows[rowIndex] : status !== "Suspended";

                    let buttonContent = (
                        <Switch
                            checked={checked}
                            onChange={(event) => handleSwitchChange(rowIndex, event.target.checked,rowData)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    );
                    return buttonContent
                },
                setCellProps: () => ({
                    style: {
                        width: "60px",
                        maxWidth: "60px",
                        minWidth: "60px",
                    },
                }),
            },
        },
        {
            name: "name",
            label: "Name of User",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({
                    style: {
                        width: "150px",
                        maxWidth: "150px",
                        minWidth: "150px",
                    },
                }),
            },
        },
        {
            name: "username",
            label: "User ID",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "userRole",
            label: "User Role",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({
                    style: {
                        width: "120px",
                        maxWidth: "120px",
                        minWidth: "120px",
                    },
                }),
            },
        },
        {
            name: "corpId",
            label: "Corporate ID",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "corpName",
            label: "Corporate Name",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "emailId",
            label: "Email ID",
            options: {
                filter: true,
                sort: false,
                display: false,

            },
        },
        {
            name: "address",
            label: "Address",
            options: {
                filter: true,
                sort: false,
                display: false,

            },
        },
        {
            name: "mobileNo",
            label: "Mobile No",
            options: {
                filter: true,
                sort: false,
                display: false,

            },
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: false,
                // display: false,
            },
        },
        {
            name: "authStatus",
            label: "Auth Status",
            options: {
                filter: true,
                sort: false,
                display: false,
            },
        },
        {
            name: "createdDate",
            label: "Created Date",
            options: {
                filter: true,
                sort: false,

                // customBodyRender: (value) => {
                //   const dateParts = value.split(" ");
                //   const date = dateParts[0];
                //   const time = dateParts[1];

                //   const datePartsFormatted = date.split("-");
                //   const year = datePartsFormatted[2];
                //   const month = new Date(Date.parse(date)).toLocaleString("default", {
                //     month: "short",
                //   });
                //   const day = datePartsFormatted[0];

                //   const formattedDate = `${day} ${month} ${year} ${time}`;

                //   return formattedDate;
                // },
                // display: false,
            },
        },
    ];

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
        pagination: true,
    };

    const accountList =
        user?.accountDetails &&
        user?.accountDetails?.map((item) => ({
            code: item.brCode,
            value: item.accNo,
        }));

    return (
        <>
            {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

            {/* <div className={classes.Payment1MobilePrepaidMainPage}> */}
            {/* <div className={classes.accountlimitimpxheading}>
                    Positive Pay Search
                </div> */}
            {/* <div className={classes.tableMainBoxInner}> */}

            <Box
                className={classes.box1}
                component="form"
            // onSubmit={handleSubmit(onSubmit)}
            >
                <div className={classes.firsttabinfo}>
                    <Grid
                        container
                        columnSpacing={4}
                        rowSpacing={2}
                        style={{ padding: "0.1vw" }}
                    >
                        <Grid item xs={12} sm={12} md={12}>
                            <MUIDataTable
                                data={userList}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Box>

            {
                open ? <BulkUploadViewModal open={open} handleClose={handleClose} rowDataToDisplay={rowDataToDisplay} show={"2"} title={"User Details"} /> : null
            }

            {/* </div> */}
            {/* </div> */}
        </>
    );
};

export default UserMaster;
