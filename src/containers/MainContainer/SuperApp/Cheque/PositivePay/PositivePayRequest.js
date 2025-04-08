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
import { useLocation } from "react-router-dom/dist";
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
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import RedioButtonFormRequired from "../../../../../components/common/RedioButtonFormRequired";
import DatePickerForm from "../../../../../components/common/datePickerForm";
import { convertDate } from "../../../../../components/utilities/convertDate";
import dayjs from 'dayjs';

const defaultFormData = {
    accountNumber: "",
    chequeDate: "",
    chequeNo: "",
    amount: "",
    payeeName: "",
    tpin: "",
};

const PositivePayRequest = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [bene, setBene] = useState("");
    const { state } = useLocation();
    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    console.log('user', user)
    const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo, 'name': item.name, 'acctype': item.acctype }));
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        register,
        watch,
        reset,
        resetField,
        formState: { isSubmitting, errors },
    } = useForm({
        defaultValues: defaultFormData,
        mode: "onChange",
    });

    const resetForm = () => {
        resetField("noofcheckbook")
        resetField("deliveryday")
    }

    useEffect(() => {
        setValue("chequeDate", new Date())
    }, []);

    const onSubmit = async (data) => {
        const payload = {
            custNo: user?.userId,
            sessionId: user?.sessionId,
            acctNo: data.accountNumber.value,
            tpin: data.tpin,
            chequeNo: data.chequeNo,
            chequeDate: data.chequeDate ? convertDate(data.chequeDate, 6) : convertDate(new Date(), 6),
            payeeName: data.payeeName,
            amt: data.amount,
        };
        setIsloading(true)
        const response = await postApiData(apiList.POSITIVE_PAY_REQUEST, payload);
        // console.log("response", response);
        if (response?.status == true) {
            SweetAlertPopup(response?.message, "Success", "success");
            reset();
            setIsloading(false)
        } else {
            SweetAlertPopup(response?.message, "Error", "error");
            setIsloading(false)
        }
    };

    useEffect(() => {
        if (accountList) {
            // setValue("accName", accName)
            setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
        }
    }, []);

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()); // 3 months ago
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()); // 3 months in the future
  

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
        height: "35px",
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
        height: "35px",
        "&:hover": {
            background: "var(--button-hover-color)",
            color: "white",
        },
    }));



    return (
        <>

            {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

            {/* <div className={classes.Payment1MobilePrepaidMainPage}> */}
            {/* <div className={classes.accountlimitimpxheading}>
          Positive Pay Request
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
                                            name: "accountNumber",
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
                                                "Account " +
                                                errorMessages.error_autocomplete_message,
                                         
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
                                    Cheque Date
                                    <sup className={classes.required}>*</sup>
                                </div>
                                <div className={classes.widthtfield}>
                                    <DatePickerForm
                                        controlerProps={{
                                            control: control,
                                            name: "chequeDate",
                                        }}
                                        TextFieldProps={
                                            {
                                                //   fullWidth: true,
                                            }
                                        }
                                        DatePickerProps={{
                                            // label: "From Date",
                                            fullWidth: true,
                                            minDate:minDate?.toISOString()?.split('T')[0], // Convert to ISO string and remove time
          maxDate:maxDate?.toISOString()?.split('T')[0] // Convert to ISO string and remove time
                                        }}
                                        required={false}
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
                                            placeholder: "Cheque No.",
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
                        <Grid item xs={12} sm={12} md={3}>
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
                                            // label: "Branch",
                                            placeholder: "Amount",
                                            //   style: { width: "130%" },
                                            fullWidth: true,
                                            inputProps: { 
                                                minLength:5,
                                                maxLength: 10 }
                                        }}
                                        // backgroundColor={true}
                                        regExp={/^[0-9.]+$/}
                                        rules={{
                                            required:
                                                "Amount " +
                                                errorMessages.error_autocomplete_message,
                                                pattern: {
                                                    // value: /^(?!0+$)([5-9]\d{4}|[1-9]\d{5,10})$/,
                                                    value: /^(?!0+$)([5-9]\d{4}|[1-9]\d{5,10})(\.\d+)?$/,
                                                    message: "Please enter a valid amount above 50,000 Rs",
                                                  }
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <div className={classes.frowdataaff}>
                                <div className={classes.frowtextaff}>
                                    Payee Name
                                    <sup className={classes.required}>*</sup>
                                </div>
                                <div className={classes.widthtfield}>
                                    <TextFieldForm
                                        controlerProps={{
                                            control: control,
                                            name: "payeeName",
                                            rows: 5,
                                            maxRows: 10,
                                        }}
                                        TextFieldProps={{
                                            // label: "Branch",
                                            placeholder: "Payee Name",
                                            //   style: { width: "130%" },
                                            fullWidth: true,
                                            inputProps: { maxLength: 60 }
                                        }}
                                        // backgroundColor={true}
                                        regExp={/^[A-Za-z0-9 ]+$/}
                                        rules={{
                                            required:
                                                "Payee Name" +
                                                errorMessages.error_autocomplete_message,
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <div className={classes.frowdataaff}>
                                <div className={classes.frowtextaff}>
                                    TPIN
                                    <sup className={classes.required}>*</sup>
                                </div>
                                <div className={classes.widthtfield}>
                                    <Controller
                                        name="tpin" // The name should match the key in 'data' object in onSubmit
                                        control={control}
                                        defaultValue="" // Set an initial value if needed
                                        rules={{
                                            required:
                                                "TPIN " + errorMessages.error_autocomplete_message,
                                            pattern: {
                                                value: /^[0-9]{4,}$/, // This pattern allows only digits and requires at least 4 digits
                                                message: "TPIN must contain only digits and have at least 4 digits",
                                            },
                                        }}
                                        render={({ field, fieldState }) => {
                                            const handleInputChange = (event) => {
                                                const regex = /^[0-9]+$/;
                                                const { name, value } = event.target;
                                                const isValidInput = regex.test(value) || value === "";

                                                if (!isValidInput) {
                                                    event.preventDefault();
                                                    return;
                                                }

                                                field.onChange(value);
                                            };

                                            return (
                                                <TextField
                                                    id="standard-adornment-password"
                                                    fullWidth="true"
                                                    placeholder="TPIN "
                                                    maxLength={4}
                                                    type={showPassword ? "text" : "password"}
                                                    {...field} // Spread the 'field' props to bind it to the form's state
                                                    sx={{
                                                        "& fieldset": { border: "none" },
                                                        ".MuiInputBase-root": {
                                                            borderRadius: '6px',
                                                            position: 'relative',
                                                            // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                                                            backgroundColor: '#FFF',
                                                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                                            marginTop: '4px',

                                                            border: '1px solid',
                                                            // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                                                            // borderColor: 'red',
                                                            fontSize: '13px',
                                                            height: "30px",
                                                            color: '#888',
                                                            fontWeight: '500',

                                                            // width: '520px',
                                                            padding: '12px 0px',
                                                            '@media (max-width: 568px)': {
                                                               
                                                                // paddingLeft: "18px",
                                                                // paddingRight: "18px",
                                                                width: "100%",
                                                                height: "40px",
                                                                // margin: "0px 10px 0px 10px"
                                                              },
                                                        },
                                                    }}
                                                    inputProps={{ maxLength: 4, minLength: 4 }}

                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {!showPassword ? (
                                                                        <VisibilityOff />
                                                                    ) : (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    onChange={handleInputChange}
                                                // error={field.error} // Pass the error state here
                                                // helperText={passwordError ? "Password does not meet requirements" : ""}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}></Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <div className={classes.payment1mobileprepaidbutton}>
                                <ColorButton2 onClick={() => { reset() }}>
                                    Reset
                                </ColorButton2>
                                <ColorButton1 variant="contained" type="submit">
                                    Submit
                                </ColorButton1>
                            </div>
                        </Grid>

                    </Grid>
                </div>

            </Box>
            {/* </div> */}
            {/* </div> */}
        </>
    );
};

export default PositivePayRequest;
