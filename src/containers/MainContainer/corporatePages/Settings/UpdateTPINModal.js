import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../../../Login/Login.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { errorMessages } from "../../../../components/utilities/formValidation";

import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { TextField, styled } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
// import { loginSuccess } from "../../store/authSlice";


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
  borderRadius:'17px'
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
  background: "#183883",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "123px",
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

export default function UpdateTPINModal({
  openTPIN,
  handleCloseTPIN,
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

  React.useEffect(() => {
    setValue("username", userId);
    // setLastLogin(sessionStorage.getItem("lastLogin"))
  }, []);

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

  const onSubmits = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,

      tpin: data.newpassword,
    };
    const response = await postApiData(apiList.UPDATETPIN, payload);
    if (response.status == true) {
      handleCloseTPIN();
      SweetAlertPopup(response.message, "Success", "success");
    } else {
      handleCloseTPIN();
      SweetAlertPopup(response.message, "Error", "error");
    }
  };

  const passwordMatchValidation = (value) => {
    const newPassword = getValues("newpassword");
    return newPassword === value || "New password and confirm password does not match !";
  };

//   rules={{
//     required: "Password " + errorMessages.error_autocomplete_message,
//     pattern: {
//       // value: /^\d{4}$/,
//       value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
//       message: "Password does not meet requirements",
//     },
//     validate: passwordMatchValidation,
//   }}

  return (
    <div>
      <Modal
        open={openTPIN}
        // onClose={handleCloseTPIN}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component={"form"}
          onSubmit={handleSubmit(onSubmits)}
          className={classes.mainbox}
        >
            <div className={classes.updatetpinheader}>Update TPIN</div>
         

          <div className={classes.updatepass}>New TPIN<sup className={classes.required}>*</sup></div>
          <Controller
            name="newpassword"
            control={control}
            defaultValue=""
            rules={{
              required: "TPIN " + errorMessages.error_autocomplete_message,
            //   pattern: {
            //     // value: /^\d{4}$/,
            //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            //     message: "Password does not meet requirements",
            //   },
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
                  placeholder="Please Enter New TPIN"
                  type={showPassword1 ? "text" : "password"}
                  {...field}
                  sx={{
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": {
                        marginTop:'3px',
                     
                        borderRadius: '6px',
                position: 'relative',
                backgroundColor: '#FFF',
                // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
            border: '1px solid',
              fontSize: '13px',
                height : "2px",
                color: '#888',
                fontWeight:'500',
                padding: '16px 0px',
                    },
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

          <div className={classes.updatepass}>Confirm TPIN <sup className={classes.required}>*</sup></div>
          <Controller
            name="confirmpass"
            control={control}
            defaultValue=""
            rules={{
              required: "TPIN " + errorMessages.error_autocomplete_message,
            //   pattern: {
            //     // value: /^\d{4}$/,
            //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            //     message: "Password does not meet requirements",
            //   },
              validate: passwordMatchValidation,
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
                  placeholder="Please Confirm TPIN"
                  type={showPassword2 ? "text" : "password"}
                  {...field}
                  sx={{
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": {
                        marginTop:'3px',
                        borderRadius: '6px',
                        position: 'relative',
                        // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                        backgroundColor: '#FFF',
                        // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                   
                        
                        border: '1px solid',
                        // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                        // borderColor: 'red',
                        fontSize: '13px',
                        height : "2px",
                        color: '#888',
                        fontWeight:'500',
                        
                        // width: '520px',
                        padding: '16px 0px',
                    },
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
