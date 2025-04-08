import classes from '../UploadFile/UploadFile.module.css'

import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { useForm } from "react-hook-form";
import { postApiData, postfileData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import Loader from "../../../../components/common/loader";
import UploadContainer from "../../../../components/common/UploadContainer/UploadContainer";
import axios from "axios";
import { REMOVE_USER } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { UploadFile } from '@mui/icons-material';

const channelList = [
  {
    value: "WEB"
  },
  {
    value: "Mobile"
  }
]

const defaultFormData = {
  bankCode: "",
  bankName: "",
  channel: "",
  emailid: "",
  callbackUrl: "",
  // mid: "",
};



const UploadFileOtherFile = () => {
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
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [bankNamee, setbankNamee] = useState([]);
  const [isLoading,setIsloading]=useState(false);
  const [fieldValue, setFieldValue] = useState([]);
  const navigate = useNavigate();


  const Soundbox = [
    {
      value : "YES",
      code : 'Y'
    },
    {
      value : "NO",
      code : 'N'
    },
  ]

//   useEffect(() => {
//     setUserName(sessionStorage.getItem("username"));
//     setToken(sessionStorage.getItem("TOKEN"));
//   }, []);

//   useEffect(() => {
//     setIsloading(true)
//       vpaCreate();
//       setIsloading(false)
//   }, [token, username])

  const vpaCreate = async () => {
    try {
      const payload = {
        requestCode: "getMasterMerchantList",
        userId: username,
        sessionId: token,
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      setbankNamee(response.data);
      if(response.respCode=="IS"){
        navigate("/auth/login")
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
    } catch (err) {
      // console.log(err);
    }
  }

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const onSubmit = async (data) => {
    try {
      if (!file) {
        alert('Please select a file before submitting.');
        return;
      }
      const data = {
         requestCode : "submitOnboardedVPA",
         userId :username,
         sessionId : token,
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(data));
      // const response = await axios.post(vpafileupload, formData);

      // console.log('File uploaded successfully:', response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    // color: "#FFFFFF",
    color: "#000000",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    backgroundColor: "#fff",
    border: "1px solid #000",
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

  return (
   <>
   {
    isLoading ? <Loader/> : (
      <Box
      className={classes.mainContainer}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes.Sbox}>
        <div>
          <div className={classes.formbox}>
            <Grid
              container
              columnSpacing={5}
              rowSpacing={5}
              style={{ padding: '1vw' }}
            >


              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frow1aff}>
                  {/* <UploadContainer name='businessproof' id='businessproof' setFieldValue={setFieldValue} /> */}
                  <div>
                  <h3>File Upload<sup className={classes.required}>*</sup></h3>
                    <input type="file" name="file" className={classes.inputfile} accept=".xlsx" onChange={handleFileChange} />
                    </div>
                  </div>
                </div>
              </Grid>

            </Grid>
            <div className={classes.fbut}>
              {/* <ColorButton variant="contained" type="submit">
            Cancel
              </ColorButton> */}
          
            </div>
          </div>
        </div>
      </div>
    </Box>
    )
   }
   </>
  );
};

export default UploadFileOtherFile;
