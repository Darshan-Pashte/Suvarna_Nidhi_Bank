import React from "react";
import classes from "./AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
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
import BeneCard from "./BeneCard";
import { data } from "jquery";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import UpdateImpsOTP from "./UpdateImpsOtp";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import Loader from "../../../../../components/common/loader";
import MUIDataTable from "mui-datatables";
import AddBoxIcon from "@mui/icons-material/AddBox";

const defaultFormData = {
  email: "",
  password: "",
};

const AccountLimitIMPS = () => {
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

  const onSubmit = async (data) => {
    const payload = {
      username: data.email,
      password: data.password,
    };
    const response = await postApiData(apiList.LOGIN, payload);
    // console.log("response", response);

    if (response.status == false) {
      if (response.respCode == "NEW") {
        handleOpen();
      } else {
        popupAlert(response.message, "Error", "error");
      }
    } else {
      // dispatchSetUser({
      //   user: data?.email,
      //   token: response?.data?.sessionId,
      //   username: data?.email,
      // });
      // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
      // sessionStorage.setItem("menu", response?.data?.menu);
      sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);

      // sessionStorage.setItem("username", JSON.stringify(data.email));
      navigate("/dashboard");
      // navigate("/dashboard",{ state: { username: data.email} });
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
  };

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  // console.log("user", user);
  // console.log("accountList", accountList);
  useEffect(() => {
    if (accountList) {
      setValue(
        "accno1",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

  // console.log(watch("accno1")?.value);
  const accno = watch("accno1")?.value;
  useEffect(() => {
    Bene();
    // getAccountList();
  }, [watch("accno1")?.value]);

  const Bene = async (data) => {
    setIsloading(true);
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: watch("accno1")?.value,
    };
    const response = await postApiData(apiList.BENEFICIARYBROWSE, payload);
    // console.log("responseBene", response);
    if (response?.status == true) {
      setIsloading(false);
      setBene(response?.data.beneficiary);
    } else {
      setIsloading(false);
    }
  };

  const getAccountList = async () => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHACC, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setAccList(response?.data?.accountlst);

      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const benelist = "";

  const handleNavigate = (route) => {
    navigate(route, { state: { accno } });
  };

  const filteredData = [
    {
      code: 0,
      value: "392387650080214",
    },
    {
      code: 1,
      value: "492387650080214",
    },
    {
      code: 2,
      value: "592387650080214",
    },
  ];

  const filteredbene =
    bene &&
    bene.filter((item) => item.beneType == "E")?.map((benelist) => benelist);

  const handleRowClick = (rowData) => {
    // Store the selected row data in the state
    // setSelectedRow(rowData);

    // Navigate to the preview page
    navigate(`/fundtransfer/impsdetails`, { state: { rowData, accno } });
  };

  const handleadd = (rowData) => {
    // Open the component and pass the selected row data
    navigate(`/fundtransfer/impsdetails`, { state: { rowData, accno } });
  };
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
              fontSize: "larger",
            }}
          >
            Sorry, no matching records found
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "stacked",
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
      name: "pay",
      label: "Proceed To Pay",
      options: {
        filter: true,
        sort: false,

        customBodyRender: (value, { rowData }, tableMeta) => {
          // console.log("rowData",rowData,setUserData)
          const cellStyles = {
            cursor: "pointer",
          };
          return (
            <AddBoxIcon style={cellStyles} onClick={() => handleadd(rowData)} />
          );
        },
      },
    },

    {
      name: "nickname",
      label: "Nickname",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "accNo",
      label: "Account Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ifsc",
      label: "IFSC",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
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
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.mainpageBox}>
        <div className={classes.accountlimitimpxheading}>
          Immediate Payment Service (IMPS)
          <div className={classes.accountlimitaccinfo}>
            <div className={classes.accountlimitaccno}>Account</div>
            <div className={classes.frowdataaff}>
              <div className={classes.widthtfield}>
                <AutocompleteForm
                  controlerProps={{
                    control: control,
                    name: "accno1",
                  }}
                  TextFieldProps={{
                    style: { width: "18vw" },

                    placeholder: "Account Number",
                    onKeyDown: (event) => {
                      //const regex = /^[a-zA-Z]*$/;
                      // const regex = /^[0-9]*$/;
                      const regex = /^[a-zA-Z0-9]*$/;
                      const isBackspace = event.keyCode === 8;
                      const isValidInput = regex.test(event.key);
                      const currentInputValue = event.target.value;
                      const maxLength = 32;
                      const isMaxLengthReached = currentInputValue.length >= maxLength;
                      if ((!isValidInput && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
                        event.preventDefault();
                      }

                    },
                  }}
                  rules={{
                    required:
                      "Account " + errorMessages.error_autocomplete_message,
                  }}
                  data={accountList}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* *Indicates Mandatory Fields */}
        {/* Beneficiary List */}

        <Box className={classes.box1} component="form">
          <div className={classes.firsttabinfo}>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "0.1vw" }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <ColorButton1
                  variant="contained"
                  onClick={() => handleNavigate("/fundtransfer/impsdetails")}
                >
                  Instant Pay
                </ColorButton1>
              </Grid>

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
                    <BeneCard
                      benelist={benelist}
                      index={index}
                      accno={watch("accno1")?.value}
                    />
                  ))
              ) : (
                <Grid sx={{marginTop:"30px" , fontWeight:"bold"}} item xs={12} sm={12} md={12}>Nothing here please add some benefeciaries</Grid>
              )} */}

              <Grid item xs={12} sm={12} md={12}>
                <MUIDataTable
                  title={"Beneficiary List"}
                  // data={data ? data : []}
                  data={[...filteredbene]}
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
    </>
  );
};

export default AccountLimitIMPS;
