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
import PayButton from "../../../../../assets/PayButton.svg"
// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import { data } from "jquery";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import InternalCard from "./InternalCard";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import Loader from "../../../../../components/common/loader";
import MUIDataTable from "mui-datatables";
import AddBoxIcon from '@mui/icons-material/AddBox';
import GoBackButton from "../../../../../components/common/GoBackButton";

const defaultFormData = {
  email: "",
  password: "",
};

const AccountLimitInternal = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [bene, setBene] = useState([]);
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

  // console.log(watch("accno"));
  useEffect(() => {
    if (watch("accno")?.value) {
      Bene();
    }
    // getAccountList();
  }, [watch("accno")?.value]);

  const Bene = async (data) => {
    setIsloading(true)
    const payload = {
      custNo: user?.userId,
      sessionId: user?.sessionId,
      accNo: watch("accno")?.value
    };
    const response = await postApiData(apiList.BENEFICIARYBROWSE, payload);
    // console.log("responseBene", response);
    if (response?.status == true) {
      setIsloading(false)
      setBene(response?.data.beneficiary);
    }
    else {
      setIsloading(false)
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
      setValue("accno", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
    }
  }, [])

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

  const handleBeneficiary = () => {
    navigate("/fundtransfer/internaldetails");
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

  const filteredbene = bene && bene.filter((item) => item.beneType == "I")?.map((benelist) => benelist);


  const accno = watch('accno')?.value
  // console.log("bene", bene);
  // console.log("filteredbene", filteredbene);


  const handleRowClick = (rowData) => {
    // Store the selected row data in the state
    // setSelectedRow(rowData);

    // Navigate to the preview page
    navigate(`/fundtransfer/internaldetails`, { state: { rowData, accno } });
  };


  const handleadd = (rowData) => {
    // Open the component and pass the selected row data
    navigate(`/fundtransfer/internaldetails`, { state: { rowData, accno } });
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
        customBodyRender: (value, { rowData, rowIndex }, tableMeta) => {
          const color = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();

          // Define the SVG with the dynamic stroke color
          const svgContent = `
          <svg width="70" height="28" viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="69" height="27" rx="3.5" stroke="${color}"/>
          <path d="M37.3919 11.244L32.5899 22.668H30.5039L32.1839 18.804L29.0759 11.244H31.2739L33.2759 16.662L35.3059 11.244H37.3919Z" fill="${color}"/>
          <path d="M19.9797 15.094C19.9797 14.31 20.1337 13.6147 20.4417 13.008C20.7591 12.4013 21.1837 11.9347 21.7157 11.608C22.2571 11.2813 22.8591 11.118 23.5217 11.118C24.1004 11.118 24.6044 11.2347 25.0337 11.468C25.4724 11.7013 25.8224 11.9953 26.0837 12.35V11.244H28.0577V19H26.0837V17.866C25.8317 18.23 25.4817 18.5333 25.0337 18.776C24.5951 19.0093 24.0864 19.126 23.5077 19.126C22.8544 19.126 22.2571 18.958 21.7157 18.622C21.1837 18.286 20.7591 17.8147 20.4417 17.208C20.1337 16.592 19.9797 15.8873 19.9797 15.094ZM26.0837 15.122C26.0837 14.646 25.9904 14.24 25.8037 13.904C25.6171 13.5587 25.3651 13.2973 25.0477 13.12C24.7304 12.9333 24.3897 12.84 24.0257 12.84C23.6617 12.84 23.3257 12.9287 23.0177 13.106C22.7097 13.2833 22.4577 13.5447 22.2617 13.89C22.0751 14.226 21.9817 14.6273 21.9817 15.094C21.9817 15.5607 22.0751 15.9713 22.2617 16.326C22.4577 16.6713 22.7097 16.9373 23.0177 17.124C23.3351 17.3107 23.6711 17.404 24.0257 17.404C24.3897 17.404 24.7304 17.3153 25.0477 17.138C25.3651 16.9513 25.6171 16.69 25.8037 16.354C25.9904 16.0087 26.0837 15.598 26.0837 15.122Z" fill="${color}"/>
          <path d="M19.0921 12.252C19.0921 12.7747 18.9661 13.2647 18.7141 13.722C18.4714 14.1793 18.0841 14.548 17.5521 14.828C17.0294 15.108 16.3667 15.248 15.5641 15.248H13.9261V19H11.9661V9.228H15.5641C16.3201 9.228 16.9641 9.35866 17.4961 9.62C18.0281 9.88133 18.4247 10.2407 18.6861 10.698C18.9567 11.1553 19.0921 11.6733 19.0921 12.252ZM15.4801 13.666C16.0214 13.666 16.4227 13.5447 16.6841 13.302C16.9454 13.05 17.0761 12.7 17.0761 12.252C17.0761 11.3 16.5441 10.824 15.4801 10.824H13.9261V13.666H15.4801Z" fill="${color}"/>
          <circle cx="51" cy="14" r="7.5" stroke="${color}"/>
          <path d="M52.126 12.06V12.247H53.545V12.973H52.071C52.005 13.479 51.8583 13.875 51.631 14.161C51.411 14.447 51.0883 14.6523 50.663 14.777C50.245 14.9017 49.6877 14.964 48.991 14.964V15.833C48.991 16.823 49.4237 17.318 50.289 17.318C51.1397 17.318 51.565 16.8413 51.565 15.888H52.489C52.4817 16.6213 52.2873 17.175 51.906 17.549C51.5247 17.923 50.982 18.11 50.278 18.11C49.552 18.11 48.9983 17.9083 48.617 17.505C48.243 17.1017 48.056 16.537 48.056 15.811V14.26C48.892 14.26 49.508 14.2343 49.904 14.183C50.3073 14.1243 50.6007 14.007 50.784 13.831C50.9673 13.6477 51.0847 13.3617 51.136 12.973H47.561V12.247H51.18V12.049V11.059H47.561V10.322H53.545V11.059H52.126V12.06Z" fill="${color}"/>
          </svg>
          
          `;
          const encodedSvg =
            "data:image/svg+xml," + encodeURIComponent(svgContent);

          return (
            <img
              src={encodedSvg}
              alt="Eye Icon"
              onClick={() => handleadd(rowData)}
              style={{ cursor: "pointer" }}
              title="View Loan Details"
            />
          );
        },
        // customBodyRender: (value, { rowData }, tableMeta) => {
        //   return (
        //     <img style={{ cursor: "pointer" }} src={PayButton} onClick={() => handleadd(rowData)} />
        //   );
        // },
        
      },
    },

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
      name: 'virtualAccNo',
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
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },

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

  };


  const name = "b";
  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrows}>
        <div>
          <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Within Bank Fund Transfer
            </div>
          </div>
        </div>


        {/* <div className={classes.tabAutocomplete}>
          <div className={classes.SubHeading}>Account No.</div>
          <div className={classes.completeForm}>
          <AutocompleteForm
            controlerProps={{
              control: control,
              name: "accno",
            }}
            TextFieldProps={{
             

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
        </div> */}
      </div>

      {/* *Indicates Mandatory Fields */}
      {/* Beneficiary List */}
      <div className={classes.sbox}>
        <div className={classes.mainpageBox}>
          <Box
            className={classes.box1}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                  .filter((item) => item.beneType === "I")
                  .map((benelist, index) => (
                    <InternalCard
                      benelist={benelist}
                      index={index}
                      accno={watch("accno")?.value}
                    />
                  ))
              ) : (
                <Grid sx={{marginTop:"30px" , fontWeight:"bold"}} item xs={12} sm={12} md={12}>Nothing here please add some benefeciaries</Grid>
              )} */}

                {/* <Grid item xs={12} sm={12} md={12}>
                <table >
                  <tr>
                    <th>Name</th>
                    <th>Nickname</th>
                    <th>Account Number</th>
                  </tr>

                  {
                    filteredbene && filteredbene?.map((item,index)=>{
                      return(
                        <tr onClick={()=>navigate("/fundtransfer/internaldetails",{state:item})}>
                          <td>{item.name}</td>
                          <td>{item.nickname}</td>
                          <td>{item.accNo}</td>
                        </tr>
                      )
                    })
                  }
                </table>
              </Grid> */}

                <Grid item xs={12} sm={12} md={12}>

                  <MUIDataTable
                    title={"Beneficiary List"}
                    // data={data ? data : []}
                    data={filteredbene}
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
              </Grid>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AccountLimitInternal;
