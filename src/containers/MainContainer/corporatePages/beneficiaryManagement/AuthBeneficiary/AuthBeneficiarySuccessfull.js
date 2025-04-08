import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack, Divider } from "@mui/material";
// import classes from "../authorizeApprove/Authorize.module.css";
import classes from "../../../authorizeApprove/Authorize.module.css";
// import { userData } from "./userData";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate , useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import check_circle from "../../../../../assets/check_circle.svg"
// import check_circle from "../../../../src/assets/check_circle.svg"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/base";
import Loader from "../../../../../components/common/loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: " #DAE2F6",
        color: "#323232",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

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

function createData(
    name,
    account,
    accountType,
    balance,
    withdrawable,
    currency,
    uncleared,
    amb
) {
    return {
        name,
        account,
        accountType,
        balance,
        withdrawable,
        currency,
        uncleared,
        amb,
    };
}

export default function AuthBeneficiarySuccessfull() {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [valueTable, setValueTable] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const  {state}  = useLocation();
    const [accList, setAccList] = useState([])
    const [balance, setBalance] = useState("")
    const [isLoading, setIsloading] = useState(false);
    const { user } = useSelector((state) => state.auth);


    const ColorButton1 = styled(Button)(({ theme }) => ({
        color: "#FFFFFF",
        // backgroundColor: "#F84B67",
        // backgroundColor: "#323232",
        background: "#183883",
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

    // useEffect(() => {
    //     const getAccountList = async () => {
    //         try {
    //             const payload = {
    //                 custNo: user?.userId,
    //                 sessionId: user?.sessionId
    //             };
    //             setIsloading(true)
    //             const response = await postApiData(apiList.FETCHACC, payload);
    //             // console.log("response", response);
    //             // setShowBal(response.data?.accBal);
    //             setAccList(response?.data?.accountlst)
    //             setBalance(response?.data?.combinedBal)
    //             setIsloading(false)

    //         } catch (err) {
    //             // console.log(err)
    //             setIsloading(false)
    //         }

    //     };

    //     getAccountList()
    // }, [])

    return (
        <>
            {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

            <Box className={classes.mainBox}>
                <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={2}
                    style={{ padding: '0.1vw' }}
                >

                    <Grid item sm={6} md={12}>
                        <div className={classes.paymentHeading}>
                            Beneficiary Authorize
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <div className={classes.paymentHeadingBox}>
                            <div className={classes.imgSuccessful}>
                                <img src={check_circle} alt="check_circle" />
                            </div>
                            <div className={classes.paymentHeadingBoxText}>
                                <div className={classes.paymentHeadingBoxUpperText}>
                                    {state}
                                </div>
                                {/* <div className={classes.paymentHeadingBoxLowerText}>
                                    Group Approval Successfull. Your approval transaction is recorded successfully.
                                </div> */}
                            </div>
                        </div>
                    </Grid>
                </Grid >
            </Box >
        </>
    );
}
