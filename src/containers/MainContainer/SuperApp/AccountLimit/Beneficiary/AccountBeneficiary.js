import React from "react";
import classes from "./AccountLimit.module.css";

import { Link, useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import BeneficiaryCard from "./BeneficiaryCard";
import Loader from "../../../../../components/common/loader";
import AddExtBeneficiary from "./AddExtBeneficiaryModal";
import MUIDataTable from "mui-datatables";
// import { FontAwesomeIcon ,faArrowsRotate} from "@fortawesome/react-fontawesome";

import DeleteIcon from '@mui/icons-material/Delete'
import DeleteImg from "../../../../../assets/delete.svg"

import CachedIcon from '@mui/icons-material/Cached';
import EnterTpin from "./enterTpin";
import GoBackButton from "../../../../../components/common/GoBackButton";

const defaultFormData = {
  accnumber: "",
  password: "",
  accnumber: "",
  ifsccode: '',
  nickname: "",
  fullname: "",
  mobilenum: '',
  tpin: "",

};

const AccountBeneficiary = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsloading] = useState(false);
  const [bene, setBene] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletedRowData, setDeletedRowData] = useState(null);
  const handleCloseDelete = () => setOpenDeleteModal(false);
  const theme = useSelector((state) => state.theme.theme);



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
  const handlleNavigate = (route) => {
    navigate(route);
  };
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  const beneficiary = [
    {
      code: 0,
      value: "ABC",
    },
    {
      code: 1,
      value: "XYZ",
    },
  ];
  // useEffect(() => {
  //   if (error) {
  //     popupAlert("Please Enter Valid Credentials", "Error", "error");
  //     dispatch(clearErrors());
  //   }

  //   if (isAuthenticated) {
  //     navigate("/dashboard")
  //   }
  // }, [dispatch, error, navigate, isAuthenticated,popupAlert]);
  // const { dispatch: authDispatch } = useContext(AuthContext);
  // const dispatchSetUser = (payload) => {
  //   authDispatch({ type: SET_USER, payload });
  // };
  // const [passwordInput, setPasswordInput] = useState('password');



  // const handleExt=()=>{
  //   window.location.reload()
  // }




  // const handleExt=()=>{
  //  navigate('/beneficiarymanagements/addexternal')
  // }

  useEffect(() => {
    Bene();

  }, []);

  const Bene = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: ""
    };
    setIsloading(true);
    const response = await postApiData(apiList.BENEFICIARYBROWSE, payload);
    // console.log("responseBene", response);
    if (response?.status == true) {
      setBene(response?.data.beneficiary);
      setIsloading(false);
    }
    else {
      setIsloading(false);
    }
  };

  const handleDelete = (rowData) => {
    // Open the component and pass the selected row data
    handleOpenDeleteModal(rowData);
  };

  const handleOpenDeleteModal = (rowData) => {
    // Open your delete modal or component and pass the rowData
    setOpenDeleteModal(true);
    setDeletedRowData(rowData);
  };

  const onSubmit = async (data) => {
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: data.accnumber,
      ifsc: data.ifsccode,
      nickname: data.nickname,
      fullname: data.fullname,
      mobileNo: data.mobilenum,
      tpin: data.tpin
    };
    setIsloading(true);
    const response = await postApiData(apiList.BENEFICIARYADD, payload);
    // console.log("response", response);
    if (response?.status == true) {
      SweetAlertPopup(response?.message, "Success", "success")
      // handleExt()
      Bene()
      reset()
      setIsloading(false);
      // reset();
    } else {
      SweetAlertPopup(response?.message, "Error", "error")
      // handleExt()
      Bene()

      setIsloading(false);
      // reset();
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
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
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      background: "var(--button-color)",
      border: "1px solid #CCC",
      borderRadius: "14px",
      paddingLeft: "18px",
      paddingRight: "18px",
      width: "100%",
      height: "38px",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#707070",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#FFF",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));


  const handlerefresh = () => {
    Bene();
  }

  const filteredbene = bene && bene.filter((item) => item.beneType == "E")?.map((benelist) => benelist);


  const options = {
    textLabels: {
      body: {
        noMatch: (
          <div className="no-match">
            Sorry, no matching records found
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "standard",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,

  };

  const columns = [
    // {
    //   name: "View",
    //   label: "View",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, { rowData }, tableMeta) => {
    //       // return (
    //       //   <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} onClick={() => openModal(rowData)}> <VisibilityIcon /></Button>
    //       // );
    //     },
    //   }
    // },

    {
      name: 'nickname',
      label: 'Nickname',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'accNo',
      label: 'Account Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'ifsc',
      label: 'IFSC',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdDate',
      label: 'Created Date and Time',
      options: {
        filter: true,
        sort: false,
      },
    },


    {
      name: "Delete",
      label: "Delete",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta) => {
          // console.log("rowData",rowData,setUserData)
          const cellStyles = {
            cursor: 'pointer'
          };
          return (
            
           <img src={DeleteImg} alt="DeleteIcon" style={cellStyles} onClick={() => handleDelete(rowData)} />
          );
        },
      }
    },

  ];
  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <div className={`${classes.redrow} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
        <div style={{display:"flex",alignItems:"center", gap:'5px'}}>
          <GoBackButton/>
             <div className={classes.SubHeading}>
             Other Bank Beneficiary List
              </div>
              </div>
              </div>

      <div className={classes.sbox}>
      <div className={classes.Payment1MobilePrepaidMainPage}>

        <div className={classes.tableMainBoxInner}>
          <div className={classes.beneficiaryInternal}>
            <div className={classes.refreshInternal} >
              <Button disabled={isLoading} className={classes.refreshIcon}>
                <CachedIcon onClick={handlerefresh} />
              </Button>
            </div>
            <div className={classes.addbutton}>
              <ColorButton1 variant="contained" type="button" onClick={handleOpen}>Add Beneficiary</ColorButton1>
            </div>
          </div>

          <div className={classes.accountBeneficiaryuppercontainer}>

            <div className={classes.uppercontainercontent}>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: "0.1vw" }}
              >
                <Grid item xs={12} sm={12} md={12}>


                  <MUIDataTable
                    title={""}
                    // data={data ? data : []}
                    data={[...filteredbene]}
                    columns={columns}
                    options={options}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      </div>

      {open ? (
        <AddExtBeneficiary
          open={open}
          handleClose={handleClose}
          // userId={filteredbene}
          handlerefresh={onSubmit}
        />
      ) : null}
      {openDeleteModal ? (
        <EnterTpin
          open={openDeleteModal}
          handleClose={handleCloseDelete}
          // userId={filteredbene}
          rowData={deletedRowData}
        />
      ) : null}
    </>
  );
};

export default AccountBeneficiary;
