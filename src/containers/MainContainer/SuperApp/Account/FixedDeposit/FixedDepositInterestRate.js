import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";
import classes from "../FixedDeposit/FixedDepositDetails.module.css";

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
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import { useState } from "react";
import Loader from "../../../../../components/common/loader";
import GoBackButton from "../../../../../components/common/GoBackButton";


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



export default function FixedDepositInterestRate() {
  const navigate = useNavigate();
  const {state}=useLocation()
// console.log('state',state)

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeDate=(value)=>{
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
    const getDepositAccReceipt = async () => {
      try {
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId,
          depoType:state?.code,
       

        };
        setIsloading(true)
        const response = await postApiData(apiList.FETCHDEPOSITINTERESTRATE, payload);
        // console.log("response", response);
        // setShowBal(response.data?.accBal);
        setReceiptList(response?.data?.interestList)

        setIsloading(false)

      } catch (err) {
        // console.log(err)
        setIsloading(false)
      }

    };

    getDepositAccReceipt()
  }, [])

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
      <div>
        <div style={{display:"flex",alignItems:"center", gap:'5px'}}>
          <GoBackButton/>
      <div className={classes.SubHeading}>
      Interest Rate
              </div>
              </div>
              </div>

            </div>
        <div className={classes.sbox}>
      <Box className={classes.mainBox}>
       
    
          {/* <div className={classes.mainupperheader1}>
            Interest Rate
          </div> */}
         
          <Box>
            <TableContainer component={Paper}>
              <Table  aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Month</StyledTableCell>
                    <StyledTableCell >Days</StyledTableCell>
                   
                   
                    <StyledTableCell>Interest Rate(%)</StyledTableCell>

                    <StyledTableCell>Interest Date</StyledTableCell>


                    <StyledTableCell>Deposit Type</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {receiptList &&  receiptList?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.month}
                      </StyledTableCell>
                     
                      <StyledTableCell align="center" >
                        {row.days}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.interestRate}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {changeDate(row.interestDate)}
                      </StyledTableCell>
                  
                    <StyledTableCell align="center">
                      {row.depositeType}
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
