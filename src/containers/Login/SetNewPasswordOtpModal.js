import * as React from "react";
import Box from "@mui/material/Box";
import classes from "./Login.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldForm from "../../components/common/textFieldForm";
import { Controller, useForm } from "react-hook-form";
import { errorMessages } from "../../components/utilities/formValidation";
import { apiList } from "../../components/utilities/nodeApiList";
import Swal from "sweetalert2";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { ClassNames } from "@emotion/react";
import { TextField, styled } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    borderRadius: '17px'
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

const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
     background: "var(--button-color)",
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
}));

const defaultFormData = {
    username: "",
    password: "",
    cpassword: "",
};

export default function SetNewPasswordOtpModal({
    open,
    handleClose,
    userId,
}) {
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

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    // React.useEffect(() => {
    //     setValue("username", userId);
    //     // setLastLogin(sessionStorage.getItem("lastLogin"))
    // }, []);

    const [showPassword, setShowPassword] = React.useState(false);

    const [showPassword1, setShowPassword1] = React.useState(false);

    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
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

    // console.log('uiserid',userId)
    const onPasswordUpadate = async (data) => {
        const payload = {
            username: userId,
            otp: data?.otp,
            newpassword: data.newpassword,
        };
        const response = await postApiData(apiList.CORPORATESETPASSWORD, payload);
        if (response.status == true) {
            SweetAlertPopup(response.message, "Success", "success");
            handleClose()
        } else {
            SweetAlertPopup(response.message, "Error", "error");
            handleClose()
        }
    };

    const passwordMatchValidation = (value) => {
        const newPassword = getValues("newpassword");
        return newPassword === value || "New password and confirm password does not match !";
    };


    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    component={"form"}
                    onSubmit={handleSubmit(onPasswordUpadate)}
                    className={classes.mainbox}
                >
                    <div className={classes.updatetpinheader}>Update Password</div>
                    {/* <div className={classes.updatepass}>Old Password <sup className={classes.required}>*</sup></div>
                    <Controller
                        name="oldpassword"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Password " + errorMessages.error_autocomplete_message,
                            pattern: {
                                // value: /^\d{4}$/,
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: "Password does not meet requirements",
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
                            return (
                                <TextField
                                    id="standard-adornment-password"
                                    fullWidth="true"
                                    placeholder="Please Enter Old Password"
                                    type={showPassword ? "text" : "password"}
                                    {...field}
                                    sx={{
                                        "& fieldset": { border: "none" },
                                        ".MuiInputBase-root": {

                                            borderRadius: '6px',
                                            position: 'relative',
                                            backgroundColor: '#FFF',
                                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                            border: '1px solid',
                                            fontSize: '13px',
                                            height: "2px",
                                            color: '#888',
                                            fontWeight: '500',
                                            padding: '16px 0px',
                                        },
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
                            );
                        }}
                    /> */}
                    <div className={classes.updatepass}>OTP <sup className={classes.required}>*</sup></div>

                    <Controller
                        name="otp" // The name should match the key in 'data' object in onSubmit
                        control={control}
                        defaultValue="" // Set an initial value if needed
                        rules={{
                            required:
                                "OTP " + errorMessages.error_autocomplete_message,
                            pattern: {
                                value: /^[0-9]{4,}$/, // This pattern allows only digits and requires at least 4 digits
                                message: "OTP must contain only digits and have at least 4 digits",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                                const regex = /^[0-9]+$/;
                                const { name, value } = event.target;
                                const isValidInput = regex.test(value) || value === "";

                                if (!isValidInput) {
                                    event.preventDefault();
                                    return;
                                }

                                field.onChange(value);
                            };

                            return (
                                <TextField
                                    id="standard-adornment-password"
                                    fullWidth="true"
                                    placeholder="Enter OTP "
                                    maxLength={4}
                                    type={showPassword ? "text" : "password"}
                                    {...field} // Spread the 'field' props to bind it to the form's state
                                    sx={{
                                        "& fieldset": { border: "none" },
                                        ".MuiInputBase-root": {
                                            borderRadius: '6px',
                                            position: 'relative',
                                            backgroundColor: '#FFF',
                                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                            border: '1px solid',
                                            fontSize: '13px',
                                            height: "2px",
                                            color: '#888',
                                            fontWeight: '500',
                                            padding: '16px 0px',
                                        },
                                    }}
                                    inputProps={{ maxLength: 4, minLength: 4 }}

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {!showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    onChange={handleInputChange}
                                // error={field.error} // Pass the error state here
                                // helperText={passwordError ? "Password does not meet requirements" : ""}
                                />
                            );
                        }}
                    />

                    <div className={classes.updatepass}>New Password<sup className={classes.required}>*</sup></div>
                    <Controller
                        name="newpassword"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Password " + errorMessages.error_autocomplete_message,
                            // pattern: {
                            //     // value: /^\d{4}$/,
                            //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            //     message: "Password does not meet requirements",
                            // },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,20}$/,
                                message: "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character (!@#$^&*._|-), and be between 8 and 16 characters in length.",
                              },
                        }}
                        render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                                // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                                const regex = /^[a-zA-Z@#.&0-9*/-]+$/;
                                const { name, value } = event.target;
                                const isValidInput = regex.test(value) || value === "";
                                if (!isValidInput) {
                                    event.preventDefault();
                                    return;
                                }
                                field.onChange(value);
                            };
                            const preventCopyPaste = (event) => {
                                event.preventDefault();
                              };
                            return (
                                <TextField
                                    id="standard-adornment-password"
                                    fullWidth="true"
                                    placeholder="Please Enter New Password"
                                    type={showPassword1 ? "text" : "password"}
                                    {...field}
                                    sx={{
                                        "& fieldset": { border: "none" },
                                        ".MuiInputBase-root": {

                                            borderRadius: '6px',
                                            position: 'relative',
                                            backgroundColor: '#FFF',
                                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                            border: '1px solid',
                                            fontSize: '13px',
                                            height: "2px",
                                            color: '#888',
                                            fontWeight: '500',
                                            padding: '16px 0px',
                                        },
                                    }}
                                    inputProps={{
                                        minLength: 8, // Minimum length
                                        maxLength: 20, // Maximum length
                                        onCopy: preventCopyPaste,
                                       onPaste: preventCopyPaste 
                                      }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword1}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {!showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    onChange={handleInputChange}
                                />
                            );
                        }}
                    />

                    <div className={classes.updatepass}>Confirm Password <sup className={classes.required}>*</sup></div>
                    <Controller
                        name="confirmpass"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Password " + errorMessages.error_autocomplete_message,
                            // pattern: {
                            //     // value: /^\d{4}$/,
                            //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            //     message: "Password does not meet requirements",
                            // },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*._|-])[a-zA-Z\d!@#$^&*._|-]{8,20}$/,
                                message: "Password does not meet requirements",
                              },
                            validate: passwordMatchValidation,
                        }}
                        render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                                // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                                const regex = /^[a-zA-Z@#.&0-9*/-]+$/;
                                const { name, value } = event.target;
                                const isValidInput = regex.test(value) || value === "";
                                if (!isValidInput) {
                                    event.preventDefault();
                                    return;
                                }
                                field.onChange(value);
                            };

                            const preventCopyPaste = (event) => {
                                event.preventDefault();
                              };

                            return (
                                <TextField
                                    id="standard-adornment-password"
                                    fullWidth="true"
                                    placeholder="Please Confirm Password"
                                    type={showPassword2 ? "text" : "password"}
                                    {...field}
                                    sx={{
                                        "& fieldset": { border: "none" },
                                        ".MuiInputBase-root": {

                                            borderRadius: '6px',
                                            position: 'relative',
                                            backgroundColor: '#FFF',
                                            // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                            border: '1px solid',
                                            fontSize: '13px',
                                            height: "2px",
                                            color: '#888',
                                            fontWeight: '500',
                                            padding: '16px 0px',
                                        },
                                    }}
                                    inputProps={{
                                        minLength: 8, // Minimum length
                                        maxLength: 20, // Maximum length
                                        onCopy: preventCopyPaste,
                                       onPaste: preventCopyPaste 
                                      }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {!showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    onChange={handleInputChange}
                                />
                            );
                        }}
                    />

                    <ColorButton1 variant="contained" type="submit">
                        Submit
                    </ColorButton1>
                </Box>
            </Modal>
        </div>
    );
}
