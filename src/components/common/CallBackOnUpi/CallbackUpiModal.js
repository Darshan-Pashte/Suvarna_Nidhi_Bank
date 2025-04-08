import * as React from 'react';
import Box from '@mui/material/Box';
import classes from './Callback.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { AuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { postApiData } from '../../utilities/nodeApiServices';
import { apiList } from '../../utilities/nodeApiList';
import SweetAlertPopup from '../sweetAlertPopup';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    // boxShadow: 24,
    // p: 4,
};


export default function CallbackUpiModal({ open, handleOpen, handleClose, rowDataToDisplay, data, show, title }) {
    const { state: user } = React.useContext(AuthContext);
    const [username, setUserName] = useState("");
    const [token, setToken] = useState("");
    const [banksCode, setbanksCode] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setUserName(sessionStorage.getItem("username"));
        setToken(sessionStorage.getItem("TOKEN"));
      }, []);

    const vpaCreate = async () => {
        try {
          setIsloading(true)
          const payload = {
            requestCode: "sendCallbackToBank",
            userId: username,
            sessionId: token,
            data: data.hdnOrderId
    
          };
          const response = await postApiData(apiList.ShankarSirsUrl, payload);
        //   console.log(response);
          handleClose();
          if (response.respCode === "00") {
            // Show a success message using SweetAlert
            SweetAlertPopup(response?.respMsg, "Success", "success");
          } else {
            SweetAlertPopup(response?.respMsg, "Error", "error");
          }
          setIsloading(false)
        } catch (err) {
        //   console.log(err);
          setIsloading(false)
        }
      };

    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >

                <Box sx={style} className={classes.popup}>
                    <div className={classes.header}>
                    <div className={classes.headerTitle}>   </div>
                    <Button onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                    <div className={classes.modalContent}>
                        <div className={classes.text}>
                            <div className={classes.fetchBalance}>
                                Please Confirm Your Details
                            </div>
                            <div className={classes.balance}>
                                Your Bank Code is <div className={classes.balance1}>{data.bankcode}</div>
                            </div>
                            <div className={classes.balance}>
                                HDN Order ID is <div className={classes.balance1}>{data.hdnOrderId}</div>
                            </div>
                            <div className={classes.balance}>
                                Amount is <div className={classes.balance1}>{data.amount}</div>
                            </div>
                            <div className={classes.balance}>
                                Payee VPA <div className={classes.balance1}>{data.payeeVPA}</div>
                            </div>
                            <div className={classes.balance}>
                                Payer VPA <div className={classes.balance1}>{data.payerVPA}</div>
                            </div>
                            <div className={classes.balance}>
                                Transaction Status <div className={classes.balance1}>{data.txnStatus}</div>
                            </div>
                            <div className={classes.balance}>
                                CBS Response <div className={classes.balance1}>{data.cbRespMsg}</div>
                            </div>
                        </div>
                        <div className={classes.callbackbutton}>
                            <Button onClick={vpaCreate}>CallBack</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}