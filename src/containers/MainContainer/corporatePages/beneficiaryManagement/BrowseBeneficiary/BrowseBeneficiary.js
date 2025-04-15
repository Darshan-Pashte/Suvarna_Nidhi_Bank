import React from "react";
import classes from "../Beneficiary/AccountLimit.module.css";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";

import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import Loader from "../../../../../components/common/loader";
import DeleteImg from "../../../../../assets/delete.svg"


import CachedIcon from '@mui/icons-material/Cached';
import MUIDataTable from "mui-datatables";
import OtpModalDeleteBeneficiary from "../Beneficiary/otpModalDeleteBeneficiary";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import GoBackButton from "../../../../../components/common/GoBackButton";

const defaultFormData = {
    accnumber: "",
    ifsccode: '',
    nickname: "",
    fullname: "",
    mobilenum: '',
};

const BeneficiaryTypeList = [
    {
        code: "I",
        value: "Within Bank",
    },
    {
        code: "E",
        value: "Other Bank",
    },
];

const BrowseBeneficiary = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLoading, setIsloading] = useState(false);
    const [bene, setBene] = useState([]);

    const [response, setResponse] = useState([]);
    const [payloadData, setPayloadData] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userId, setUserId] = useState("");
    const [payLoad, setPayload] = useState([]);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletedRowData, setDeletedRowData] = useState(null);
    const handleCloseDelete = () => setOpenDeleteModal(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    console.log("payloadData", payloadData)

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
    // const [passwordInput, setPasswordInput] = useState('password')


    // const handlerefresh = () => {
    //   Bene();
    // }

    const onSubmitDelete = async (rowData) => {

        const payload = {
            username: user?.userId,
            // nickname: "sunny",
            sessionId: user?.sessionId,
            smsType: "COR_ADD_BENEFICIARY"

            // otp: otp, 
        }
        setIsloading(true);
        const response = await postApiData(apiList.CORPORATE_BULKUPLOAD_OTP, payload);
        if (response.status == true) {
            setResponse(response)
            setPayloadData(rowData)
            handleOpen()
            // SweetAlertPopup(response.message, "Error", "error");

            // popupAlert(response.message, "Success", "success");
            setIsloading(false)
        } else {
            handleClose()
            SweetAlertPopup(response.message, "Error", "error");
            setIsloading(false)
            //   setOtp(false);       
        }
    };

    // useEffect(() => {
    //     Bene();

    // }, []);

    const Bene = async (data) => {
        const payload = {
            username: user?.userId,
            sessionId: user?.sessionId,
            acctNo: data?.accnumber,
            beneType: data.beneficiaryType.code,
            name: data.name,
            nickname: data.nickname,
            ifsc: data.ifsccode
        };
        setIsloading(true);
        const response = await postApiData(apiList.CORPORATE_BENEFICIARYBROWSE + "?pageNo=1&pageSize=10000", payload);
        // console.log("responseBene", response);
        if (response?.status == true) {
            setBene(response?.data.beneficiary);
            setIsloading(false);
        } else {
            SweetAlertPopup(response?.message, "Error", "error")
            setIsloading(false);
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            username: user?.userId,
            sessionId: user?.sessionId,
            smsType: "COR_ADD_BENEFICIARY"

            // accNo: data.accnumber,
            // ifsc: data.ifsccode,
            // nickname: data.nickname,
            // fullname: data.fullname,
            // mobileNo: data.mobilenum,
            // tpin : data.tpin
            // otp: otp,
        };
        // console.log('data', data)
        setIsloading(true);
        const response = await postApiData(apiList.CORPORATE_BULKUPLOAD_OTP, payload);
        // console.log("response", response);
        // handleOpen()
        if (response?.status == true) {
            setResponse(response)
            handleOpen()
            // SweetAlertPopup(response?.message, "Success", "success")
            // handleClose()  
            // handleExt()
            setIsloading(false);
            setPayload(data)
            reset();
        } else {
            // SweetAlertPopup(response?.message, "Error", "error")
            // handleExt()
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
        backgroundColor: "var(--button-color)",
        border: "1px solid #CCC",
        borderRadius: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "133px",
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

    // const filteredbene = bene && bene.filter((item) => item.beneType == "E");

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
        // {
        //     name: 'createdDate',
        //     label: 'Created Date and Time',
        //     options: {
        //         filter: true,
        //         sort: false,
        //     },
        // },


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

                        <img src={DeleteImg} alt="DeleteIcon" style={cellStyles} onClick={() => onSubmitDelete(rowData)} />
                    );
                },
            }
        },

    ];

    const columnsWithin = [
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
            name: 'virtualAccNo',
            label: 'Account Number',
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

                        <img src={DeleteImg} alt="DeleteIcon" style={cellStyles} onClick={() => onSubmitDelete(rowData)} />
                    );
                },
            }
        },

    ];

    return (
        <>
            {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
            <div className={classes.redrow}>
                <div>
                    <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
                        <GoBackButton />
                        <div className={classes.SubHeading}>
                            Beneficiary List
                        </div>
                    </div>
                </div>

            </div>
            <div className={classes.sbox}>

                {/* <Button disabled={isLoading} className={classes.refreshIcon}>
            <Tooltip title="Refresh">
              <IconButton>
                <CachedIcon onClick={handlerefresh} />
              </IconButton>
            </Tooltip>

          </Button> */}
                {/* <div className={classes.accountlimitimpxheading}></div> */}
                <Box
                    className={classes.box1}
                    component="form"
                    onSubmit={handleSubmit(Bene)}
                >
                    <div className={classes.firsttabinfo}>
                        <Grid
                            container
                            columnSpacing={4}
                            rowSpacing={2}
                            style={{ padding: "0.1vw" }}
                        >
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classes.frowdataaff}>
                                    <div className={classes.frowtextaff}>
                                        Beneficiary Type
                                        <sup className={classes.required}>*</sup>
                                    </div>
                                    <div className={classes.widthtfield}>
                                        <AutocompleteForm
                                            controlerProps={{
                                                control: control,
                                                name: "beneficiaryType",
                                            }}
                                            TextFieldProps={{
                                                // style: { width: "63%" },
                                                placeholder: "Beneficiary Type",
                                                onKeyDown: (event) => {
                                                    //const regex = /^[a-zA-Z]*$/;
                                                    const regex = /^[0-9]*$/;
                                                    const isBackspace = event.keyCode === 8;
                                                    const isValidInput = regex.test(event.key);

                                                    if (!isValidInput && !isBackspace) {
                                                        event.preventDefault();
                                                    }
                                                },
                                            }}
                                            rules={{
                                                required:
                                                    "Beneficiary Type " + errorMessages.error_autocomplete_message,
                                            }}
                                            data={BeneficiaryTypeList}
                                            required={true}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classes.frowdataaff}>
                                    <div className={classes.frowtextaff}>
                                        Account Number
                                    </div>
                                    <div className={classes.widthtfield}>
                                        <TextFieldForm
                                            controlerProps={{
                                                control: control,
                                                name: "accnumber",
                                            }}
                                            TextFieldProps={{
                                                placeholder: "Account Number ",
                                                fullWidth: true,
                                                inputProps: { minLength: 1, maxLength: 32 },
                                            }}
                                            // backgroundColor={true}
                                            // regExp={/^[0-9]*$/}
                                            regExp={/^[a-zA-Z0-9]*$/} 
                                            // rules={{
                                            //     required:
                                            //         "  Account Number " +
                                            //         errorMessages.error_autocomplete_message,
                                            //     pattern: {
                                            //         value: /^(?!0+$)\d{9,32}$/,
                                            //         message: "Please Enter a valid Account Number",
                                            //     },

                                            // }}
                                            required={false}
                                        />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classes.frowdataaff}>
                                    <div className={classes.frowtextaff}>
                                        IFSC Code
                                    </div>
                                    <div className={classes.widthtfield}>
                                        <TextFieldForm
                                            controlerProps={{
                                                control: control,
                                                name: "ifsccode",
                                            }}
                                            TextFieldProps={{
                                                placeholder: "IFSC Code",
                                                fullWidth: true,
                                                inputProps: { maxLength: 11 },
                                            }}
                                            // backgroundColor={true}
                                            regExp={/^[a-zA-Z0-9]+$/}
                                            // rules={{
                                            //     required:
                                            //         "  Beneficiary IFSC  " +
                                            //         errorMessages.error_autocomplete_message,

                                            //     pattern: {
                                            //         value: /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/,
                                            //         message:
                                            //             "Please enter a valid IFSC code",
                                            //     },
                                            // }}
                                            required={false}
                                        />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classes.frowdataaff}>
                                    <div className={classes.frowtextaff}>
                                        Nickname
                                    </div>
                                    <div className={classes.widthtfield}>
                                        <TextFieldForm
                                            controlerProps={{
                                                control: control,
                                                name: "nickname",
                                            }}
                                            TextFieldProps={{
                                                placeholder: "Nickname",
                                                fullWidth: true,
                                                inputProps: {
                                                    maxLength: 10
                                                }
                                            }}
                                            regExp={/^[a-zA-Z0-9]+$/}
                                            // rules={{
                                            //     required:
                                            //         "Nickname" + errorMessages.error_autocomplete_message,
                                            // }}
                                            required={false}
                                        />
                                    </div>
                                </div>
                            </Grid>



                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classes.frowdataaff}>
                                    <div className={classes.frowtextaff}>
                                        Account Holder Name
                                    </div>
                                    <div className={classes.widthtfield}>
                                        <TextFieldForm
                                            controlerProps={{
                                                control: control,
                                                name: "name",
                                                rows: 5,
                                                maxRows: 10,
                                            }}
                                            TextFieldProps={{
                                                // label: "Branch",
                                                placeholder: "Account Holder Name",
                                                //   style: { width: "130%" },
                                                fullWidth: true,
                                                // style:{border:'3px solid #ECECEC'}
                                                inputProps: {
                                                    minLength: 10,
                                                    maxLength: 10
                                                }
                                            }}
                                            // backgroundColor={true}
                                            regExp={/^[a-zA-Z]+$/}
                                            // rules={{
                                            //   required:
                                            //     "Mobile Number" +
                                            //     errorMessages.error_autocomplete_message,
                                            //   pattern: {
                                            //     value: /^[0-9]{10}$/,
                                            //     message: "Please Enter valid Mobile Number",
                                            //   },
                                            // }}
                                            required={false}
                                        />
                                    </div>
                                </div>
                            </Grid>
                           
                            <Grid item xs={12} sm={6} md={2}>
                                <div className={classes.payment1mobileprepaidbutton1}>
                                    <ColorButton1 variant="contained" type="submit">
                                        Submit
                                    </ColorButton1>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}></Grid>
                        </Grid>
                    </div>


                </Box>
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
                                    data={bene}
                                    columns={ watch("beneficiaryType")?.code=="E" ? columns :columnsWithin}
                                    options={{
                                        ...options,
                                        // onRowClick: (rowData) => {
                                        //   console.log("rowData", rowData)
                                        //   handleRowClick(rowData)
                                        // },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </div>
            {open ? (
                <OtpModalDeleteBeneficiary
                    open={open}
                    handleClose={handleClose}
                    payloadData={payloadData}
                    response={response}
                    handleBeneList={Bene}
                // fileData={airtelFile}
                // airtelFileUpload={airtelFileUpload}
                // setAirtelFile={setAirtelFile}
                />
            ) : null}


        </>
    );
};

export default BrowseBeneficiary;
