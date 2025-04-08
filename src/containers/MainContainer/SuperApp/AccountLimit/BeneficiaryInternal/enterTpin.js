import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../../../../Login/Login.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { TextField, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import OTPInput from "react-otp-input";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { LoadingButton } from "@mui/lab";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
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

const ColorButton1 = styled(LoadingButton)(({ theme }) => ({
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
  // backgroundColor: "#323232",
  background: "var(--button-color)",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "123px",
  height: "32px",
  "&:hover": {
    background: "var(--button-hover-color)",
    color: "white",
  },
}));

const defaultFormData = {
  username: "",
  password: "",
  cpassword: "",
};

export default function EnterTpin({
  open,
  handleClose,
  userId,
  rowData
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

  const [tpin, setTpin] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const [showPassword1, setShowPassword1] = React.useState(false);

  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();


  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [isloading, setIsloading] = useState(false);

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

  const handleExt = () => {
    window.location.reload()
  }

  const onSubmits = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      nickname: rowData[0],
      // tpin : data?.tpin
      tpin: tpin

    };
    setIsloading(true)
    const response = await postApiData(apiList.BENEFICIARYDELETE, payload);
    if (response.status == true) {
      handleClose();
      SweetAlertPopup(response.message, "Success", "success");
      setTimeout(() => {
        handleExt()
      }, 3000)
      setIsloading(false)
    } 
    else if (response?.data?.tpinAttempt >= 0) {
      SweetAlertPopup(
        response?.message +
          "\n" +
          (response?.data.tpinAttempt + 1) +
          " Attempts Remaining",
        "Error",
        "error"
      );
      setIsloading(false);
    } else {
      handleClose();
      SweetAlertPopup(response.message, "Error", "error");
      // handleExt()
      setIsloading(false)
    }
  };

  // console.log("userId", userId);

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
          onSubmit={handleSubmit(onSubmits)}
          className={classes.mainbox}
          style={{ borderRadius: '16px' }}
        >
          

          <div className={classes.otpContent}>
          <div className={classes.modalupperheading}>Enter TPIN to delete beneficiary</div> 
                        <div className={classes.cancelButton}>
                            <IconButton aria-label="delete"  onClick={handleClose}>
                                <HighlightOffIcon />
                            </IconButton>
                        </div>
                    </div>
          <div className={classes.updatepass}>Please Enter Tpin
            <sup className={classes.required}>*</sup> </div>
          {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "tpin",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                       
                        placeholder: "Enter Tpin ",
                       
                        fullWidth: true,
                        inputProps: { maxLength: 4 },
                      }}
                      backgroundColor={true}
                      regExp={/^[0-9]*$/}
                      rules={{
                        required:
                          "  Tpin " +
                          errorMessages.error_autocomplete_message,
                        pattern: {
                          value: /^\d{4}$/,
                          message: "Please Enter valid TPIN Format",
                        },
                      }}
                      required={true}
                    /> */}


          <OTPInput
            value={tpin}
            // onChange={setTpin}

            onChange={(otpValue) => {
              const otpVal= otpValue.replace(/\D/g, ''); // Remove non-numeric characters
              setTpin(otpVal)
              setIsOtpEntered(otpVal.length > 3);
            }}
            numInputs={4}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputType="password"
            inputStyle={{
              width: "60px",
              marginBottom: "10px",
              marginTop: '10px',
              height: "60px",
              fontSize: '20px',
              borderRadius: '10px',
              borderColor: 'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
            }}

            containerStyle={{
              display: 'flex',
              justifyContent: 'space-between'

            }}
          />


          <ColorButton1 loading={isloading} variant="contained" type="submit" disabled={!isOtpEntered}>
            Submit
          </ColorButton1>
        </Box>
      </Modal>
    </div>
  );
}
