import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CreditIcon from "../../../../assets/CreditIcon.svg";
import DebitIcon from "../../../../assets/DebitIcon.svg";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Loader from "../../../../components/common/loader";
import classes from "../../SuperApp/Home/Home.module.css";
import { useSelector } from "react-redux";
import { apiList } from "../../../../components/utilities/nodeApiList";
import MUIDataTable from "mui-datatables";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { postApiData } from "../../../../components/utilities/nodeApiServices";

// const columns = [
//   { field: "transDate", headerName: "Date", width: 130 },
//   // { field: "transNarrative", headerName: "Particulars", width: 130 },
//   { field: "transNarrative", headerName: "Deposits", width: 580 },
//   // { field: "transNarrative", headerName: "Withdrawals", width: 130 },
//   // { field: "transNarrative", headerName: "Deposits", width: 130 },
//   {
//     field: "transDRCR",
//     headerName: "Status",
//     width: 80,
//     renderCell: (params) => (
//       <>
//         {params.row.transDRCR === "D" ? (
//           <img src={CreditIcon} style={{ height: 20, width: 20 }} />
//         ) : (
//           <img src={DebitIcon} style={{ height: 20, width: 20 }} />
//         )}
//       </>
//     ),
//   },
//   {
//     field: "transAmount",
//     headerName: "Balance",
//     type: "number",
//     width: 130,
//     renderCell: (params) => (
//       <span style={{ color: params.row.transDRCR === "D" ? "green" : "red" }}>
//         {params.value}
//       </span>
//     ),
//   },
// ];

