import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../../../../ForgetPassword/ForgetPassword.module.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { IconButton, TextField, styled } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { postApiData } from '../../../../../components/utilities/nodeApiServices';
// import { apiList } from '../../../components/utilities/nodeApiList';
import { apiList } from '../../../../../components/utilities/nodeApiList';

import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlertPopup from '../../../../../components/common/sweetAlertPopup';
import { LoadingButton } from "@mui/lab";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TimerComponent from '../../../../../components/common/TimerComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "15px"
};

const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
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

const defaultFormData = {
    username: "",
    password: "",
    cpassword: ""
}


export default function AddBeneficiaryInternalOtp({ open, handleOpen, handleClose, userId, payloads, custNo, payloadData ,payLoad,fileData,airtelFileUpload,setAirtelFile,response}) {
    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

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

    const [showPassword, setShowPassword] = React.useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();

    const [isOtpEntered, setIsOtpEntered] = useState(false);

    const [loadings, setloading] = useState(false);


    const [tries, setTries] = useState("");
    const [msg, setMsg] = useState("");

    const handleFocus = () => {
        // Clear the input value on focus
        setOtp('');
        setIsOtpEntered(false)

      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const popupAlert = (message, msgtype, msgicon) => {
        {
            Swal.fire({
                title: msgtype,
                text: message,
                icon: msgicon,
            });
        }
    };

    const handleExt=()=>{
        window.location.reload()
      }
    


  const onSubmit = async (data) => {
    setloading(true)
    const payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      accNo: payLoad.accnumber,
      nickname: payLoad.nickname,
      mobileNo: payLoad.mobilenum,
      otp:otp,
    };
    // setIsloading(true);
    const response = await postApiData(apiList.CORPORATE_BENEFICIARYADDINTERNAL, payload);
    if (response.status == true) {
        handleClose()
     SweetAlertPopup(response.message, "Success", "success");
     reset();
        // handleExt()
        setloading(false)
    } 
    
    else if(response.status == false){
        if(response?.respCode == "OE"){
            popupAlert(response.message, "Error", "error");
            setloading(false)
             handleClose();
            handleFocus();
            // handleFalse();
            reset();
            // window.location.reload();
          }
           
    else {
        setloading(false)

            // handleClose();
            handleFocus();
        //  popupAlert(response.message, "Error", "error")
        // seShowtMsg(true)
        setMsg(response.message)
            setTries(response?.data?.otpAttempt + 1);}
            reset();    
         
    }
    // else {
    //     handleClose()
    //     SweetAlertPopup(response.message, "Error", "error");
    //     setloading(false)
    //     //   setOtp(false);       
    // }
};
    
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)} className={classes.mainbox} style={{ borderRadius: '16px' }} >
                <div className={classes.otpContent}>
                        <div className={classes.modalupperheading}>OTP Verification</div>
                        <div className={classes.cancelButton}>
                            <IconButton aria-label="delete" onClick={handleClose}>
                                <HighlightOffIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div>
                        Enter the verification code we just sent to your number.
                    </div>
                    {!otp && <div style={{color:'red',marginBottom:'-10px'}}>{msg}</div>}
                    <OTPInput
                        value={otp}
                        // onChange={setOtp}

                        onChange={(otpValue) => {
                            const otpVal= otpValue.replace(/\D/g, ''); // Remove non-numeric characters
                            setOtp(otpVal)
                            setIsOtpEntered(otpVal.length > 3);
                          }}
                        numInputs={4}
                        // renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputType="password"
                        inputStyle={{
                            width: "70px",
                            marginBottom: "10px",
                            marginTop: '10px',
                            height: "60px",
                            fontSize: '20px',
                            borderRadius: '9px',
                            // borderColor:'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
                        }}

                        containerStyle={{
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                    />
                    <TimerComponent
            Case="Minutes"
            setOtp={handleClose}
            Time={response?.otpTime}
          />
                                          {tries ?  <div style={{color:'red',marginTop:'-10px'}}>You have {tries} attempt left</div> : null}
                    <div className={classes.button}>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={loadings}
                            disabled={!isOtpEntered}
                            sx={{
                                color: "#FFFFFF",
                                // backgroundColor: "#F84B67",
                                // backgroundColor: "#323232",
                                backgroundColor: "var(--button-color)",
                                border: "1px solid #CCC",
                                borderRadius: "8px",
                                paddingLeft: "15px",
                                paddingRight: "15px",
                                width: "133px",
                                height: "35px",
                                "&:hover": {
                                    background: "#808080",
                                    color: "white",
                                },
                            }}
                        >
                            Submit
                        </LoadingButton>
                    </div>

                </Box>

            </Modal>
        </div>
    );
}