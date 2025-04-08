import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import styled from 'styled-components';
import { Button } from '@mui/base';

const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {

    const ColorButton1 = styled(Button)(({ theme }) => ({
        color: "#FFFFFF",
        // backgroundColor: "#F84B67",
        backgroundColor: "#323232",
        border: "1px solid #CCC",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "183px",
        height: "50px",
        "&:hover": {
          background: "#808080",
          color: "white",
        },
      }));

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');  
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 35, 35, 120,200);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <ColorButton1 onClick={downloadPdfDocument}>Download Pdf</ColorButton1>

}

export default GenericPdfDownloader;