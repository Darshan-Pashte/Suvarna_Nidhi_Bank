import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack,IconButton , Modal } from "@mui/material";
import classes from "../../corporatePages/Accounts/CorporateAccount.module.css";
// import { userData } from "./userData";
import { Visibility } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from "@mui/material";
import SavingAccount from "../../../../assets/AccountsPics/SavingAccount.svg";
import CurrentAccount from "../../../../assets/AccountsPics/CurrentAccount.svg";
import FixedDeposit from "../../../../assets/AccountsPics/FixedDeposit.svg";
import LinkFD from "../../../../assets/AccountsPics/LinkFD.svg";
import PrematureWithdrawal from "../../../../assets/AccountsPics/PrematureWithdrawal.svg";
import RecurringDeposits from "../../../../assets/AccountsPics/RecurringDeposits.svg";
import NetBanking from "../../../../assets/AccountsPics/NetBanking.svg";
import CreditCard from "../../../../assets/AccountsPics/CreditCard.svg";
import DebitCard from "../../../../assets/AccountsPics/DebitCard.svg";
import AllOffers from "../../../../assets/AccountsPics/AllOffers.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// import DataTable from "./tableTab2";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useState } from "react";
import Loader from "../../../../components/common/loader";
import DataTable from "../Home/tableTab2Home";
import LoanTab from "../Home/LoanTab";
import AccountStatementHome from "../Home/AccountStatementHome";
import { userData } from "../Account/userData";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";

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
  // name,
  account,
  accountType,
  balance,
  withdrawable,
  currency,
  uncleared,
  amb
) {
  return {
    // name,
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

export default function BankAccounttable({accList}) {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [accList, setAccList] = useState([])
  const [balance, setBalance] = useState("")
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user , menu} = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [loadings, setLoadings] = useState(false); // For storing additional data

  const isLoanTabEnabled = menu?.[132] == 1;
  const handleOpen = async (row) => {
    setLoadings(true);
    setSelectedRow(row);
    setAdditionalData(null);

    if (row.accType === "CASH CREDIT") {
      // const additionalData = await handleClick(row.accNo);
      // setAdditionalData(additionalData);


        setIsloading(true);
        try {
          const payload = {
            username: user?.userId,
            custNo: user?.userId,
            sessionId: user?.sessionId,
            // acctNo: acctNo
            acctNo: row.accNo
          };
          const response = await postApiData(apiList.CORPORATE_ACCOUNT_LOAN, payload);
          console.log("response", response);
          if (response?.status) {
            setAdditionalData(response?.data?.loanDeatils);
            // reset()
            // setIsloading(false);
          } else {
            SweetAlertPopup(response?.message, "Error", "error")
            // setIsloading(false);
          }
    
          setIsloading(false);
        } catch (err) {
          console.log(err);
          setIsloading(false);
    
        }
      
    }

    setOpen(true);
    setLoadings(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setAdditionalData(null);
  };

  // useEffect(() => {
  //   const getAccountList = async () => {
  //     try {
  //       const payload = {
  //         username: user?.userId,
  //         sessionId: user?.sessionId
  //       };
  //       setIsloading(true)
  //       const response = await postApiData(apiList.FETCH_ACC_CORPORATE, payload);
  //       // console.log("response", response);
  //       // setShowBal(response.data?.accBal);
  //       setAccList(response?.data?.accountlst)
  //       setBalance(response?.data?.combinedBal)
  //       setIsloading(false)

  //     } catch (err) {
  //       // console.log(err)
  //       setIsloading(false)
  //     }

  //   };

  //   getAccountList()
  // }, [])

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <Box className={classes.tableMainBox}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow style={{ textAlign: "center" }}>
                    <StyledTableCell>Account Holder Name</StyledTableCell>
                    <StyledTableCell >Account Number</StyledTableCell>
                    <StyledTableCell>Account Type</StyledTableCell>
                    <StyledTableCell >Balance</StyledTableCell>
                    {isLoanTabEnabled && <StyledTableCell style={{ textAlign: "center"}}>
                      Details
                    </StyledTableCell>}
                    {/* <StyledTableCell align="right">Withdrawable</StyledTableCell>
                  <StyledTableCell align="right">Currency</StyledTableCell>
                  <StyledTableCell align="right">Uncleared</StyledTableCell>
                  <StyledTableCell align="right">AMB</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accList ? <>  {accList && accList?.map((row) => (
                    <StyledTableRow key={row.name} align="center">
                      <StyledTableCell component="th" scope="row">
                        {row.accName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.accNo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.accType}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                      ₹ {row.accBal}
                      </StyledTableCell>
                      {isLoanTabEnabled &&  <TableCell align="center" >
                          <IconButton
                            onClick={() => handleOpen(row)}
                            style={{ color: "var(--primary-color)" }}
                            aria-label="view"
                            
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>}
                      {/* <StyledTableCell align="right">
                      {row.withdrawable}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.currency}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.uncleared}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.amb}</StyledTableCell> */}
                    </StyledTableRow>
                  ))}</> : <div className={classes.nodata}>
                    No data avaliable</div>}
                </TableBody>
              </Table>
            </TableContainer>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 1,
                  borderRadius: "8px",
                }}
              >
                {/* <Typography
                 
                >
                  Account Details
                </Typography> */}
                <Box sx={{ textAlign: "right"}}>
                  <Button sx={{ color: "var(--primary-color)"}} onClick={handleClose}>
                    <CancelIcon />
                  </Button>
                </Box>
                {loadings ? (
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Loader />
                  </Box>
                ) : (
                  selectedRow && (
                    <TableContainer>
                      <Table sx={{ minWidth: 400   }}>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <strong>Account Holder Name</strong>
                            </TableCell>
                            <TableCell>{selectedRow.accName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Account Number</strong>
                            </TableCell>
                            <TableCell>{selectedRow.accNo}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Account Type</strong>
                            </TableCell>
                            <TableCell>{selectedRow.accType}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Balance</strong>
                            </TableCell>
                            <TableCell>{selectedRow.accBal}</TableCell>
                          </TableRow>
                          


                          {additionalData && (
                            <>
                              <TableRow>
                                <TableCell>
                                  <strong>Sanction Date</strong>
                                </TableCell>
                                <TableCell>{additionalData[0]?.sanctionDate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>Sanction Amount/Limit</strong>
                                </TableCell>
                                <TableCell>{additionalData[0]?.sanctionAmt}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>Expiry Date</strong>
                                </TableCell>
                                <TableCell>{additionalData[0]?.expDate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>Interest Rate</strong>
                                </TableCell>
                                <TableCell>{additionalData[0]?.interestRate}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>Account Status</strong>
                                </TableCell>
                                <TableCell>{additionalData[0]?.accStatus}</TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                )}

              
              </Box>
            </Modal>
          </Box>
    </>
  );
}
