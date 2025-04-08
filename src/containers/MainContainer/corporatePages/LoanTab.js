import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CreditIcon from "../../../../assets/CreditIcon.svg";
import DebitIcon from "../../../../assets/DebitIcon.svg";

import { useSelector } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Box, Grid, Typography } from "@mui/material";
import Loader from "../../../../components/common/loader";
import { apiList } from "../../../../components/utilities/nodeApiList";

const columns = [
  // { field: "accType", headerName: "Account Type", width: 130 },
  { field: "transDate", headerName: "Date", width: 130 },
  { field: "transNarrative", headerName: "Particulars", width: 430 },
  // { field: "cbsRrn", headerName: "CBSRRN", width: 130 },
  {
    field: "transDRCR",
    headerName: "Status",
    width: 80,
    renderCell: (params) => (
      <>
        {params.row.transDRCR === "D" ? (
          <img src={CreditIcon} style={{ height: 20, width: 20 }} />
        ) : (
          <img src={DebitIcon} style={{ height: 20, width: 20 }} />
        )}
      </>
    ),
  },
  {
    field: "transAmount",
    headerName: "Amount",
    type: "number",
    width: 130,
    renderCell: (params) => (
      <span style={{ color: params.row.transDRCR === "D" ? "green" : "red" }}>
        {params.value}
      </span>
    ),
  },
  // { field: "respMsg", headerName: "Response Message", width: 500 },
];

export default function LoanTab() {
  const [loanAccounts, setLoanAccounts] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [selectedLoanAccNo, setSelectedLoanAccNo] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  //   Loan Account fetching API-->Fetch all the loan accounts and update in DropDown
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        setIsloading(true);
        const response = await axios.post(
         apiList.FETCHLOANINFO,
          {
            custNo: user.userId,
            sessionId: user.sessionId,
          }
        );
// console.log('FETCHLOANINFOresponse',response)
        setLoanAccounts(response.data);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    fetchLoanData();
  }, [user.userId, user.sessionId]);

  const handleLoanAccountDropDown = (event) => {
    setSelectedLoanAccNo(event.target.value);
  };

  //API for fetching Mini Statement of Loan account which is selected from drop down--> Passing the selectedLoanAcoint to the account and changing "acType" to Loan as mentioned in API document.

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const response = await axios.post(
          apiList.FETCH_MINI_STATEMENT,
          {
            custNo: user.userId,
            sessionId: user.sessionId,
            accNo: selectedLoanAccNo,
            brCode: user.accountDetails[0].brCode,
            acType: "loan",
          }
        );

        setApiData(response.data);
        setIsloading(false);
        // console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    if (selectedLoanAccNo) {
      fetchData();
    }
  }, [selectedLoanAccNo, user.userId, user.sessionId, user.accountDetails]);

  useEffect(() => {
    if (loanAccounts?.data?.loanDeatils.length > 0) {
      setSelectedLoanAccNo(loanAccounts.data.loanDeatils[0].loanAccNo);
    }
  }, [loanAccounts]);

  const apiRows =
    (apiData?.data?.miniStatement || []).map((row, index) => ({
      ...row,
      id: index,
    })) || [];
    

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div style={{ height: 430, width: "100%", margin: ".5rem" }}>
        <Grid container>
          <Grid item sm={7}></Grid>
          <Grid item sm={5}>
            <Box sx={{ margin: ".3rem" }}>
              <Typography sx={{ fontWeight: "500" }}>
                Select Loan Account
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedLoanAccNo}
                  onChange={handleLoanAccountDropDown}
                  style={{  height: 40 }}
                >
                  {loanAccounts && loanAccounts?.data?.loanDeatils.map((item) => (
                    <MenuItem key={item.loanAccNo} value={item.loanAccNo}>
                      {item.loanAccNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <DataGrid
          sx={{ maxHeight: "23rem" }}
          rows={apiRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}
