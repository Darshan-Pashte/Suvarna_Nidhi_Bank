import classes from "../CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useRef, useState } from "react";
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
import { getApiData, postApiData } from "../../../../components/utilities/nodeApiServices";
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
import html2canvas from "html2canvas";
import sahyogLogo from "../../../../assets/Banks/Suvarna/images/Logo.svg";
import QRCode from "react-qr-code";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import RadioGroupForm from "../../../../components/common/RedioButtonForm";


const defaultFormData = {
    qrType: "Static",
    remark: "",
    amount: "",
    accountNumber: "",
};

const GenerateQRCodeCorporate = ({ accList }) => {
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

    const [isLoading, setIsloading] = useState(false);

    const [atmMasterList, setAtmMasterList] = useState([]);

    const [branchList, setBranchLIst] = useState([]);
    const [sahyogBranchList, setSahyogBranchList] = useState([]);
    const [agentList, setAgentList] = useState([]);
    const [qrResponse, setQrResponse] = useState("");
    // const [accountList, setAccountList] = useState([]);
    const [fetchBalanceData, setFetchBalanceData] = useState(null);
    console.log("fetchBalanceData", fetchBalanceData);
    const [isFetchBalance, setIsFetchBalance] = useState(false);

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const accountList =
        user?.accountDetails &&
        user?.accountDetails?.map((item) => ({
            code: item.brCode,
            value: item.accNo,
        }));

 

    useEffect(() => {
        const fetchData = async () => {
            const accNo = watch("accountNumber");
            const qrType = watch("qrType")
            if (accNo) {
                try {
                    await fetchBalance();
                    if (qrType == "Static") await fetchQRString();
                } catch (error) {
                    console.error("Error in fetching data:", error);
                }
            }
        };
        fetchData();
    }, [watch("accountNumber"),watch("qrType")]);

    const shareQR = async () => {
        if (navigator.share) {
            try {
                // Capture the QR code element using html2canvas
                const canvas = await html2canvas(qrRef.current);
                canvas.toBlob(async (blob) => {
                    if (!blob) return;
                    const file = new File([blob], "qrcode.png", { type: "image/png" });
                    // Check if the browser supports sharing files
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            title: "QR Code",
                            text: "Here is the QR code for payment",
                            files: [file],
                        });
                        console.log("QR Code shared successfully");
                    } else {
                        alert("Sharing images is not supported on this browser.");
                    }
                }, "image/png");
            } catch (error) {
                console.error("Error sharing the QR Code image", error);
            }
        } else {
            alert("Web Share API is not supported in your browser.");
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
          console.log("responsefetch",response)
          if (response?.status == true) {
            setAccountBalance(response?.data);
            setFetchBalanceData(response?.data)
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

      const fetchQRString = async (data) => {
        try {
          setIsloading(true);
          const payload = {
            accountNo: watch("accountNumber") ? watch("accountNumber")?.value : "",
            username: user?.userId,
            sessionId: user?.sessionId,
          };
          const response = await postApiData(apiList.QRCODEGWNERATECORPORATE, payload);
          console.log("qrstring",response)
          if (response?.status == true) {
            setQrResponse(response?.data?.genrateQr);
            setIsloading(false);
          } else {
            setIsloading(false);
          }
        } catch (err) {
          //   console.log(err)
          setIsloading(false);
        }
      };
    
      const fetchQRStringDynamic = async (data) => {
        try {
            setIsloading(true);
            const payload = {
                accountNo: watch("accountNumber") ? watch("accountNumber")?.value : "",
                custNo: user?.userId,
                sessionId: user?.sessionId,
                remark: data?.remark,
                amount: data?.amount,
                brCode: watch("accountNumber") ? watch("accountNumber")?.code : "",
            };
            const response = await postApiData(apiList.QRCODEGWNERATECORPORATEDYNAMIC, payload);
            console.log("qrstring", response)
            if (response?.status == true) {
                setQrResponse(response?.data?.genrateQr);
                handleGenerateQRCodeImageDynamic(response?.data?.genrateQr?.url);
                setIsloading(false);
            } else {
                setIsloading(false);
            }
        } catch (err) {
            //   console.log(err)
            setIsloading(false);
        }
    };


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

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [qrValue, setQrValue] = useState("");
    const qrRef = useRef();
    const [accountBalance, setAccountBalance] = useState({})
    const [isAccountBalance, setIsAccountBalance] = useState(false);

    const downloadQRCode = () => {
        html2canvas(qrRef.current).then((canvas) => {
            const pngUrl = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = `${fetchBalanceData?.accName}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    };


    useEffect(() => {
        if (user?.data?.bankCode == "ALL") {
            setValue("bankcode", "");
        } else {
            setValue("bankcode", user?.data?.bankCode ? user?.data?.bankCode : "");
        }
    }, [user]);

    useEffect(() => {
        if (user?.data?.branchCode == "ALL") {
            setValue("branchname", "");
        } else {
            setValue(
                "branchname",
                user?.data?.branchName ? user?.data?.branchName : ""
            );
        }
    }, [user]);


    const handleGenerateQRCodeImage = (data) => {
        setQrValue(qrResponse?.url);
    };

    const handleGenerateQRCodeImageDynamic = (data) => {
        setQrValue(data);
    };

    const handleResetData = () => {
        setValue("accountno", "")
        setValue("amount", "")
        setFetchBalanceData(null)
        setQrValue("")
    }

    useEffect(() => {
        const qrType = watch("qrType");

        // Reset amount, remark, and QR display
        setValue("amount", "");
        setValue("remark", "");
        setQrValue("");

        // const accNoValue = watch("accountNumber");
        // const fetchData = async () => {
        //     if (accNoValue) {
        //         if (qrType === "Static") {
        //             await fetchBalance();
        //            await fetchQRString();
        //         } 
        //     }

        // }

        // fetchData()
    }, [watch("qrType")]);

    // useEffect(() => {
    //     const qrType = watch("qrType");
    //     const accNoValue = watch("accountNumber");

    //     // Reset amount, remark, and QR
    //     setValue("amount", "");
    //     setValue("remark", "");
    //     setQrValue("");

    //     const fetchDataSequentially = async () => {
    //         if (qrType === "Static") {
    //             try {
    //                 const balanceFetched = await fetchBalance();
    //                 if (balanceFetched) {
    //                     await fetchQRString();
    //                 }
    //             } catch (error) {
    //                 console.error("Error during fetch sequence:", error);
    //             }
    //         }
    //     };

    //     fetchDataSequentially();
    // }, [watch("qrType")]);



    const handleGenerateQRCode = async (data) => {
        setIsloading(true);
        const payload = {
            accNo: data?.accountno,
        };
        try {
            await postApiData(apiList.QR_ACCOUNT_BROWSE, payload).then((response) => {
                console.log("Response", response);
                if (response.data.status == true) {
                    // setIsFetchBalance(true)
                    setFetchBalanceData(response?.data?.list[0] || []);
                    //   SweetAlertPopup("Bank Created Successfully !", "Success", "success");
                    // setValue("portals","")
                    setIsloading(false);
                } else {
                    SweetAlertPopup(response?.data?.message, "Error", "error");
                    setIsloading(false);
                }
                setIsloading(false);
            }).catch((err) => {
                SweetAlertPopup(err?.response?.data?.message, "Error", "error")
                setIsloading(false);
            })
        } catch (error) {
            SweetAlertPopup(error?.response?.data?.message, "Error", "error");
            setIsloading(false);
        }
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
        width: "140px",
        height: "35px",
        "&:hover": {
            background: "#808080",
            color: "white",
        },
    }));

    const ColorButton1 = styled(Button)(({ theme }) => ({
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


    return (
        <>
            {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
            <div className={classes.redrow}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                        <div className={classes.SubHeading}>
                            Generate QR Code
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
                            onSubmit={handleSubmit(watch("qrType") == "Static" ? handleGenerateQRCodeImage : fetchQRStringDynamic)}
                        >
                            <div className={classes.SboxQR}>
                                <Grid container columnSpacing={2} rowSpacing={2} >

                                    <Grid item xs={12} sm={12} md={8} style={{ padding: "0 50px" }}>
                                        <div>
                                            <div>
                                                <div className={classes.formbox}>
                                                    <Grid item xs={12} sm={12} md={12} style={{ padding: "15px 0" }}>
                                                        <div className={classes.frowdata11}>
                                                            <div className={classes.frowtext}>
                                                                QR Code Type<sup className={classes.required}>*</sup>
                                                            </div>
                                                            <RadioGroupForm
                                                                controlerProps={{
                                                                    control: control,
                                                                    name: "qrType",
                                                                }}
                                                                data={[
                                                                    {
                                                                        label: "Statiic",
                                                                        value: "Static",
                                                                    },
                                                                    {
                                                                        label: "Dynamic",
                                                                        value: "Dynamic",
                                                                    },
                                                                ]}
                                                                rules={{ required: "QR Code Type" }}
                                                                errorMessage={"QR Code Type"}
                                                                required={true}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid container columnSpacing={2} rowSpacing={2}>
                                                        <Grid item xs={12} sm={12} md={6}>
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

                                                        {
                                                            watch("qrType") == "Static" && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sm={12}
                                                                    md={6}
                                                                    style={{ marginTop: "20px" }}
                                                                >
                                                                    <div style={{ display: "flex", gap: "10px" }}>
                                                                        <ColorButton1 variant="contained" type="submit">
                                                                            Generate QR
                                                                        </ColorButton1>
                                                                        <ColorButton
                                                                            variant="contained"
                                                                            type="button"
                                                                            // disabled={watch("amount") ? false : true}
                                                                            onClick={handleResetData}
                                                                        >
                                                                            Reset
                                                                        </ColorButton>
                                                                    </div>
                                                                </Grid>
                                                            )
                                                        }

                                                    </Grid>
                                                </div>
                                            </div>
                                            <Grid container columnSpacing={2} rowSpacing={2}>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    {fetchBalanceData != null && (
                                                        <div
                                                            style={
                                                                {
                                                                    //   width: "80%",
                                                                    //   display: "flex",
                                                                    //   justifyContent: "center",
                                                                }
                                                            }
                                                        >
                                                            <div className={classes.qrDataContainer}>
                                                                <div className={classes.qrboxData}>
                                                                    <div style={{ minWidth: "80px" }}>Name </div>
                                                                    <div className={classes.QrCodeNamehead}>
                                                                        :
                                                                        <span className={classes.QrCodeNamehead}>
                                                                            {fetchBalanceData?.accName}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {/* <div className={classes.qrboxData}>
                                                                    <div style={{ minWidth: "80px" }}>Branch </div>
                                                                    <div className={classes.QrCodeNamehead}>
                                                                        :{" "}
                                                                        <span className={classes.QrCodeNamehead}>
                                                                            {fetchBalanceData?.branchName}
                                                                        </span>
                                                                    </div>
                                                                </div> */}
                                                                <div className={classes.qrboxData}>
                                                                    <div style={{ minWidth: "80px" }}>Balance </div>
                                                                    <div className={classes.QrCodeNamehead}>
                                                                        :{" "}
                                                                        <span className={classes.QrCodeNamehead}>
                                                                            {fetchBalanceData?.accBal}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            {
                                                watch("qrType") == "Dynamic" && (
                                                    <div className={classes.formbox}>
                                                        <Grid container columnSpacing={2} rowSpacing={2}>
                                                            <Grid item xs={12} sm={12} md={6}>
                                                                <div className={classes.frowdataaff}>
                                                                    <div className={classes.frowtextaff}>
                                                                        Amount<sup className={classes.required}>*</sup>
                                                                    </div>
                                                                    <div className={classes.frow1aff}>
                                                                        <TextFieldForm
                                                                            controlerProps={{
                                                                                control: control,
                                                                                name: "amount",
                                                                                rows: 5,
                                                                                maxRows: 10,
                                                                            }}
                                                                            TextFieldProps={{
                                                                                // label: "Name",
                                                                                placeholder: "Amount",
                                                                                // style: { width: "33vw" },
                                                                                fullWidth: true,
                                                                                disabled: qrValue != "" ? true : false,
                                                                                inputProps: {
                                                                                    //   minLength: 15,
                                                                                    maxLength: 15,
                                                                                },
                                                                            }}
                                                                            regExp={/^[0-9.]+$/}
                                                                            backgroundColor={qrValue != "" ? true : false}
                                                                            rules={{
                                                                                required:
                                                                                    "Amount" +
                                                                                    errorMessages.error_autocomplete_message,
                                                                                pattern: {
                                                                                    value: /^(?!0+$)[0-9.]{1,15}$/,
                                                                                    message: "Please enter a valid Amount",
                                                                                },
                                                                                validate: (value) => {
                                                                                    if (value.length === 0) {
                                                                                        return "Please enter an amount";
                                                                                    }
                                                                                    if (value.length > 15) {
                                                                                        return "Amount cannot exceed 15 digits";
                                                                                    }
                                                                                    if (value === "0".repeat(value.length)) {
                                                                                        return "Amount cannot be all zeros";
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                            }}
                                                                            required={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Grid>

                                                            <Grid item xs={12} sm={12} md={6}>
                                                                <div className={classes.frowdataaff}>
                                                                    <div className={classes.frowtextaff}>
                                                                        Remark<sup className={classes.required}>*</sup>
                                                                    </div>
                                                                    <div className={classes.frow1aff}>
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
                                                                                disabled: qrValue != "" ? true : false,
                                                                                inputProps: {
                                                                                    //   minLength: 15,
                                                                                    maxLength: 15,
                                                                                },
                                                                            }}
                                                                            regExp={/^[a-zA-Z0-9., ]+$/}
                                                                            backgroundColor={qrValue != "" ? true : false}
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


                                                            <Grid
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                md={6}
                                                                style={{ marginTop: "20px" }}
                                                            >
                                                                <div style={{ display: "flex", gap: "10px" }}>
                                                                    <ColorButton1 variant="contained" type="submit">
                                                                        Generate QR
                                                                    </ColorButton1>
                                                                    <ColorButton
                                                                        variant="contained"
                                                                        type="button"
                                                                        // disabled={watch("amount") ? false : true}
                                                                        onClick={handleResetData}
                                                                    >
                                                                        Reset
                                                                    </ColorButton>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>

                                                )
                                            }
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                        <div id="print-section" ref={qrRef} style={{ padding: "20px 52px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                            {qrValue && (
                                                <>
                                                    <div style={{ marginTop: "20px", paddingBottom: "10px" }} >
                                                        <img src={sahyogLogo} alt="" width="170" />
                                                    </div>
                                                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} >
                                                        {/* <h5 style={{paddingLeft:"40px", paddingBottom:"2px"}}>Scan Qr to send Money</h5> */}
                                                        <QRCode value={qrValue} style={{ width: '140px', height: '140px' }} size={100} />
                                                        <h5 style={{ paddingTop: "15px", textAlign: "center", color: "#242A42" }}>{fetchBalanceData?.accName}</h5>
                                                        <h5 style={{ textAlign: "center", color: "#172B4D" }}>{watch("accountNumber")?.value}</h5>
                                                    </div>

                                                </>
                                            )}
                                        </div>
                                        {qrValue && (
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <ColorButton1
                                                    onClick={downloadQRCode}
                                                // style={{
                                                //     // marginTop: "20px",
                                                //     width: "150px",
                                                // }}
                                                >
                                                    Download
                                                </ColorButton1>
                                                <ColorButton1
                                                    onClick={() => shareQR()}
                                                    style={{
                                                        width: "150px",
                                                    }}
                                                >
                                                    Share
                                                </ColorButton1>
                                            </div>

                                        )}
                                    </Grid>
                                </Grid>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenerateQRCodeCorporate;
