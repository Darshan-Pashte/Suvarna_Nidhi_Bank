import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "date", headerName: "Date", width: 130 },
  { field: "transaction", headerName: "Transaction", width: 500 },
  {
    field: "amount",
    headerName: "Amount",
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
        date: "08/09/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: -35,
      },
      {
        date: "17/04/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: 233,
      },
      {
        date: "11/09/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: 35033,
      },
      {
        date: "22/10/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: 2335,
      },
      {
        date: "08/11/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: 33335,
      },
      {
        date: "30/09/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: 54565,
      },
      {
        date: "12/4/2023",
        transaction: "UPI/add-money@p/Oid/12355390",
        amount: 23455,
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
