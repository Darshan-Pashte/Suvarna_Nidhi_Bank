import React from "react";
import classes from "./AccountLimit.module.css";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import TextFieldForm from "../../../../../components/common/textFieldForm";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../../components/common/autuCompleteForm";
import Loader from "../../../../../components/common/loader";
import MUIDataTable from "mui-datatables";
import { compareTextAndReturnObject } from "../../../../../components/common/commonArray";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "@mui/base";
import GoBackButton from "../../../../../components/common/GoBackButton";
import BrowseComplaintModal from "./BrowseComplaintModal";


const defaultFormData = {
    accno1: "",
    noofcheckbook: "",
    tpin: "",
    chequeNo: ""
};

const BrowseCustomerComplaint = () => {

    const [isLoading, setIsloading] = useState(false);;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowDataToDisplay, setRowDataToDisplay] = useState({});
    const [complaintList, setComplaintList] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);

    const closeModal = () => {
        setIsModalOpen(false);
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

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const theme = useSelector((state) => state.theme.theme);

    const handleNavigate = () => {
        navigate("/complaint/raisecomplaint")
    }

    useEffect(() => {
        if (accountList) {
            // setValue("accName", accName)
            setValue("accno1", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
        }
    }, []);

    useEffect(() => {
        onSubmit()
    }, [])

    const onSubmit = async (data) => {
        const payload = {
            custNo: user?.userId,
            sessionId: user?.sessionId,

        };
        setIsloading(true)
        const response = await postApiData(apiList.BROWSE_CUSTOMER_COMPLAINT, payload);
        console.log("response", response);
        if (response?.status == true) {
            setComplaintList(response.data.lstComplaints)
            reset();
            setIsloading(false)
        } else {
            SweetAlertPopup(response?.message, "Error", "error");
            setIsloading(false)
        }
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
        width: "200px",
        height: "31px",
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
        width: "133px",
        height: "31px",
        "&:hover": {
            background: "var(--button-hover-color)",
            color: "white",
        },
    }));

    const openModal = (rowData) => {
        // console.log("rowDta", rowData)
        const index = 12;
        if (rowData.length > index) {
            const dateValue = rowData[index];

            const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
            if (dateRegex.test(dateValue)) {
                const formattedDate = new Date(dateValue).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    // timeZoneName: 'short',
                });

                const modifiedRowData = [...rowData];
                modifiedRowData[index] = formattedDate;
                const headers = columns
                    ?.filter((column) => column?.label !== "View" && column?.label !== "Sr. No.")
                    .map((column) => column?.label);
                setTableHeaders(headers);
                setRowDataToDisplay({
                    headers: headers,
                    rowData: modifiedRowData,
                });
                setIsModalOpen(true);
            } else {
                console.error("Value at index 12 is not in the expected date format");
                const defaultDate = "N/A";
                const modifiedRowData = [...rowData];
                modifiedRowData[index] = defaultDate;
                const headers = columns
                    ?.filter((column) => column?.label !== "View" && column?.label !== "Sr. No.")
                    .map((column) => column?.label);
                setTableHeaders(headers);
                setRowDataToDisplay({
                    headers: headers,
                    rowData: modifiedRowData,
                });
                setIsModalOpen(true);
            }
        } else {
            console.error("rowData doesn't have enough items");
        }
    };

    const columns = [
        {
            name: "View",
            label: "View",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, { rowData }, tableMeta) => {
                    return (
                        // <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} >
                        <VisibilityIcon sx={{ cursor: "pointer" }} onClick={() => openModal(rowData)} />
                        // </Button>
                    );
                },
            }
        },
        {
            name: 'complaintId',
            label: 'Complaint ID',
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'custNo',
            label: 'Customer No',
            options: {
                filter: true,
                sort: false,
                display: false
            },
        },
        {
            name: 'mobileNo',
            label: 'Mobile No',
            options: {
                filter: true,
                sort: false,
                display: false
            },
        },


        {
            name: 'custEmail',
            label: 'Customer Email',
            options: {
                filter: true,
                sort: false,
                display: false
            },
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: false,
                display: false
            },
        },
        {
            name: 'category',
            label: 'Category',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },

        {
            name: 'subject',
            label: 'Subject',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },


        {
            name: 'message',
            label: 'Message',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },



        {
            name: 'createdDate',
            label: 'Created Date',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },

        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },
        {
            name: 'replyMsg',
            label: 'Reply Msg',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },
        {
            name: 'replyBy',
            label: 'Reply By',
            options: {
                filter: true,
                sort: false,
                // display: false
            },
        },
        {
            name: 'replyDt',
            label: 'Reply Dt',
            options: {
                filter: true,
                sort: false,
                // display: false
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
        pagination: true,
    };

    const accountList =
        user?.accountDetails &&
        user?.accountDetails?.map((item) => ({
            code: item.brCode,
            value: item.accNo,
        }));

    return (
        <>
            {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
            <div className={`${classes.redrow} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                        <GoBackButton />
                        <div className={classes.SubHeading}>
                            Browse Customer Complaint Status
                        </div>
                    </div>
                </div>



            </div>
            <div className={classes.sbox}>
                <div className={classes.Payment1MobilePrepaidMainPage}>

                    <div>

                        <Box
                            className={classes.box1}
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className={classes.firsttabinfo}>
                                <Grid
                                    container
                                    columnSpacing={1}
                                    rowSpacing={1}
                                    style={{ padding: "0.1vw" }}
                                >
                                    {/* <Grid item xs={0} sm={12} md={4}>
                                </Grid>

                                <Grid item xs={0} sm={12} md={4}>
                                </Grid> */}
                                    <Grid item xs={12} sm={12} md={12} >
                                        <div className={classes.Raisecomplaintbutton}>
                                            {/* <ColorButton1 variant="contained" type="submit">
                                            Submit
                                        </ColorButton1> */}
                                            <ColorButton1 variant="contained" type="button" onClick={handleNavigate} >
                                                Raise Complaint
                                            </ColorButton1>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <MUIDataTable
                                            data={complaintList}
                                            columns={columns}
                                            options={options}
                                        />
                                    </Grid>
                                    {
                                        isModalOpen ? <BrowseComplaintModal open={isModalOpen} handleClose={closeModal} rowDataToDisplay={rowDataToDisplay} show={"1"} title={"Compliant Details"} /> : null
                                    }
                                </Grid>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrowseCustomerComplaint;
