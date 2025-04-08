import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "header", headerName: " ", width: 230 },
  { field: "account", headerName: "Accounts ", width: 230 },
  { field: "assets", headerName: "Assets", width: 100 },
  {
    field: "laibility",
    headerName: "Liability",
    type: "number",
    width: 130,
  },
];

const apiData = [
  {
    status: true,
    msg: "Success",
    transhistory: [
      {header:'Operative',
        account: "2",
        assets: "₹38,250.00",
        laibility: "",
      },
      
      {header:'Deposits',
        account: "2",
        assets: "₹8,63,522.00",
        laibility: "",
      },
      
      {header:'Loans',
      account: "1",
      assets: "₹1,18,500.00",
      laibility: "",
    },
    ],
  },
];

export default function DataTableConsolidate() {
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
