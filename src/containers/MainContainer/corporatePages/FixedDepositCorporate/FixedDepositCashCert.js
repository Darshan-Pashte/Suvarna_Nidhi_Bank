import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";
import classes from "./FixedDepositDetails.module.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import GoBackButton from "../../../../components/common/GoBackButton";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { useForm } from "react-hook-form";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import { useRef } from "react";


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



export default function CorporateFixedDepositCashCert() {
  const navigate = useNavigate();
  const { state } = useLocation()
  const accountData = state.details
  console.log('state', state)

  const newAccData = accountData.accounts

  const newListAccount = newAccData && newAccData?.map(item => ({ "code": item.brcode, "value": item.accountNo }));
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
    // defaultValues: defaultFormData,
    mode: "onChange",
  });
  const changeDate = (value) => {
    const formattedDate = new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
    });
    const hyphenatedDate = formattedDate.replace(/\s/g, '-');
    return hyphenatedDate;
  }

  const [accList, setAccList] = useState([])
  const [balance, setBalance] = useState("")
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [receiptList, setReceiptList] = useState([])

  useEffect(() => {
    if (newListAccount) {
      setValue("accno1", newListAccount ? compareTextAndReturnObject(newListAccount, newListAccount[0]?.value) : '')
    }
  }, [])

  const accno1 = watch("accno1");
  const prevAccno1Ref = useRef();

  useEffect(() => {
    if (prevAccno1Ref.current !== accno1) {
      prevAccno1Ref.current = accno1;
      if (accno1) {
        getDepositAccReceipt();
      }
    }
  }, [accno1]);

  // useEffect(() => {
  //   if (watch("accno1"))
  //     getDepositAccReceipt()
  // }, [watch("accno1")])

  const getDepositAccReceipt = async () => {
    try {
      const payload = {
        username: user?.userId,
        custNo: state?.customer?.code,
        sessionId: user?.sessionId,
        accNo: watch("accno1")?.value,
        brCode: watch("accno1")?.code
      };
      setIsloading(true)
      const response = await postApiData(apiList.CORPORATE_FETCHDEPOSITRECEIPT, payload);
      console.log("response", response);
      // setShowBal(response.data?.accBal);

      if (response.status == true) {
        setReceiptList(response?.data?.receiptlst)
        setIsloading(false)
      }
      else {
        SweetAlertPopup(response?.message, "Error", "error")
        setIsloading(false)
      }
    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }

  };

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div style={{ display: "flex",alignItems:"center", gap: '5px' }}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Deposit Account Details
          </div>
        </div>
        {/* <div className={classes.balanceHeading}>
          <Typography className={classes.savingsAccountBalance}>
            Balance:
            <h2 className={classes.savingsAccountBalancecColor}>
              ₹{parseFloat(balance).toFixed(2)}
            </h2>
          </Typography>
        </div> */}
      </div>
      <div className={classes.sbox}>
        <Box className={classes.mainBox}>

          {/* <div className={classes.mainupperheader}> Deposit Account Details</div> */}
          <div className={classes.depositAccountInfo}>
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
                      // style: { width: "18vw" },

                      placeholder: "Account Number",
                      onKeyDown: (event) => {
                        //const regex = /^[a-zA-Z]*$/;
                        // const regex = /^[0-9]*$/;
                        const regex = /^[a-zA-Z0-9]*$/;
                        const isBackspace = event.keyCode === 8;
                        const isValidInput = regex.test(event.key);

                        if (!isValidInput && !isBackspace) {
                          event.preventDefault();
                        }
                      },
                    }}
                    rules={{
                      required:
                        "Account " + errorMessages.error_autocomplete_message,
                    }}
                    data={newListAccount}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <Box className={classes.tableMainBox}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Receipt No.</StyledTableCell>
                    <StyledTableCell >Date of Receipt</StyledTableCell>

                    <StyledTableCell>Principle/Installment Amount</StyledTableCell>
                    <StyledTableCell >Balance</StyledTableCell>
                    <StyledTableCell>Interest Rate (%)</StyledTableCell>

                    <StyledTableCell>Maturity Amount</StyledTableCell>

                    <StyledTableCell>Maturity Date</StyledTableCell>

                    <StyledTableCell>Lien Amount</StyledTableCell>
                    <StyledTableCell>As of Date</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {receiptList && receiptList?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.receiptNo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {changeDate(row.dateOfReceipt)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.PrincipalAmount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.balance}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.interestRate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.maturityAmt}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {changeDate(row.maturityDate)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.lienAmount}
                      </StyledTableCell>
                      <StyledTableCell align="center">{changeDate(row.asOfDate)}




                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>





        </Box>
      </div>
    </>
  );
}
