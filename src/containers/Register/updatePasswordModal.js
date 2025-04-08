import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../Register/Register.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextFieldForm from '../../components/common/textFieldForm';
import { Controller, useForm } from 'react-hook-form';
import { errorMessages } from '../../components/utilities/formValidation';
import { apiList } from '../../components/utilities/nodeApiList';
import Swal from 'sweetalert2';
import { postApiData } from '../../components/utilities/nodeApiServices';
import { ClassNames } from '@emotion/react';
import { TextField, styled } from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import { LoadingButton } from '@mui/lab';



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

const ColorButton = styled(Button)(({ theme }) => ({
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

const defaultFormData = {
    username: "",
    password: "",
    cpassword: ""
}


export default function UpdatePassword({ open, handleOpen, handleClose, userId }) {
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

    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setloading] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();

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

    // const [userName, setUserName] = React.useState("");

    // React.useEffect(() => {
    //   setUserName(sessionStorage.getItem("username"))
    // }, []);



    const onSubmits = async (data) => {
        const payload = {
            custNo : userId,
            otp : data.otp
        }
        setloading(true)
        const response = await postApiData(apiList.OTP, payload)
        if (response.status == true) {
            handleClose();
            // popupAlert(response.message, "Success", "Password Updated Succesfully");
            dispatch(loginSuccess(response.data));
setloading(false)
        } else {
            popupAlert(response.message, "Error", "error");
            setloading(false)
        }
    };


    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
  
            >
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmits)} className={classes.mainbox} >
                    <div className={classes.updatepass}>Please Enter OTP</div>
                    <Controller
                        name="otp"
                        control={control}
                        defaultValue=""
                        rules={{
                            required:
                                "OTP " + errorMessages.error_autocomplete_message,
                            pattern: {
                                value: /^\d{4}$/,
                                message: "OTP does not meet requirements",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                                const regex = /^[a-zA-Z@#.&0-9]+$/;
                                const { name, value } = event.target;
                                const isValidInput = regex.test(value) || value === "";
                                if (!isValidInput) {
                                    event.preventDefault();
                                    return;
                                }
                                field.onChange(value);
                            };
                            return <TextField
                                id="standard-adornment-password"
                                fullWidth="true"
                                placeholder="Please Enter OTP"
                                type={showPassword ? "text" : "password"}
                                {...field} 
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    ".MuiInputBase-root": {
                                        borderRadius: '10px',
                                        backgroundColor: "#E8F0FE"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),

                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={handleInputChange}
                            />
                        }
                        }
                    />
                   <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isLoading}
                  sx={{
                    color: "#FFFFFF",
                    // color:'var(--button-color)',
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    backgroundColor: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "115px",
                    height: "32px",
                    "&:hover": {
                      // background: "#808080",
                      background: "var(--button-hover-color)",
                      color: "white",
                    },
                  }}
                >
                  Register
                </LoadingButton>
                </Box>

            </Modal>
        </div>
    );
}