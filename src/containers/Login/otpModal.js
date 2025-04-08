import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../ForgetPassword/ForgetPassword.module.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { TextField, styled } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { postApiData } from '../../components/utilities/nodeApiServices';
import { apiList } from '../../components/utilities/nodeApiList';
import { errorMessages } from '../../components/utilities/formValidation';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlertPopup from '../../components/common/sweetAlertPopup';
import { LoadingButton } from "@mui/lab";
import { loginSuccess, loginSuccessCorporate } from '../../store/authSlice';



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
    gap: "30px"
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


export default function OTPModal({ open, handleOpen, handleClose, userId, payloads, custNo }) {
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

    React.useEffect(() => {
        setValue("username", userId)
        // setLastLogin(sessionStorage.getItem("lastLogin"))
    }, []);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [otp, setOtp] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();

    const [isOtpEntered, setIsOtpEntered] = useState(false);

  const [loadings, setloading] = useState(false);


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

    function handleResetPass() {
        navigate('/auth/resetpassword', { state: { custNo: custNo, otp: otp } })
    }


    const onSubmits = async (data) => {

        const payload = {
            custNo: userId,
            otp: otp

        }
        const response = await postApiData(apiList.OTP, payload);
        if (response.status == true) {
          // popupAlert(response.message, "Success", "Password Updated Succesfully");
          dispatch(loginSuccessCorporate(response.data));
          setloading(false)
        } else {
          SweetAlertPopup(response.message, "Error", "error");
          setloading(false)
        //   setOtp(false);       
        }
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
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmits)} className={classes.mainbox} style={{ borderRadius: '16px' }} >
                    <div className={classes.otpheading}>OTP Verification</div>
                    <div>
                        Enter the verification code we just sent to your number.
                    </div>
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
                    backgroundColor: "#183883",
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
                  }}
                >
                  Login
                </LoadingButton>
              </div>

                </Box>

            </Modal>
        </div>
    );
}