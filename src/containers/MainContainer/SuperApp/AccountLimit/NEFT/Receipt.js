import React, { useEffect, useRef, useState } from "react";
import Classes from "./receipt.module.css";
// import maheshbanklogo from "../../../../../assets/Banks/Mahesh/images/Logo.svg"; // Logo Path
import { Button } from "@mui/base";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Canvg } from "canvg";  // Import canvg for SVG to Canvas

const Receipt = () => {
    // const { response } = useLocation();
    const location = useLocation();
    const { data, response, accountList, accountHolderName } = location.state || {}; // Access passed state

    // Log response to check if it's properly passed
    console.log("Received Data:", data);
    console.log("Received Response:", response);
    // console.log(data, response);
    const navigate = useNavigate();
    const logoRef = useRef(null); // Ref to get the SVG element
    const [logoBase64, setLogoBase64] = useState(null); // response to store the base64 image
    const [logoLoading, setLogoLoading] = useState(true); // Track loading response for the logo
    const receiptRef = useRef(null);
    // const [logoBase64, setLogoBase64] = useState(null);
    const backNavigate = () => {
        navigate(-2);
    };
    const [CurrentLimit, setCurrentLimit] = useState(null);
    // console.log("response",response)
    // const selectedAccount = accountList.find((item) => item.value === data?.accNo);
    // console.log("state1",state1)
    const ColorButton1 = styled(Button)(({ theme }) => ({
        color: "#FFFFFF",
        fontSize: "0.8rem",
        fontWeight: "500",
        background: "var(--button-color)",
        border: "1px solid #CCC",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "175px",
        height: "35px",
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
            fontSize: "0.65rem",
            width: "100%",
            height: "38px",
        },
    }));

    const ColorButton2 = styled(Button)(({ theme }) => ({
        color: "#000000",
        background: "var(--secondary-color)",
        fontSize: "0.8rem",
        fontWeight: "500",
        border: "1px solid #CCC",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "175px",
        height: "35px",
        "&:hover": {
            background: "var(--button-hover-color)",
            color: "white",
        },
        "@media (max-width: 568px)": {
            background: "var(--secondary-color)",
            border: "1px solid #CCC",
            borderRadius: "14px",
            paddingLeft: "18px",
            paddingRight: "18px",
            fontSize: "0.65rem",
            width: "100%",
            height: "38px",
        },
    }));

    console.log("accountHoldername", accountHolderName)
 
    const bankNames = process.env.REACT_APP_FLAVOUR;
    useEffect(() => {
        if (!bankNames) return;

        const importedImage = async () => {
            try {
                const logoImage = await import(`../../../../../assets/Banks/${bankNames}/images/Logo.svg`);
                setCurrentLimit(logoImage.default);

                // Convert the logo to base64 after it is set
                const logo = new Image();
                logo.src = logoImage.default;
                logo.crossOrigin = "Anonymous"; // Prevent CORS issues

                logo.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = logo.width;
                    canvas.height = logo.height;
                    ctx.drawImage(logo, 0, 0);
                    setLogoBase64(canvas.toDataURL("image/png"));
                };
            } catch (error) {
                console.error("Error loading logo:", error);
            }
        };

        importedImage();
    }, [bankNames]);

    // Function to generate and download the receipt PDF
    const downloadReceipt = () => {
        if (!logoBase64) {
            alert("Logo is not ready yet. Please try again.");
            return;
        }

        const doc = new jsPDF();
        const title = "Fund Transfer Receipt";

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(title, 14, 38);

        // Add the bank logo
        const imgWidth = 70;
        const imgHeight = 25;
        const xPosition = (doc.internal.pageSize.width - imgWidth) / 2;
        doc.addImage(logoBase64, "PNG", xPosition, 5, imgWidth, imgHeight);

        const data = [
            { label: "Ref No.", value: response?.data?.txnData?.cbsrrn || "NA" },
            {
                label: "Date",
                value: response?.data?.txnData?.transactiondate
                    ? new Date(response.data.txnData.transactiondate).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    })
                    : "NA",
            },
            {
                label: "Transaction Status",
                value:
                    response?.data?.respcode === "00" || response?.data?.respcode === "0"
                        ? "Transaction Successful"
                        : "Transaction Failed",
            },
            { label: "Transaction Amount", value: response?.data?.txnData?.amount ? `Rs. ${response?.data?.txnData?.amount}` : "NA" },
            { label: "Transaction Type", value: response?.data?.txnData?.transType || "NA" },
            { label: "Remitter Account Number", value: response?.data?.txnData?.remAccno || "NA" },
            { label: "Remitter Name", value: accountHolderName || "NA" },
            { label: "Beneficiary Name", value: response?.data?.txnData?.beneName || "NA" },
            { label: "Beneficiary Account Number", value: response?.data?.txnData?.benAccno || "NA" },
            { label: "Beneficiary IFSC Code", value: response?.data?.txnData?.benIfsccd || "NA" },
            { label: "Narration", value: response?.data?.txnData?.remark || "NA" },
            { label: "Message", value: response?.data?.txnData?.responseDesc || "NA" },
        ];

        let y = 45;
        const rowHeight = 8;
        const columnMargin = 6;
        const labelWidth = 50;
        const valueWidth = 130;

        // Loop through data to create a formatted table
        data.forEach((item) => {
            const valueLines = doc.splitTextToSize(item.value, valueWidth);
            const totalRowHeight = rowHeight * valueLines.length;

            // Draw table rows
            doc.rect(14, y - 4, labelWidth + valueWidth + columnMargin, totalRowHeight);
            const verticalLineX = 14 + labelWidth + columnMargin;
            doc.line(verticalLineX, y - 4, verticalLineX, y - 4 + totalRowHeight);

            // Add label
            doc.setFontSize(10);
            doc.text(item.label, 16, y);

            // Add value text
            valueLines.forEach((line, index) => {
                doc.text(line, 16 + labelWidth + columnMargin, y + index * rowHeight);
            });

            y += totalRowHeight;
        });

        // Save the PDF
        doc.save("receipt.pdf");
    };


    return (
        <div className={Classes.CashReceiptCont} id="wrapper" ref={receiptRef}>
            <div className={Classes.addressComphead}>
                <div className={Classes.CompName}>
                    <img
                        id="logo"
                        ref={logoRef} // Attach the ref to the logo
                        style={{ height: "65px" }}
                        src={CurrentLimit} // SVG logo path
                        alt="Logo"
                    />
                </div>
            </div>

            <div className={Classes.amount}>₹ {response?.data?.txnData?.amount || "NA"}</div>
            {/* <div className={Classes.date}>{response?.data?.txnData?.transactiondate}</div> */}
            <div className={Classes.date}>
                {response?.data?.txnData?.transactiondate
                    ? new Date(response.data.txnData.transactiondate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false // This ensures the time is in 24-hour format
                    })
                    : ''}
            </div>
            <div
                className={`${Classes.transactionheading} ${response?.data?.respcode === "00" || response?.data?.respcode === "0" ? Classes.success : Classes.failed}`}
            >
                {response?.data?.respcode === "00" || response?.data?.respcode === "0"
                    ? "Transaction Successful"
                    : "Transaction Failed"
                }
            </div>

            <div className={Classes.descMessage}>
                {response?.data?.txnData?.responseDesc || "NA"}
            </div>
            <div className={Classes.borderstyle}></div>

            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.headingttype}>Transaction Type</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.transType || "NA"}</div>
                </div>

                <div className={Classes.rightDetails}>
                    <div className={Classes.headingttype}>RRN No</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.cbsrrn || "NA"}</div>
                </div>
            </div>

            <div className={Classes.headingttype}>Remitter Details</div>
            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>Remitter Account Number</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.remAccno || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Remitter Name</div>
                    <div className={Classes.detailsoutput}>{accountHolderName}</div>
                </div>
            </div>

            <div className={Classes.headingttype}>Beneficiary Details</div>
            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>Beneficiary Account Number</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.benAccno || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Beneficiary Name</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.beneName || "NA"}</div>
                </div>
            </div>

            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>IFSC Code</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.benIfsccd || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Naration</div>
                    <div className={Classes.detailsoutput}>{response?.data?.txnData?.remark || "NA"}</div>
                </div>
            </div>
            {/* <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>Bank Name</div>
                    <div className={Classes.detailsoutput}>Mahesh Bank</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Branch Name</div>
                    <div className={Classes.detailsoutput}>Pune</div>
                </div>
            </div> */}

            <div className={Classes.buttonReceipt}>
                <ColorButton2 variant="contained" type="submit" onClick={backNavigate}>
                    Back To Transaction
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit" onClick={downloadReceipt}>
                    Download Receipt
                </ColorButton1>
            </div>
        </div>
    );
};

export default Receipt;
