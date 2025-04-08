import classes from '../CorporateHome.module.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import { Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../../components/common/datePickerForm";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import ServerInstance, { apiList } from "../../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import { convertDate } from "../../../../../components/utilities/convertDate";
import AutocompleteForm from '../../../../../components/common/autuCompleteForm';
import SweetAlertPopup from '../../../../../components/common/sweetAlertPopup';
import Loader from '../../../../../components/common/loader';
import { compareTextAndReturnObject } from '../../../../../components/common/commonArray';
import RadioGroupForm from '../../../../../components/common/RedioButtonForm';
import UploadIcon from "../../../../../assets/upload.svg";
import OtpCorporateModal from '../../../SuperApp/CorporateFundTransfer/otpModalBulkTranfer';
import { processBase64FormatBase64 } from '../../../../../components/common/fileUploadHelperBase64';

const defaultFormData = {
    tranferType: "Internal",
    accountNumber: "",
    tranferMethod: "NEFT",
    remark: "",
};

const BulkUpload = ({ accList }) => {
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
    const [response, setResponse] = useState([]);
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

            if (response.status) {
                setResponse(response)
                handleOpen()
                setPayloadData(data)
                // setAirtelFile("bulkpayment","")
                reset()
                // SweetAlertPopup(response.message, "Success", "success");
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
        backgroundColor: "var(--button-color)",
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
                            <Grid
                                container
                                columnSpacing={4}
                                rowSpacing={2}
                                style={{ padding: '0.1vw' }}
                            >
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className={classes.frowdataaff}>
                                        <div className={classes.frowtextaff}>
                                            Upload  Type
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
                                                        label: "Internal",
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
                                {/* <Grid item xs={12} sm={12} md={6}></Grid> */}
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className={classes.frowdata11}>
                                        <div className={classes.frowtext}>From Account Number<sup className={classes.required}>*</sup></div>
                                        <AutocompleteForm
                                            controlerProps={{
                                                control: control,
                                                name: "accountNumber",
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
                                                    const isMaxLengthReached = currentInputValue.length >= maxLength;

                                                    if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                                                        event.preventDefault();
                                                    }
                                                },
                                            }}
                                            rules={{
                                                required:
                                                    "Account Number " + errorMessages.error_autocomplete_message,
                                                maxLength: {
                                                    value: 32, // Set your max length here
                                                    // message: "Account Number must be no more than 10 digits long",
                                                },
                                            }}
                                            // data={accountHomebank}
                                            data={accountList}
                                            required={true}
                                        />

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className={classes.frowdata11}>
                                        <div className={classes.frowtext}>Choose File<sup className={classes.required}>*</sup></div>
                                        <div className={classes.uploadContainer}>
                                            <input type="file" name="bulkpayment" className={classes.inputfile} accept=".csv" onChange={handleFileChangeAirtelFile} />
                                            {/* <div className={classes.uploadFile}>
                      <img src={UploadIcon} alt="upload file" />
                    </div> */}
                                        </div>

                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
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
                                                    //     label: "IMPS",
                                                    //     value: "IMPS",
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
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={6}>     </Grid> */}

                                <Grid item xs={12} sm={12} md={12}>
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
                                                    placeholder: "Enter Remark",
                                                    fullWidth: true,
                                                    inputProps: {
                                                        maxLength: 100
                                                    }
                                                }}
                                                //   backgroundColor={true}
                                                regExp={/^[^<>\\@#]*$/}
                                                rules={{
                                                    required:
                                                        "  Remark  " +
                                                        errorMessages.error_autocomplete_message,
                                                }}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={8}></Grid>

                                <Grid item xs={12} sm={7} md={4}>
                                    <div className={classes.payment1mobileprepaidbutton} >
                                        <ColorButton1 variant="contained" type="submit">
                                            Proceed
                                        </ColorButton1>
                                    </div>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={12}></Grid> */}
                            </Grid>

                        </div>
                    </div>
                    {open ? (
                        <OtpCorporateModal
                            open={open}
                            handleClose={handleClose}
                            payloadData={payloadData}
                            fileData={airtelFile}
                            airtelFileUpload={airtelFileUpload}
                            setAirtelFile={setAirtelFile}
                            responses={response}
                        />
                    ) : null}
                </div>
            </Box>



        </>
    )
}

export default BulkUpload



