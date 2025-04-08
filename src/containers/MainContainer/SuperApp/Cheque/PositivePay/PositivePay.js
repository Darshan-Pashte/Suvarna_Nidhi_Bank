import React from "react";
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
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import RadioGroupForm from "../../../../../components/common/RedioButtonForm";
import Loader from "../../../../../components/common/loader";
import MUIDataTable from "mui-datatables";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";

const defaultFormData = {
    accno1: "",
    noofcheckbook: "",
    tpin: "",
    chequeNo: ""
};

const PositivePaySearch = () => {
   
    const [isLoading, setIsloading] = useState(false);
    const [positivePayList, setPositivepayList] = useState([]);

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

    useEffect(() => {
        if (accountList) {
            // setValue("accName", accName)
            setValue("accno1", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
        }
    }, []);

    const onSubmit = async (data) => {
        const payload = {
            custNo: user?.userId,
            sessionId: user?.sessionId,
            acctNo: data.accno1.value,
            chequeNo: data.chequeNo ? data.chequeNo :"",

        };
        setIsloading(true)
        const response = await postApiData(apiList.POSITIVE_PAY_SEARCH, payload);
        // console.log("response", response);
        if (response?.status == true) {
            // SweetAlertPopup(` Payment on ${response?.data.chequeNo} is ${response?.data.chequeStatus}`, "Success", "success");
            setPositivepayList(response?.data?.list)
            // SweetAlertPopup(response?.message, "Success", "success");
            // reset();
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

    const columns = [
        // {
        //     name: "View",
        //     label: "View",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRender: (value, { rowData }, tableMeta) => {
        //             return (
        //                 <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} onClick={() => openModal(rowData)}> <VisibilityIcon /></Button>
        //             );
        //         },
        //     }
        // },
        {
            name: 'account',
            label: 'Account No.',
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'statusdesc',
            label: 'Status Desc',
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'payeename',
            label: 'Payee Name',
            options: {
                filter: true,
                sort: false,
            },
        },

        {
            name: 'amount',
            label: 'Amount',
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
            name: 'date',
            label: 'Date',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },
        {
            name: 'paydate',
            label: 'Payee Date',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },
        {
            name: 'entrydate',
            label: 'Entry Date',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },

        {
            name: 'chequedate',
            label: 'Cheque Date',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },


        {
            name: 'chequeno',
            label: 'Cheque No',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },

       

        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: false,
                // display: false
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
        responsive: "stacked",
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
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={classes.firsttabinfo}>
                            <Grid
                                container
                                columnSpacing={4}
                                rowSpacing={2}
                                style={{ padding: "0.1vw" }}
                            >
                                <Grid item xs={12} sm={12} md={3}>
                                    <div className={classes.frowdataaff}>
                                        <div className={classes.frowtextaff}>
                                            Account Number
                                            <sup className={classes.required}>*</sup>
                                        </div>
                                        <div className={classes.widthtfield}>
                                            <AutocompleteForm
                                                controlerProps={{
                                                    control: control,
                                                    name: "accno1",
                                                }}
                                                TextFieldProps={{
                                                    style: { width: "100%" },

                                                    placeholder: "Account Number",
                                                    onKeyDown: (event) => {
                                                        //const regex = /^[a-zA-Z]*$/;
                                                        const regex = /^[0-9]*$/;
                                                        const isBackspace = event.keyCode === 8;
                                                        const isValidInput = regex.test(event.key);
                                                        const currentInputValue = event.target.value;
                                                        const maxLength = 32;
                                                        const isMaxLengthReached = currentInputValue.length >= maxLength;
                                                        if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                                                            event.preventDefault();
                                                        }
                                                    },
                                                }}
                                                rules={{
                                                    required:
                                                        "Account No." +
                                                        errorMessages.error_autocomplete_message,
                                                    // maxLength: {
                                                    //     value: 32, // Set your max length here
                                                    //     message: "Account Number must be no more than 10 digits long",
                                                    // },
                                                }}
                                                data={accountList}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3}>
                                    <div className={classes.frowdataaff}>
                                        <div className={classes.frowtextaff}>
                                            Cheque No.
                                            <sup className={classes.required}>*</sup>
                                        </div>
                                        <div className={classes.widthtfield}>
                                            <TextFieldForm
                                                controlerProps={{
                                                    control: control,
                                                    name: "chequeNo",
                                                    rows: 5,
                                                    maxRows: 10,
                                                }}
                                                TextFieldProps={{
                                                    // label: "Branch",
                                                    placeholder: "Enter Cheque No.",
                                                    //   style: { width: "130%" },
                                                    fullWidth: true,
                                                    inputProps: { maxLength: 6 }
                                                }}
                                                // backgroundColor={true}
                                                regExp={/^[0-9]+$/}
                                                rules={{
                                                    required:
                                                        "Cheque No." +
                                                        errorMessages.error_autocomplete_message,
                                                        pattern: {
                                                            value: /^(?!0+$)\d{1,6}$/,
                                                            message: "Please Enter a valid Cheque No.",
                                                          },
                                                }}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className={classes.payment1mobileprepaidbutton}>
                                        <ColorButton2 onClick={() => { reset() }}>
                                            Reset
                                        </ColorButton2>
                                        <ColorButton1 variant="contained" type="submit">
                                            Submit
                                        </ColorButton1>
                                    </div>
                                </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <MUIDataTable
                                    data={positivePayList}
                                    columns={columns}
                                    options={options}
                                />
                            </Grid>
                            </Grid>
                        </div>
                    </Box>
                {/* </div> */}
            {/* </div> */}
        </>
    );
};

export default PositivePaySearch;
