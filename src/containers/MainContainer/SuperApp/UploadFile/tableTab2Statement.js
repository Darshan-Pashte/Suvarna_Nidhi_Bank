import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "date", headerName: "File Sequence No.", width: 150 , headerClassName: 'super-app-theme--header'},
  { field: "particulars", headerName: "Product Type", width: 190, headerClassName: 'super-app-theme--header' },
  { field: "deposite", headerName: "File Name", width: 190 ,   cellClassName: 'super-app-theme--cell', headerClassName: 'super-app-theme--header'},
  { field: "withdrawals", headerName: "Uploaded By", width: 190 ,cellClassName: 'super-app-theme--cell1', headerClassName: 'super-app-theme--header'},
  { field: "balance", headerName: "Date of Upload", width: 170 , headerClassName: 'super-app-theme--header'},
  { field: "filestatus", headerName: "File Status", width: 190 , headerClassName: 'super-app-theme--header'},
 
];

const apiData = [
  {
    status: true,
    msg: "Success",
    transhistory: [
      {
        date: "38915",
        particulars: "Other Bank Upload",
        deposite:'ABC allowance NEFT',
        withdrawals: 'Ramesh',
        balance:'16/11/2023',
        filestatus:'File Uploaded'
      },
      {
        date: "38915",
        particulars: "Within Bank Upload",
        deposite:'ABC allowance SCB',
        withdrawals: 'Mahesh',
        balance:'16/11/2023',
        filestatus:'Successfully Uploaded'
      },
      {
        date: "38915",
        particulars: "Other Bank Upload",
        deposite:'ABC allowance NEFT',
        withdrawals: 'Ramesh',
        balance:'16/11/2023',
        filestatus:'File Uploaded Check Status'
      },
      {
        date: "38915",
        particulars: "Other Bank Upload",
        deposite:'ABC allowance NEFT',
        withdrawals: 'Ramesh',
        balance:'16/11/2023',
        filestatus:'File Uploaded Check Status'
      },
      {
        date: "68915",
        particulars: "Other Bank Upload",
        deposite:'ABC allowance NEFT',
        withdrawals: 'Ramesh',
        balance:'16/11/2023',
        filestatus:'Rejected'
      },
      {
        date: "58915",
        particulars: "Other Bank Upload",
        deposite:'ABC allowance NEFT',
        withdrawals: 'Ramesh',
        balance:'16/11/2023',
        filestatus:'File Uploaded Check Status'
      },
      {
        date: "48915",
        particulars: "Other Bank Upload",
        deposite:'ABC allowance NEFT',
        withdrawals: 'Ramesh',
        balance:'16/11/2023',
        filestatus:'Successfully Uploaded'
      },
      
      


  
      
    
    ],
  },
];

export default function DataTableUpload() {
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
      '& .super-app-theme--header': {
        backgroundColor: '#DAE2F6',
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
