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
import Loader from "../../../../components/common/loader";
import { useState } from "react";
// import { loginSuccess } from "../../store/authSlice";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { LoadingButton } from "@mui/lab";
import { logout } from '../../../../store/authSlice';
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 325,
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
  height: "35px",
  "&:hover": {
    background: "var(--button-hover-color)",
    color: "white",
  },
}));

const defaultFormData = {
  mobileNo: "",
};

export default function UpdateMobileModal({
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

  const [isLoading, setIsloading] = useState(false);
  const { userType } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleLogout = async (data) => {
    if (userType === "corporate") {
      try {
        setIsloading(true);
        const payload = {
          username: user?.userId,
          sessionId: user?.sessionId
        };
        const response = await postApiData(apiList.LOGOUT, payload);
        console.log(response);
        if (response?.status === true) {
          dispatch(logout());
          navigate("/auth/login");
          setIsloading(false);
        }
      } catch (error) {
        console.log("An error occurred");
        setIsloading(false);
      }
    } else {
      try {
        setIsloading(true);
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId
        };
        const response = await postApiData(apiList.LOGOUT_INTERNET, payload);
        console.log(response);
        if (response?.status === true) {
          dispatch(logout());
          navigate("/auth/login");
          setIsloading(false);
        }
      } catch (error) {
        console.log("An error occurred");
        setIsloading(false);
      }
    }
  };

  const onSubmits = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      mobileNo: data.mobileNo,
    };
    setIsloading(true)
    const response = await postApiData(apiList.UPDATEMOBILE, payload);
    if (response.status == true) {
      handleCloseTPIN();
      SweetAlertPopup(response.message, "Success", "success");
      setIsloading(false);
      await handleLogout(data);
    } else {
      handleCloseTPIN();
      SweetAlertPopup(response.message, "Error", "error");
      setIsloading(false)
    }
  };

  return (
    <div>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

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

          <div className={classes.otpContent}>
            <div className={classes.updatetpinheader}>Update Mobile No.</div>
            <div className={classes.cancelButton}>
              <IconButton aria-label="delete" onClick={handleCloseTPIN}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.updatepass}>Mobile Number<sup className={classes.required}>*</sup></div>
          <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "mobileNo",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Mobole No.",
                        //   style: { width: "130%" },
                        fullWidth: true,
                        inputProps: {
                          minLength: 10,
                          maxLength: 10
                        }
                        // style:{border:'3px solid #ECECEC'}
                        
                      }}
                      regExp={/^[0-9]*$/}
                      rules={{
                        required:
                          "Mobole No." + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>

          <ColorButton1 loading={isLoading} variant="contained" type="submit">
            Submit
          </ColorButton1>
        </Box>
      </Modal>
    </div>
  );
}
