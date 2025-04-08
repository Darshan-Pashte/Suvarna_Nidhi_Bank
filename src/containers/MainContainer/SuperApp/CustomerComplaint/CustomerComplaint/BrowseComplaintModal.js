import * as React from 'react';
import Box from '@mui/material/Box';
import classes from './BrowseComplaintModal.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40vw",
    bgcolor: 'background.paper',
    
};


export default function BrowseComplaintModal({ open, handleOpen, handleClose, rowDataToDisplay, data,show ,title}) {
    const { headers, rowData } = rowDataToDisplay;
    // const filteredRowData = rowData.filter((_, index) => headers.includes(rowDataToDisplay.headers[index]));
    // const headerDataMap = {};
    // headers.forEach((header, index) => {
    //   headerDataMap[header] = rowData[index];
    // });

    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
               <Box className={classes.popup}>
                    <div className={classes.header}>
                    <div className={classes.headerTitle}>{title}</div>
                    <Button onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                    <div className={classes.modalContent}>
                        <table>
                            <tbody>
                                {headers.map((header, i) => (
                                    <tr key={i} className={classes.tableHead}>
                                        <td className={classes.tableHead}>{header}</td> 
                                        {
                                            show==="1" ? <td>{rowData[i+1]}</td> : <td>{rowData[i+2]}</td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}