const columns = [
       
  {
    name: "transDate",
    label: "Transaction Date",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "transNarrative",
    label: "Particulars",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "transDRCR",
    label: "Status",
    options: {
      filter: true,
      sort: false,
      display: true,
       // customBodyRender: (value) => (
  //   value === "0" ? "InActive" : value === "1" ? "Active" : value === '2' ? 'InActive' :
  //   value === '3' ? ' Block' : value === '7' ? 'New User' : value
  // )
  customBodyRender: (value, tableMeta, updateValue) => {
    // Conditionally set the text color
    const buttonStyles = {
      color: value === 'D' ? 'red' : value === 'C' ? 'green' : 'black',
      minWidth: "100%",
      textAlign: 'center'
    };
  
    // Return a styled component or element
    return (
      <div style={buttonStyles}>
        {value === 'D' ? 'Debit' : value === 'C' ? 'Credit' : value}
      </div>
    );
  }
  
       
    },
  },
  // {
  //   name: "transAmount",
  //   label: "Amount",
  //   options: {
  //     filter: true,
  //     sort: false,
  //   },
  // },
  {
    name: "transAmount",
    label: "Amount",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        // Get the value of transDRCR from the current row
        const status = tableMeta.rowData[2]; // Assuming transDRCR is the first column

        // Conditionally set the text color for the amount
        const amountStyles = {
          color: status === 'D' ? 'red' : status === 'C' ? 'green' : 'black',
          textAlign: 'right'
        };

        // Return a styled component or element
        return (
          <div style={amountStyles}>
            ₹ {value}
          </div>
        );
      }
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
            flexDirection: 'column',
            height: "30vh",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "larger",
          }}
        >
          {/* <img src={NoData} alt="no" /> */}
          <svg width="125" height="149" viewBox="0 0 125 149" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.0221 132.434C33.4829 135.11 35.5946 137.116 36.7177 137.785L42.5 135L38.0659 130.428L34.0221 132.434Z" stroke="#042879" />
            <path d="M99.5639 127.991H39.2383V82.7697H99.5007L99.5639 127.991Z" fill="white" stroke="#042879" />
            <path d="M36.044 142.467C36.044 141.397 36.4933 139.123 36.7179 137.785C33.3484 136.447 34.0223 132.434 33.3484 132.434C32.6744 132.434 27.957 133.103 27.957 135.109C27.957 137.116 34.0223 147.149 36.7179 147.818C39.4136 148.487 40.0875 147.149 39.4136 146.48C38.9371 146.007 36.044 143.805 36.044 142.467Z" stroke="#042879" />
            <path d="M57.5811 76.5178L113.357 76.5179L99.9558 82.9158L41.6568 81.8237L57.5811 76.5178Z" fill="#042879" stroke="#042879" stroke-linejoin="round" />
            <path d="M115.5 119.411L100.5 127.655V83.3368L115.5 77.2431V119.411ZM14.4997 98.6331L12.8121 103.1L10.1756 102.577C10.0889 102.161 10.0029 101.606 9.97349 101.039C9.93502 100.297 9.99938 99.6283 10.2071 99.216C10.5965 98.4431 11.0059 97.8738 11.2624 97.5621L14.4997 98.6331Z" fill="white" stroke="#042879" />
            <path d="M3.02175 110.362C4.10001 109.292 7.9638 105.011 9.76091 103.004C8.41307 99.6602 11.1087 96.9847 11.1087 96.9847C11.1087 96.9847 6.39133 94.9781 5.71741 94.9781C5.0435 94.9781 1 107.686 1 109.693C1 111.7 1.67392 111.7 3.02175 110.362Z" stroke="#042879" />
            <path d="M101.266 83.1942L115.37 76.6126L124.249 86.8481L110.62 95.8222L101.266 83.1942Z" fill="white" stroke="#042879" />
            <path d="M62.3765 98.6163C62.3765 98.6164 62.3746 98.6176 62.3708 98.6196C62.3746 98.6171 62.3764 98.6162 62.3765 98.6163ZM89.031 68.5944C93.5499 72.6858 96.6116 78.271 97.4462 82.4383L89.3677 82.4384C89.3023 82.409 89.2141 82.3529 89.0745 82.2481C89.0403 82.2224 89.0031 82.1939 88.9631 82.1633C88.8154 82.05 88.6305 81.9082 88.4208 81.7751C87.8585 81.4182 87.0924 81.1008 85.9116 81.1008C85.5466 81.1008 85.2556 81.3045 85.0431 81.5293C84.8266 81.7582 84.6326 82.0692 84.4548 82.4249C84.0976 83.1396 83.7531 84.1429 83.419 85.3324C82.7488 87.7185 82.0925 90.9573 81.4606 94.3857C81.1069 96.305 80.758 98.2996 80.4182 100.243C80.1522 101.764 79.8917 103.253 79.6387 104.65C79.0585 107.854 78.5156 110.584 78.0199 112.224C77.7986 112.956 77.2031 113.883 76.2588 114.969C75.3235 116.044 74.082 117.234 72.6231 118.49C69.7059 121.001 65.9538 123.748 62.1287 126.334C58.3054 128.92 54.4187 131.339 51.2374 133.193C49.6466 134.121 48.2348 134.906 47.0973 135.5C46.155 135.991 45.4193 136.342 44.9302 136.536C42.8879 134.483 39.3665 130.621 37.4852 128.53C43.7099 124.639 55.6284 117.175 57.2091 116.129C57.5714 115.89 57.8941 115.427 58.1828 114.906C58.4835 114.362 58.7902 113.673 59.0943 112.895C59.7031 111.337 60.319 109.375 60.8687 107.402C61.4189 105.428 61.9057 103.433 62.2553 101.803C62.4301 100.988 62.5713 100.261 62.6691 99.6726C62.765 99.095 62.8246 98.619 62.8246 98.3223C62.8246 98.2311 62.8149 98.0696 62.7206 97.9198C62.6672 97.8348 62.5858 97.753 62.4725 97.7011C62.3614 97.6502 62.2526 97.6429 62.1656 97.6521C62.0094 97.6686 61.8845 97.7418 61.8125 97.7898C61.7296 97.845 61.6485 97.9139 61.5722 97.9858C61.2749 98.2662 60.8749 98.7616 60.4186 99.3706C59.6678 100.373 58.7003 101.771 57.6654 103.266C57.4278 103.609 57.1866 103.958 56.9437 104.308C55.6371 106.19 54.2768 108.121 53.1193 109.581C52.5394 110.312 52.0213 110.91 51.5938 111.322C51.3795 111.529 51.2002 111.676 51.0574 111.769C50.9223 111.857 50.8633 111.867 50.8635 111.868C50.8635 111.868 50.865 111.868 50.868 111.868C50.646 111.868 49.9184 111.809 48.7698 111.697C47.6367 111.586 46.1252 111.427 44.3623 111.234C40.8369 110.847 36.3108 110.325 31.8055 109.782C27.2998 109.238 22.817 108.674 19.3774 108.205C17.6572 107.97 16.2009 107.759 15.1343 107.586C14.6004 107.499 14.1686 107.423 13.8518 107.359C13.693 107.327 13.568 107.299 13.4757 107.275C13.4505 107.268 13.4298 107.262 13.4129 107.257C13.4075 107.233 13.4018 107.198 13.3977 107.149C13.3815 106.955 13.403 106.663 13.4716 106.272C13.6076 105.497 13.9054 104.455 14.2936 103.297C15.0194 101.13 16.0368 98.6268 16.8062 96.859C20.2907 97.3021 25.4115 97.9099 29.9109 98.3517C32.2412 98.5804 34.4101 98.7652 36.1004 98.8591C36.9449 98.906 37.6765 98.9307 38.252 98.9262C38.8003 98.922 39.2798 98.8924 39.5685 98.7969C39.777 98.728 39.9812 98.5945 40.1692 98.4453C40.3636 98.2911 40.572 98.0946 40.7897 97.8676C41.2254 97.4133 41.7252 96.809 42.262 96.1074C43.3369 94.7025 44.5875 92.8718 45.8118 90.9863C48.2576 87.2195 50.6281 83.1882 51.3145 81.8257C51.3759 81.7039 51.4442 81.5656 51.5199 81.4122C53.1013 78.2093 57.9356 68.4183 71.2433 64.0162C78.093 61.7504 84.3128 64.3226 89.031 68.5944ZM13.4271 107.303C13.4271 107.303 13.4263 107.302 13.425 107.299C13.4265 107.302 13.4272 107.303 13.4271 107.303Z" fill="white" stroke="#042879" />
            <path d="M54 76.5C59.8406 80.7361 68.4999 90.8574 84 83.5" stroke="#042879" />
            <ellipse cx="79.1739" cy="32.7739" rx="15.5001" ry="15.3837" fill="#FFE4E5" />
            <path d="M44.3047 38.1254C44.3047 41.9091 41.2131 44.9828 37.3916 44.9828C33.57 44.9828 30.4785 41.9091 30.4785 38.1254C30.4785 34.3417 33.57 31.2679 37.3916 31.2679C41.2131 31.2679 44.3047 34.3417 44.3047 38.1254Z" stroke="#ED3237" />
            <ellipse cx="53.5654" cy="7.35744" rx="7.41307" ry="7.35744" fill="#FFE4E5" />
            <path d="M115.74 45.4826C115.74 48.1581 113.553 50.3334 110.848 50.3334C108.143 50.3334 105.957 48.1581 105.957 45.4826C105.957 42.8071 108.143 40.6317 110.848 40.6317C113.553 40.6317 115.74 42.8071 115.74 45.4826Z" stroke="#ED3237" />
            <path d="M79.08 27.704C80.136 27.704 80.9893 28.0027 81.64 28.6C82.2907 29.1973 82.616 29.9973 82.616 31C82.616 32.12 82.2693 32.952 81.576 33.496C80.8827 34.0293 79.944 34.296 78.76 34.296L78.712 35.816H77.448L77.384 33.288H77.848C78.904 33.288 79.7307 33.128 80.328 32.808C80.9253 32.488 81.224 31.8853 81.224 31C81.224 30.36 81.032 29.8533 80.648 29.48C80.264 29.1067 79.7467 28.92 79.096 28.92C78.4347 28.92 77.912 29.1013 77.528 29.464C77.1547 29.816 76.968 30.3013 76.968 30.92H75.592C75.592 30.28 75.736 29.72 76.024 29.24C76.312 28.7493 76.7173 28.3707 77.24 28.104C77.7733 27.8373 78.3867 27.704 79.08 27.704ZM78.072 39.096C77.7947 39.096 77.56 39 77.368 38.808C77.176 38.616 77.08 38.3813 77.08 38.104C77.08 37.8267 77.176 37.592 77.368 37.4C77.56 37.208 77.7947 37.112 78.072 37.112C78.3387 37.112 78.5627 37.208 78.744 37.4C78.936 37.592 79.032 37.8267 79.032 38.104C79.032 38.3813 78.936 38.616 78.744 38.808C78.5627 39 78.3387 39.096 78.072 39.096Z" fill="#042879" />
          </svg>

          <div style={{ fontSize: '15px' }}> Sorry, no matching records found.</div>
        </div>
      ),
    },
  },
  filterType: "dropdown",
  responsive: "standard",
  filter: true,
  download: false,
  print: false,
  // checkbox:true,
  selectableRows: false,
  pagination: false,

};

