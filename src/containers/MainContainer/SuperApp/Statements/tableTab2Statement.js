import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "date", headerName: "Date", width: 130 },
  { field: "particulars", headerName: "Particulars", width: 430 },
  { field: "deposite", headerName: "Deposits", width: 140 ,   cellClassName: 'super-app-theme--cell',},
  { field: "withdrawals", headerName: "Withdrawals", width: 140 ,cellClassName: 'super-app-theme--cell1',},
  { field: "balance", headerName: "Balance", width: 130 },
 
];

const apiData = [
  {
    status: true,
    msg: "Success",
    transhistory: [
      {
        date: "21 oct 2023",
        particulars: "UPI/add-money@paytm-wallet/Oid/12355390",
        deposite:'',
        withdrawals: '-₹32.00',
        balance:'₹30,717.5',
      },
      
      {
        date: "20 oct 2023",
        particulars: "UPI/deepakraj0@g-pay/6767754345/UPI",
        deposite:'+₹2000.00',
        withdrawals: '',
        balance:'₹32,717.5',
      },
      
      {
        date: "18 oct 2023",
        particulars: "UPI/cashfree.paytm/56457/UPI Transactions",
        deposite:'',
        withdrawals: '-₹1116.53',
        balance:'₹33,834.03',
      },
      
      {
        date: "15 oct 2023",
        particulars: "UPI/amazon@apl/5632490/yourtransactions",
        deposite:'',
        withdrawals: '-₹2189.16',
        balance:'₹36,023.19',
      },
      
      {
        date: "12 oct 2023",
        particulars: "UPI/rupesh-jain23@paytm/8784748214/UPI",
        deposite:'+₹2700.00',
        withdrawals: '',
        balance:'₹38,723.19',
      },
      
      {
        date: "21 oct 2023",
        particulars: "UPI/add-money@paytm-wallet/Oid/12355390",
        deposite:'',
        withdrawals: '-32',
        balance:'₹30,717.5',
      },
      
      {
        date: "10 oct 2023",
        particulars: "UPI/add-money@paytm-wallet/Oid/1524132",
        deposite:'',
        withdrawals: '-₹120.00',
        balance:'₹39,923.19',
      },
      
      {
        date: "21 oct 2023",
        particulars: "UPI/add-money@paytm-wallet/Oid/12355390",
        deposite:'',
        withdrawals: '-32',
        balance:'₹30,717.5',
      },
      
      {
        date: "08 oct 2023",
        particulars: "UPI/cashfree.paytm/51451/UPI Transactions",
        deposite:'',
        withdrawals: '-₹1200.00',
        balance:'₹41,123.19',
      },
      
      {
        date: "06 oct 2023",
        particulars: "UPI/somesh-pandey18@paytm/5633125467/UPI",
        deposite:'+₹580.00',
        withdrawals: '',
        balance:'₹41,403.19',
      },
      
      {
        date: "05 oct 2023",
        particulars: "UPI/kbcompany@paytm/5633125467",
        deposite:'+₹218.00',
        withdrawals: '',
        balance:'₹41,671.19',
      },
      
      {
        date: "04 oct 2023",
        particulars: "UPI/ramesh-patil88@paytm/5633125467/UPI",
        deposite:'+₹184.00',
        withdrawals: '',
        balance:'₹41,871.19',
      },
      
      {
        date: "21 oct 2023",
        particulars: "UPI/add-money@paytm-wallet/Oid/12355390",
        deposite:'',
        withdrawals: '-32',
        balance:'₹30,717.5',
      },
      
    
    ],
  },
];

export default function DataTable() {
  const apiRows =
    apiData[0]?.transhistory.map((row, index) => ({ ...row, id: index })) || [];
  return (
  
    <Box
    sx={{
    
      width: '100%',
      '& .super-app-theme--cell': {
        color: '#219C3C',
        fontWeight: '600',
      },
      '& .super-app-theme--cell1': {
        color: '#DD2E2E',
        fontWeight: '600',
      },
     
    }}
  >
    <DataGrid rows={apiRows} columns={columns}
    
    initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
      />
  </Box>
    // <div style={{ height: 400, width: "100%",}}>
 
    //   <DataGrid
    //        sx={{ '& .super-app-theme--cell': {
    //         backgroundColor: 'rgba(224, 183, 60, 0.55)',
    //         color: 'red',
    //         fontWeight: '600',
    //       },}}
    //     rows={apiRows}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 5 },
    //       },
    //     }}
    //     pageSizeOptions={[5, 10]}
    //   />
    // </div>
  );
}
