import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "accountname", headerName: "Account Name", width: 170 },
  { field: "transaction", headerName: "Account Number", width: 300 },
  {
    field: "accounttype",
    headerName: "Account Type",
    width: 170,
  },
  {
    field: "accountbalance",
    headerName: "Account Balance",
    type: "number",
    width: 200,
  },
];

const apiData = [
  {
    status: true,
    msg: "Success",
    transhistory: [
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance: "Click to view balance",
      },
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance: "Click to view balance",
      },
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance:"Click to view balance",
      },
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance: "Click to view balance",
      },
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance: "Click to view balance",
      },
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance: "Click to view balance",
      },
      {
        accountname: "ABC PVT LTD",
        transaction: "UPI/add-money@p/Oid/12355390",
        accounttype: "current",
        accountbalance: "Click to view balance",
      },
    ],
  },
];

export default function DataTableLower() {
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