export default function DataTable({accList}) {
  console.log("accList",accList)
  const [accountType, setAccountType] = useState(accList);
  const [selectedAccountNo, setSelectedAccountNo] = useState("");
  const [miniStatementData, setMiniStatementData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // const [username, setUserName] = useState("");
  // const [token, setToken] = useState("");u

  // useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"));
  //   setToken(sessionStorage.getItem("TOKEN"));
  // }, []);
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }
  //   Bank Account fetching API-->Fetch all the Bank accounts and update in DropDown
  // useEffect(() => {
  //   const fetchAccountData = async () => {
  //     try {
  //       setIsloading(true);
  //       const response = await axios.post(
  //         apiList.FETCH_ACC_CORPORATE,
  //         {
  //           username: user.userId,
  //           sessionId: user.sessionId,
  //         }
  //       );
  //       //Set data in Account Type
  //       setAccountType(response.data);
  //       setIsloading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsloading(false);
  //     }
  //   };

  //   fetchAccountData();
  // }, [user.userId, user.sessionId]);

  //Handle the drop down and updating Selected Account
  const handleAccountDropDown = (event) => {
    setSelectedAccountNo(event.target.value);
  };

  // API to Update Mini Statement Using "SelectedAccountNo" which is passed in payload
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const response = await postApiData(
          apiList.CORPORATE_FETCH_MINI_STATEMENT,
          {
            username: user.userId,
            accNo: selectedAccountNo, // Here we are setting the selected account
            sessionId: user.sessionId,
            brCode: user.accountDetails[0].brCode,
            acType: "casa", // Using "CASA " as mentioned in API documentation
          }
        );
        if (response.status) {
          setMiniStatementData(response);
          setIsloading(false);
        }
        else{
          setMiniStatementData([]);
          SweetAlertPopup(response?.message, "Error", "error");
          setIsloading(false);
        }
      
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    if (selectedAccountNo) {
      fetchData();
    }
  }, [selectedAccountNo, user.userId, user.sessionId, user.accountDetails]);

  useEffect(() => {
    if (accList?.length > 0) {
      setSelectedAccountNo(accList[0].accNo);
    }
  }, [accList]);

  //Adding ministatemnet data to apiRows

  const apiRows =
    (miniStatementData?.data?.miniStatement || [])
      .slice(0, 10)
      .map((row, index) => ({
        ...row,
        id: index,
      })) || [];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div style={{ width: "100%" }}>
        <Box sx={{ margin: ".3rem" }}>
          <div className={classes.selectAccount}>
            <div className={classes.textSlect}>Select Account</div>
            <div className={classes.accountNumberSelect}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAccountNo}
                  onChange={handleAccountDropDown}
                  style={{ width: 250, height: 40 }}
                >
                  {accList && accList?.map((item) => (
                    <MenuItem key={item.accNo} value={item.accNo}>
                      {item.accNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </div>
          </div>
            </Box>
    
        {/* <div className={classes.Sbox2}> */}
              <div style={{ width: "100%", marginBottom: "10px", padding:"12px" }}>
                <MUIDataTable
                  title={"Transaction Statement"}
                  data={apiRows}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>
      {/* </div> */}
    </>
  );
}
