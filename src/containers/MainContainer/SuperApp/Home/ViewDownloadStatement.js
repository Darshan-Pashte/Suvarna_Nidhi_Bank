

import React from "react";
import classes from "./Home.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Modal, TextField } from "@mui/material";
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
import TextFieldForm from "../../../../components/common/textFieldForm";
import { data } from "jquery";
import { getApiData, getApiDataPdf, postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import Loader from "../../../../components/common/loader";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import MUIDataTable from "mui-datatables";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GridTablePagination from "../../../../components/common/gridTablePagination";
import { convertDate } from "../../../../components/utilities/convertDate";
import GoBackButton from "../../../../components/common/GoBackButton";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
const defaultFormData = {
  email: "",
  password: "",
};

const ViewDownloadStatement = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [bene, setBene] = useState("");
  const [accList, setAccList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [responseData, setResponseData] = useState({});


  const style = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    [theme.breakpoints.down('sm')]: {
      width: '90%', // Adjust width for small screens
      p: 2, // Reduce padding
      gap: "20px", // Reduce gap
    },
    [theme.breakpoints.down('md')]: {
      width: '80%', // Adjust width for medium screens
    },
  });

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

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

  const state = useLocation()
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
  const DownloadButtonWithModal = ({ status, rowData, handleDownloadPDF }) => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

    const handleConfirmDownload = () => {
      handleCloseModal();
      handleDownloadPDF(rowData); // Trigger the file download
    };

    return (
      <>
        {status === "Completed" ? (
          <>
            <IconButton onClick={handleOpenModal}>
              <CloudDownloadIcon />
            </IconButton>


            {/* <Dialog
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="confirm-download-title"
              aria-describedby="confirm-download-description"
            >
              
              <DialogContent>
                <DialogContentText id="confirm-download-description">
                  Dear Customer to maintain confidentiality and protect your privacy your e-statement is password protected.
                  <br />
                  e-Statement Password:
                  To view your Account e-Statement, simply enter your Customer Number as a password.
                  <br />
                  For example:
                  If your customer number is 123456, then your password will be 123456.
                  If your customer number is 004561, then your password will be 4561.
                  <br /><br />
                  Are you sure you want to download this file?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="secondary">
                  No
                </Button>
                <Button onClick={handleConfirmDownload} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog> */}

            <Modal
              open={openModal}
              // onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={(theme) => style(theme)}
                component={"form"}
                className={classes.mainbox}
                style={{ borderRadius: "16px", padding: "16px" }}
              >
               
                <div className={classes.statementmodal}>
                  <div className={classes.headingModalStatement}>
                     <div className={classes.cancelButton}>
                    <IconButton aria-label="close" onClick={handleCloseModal} style={{color: 'red'}}>
                      <HighlightOffIcon />
                    </IconButton>
                  </div>
                    Dear Customer, to maintain confidentiality and protect your privacy, your e-statement is password protected.<br/>
                    <br />
                    <strong>e-Statement Password:</strong>
                    <br />
                    To view your Account e-Statement, simply enter your Customer Number as a password.
                    <br />
                    For example:
                    <br />
                    - If your customer number is <strong>123456</strong>, then your password will be <strong>123456</strong>.
                    <br />
                    - If your customer number is <strong>004561</strong>, then your password will be <strong>4561</strong>.
                    <br /><br />
                    <b>Are you sure you want to download your e-statement?</b>
                  </div>
                  {/* <div className={classes.cancelButton}>
                    <IconButton aria-label="close" onClick={handleCloseModal}>
                      <HighlightOffIcon />
                    </IconButton>
                  </div> */}
                </div>

                
                <div className={classes.buttonDownloadStatement}>
                  <ColorButton1 onClick={handleCloseModal}>
                    No
                  </ColorButton1>
                  <ColorButton2 onClick={handleConfirmDownload} >
                    Yes
                  </ColorButton2>
                </div>
              </Box>
            </Modal>

          </>
        ) : (
          <div>Please Wait...</div>
        )}
      </>
    );
  };


  useEffect(() => {
    getTransactionListView(1)
  }, [])

  const getTransactionListView = async (currentPage) => {


    setCurrentPage(currentPage)
    setIsloading(true);
    try {
      const payload = {
        accType: state?.state,
        custNo: user?.userId,
        sessionId: user?.sessionId,
      };

      const response = await postApiData(
        apiList.PDF_REQUEST_VIEW + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response.status == true) {
        setResponseData(response?.data)
        settotalRecord(response?.data?.totalRecords)
      } else {
        setResponseData("")
        settotalRecord("")
        // SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };





  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  useEffect(() => {
    if (accountList) {
      setValue(
        "accno",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);



  const accno = watch("accno")?.value;
  const handleRowClick = (rowData) => {
    // Store the selected row data in the state
    // setSelectedRow(rowData);

    // Navigate to the preview page
    navigate(`/fundtransfer/neftdetails`, { state: { rowData, accno } });
  };

  const handleadd = (rowData) => {
    // Open the component and pass the selected row data
    navigate(`/fundtransfer/neftdetails`, { state: { rowData, accno } });
  };

  console.log("session", user?.sessionId);

  const handleDownloadPDF = async (data) => {
    try {
      const response = await fetch(`${apiList.PDF_DOWNLOAD}/${data[6]}/${data[3]}/${user?.sessionId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data[3];
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      // console.log(err);
    }
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

    // {
    //   name: "download",
    //   label: "Download",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const status = tableMeta.rowData[columns.findIndex((col) => col.name === 'activitystatus')];

    //       if (status === "Completed") {
    //         return (
    //           <IconButton onClick={() => handleDownloadPDF(tableMeta.rowData)}>
    //             <CloudDownloadIcon />
    //           </IconButton>
    //         );
    //       } else {
    //         return <div>Please Wait...</div>;
    //       }
    //     },
    //   },
    // },


    {
      name: "download",
      label: "Download",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const status = tableMeta.rowData[columns.findIndex((col) => col.name === 'activitystatus')];

          return (
            <DownloadButtonWithModal
              status={status}
              rowData={tableMeta.rowData}
              handleDownloadPDF={handleDownloadPDF}
            />
          );
        },
      },
    },

    {
      name: "fromdt",
      label: "From Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Todt",
      label: "To Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "fileName",
      label: "File Name",
      options: {
        filter: true,
        sort: false,
      },
    },



    {
      name: "activitystatus",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "virtualAccno",
      label: "Account Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "createdBy",
      label: "Created By",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "createdDate",
      label: "Created Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: "activitystatus",
    //   label: "Status",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
  ];

  const options = {
    textLabels: {
      body: {
        noMatch: (
          <div
            style={{
              display: "flex",
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "larger"
            }}
          >
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
    customFooter: () => {
      return (
        <GridTablePagination
          currentPage={currentPage}
          totalCount={totalRecord}
          pageSize={goPageNumber}
          //   control={control}
          //   bulkNumberList={bulkNumberList}
          onPageChange={(page) => {
            getTransactionListView(page)
          }}
        />
      );
    },
  };

  // const ColorButton1 = styled(Button)(({ theme }) => ({
  //   color: "#FFFFFF",
  //   // backgroundColor: "#F84B67",
  //   // backgroundColor: "#323232",
  //   background: "var(--secondary-color)",
  //   border: "1px solid #CCC",
  //   borderRadius: "8px",
  //   paddingLeft: "15px",
  //   paddingRight: "15px",
  //   width: "183px",
  //   height: "40px",
  //   "&:hover": {
  //     background: "var(--button-color)",
  //     color: "white",
  //   },
  // }));

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#000000",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--secondary-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "8rem",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      width: "100%",
      height: "35px",
      
    },
  }));
  // const ColorButton2 = styled(Button)(({ theme }) => ({
  //   color: "#707070",

  //   // backgroundColor: "#F84B67",
  //   // backgroundColor: "#323232",
  //   background: "#FFF",
  //   border: "1px solid #707070",
  //   borderRadius: "8px",
  //   paddingLeft: "15px",
  //   paddingRight: "15px",
  //   width: "183px",
  //   height: "40px",
  //   "&:hover": {
  //     background: "#808080",
  //     color: "white",
  //   },
  // }));

  
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "8rem",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      width: "100%",
      height: "35px",
      
    },
  }));

  const name = "b";
  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Back
            </div>
          </div>
        </div>


      </div>
      <div className={classes.sbox}>
        <div className={classes.mainpageBox}>


          <Box
            className={classes.box1}
            component="form"
          //   onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.firsttabinfo}>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: "0.1vw" }}
              >
                {/* <Grid item xs={12} sm={12} md={12}>
                <ColorButton1
                  variant="contained"
                  type="submit"
                  onClick={handleBeneficiary}
                >
                  Instant Pay
                </ColorButton1>
              </Grid> */}

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.beneficiarytitle}
                >
                  {/* Beneficiary List */}
                </Grid>

                {/* {filteredbene && filteredbene.length > 0 ? (
                filteredbene
                  .filter((item) => item.beneType === "E")
                  .map((benelist, index) => (
                    <NeftCard
                      benelist={benelist}
                      index={index}
                      accno={watch("accno")?.value}
                    />
                  ))
              ) : (
                <Grid sx={{marginTop:"30px" , fontWeight:"bold"}} item xs={12} sm={12} md={12}>Nothing here please add some benefeciaries</Grid>
              )} */}

                <Grid item xs={12} sm={12} md={12}>
                  <MUIDataTable
                    title={"Statement List"}
                    // data={data ? data : []}
                    data={responseData ? responseData?.pdflist : []}
                    columns={columns}
                    options={options}
                  // options={{
                  // ...options,
                  // onRowClick: (rowData) => {
                  // console.log("rowData", rowData)
                  // handleRowClick(rowData)
                  // },
                  // }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}></Grid>

                <Grid item xs={12} sm={12} md={12}></Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ViewDownloadStatement;

