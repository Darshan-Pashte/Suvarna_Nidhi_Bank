import React, { useEffect, useRef, useState } from "react";
import Classes from "./TransactionReceipt.module.css";
import maheshbanklogo from "../../../../../../assets/Banks/Mahesh/images/Logo.svg"; // Logo Path
import { Button } from "@mui/base";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Canvg } from "canvg";  // Import canvg for SVG to Canvas

const TransactionReceipt = () => {
    // const { response } = useLocation();
    const location = useLocation();

    console.log('statesss', location)
    const { data, response, accountList, rowData, state, selectedAccountName } = location.state || {}; // Access passed state


    // console.log(data, response);
    const navigate = useNavigate();
    const logoRef = useRef(null); // Ref to get the SVG element
    const [logoBase64, setLogoBase64] = useState(null); // response to store the base64 image
    const [logoLoading, setLogoLoading] = useState(true); // Track loading response for the logo
    const receiptRef = useRef(null);
    const [CurrentLimit, setCurrentLimit] = useState(null);
    // const [logoBase64, setLogoBase64] = useState(null);
    const backNavigate = () => {
        navigate(-1);
    };


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

    console.log("accountHoldername", selectedAccountName)
       useEffect(() => {
            // Convert logo SVG to base64 using a simple method
            const logo = new Image();
            logo.src = CurrentLimit;
            logo.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = logo.width;
                canvas.height = logo.height;
                ctx.drawImage(logo, 0, 0);
                setLogoBase64(canvas.toDataURL("image/png")); // Store base64 data
            };
        }, []);

     const bankNames = process.env.REACT_APP_FLAVOUR;
         useEffect(() => {
               if (!bankNames) return;
       
               const importedImage = async () => {
                   try {
                       const logoImage = await import(`../../../../../../assets/Banks/${bankNames}/images/Logo.svg`);
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

    const downloadReceipt = () => {
        if (!logoBase64) {
            alert("Logo is not ready yet. Please try again.");
            return;
        }
        const doc = new jsPDF();

        const title = "Fund Transfer Receipt";
    
        // Set title font size and style (bold)
        doc.setFontSize(12); // Title font size
        doc.setFont("helvetica", "normal"); // Title font style

        // Add the title at the top (centered horizontally)
        const titleX = 14;
        const titleY = 38; // Y-position of the title
        doc.text(title, titleX, titleY);
    
        // Reset font style for the rest of the text (normal font)
        doc.setFont("helvetica", "normal"); // Reset font style to normal
        const data = [
            { label: 'Ref No.', value: location?.state?.rowData?.cbsrrn || 'NA' },
            {
                label: 'Date', value: location?.state?.rowData?.transactiondate
                    ? new Date(location?.state?.rowData?.transactiondate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false // This ensures the time is in 24-hour format
                    })
                    : 'NA'
            },
            {
                label: 'Transaction Status', value: location?.state?.rowData?.responseCode === "00" || location?.state?.rowData?.respcode === "0"
                    ? "Transaction Successful"
                    : "Transaction Failed"
            },
            { label: 'Transaction Amount', value: location?.state?.rowData?.amount ? `Rs. ${location?.state?.rowData?.amount}` : 'NA' },
            { label: 'Transaction Type', value: location?.state?.rowData?.transType || 'NA'},
            { label: 'Remitter Account Number', value: location?.state?.rowData?.remAccno || 'NA' },
            { label: 'Remitter Name', value: selectedAccountName || 'NA'},
            { label: 'Beneficiary Name', value: location?.state?.rowData?.beneName || 'NA'},
            { label: 'Beneficiary Account Number', value: location?.state?.rowData?.benAccno || 'NA'},
            { label: 'Beneficiary IFSC Code', value: location?.state?.rowData?.benIfsccd || 'NA'},
            { label: 'Narration', value: location?.state?.rowData?.remark || 'NA'},
            { label: 'Message', value: location?.state?.rowData?.responseDesc || 'NA'},
        ];

        // If logo is ready, add it to the PDF
        if (logoBase64) {
            const imgWidth = 70; // Set the width of the logo
            const imgHeight = 25; // Set the height of the logo
            const xPosition = (doc.internal.pageSize.width - imgWidth) / 2; // Center horizontally
            const yPosition = 5; // Place logo near top of the page

            // Add the logo to the PDF
            doc.addImage(logoBase64, "PNG", xPosition, yPosition, imgWidth, imgHeight);
        }

        let y = 45;  // Starting Y position for the rows
        const rowHeight = 8;  // Default height of each row
        const columnMargin = 6; // Margin between columns
        const labelWidth = 50; // Width of the label column
        const valueWidth = 130; // Width of the value column

        // Loop through data to add rows with borders
        data.forEach((item) => {
            // Calculate the lines needed to wrap the value text
            const valueLines = doc.splitTextToSize(item.value, valueWidth);  // Wrap text into lines

            // Calculate the total height of the row based on how many lines the value has
            const totalRowHeight = rowHeight * valueLines.length;

            // Draw rectangle for the entire row (label + value)
            doc.rect(14, y - 4, labelWidth + valueWidth + columnMargin, totalRowHeight);

            // Draw vertical line between the label and value columns
            const verticalLineX = 14 + labelWidth + columnMargin;  // X position of vertical line
            doc.line(verticalLineX, y - 4, verticalLineX, y - 4 + totalRowHeight);  // Draw vertical line

            // Add label text
            doc.setFontSize(10);
            doc.text(item.label, 16, y); // Label text

            // Add value text (wrap into multiple lines if necessary)
            valueLines.forEach((line, index) => {
                doc.text(line, 16 + labelWidth + columnMargin, y + index * rowHeight); // Value text, wrapped
            });

            y += totalRowHeight;  // Move down for the next row (adjusted for wrapped text height)
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

            <div className={Classes.amount}>₹ {location?.state?.rowData?.amount || "NA"}</div>
            {/* <div className={Classes.date}>{response?.data?.txnData?.transactiondate}</div> */}
            <div className={Classes.date}>
                {location?.state?.rowData?.transactiondate
                    ? new Date(location?.state?.rowData?.transactiondate).toLocaleString('en-GB', {
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
                className={`${Classes.transactionheading} ${location?.state?.rowData?.responseCode === "00" || location?.state?.rowData?.responseCode === "0" ? Classes.success : Classes.failed}`}
            >
                {location?.state?.rowData?.responseCode === "00" || location?.state?.rowData?.responseCode === "0" || location?.state?.rowData?.responseCode === "300"
                    ? "Transaction Successful"
                    : "Transaction Failed"
                }
            </div>
            <div className={Classes.descMessage}>{location?.state?.rowData?.responseDesc || "NA"}</div>
            <div className={Classes.borderstyle}></div>

            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.headingttype}>Transaction Type</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.transType || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.headingttype}>RRN No</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.cbsrrn || "NA"}</div>
                </div>

            </div>

            <div className={Classes.headingttype}>Remitter Details</div>
            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>Remitter Account Number</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.remAccno || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Remitter Name</div>
                    <div className={Classes.detailsoutput}>{selectedAccountName || "NA"}</div>
                </div>
            </div>

            <div className={Classes.headingttype}>Beneficiary Details</div>
            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>Beneficiary Account Number</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.benAccno || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Beneficiary Name</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.benName || "NA"}</div>
                </div>
            </div>

            <div className={Classes.ttype}>
                <div className={Classes.leftDetails}>
                    <div className={Classes.detailsHeading}>IFSC Code</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.benIfsccd || "NA"}</div>
                </div>
                <div className={Classes.rightDetails}>
                    <div className={Classes.detailsHeading}>Naration</div>
                    <div className={Classes.detailsoutput}>{location?.state?.rowData?.remark || "NA"}</div>
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
                    Back
                </ColorButton2>
                <ColorButton1 variant="contained" type="submit" onClick={downloadReceipt}>
                    Download Receipt
                </ColorButton1>
            </div>
        </div>
    );
};

export default TransactionReceipt;
