import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import classes from "../../SuperApp/Home/Home.module.css";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import DataTable from "../../SuperApp/CorporateHome/tableTab2Home";
// import SliderTestimonials from "./HomeSlider/HomeSlider";
import AccountStatement from "../../SuperApp/CorporateHome/AccountStatement";
// import AccountStatementHome from "./AccountStatementHome";
import Loader from "../../../../components/common/loader";
import LoanTab from "../../SuperApp/Home/LoanTab";
import BankAccounttable from "../../SuperApp/CorporateHome/BankAccounttable";
import BulkFundTransferPreview from "./BulkFundTransferPreview";
// import Authorize from "../../corporatePages/authorize/Authorize";
import BulkUploadView from "./BulkUploadView";
import { convertDate } from "../../../../components/utilities/convertDate";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import BulkTransfer from "./BulkTransfer";
import CheckerPreview from "../../checkerApprove/CheckerPreview";
import AuthorizePreview from "../../authorizeApprove/AuthorizePreview";
// import LoanTab from "./LoanTab";

const defaultFormData = {
    email: "",
    password: "",
};

const BulkUploadStatus = () => {
    const [valueTable, setValueTable] = React.useState(0);
    const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
    // console.log("user", user.userRole)

    const handleChange = (event, newValue) => {
        setValueTable(newValue);
    };
    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={12}>
                {/* <div className={classes.gridtitle}>Financial Overview</div> */}
                <Box className={classes.tableMainBox}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            backgroundColor: " #DAE2F6",
                            borderRadius: 2,
                        }}
                    >
                        <Tabs
                            value={valueTable}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            indicatorColor="secondary"
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab label="All " {...a11yProps(0)} />
                            <Tab label="Pending " {...a11yProps(1)} />
                            <Tab label="Processed" {...a11yProps(2)} />
                            <Tab label="Authorized" {...a11yProps(3)} />
                            {
                               user &&  user?.userRole == "CHECKER" || user && user?.userRole == "AUTHOR" ? <Tab label="Preview Bulk File" {...a11yProps(4)} /> : null
                            }

                        </Tabs>
                    </Box>
                    <CustomTabPanel value={valueTable} index={0}>
                        <BulkUploadView
                            status={"all"}
                            valueTable={valueTable}
                        // responseData={responseData}
                        // getTransactionList={getTransactionList}
                        // getTransactionListView={getTransactionListView}
                        // goPageNumber={goPageNumber}
                        // totalRecord={totalRecord}
                        // currentPage={currentPage}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={valueTable} index={1}>
                        <BulkUploadView
                            status={"M"}
                            valueTable={valueTable}
                        // responseData={responseData}
                        // getTransactionList={getTransactionList}
                        // getTransactionListView={getTransactionListView}
                        // goPageNumber={goPageNumber}
                        // totalRecord={totalRecord}
                        // currentPage={currentPage}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={valueTable} index={2}>
                        <BulkUploadView
                            status={"C"}
                            valueTable={valueTable}
                        // responseData={responseData}
                        // getTransactionList={getTransactionList}
                        // getTransactionListView={getTransactionListView}
                        // goPageNumber={goPageNumber}
                        // totalRecord={totalRecord}
                        // currentPage={currentPage}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={valueTable} index={3}>
                        <BulkUploadView
                            status={"A"}
                            valueTable={valueTable}
                        // responseData={responseData}
                        // getTransactionList={getTransactionList}
                        // getTransactionListView={getTransactionListView}
                        // goPageNumber={goPageNumber}
                        // totalRecord={totalRecord}
                        // currentPage={currentPage}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={valueTable} index={4}>
                        {
                            user?.userRole == "CHECKER" ? <CheckerPreview /> : <AuthorizePreview />
                        }

                    </CustomTabPanel>
                </Box>
            </Grid>

        </>
    );
};

export default BulkUploadStatus;
