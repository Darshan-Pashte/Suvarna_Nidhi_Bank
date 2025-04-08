import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "accountnumber", headerName: "Account number", width: 230 },
  { field: "accounttype", headerName: "Account type", width: 100 },
  {
    field: "availablebalance",
    headerName: "Available balance",
    type: "number",
    width: 130,
  },
];

const apiData = [
  {
    status: true,
    msg: "Success",
    transhistory: [
      {
        accountnumber: "0000487123256871486",
        accounttype: "Current",
        availablebalance: "₹27,3980.00",
      },
      
      {
        accountnumber: "0000877128743477985",
        accounttype: "Overdraft",
        availablebalance: "₹10,852.00",
      },
    ],
  },
];

export default function DataTable() {
  const apiRows =
    apiData[0]?.transhistory.map((row, index) => ({ ...row, id: index })) || [];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
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
  );
}
