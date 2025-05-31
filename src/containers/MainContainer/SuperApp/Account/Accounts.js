import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack, IconButton, Modal } from "@mui/material";
import classes from "./accounts.module.css";
import { userData } from "./userData";
import { Visibility } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import CurrentLimit from "../../../../assets/images/backupImages/Mahesh bank/Customerlimit.svg";
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
import GoBackButton from "../../../../components/common/GoBackButton";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import CancelIcon from '@mui/icons-material/Cancel';
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

export default function Accounts() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { menu } = useSelector((state) => state.auth);
  const isLoanTabEnabled = menu?.[41] == 1;

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [loadings, setLoadings] = useState(false); // For storing additional data

  const theme = useSelector((state) => state.theme.theme);

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
            custNo: user?.userId,
            sessionId: user?.sessionId,
            // acctNo: acctNo
            acctNo: row.accNo
          };
          const response = await postApiData(apiList.CURRENT_ACCOUNT_DETAILS, payload);
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
  const [accList, setAccList] = useState([]);
  const [miniStatement, setMiniStatement] = useState([]);
  const [balance, setBalance] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [CurrentLimit, setCurrentLimit] = useState(null);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const bankName = process.env.REACT_APP_FLAVOUR;

  useEffect(() => {
    const importedImage = async () => {
      const CurrentLimit = await import(`../../../../assets/Banks/${bankName}/images/Customerlimit.svg`);
      setCurrentLimit(CurrentLimit.default);
    };
    importedImage();
  }, [bankName]);

  useEffect(() => {
    const getAccountList = async () => {
      try {
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId,
        };
        setIsloading(true);
        const response = await postApiData(apiList.HOME_DASHBOARD, payload);
        console.log("Account response", response);
        setAccList(response?.data?.accountlst);
        setBalance(response?.data?.combinedBal);
        setMiniStatement(response?.data?.miniStatement);
        setIsloading(false);
      } catch (err) {
        // console.log(err)
        setIsloading(false);
      }
    };
    getAccountList();
  }, []);

  // const handleClick = async (acctNo) => {
  //   setIsloading(true);
  //   try {
  //     const payload = {
  //       custNo: user?.userId,
  //       sessionId: user?.sessionId,
  //       acctNo: acctNo
  //     };
  //     const response = await postApiData(apiList.CURRENT_ACCOUNT_DETAILS, payload);
  //     console.log("response", response);
  //     if (response?.status) {
  //       setAdditionalData(response?.data?.loanDeatils);
  //       // reset()
  //       // setIsloading(false);
  //     } else {
  //       SweetAlertPopup(response?.message, "Error", "error")
  //       // setIsloading(false);
  //     }

  //     setIsloading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsloading(false);

  //   }
  // };

  const ColorButtonMy = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '12px',
    width: "12rem",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));


  // console.log('additionalData',additionalData)
  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div  className={`${classes.redrow} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
        <div className={classes.subredrowHeading}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Account Balance Summary
          </div>
        </div>
        <div className={classes.balanceHeading}>
          <Typography className={classes.savingsAccountBalance}>
            Balance:
            <h2 className={classes.savingsAccountBalancecColor}>
              ₹{parseFloat(balance).toFixed(2)}
            </h2>
          </Typography>
        </div>
      </div>
      <div className={classes.sbox}>
        <Box className={classes.mainBox}>
          <div className={classes.accountsMainHeadingFlex}>
            <div className={classes.mainAccountHeading}>

            </div>
          </div>
          {/* <Box className={classes.tableMainBox}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow
                    style={{
                      textAlign: "center",
                      backgroundColor: "#AD2120",
                      color: "#FFFFFF",
                    }}
                  >
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Account Holder Name
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Account Number
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Account Type
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Balance
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Check Current Limit
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accList ? (
                    <>
                      {" "}
                      {accList &&
                        accList?.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.accName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.accNo}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.accType}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.accBal}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <button
                               
                                onClick={() => handleClick(row.accNo)}
                              >
                                Current
                              </button>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </>
                  ) : (
                    <div className={classes.nodata}>No data avaliable</div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box> */}

          <Box className="tableMainBox">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow
                    style={{
                      textAlign: "center",
                      backgroundColor: theme === "dark" ? "var(--theme-background-color)" : "var(--primary-color)",
                      color: "#FFFFFF",
                    }}
                  >
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Account Holder Name
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center"}}>
                      Account Number
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Account Type
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      Balance
                    </StyledTableCell>
                    {/* <StyledTableCell style={{ textAlign: "center" }}>
                      Branch Code
                    </StyledTableCell> */}
                    {isLoanTabEnabled && <StyledTableCell style={{ textAlign: "center"}}>
                      Details
                    </StyledTableCell>}
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accList && accList.length > 0 ? (
                    accList.map((row) => (
                      <TableRow key={row.accNo}>
                        <TableCell align="center">{row.accName}</TableCell>
                        <TableCell align="center">{row.accNo}</TableCell>
                        <TableCell align="center">{row.accType}</TableCell>
                        <TableCell align="center">{row.accBal}</TableCell>

                        {isLoanTabEnabled &&  <TableCell align="center" >
                          <IconButton
                            onClick={() => handleOpen(row)}
                            style={{ color: "var(--primary-color)" }}
                            aria-label="view"
                            
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>}
                        {/* <TableCell align="center">{row.brCode}</TableCell> */}
                       
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        align="center"
                        style={{ fontStyle: "italic" }}
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Modal to show row details */}
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
                          <TableRow>
                            <TableCell>
                              <strong>Branch Code</strong>
                            </TableCell>
                            <TableCell>{selectedRow.brCode}</TableCell>
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

          {/* <Box className={classes.tableMainBox}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: " var(--primary-color)",
                borderRadius: 2,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="primary"
              >
                <Tab
                  style={{ color: "var(--common-heading-color)" }}
                  label="Mini statement"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ color: "var(--common-heading-color)" }}
                  label="Loans"
                  {...a11yProps(1)}
                />

              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <DataTable
                miniStatementData={miniStatement}
                accList={accList}
                setMiniStatement={setMiniStatement}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <LoanTab />
            </CustomTabPanel>

          </Box> */}

          <Box className={classes.tableMainBox}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: theme === "dark" ? "var(--theme-background-color)" : "var(--primary-color)",
                borderRadius: 2,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="menu management tabs"
                indicatorColor="primary"
              >

                <Tab
                  style={{ color: "var(--common-heading-color)" }}
                  label="Mini statement"
                  {...a11yProps(0)}
                />


                {isLoanTabEnabled && (
                  <Tab
                    style={{ color: "var(--common-heading-color)" }}
                    label="Loans"
                    {...a11yProps(1)}
                  />
                )}
              </Tabs>
            </Box>


            <CustomTabPanel value={value} index={0}>
              <DataTable
                miniStatementData={miniStatement}
                accList={accList}
                setMiniStatement={setMiniStatement}
              />
            </CustomTabPanel>


            {isLoanTabEnabled && (
              <CustomTabPanel value={value} index={1}>
                <LoanTab />
              </CustomTabPanel>
            )}
          </Box>


          <Grid
            container
            columnSpacing={3}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.savingsAccountSubHeading}>
                Account Statement
              </div>
              <div className={classes.cardsBox}>
                <div className={classes.accountstatement}>
                  <AccountStatementHome accList={accList} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.savingsAccountSubHeading}>
                Set Customer Limit
              </div>
              <div className={classes.cardsBox}>
                <Box className={classes.accountsMarginBox}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img

                        className={classes.iconImagesPaddingType1}
                        src={CurrentLimit}
                        alt="Saving Account"
                      />
                    </div>
                    <ColorButtonMy style={{ marginTop: "-0.3rem" }} onClick={() => navigate("/account/setacclimit")} variant="contained" type="button">
                      Set Customer Limit
                    </ColorButtonMy>
                  </div>
                </Box>
              </div>
            </Grid>
          </Grid>

          {/* <Box>
         
         
            <Grid container className={classes.accountsSecondGrid}>
              <Grid
                onClick={() => navigate("/account/setacclimit")}
                style={{ cursor: "pointer" }}
                className={classes.accountsMarginGrid}
                item
                sm={2}
                md={2}
                sx={{
                  "&:hover": {
                    backgroundColor: "",
                    cursor: "pointer",
                    "& .addIcon": {
                      color: "purple",
                    },
                  },
                }}
              >


                <div className={classes.accountBox}>
                  <div className={classes.accountBoxImage}>
                    <img
                      className={classes.iconImagesPaddingType1}
                      src={SavingAccount}
                    />
                  </div>
                  <div className={classes.accountBoxText}>
                    <Typography className={classes.iconsTypography1}   >
                      Customer Limit
                    </Typography>
                  </div>

                </div>


              </Grid>
            </Grid>
   
        </Box> */}

          {/* <Box>
          <Stack spacing={2}>
            <Typography className={classes.savingsAccountSubHeading}>
              Deposit Summary
            </Typography>
            <Grid container className={classes.accountsSecondGrid}>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography className={classes.iconsTypography}>
                      Withdrawable Balance:
                    </Typography>
                    <Typography className={classes.savingsAccountBalancecColor}>
                      ₹00.0
                    </Typography>
                  </Stack>

                  <Typography component={Link} to="/">
                    Open a deposit
                  </Typography>
                  <Typography
                    // className={classes.serviceRequestLinkPadding}
                    component={Link}
                    to="/"
                  >
                    Service Request
                  </Typography>
                </Stack>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}></Grid>
            </Grid>
          </Stack>
        </Box> */}

          {/* <Box>
            <Stack spacing={2}>
              <Typography className={classes.savingsAccountSubHeading1}>
                Deposit
              </Typography>
              <Grid container className={classes.accountsSecondGrid}>
                <Grid className={classes.accountsMarginGrid} item sm={2} md={2} onClick={() => navigate("/account/fixeddepositdetails")}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img
                        className={classes.iconImagesPaddingType1}
                        src={FixedDeposit}
                      />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography} >
                        Deposit Account Details
                      </Typography>
                    </div>

                  </div>
                </Grid>

                <Grid className={classes.accountsMarginGrid} item sm={2} md={2} onClick={() => navigate("/account/fixeddepositscheme")}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img
                        className={classes.iconImagesPaddingType2}
                        src={RecurringDeposits}
                      />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography}>
                        Interest Rate
                      </Typography>
                    </div>

                  </div>
                </Grid>

                <Grid className={classes.accountsMarginGrid} item sm={2} md={2} onClick={() => navigate("/account/opendeposit")}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img className={classes.iconImagesPaddingType2} src={LinkFD} />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography}>
                        Open New Deposit
                      </Typography>
                    </div>

                  </div>
                </Grid>
              </Grid>
            </Stack>
          </Box> */}

          {/* 
        <Box>
          <Stack spacing={2}>
            <Typography className={classes.savingsAccountSubHeading}>
              Offers zone
            </Typography>
            <Grid container className={classes.accountsSecondGrid}>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType1}
                  src={NetBanking}
                />
                <Typography className={classes.iconsTypography}>
                  Net Banking
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType1}
                  src={CreditCard}
                />
                <Typography className={classes.iconsTypography}>
                  Credit Card
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType1}
                  src={DebitCard}
                />
                <Typography className={classes.iconsTypography}>
                  Debit Card
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img className={classes.iconImagesPadding} src={AllOffers} />
                <Typography className={classes.iconsTypography}>
                  All Offers
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box> */}
        </Box>
      </div>
    </>
  );
}
