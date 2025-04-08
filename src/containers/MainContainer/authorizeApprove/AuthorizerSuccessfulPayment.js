import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack, Divider } from "@mui/material";
import classes from "./Authorize.module.css";
// import { userData } from "./userData";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SavingAccount from "../../../assets/AccountsPics/SavingAccount.svg";
import CurrentAccount from "../../../assets/AccountsPics/CurrentAccount.svg";
import FixedDeposit from "../../../assets/AccountsPics/FixedDeposit.svg";
import LinkFD from "../../../assets/AccountsPics/LinkFD.svg";
import PrematureWithdrawal from "../../../assets/AccountsPics/PrematureWithdrawal.svg";
import RecurringDeposits from "../../../assets/AccountsPics/RecurringDeposits.svg";
import NetBanking from "../../../assets/AccountsPics/NetBanking.svg";
import CreditCard from "../../../assets/AccountsPics/CreditCard.svg";
import DebitCard from "../../../assets/AccountsPics/DebitCard.svg";
import AllOffers from "../../../assets/AccountsPics/AllOffers.svg";
import { NavLink, useNavigate , useLocation} from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import check_circle from "../../../../src/assets/check_circle.svg"
// import DataTable from "./tableTab2";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { postApiData } from "../../../components/utilities/nodeApiServices";
import { apiList } from "../../../components/utilities/nodeApiList";
import { useState } from "react";
import Loader from "../../../components/common/loader";
import { userData } from "../SuperApp/Account/userData";
import Profile from "../SuperApp/Settings/Profile";
import { Button } from "@mui/base";


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

const rows = userData[0].transhistory.map((data) =>
    createData(...Object.values(data))
);


export default function AuthorizerSuccessfulPayment() {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [valueTable, setValueTable] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [accList, setAccList] = useState([])
    const [balance, setBalance] = useState("")
    const [isLoading, setIsloading] = useState(false);
    const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
    const { state: data } = useLocation();


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
                            Payment
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <div className={classes.paymentHeadingBox}>
                            <div className={classes.imgSuccessful}>
                                <img src={check_circle} alt="check_circle" />
                            </div>
                            <div className={classes.paymentHeadingBoxText}>
                                <div className={classes.paymentHeadingBoxUpperText}>
                                    {data}
                                </div>
                                {/* <div className={classes.paymentHeadingBoxLowerText}>
                                    Group Approval Successfull. Your approval transaction is recorded successfully.
                                </div> */}
                            </div>
                        </div>
                    </Grid>



                    {/* <Grid item xs={12} sm={12} md={12}>

                        <Box className={classes.tableMainBox}>

                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: "divider",
                                    backgroundColor: " #ECECEC",
                                    borderRadius: 2,
                                }}
                            >
                                <Tabs
                                    value={valueTable}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    indicatorColor="secondary"
                                >
                                    <Tab label="Transaction Details" {...a11yProps(0)} />
                                </Tabs>
                            </Box>

                            <div className={classes.transactionBox}>
                                <Grid
                                    container
                                    columnSpacing={4}
                                    rowSpacing={2}
                                    style={{ padding: '0.1vw' }}
                                >
                                    <Grid item xs={12} sm={12} md={12}>
                                        <div className={classes.transactionDetails}>
                                            <div className={classes.transactionRefNumber}>
                                                Transaction Reference Number: 9992025XXXXX
                                            </div>
                                            <div className={classes.transactionDate}>
                                                Transaction Date: 05/12/2023
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                        <div className={classes.transactionInfo}>
                                            <div className={classes.uppertitle}>Home Branch</div>
                                            <div className={classes.uppername}>John Dou,XXXXXXXXXXXX5252</div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                        <div className={classes.transactionInfo}>
                                            <div className={classes.uppertitle}>Home Branch</div>
                                            <div className={classes.uppername}>John Dou,XXXXXXXXXXXX5252</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}></Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <div className={classes.transactionInfo}>
                                            <div className={classes.uppertitle}>Transferred Amount </div>
                                            <div className={classes.uppername}>₹ 20,00,000.00</div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                        <div className={classes.transactionInfo}>
                                            <div className={classes.uppertitle}>Transaction Type</div>
                                            <div className={classes.uppername}>Transfer Funds to an account in other through IMPS with IFSC Code</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <div className={classes.transactionInfo}>
                                            <div className={classes.uppertitle}>Remark</div>
                                            <div className={classes.uppername}>XXXXXXXXXXXXXXX</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}></Grid>
                                    <Grid item xs={12} sm={12} md={4}></Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <div className={classes.changebuttons}>
                                            <ColorButton1 variant="contained" type="button" >
                                                Save as Favourite
                                            </ColorButton1>
                                            <ColorButton1 variant="contained" type="button" >
                                                Another Payment
                                            </ColorButton1>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Box>


                    </Grid > */}
                    {/* <Grid item xs={12} sm={12} md={12}></Grid> */}

                    {/* <Grid item xs={12} sm={12} md={12}>
                       
                            <div className={classes.HeadingBox}>
                                <div className={classes.paymentTransactionBox}>
                                    <div className={classes.transactionHeading}>
                                        <Tabs
                                            value={valueTable}
                                            onChange={handleChange}
                                            aria-label="basic tabs example"
                                            indicatorColor="secondary"
                                        >
                                       
                                            <Tab label="Transaction Details" {...a11yProps(0)} />

                                        </Tabs>

                                    </div>

                                    <div className={classes.transactionDetails}>
                                        <div className={classes.transactionRefNumber}>
                                            Transaction Reference Number: 9992025XXXXX
                                        </div>
                                        <div className={classes.transactionDate}>
                                            Transaction Date: 05/12/2023
                                        </div>
                                    </div>
                                </div>
                          
                        </div>
                    </Grid> */}
                </Grid >
            </Box >
        </>
    );
}
