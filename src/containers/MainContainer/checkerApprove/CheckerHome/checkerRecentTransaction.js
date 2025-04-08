import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography, Button, Tooltip, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
// import { Button } from "@mui/base";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import classes from "../Checker.module.css";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import DataTable from "../../SuperApp/CorporateHome/tableTab2Home";

// import AccountStatement from "../CorporateHome/AccountStatement";

import Loader from "../../../../components/common/loader";
import AccountStatementHome from "../../SuperApp/Home/AccountStatementHome";



// import ApprovalsPending from "../../SuperApp/CorporateHome/ApprovalsPending";
// import TransferFunds from "./TransferFunds/TransferFunds";

import SliderTestimonials from "../../corporatePages/home/HomeSlider/HomeSlider";
// import CorporateAccountStatement from "./HomeAccountStatement/CorporateAccountStatement";
import refresh from "../../../../assets/refresh.svg";
import CheckApproval from "./CheckerApproval";
import MUIDataTable from "mui-datatables";
import CheckerSliderTestimonials from "./CheckerSliderTestimonials";
import { convertDate } from "../../../../components/utilities/convertDate";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkUploadViewModal from "../../SuperApp/CorporateFundTransfer/BulkUploadViewModal";



const defaultFormData = {
  username: "",
  password: "",
};

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


const CheckerRecentTransaction = ({ responseData }) => {
  const [valueTable, setValueTable] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTable(newValue);
  };

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
    defaultValues: defaultFormData,
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [ToggleState, setToggleState] = useState(true)
  const [accList, setAccList] = useState([])
  const [isLoading, setIsloading] = useState(false);
  // const [responseData, setResponseData] = useState({});
  const [indexId, setIndexId] = useState();
  const [payloadData, setPayloadData] = useState({});
  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowDataToDisplay, setRowDataToDisplay] = useState({});
  const [tableHeaders, setTableHeaders] = useState([]);

  // const options = {
  //     filterType: "dropdown",
  //     responsive: "stacked",
  //     filter: false,
  //     download: false,
  //     print: false,
  //     // checkbox:true,
  //     selectableRows: false,
  //     pagination: false,

  // };

  const options = {
    textLabels: {
      body: {
        noMatch: (
          <div
            style={{
              display: "flex",
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "larger"
            }}
          >
            Sorry, no matching records found
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "standard",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,
  };




  const closeModal = () => {
    setIsModalOpen(false);
  };


  const openModal = (rowData) => {
    // console.log("rowDta", rowData)
    const index = 12;
    if (rowData.length > index) {
      const dateValue = rowData[index];

      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      if (dateRegex.test(dateValue)) {
        const formattedDate = new Date(dateValue).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          // timeZoneName: 'short',
        });

        const modifiedRowData = [...rowData];
        modifiedRowData[index] = formattedDate;
        const headers = columns
          ?.filter((column) => column?.label !== "View" && column?.label !== "Sr. No.")
          .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
          headers: headers,
          rowData: modifiedRowData,
        });
        setIsModalOpen(true);
      } else {
        console.error("Value at index 12 is not in the expected date format");
        const defaultDate = "N/A";
        const modifiedRowData = [...rowData];
        modifiedRowData[index] = defaultDate;
        const headers = columns
          ?.filter((column) => column?.label !== "View" && column?.label !== "Sr. No.")
          .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
          headers: headers,
          rowData: modifiedRowData,
        });
        setIsModalOpen(true);
      }
    } else {
      console.error("rowData doesn't have enough items");
    }
  };

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const columns = [
    {
      name: "View",
      label: "View",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta) => {
          return (
            <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} onClick={() => openModal(rowData)}> <VisibilityIcon /></Button>
          );
        },
      }
    },
    {
      name: 'transdate',
      label: 'Transaction Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transactiontype',
      label: 'Transaction Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'rrnNo',
      label: 'RRN No',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmitterAccNo',
      label: 'Remitter A/C No',
      options: {
        filter: true,
        sort: false,
        
      },
    },

    {
      name: 'beneName',
      label: 'Beneficiary Name',
      options: {
        filter: true,
        sort: false,
        // display: false
      },
    },

    {
      name: 'beneAccNo',
      label: 'Beneficiary A/C No',
      options: {
        filter: true,
        sort: false,
        // display: false
      },
    },
 


    {
      name: 'beneifsc',
      label: 'Beneficiary IFSC',
      options: {
        filter: true,
        sort: false,
        // display: false
      },
    },
    {
      name: 'cbsreceivedDate',
      label: 'CBS Received Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'cbsSendDate',
      label: 'CBS Send Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },

    {
      name: 'cbsRrn',
      label: 'CBS RRN',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },


    {
      name: 'remmitterbrCode',
      label: 'Remitter Code',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmittermob',
      label: 'Remitter Mo No.',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },

    {
      name: 'activitystatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'responsedesc',
      label: 'Narration',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remarks',
      label: 'Remarks',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
  ];

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.cardsmainpage}>
        <div className={classes.cardscontent}>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={2}
            style={{}}
          >
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.corporateHomeMain}>
                <div className={classes.gridtitlerecentTran}>Recent Transaction</div>
                {/* <div className={classes.gridimage}>
                                    <Tooltip title="Refresh">
                                            <img src={refresh} alt="headerLogo" className={classes.imgRecent} onClick={getTransactionListView} />
                                    </Tooltip>
                                </div> */}
              </div>

              <div className={classes.mainupper}>
                {/* <div className={classes.bluerow}>Announcement Browse List</div> */}
                <div style={{ marginBottom: '2vh', marginTop: "2vh", }}>
                  <MUIDataTable
                    // title={"Announcement List"}
                    // data={data ? data : []}
                    data={responseData?.translist}
                    columns={columns}
                    options={options}
                  />
                </div>
              </div>
              {
                isModalOpen ? <BulkUploadViewModal open={isModalOpen} handleClose={closeModal} rowDataToDisplay={rowDataToDisplay} show={"1"} title={"Transaction Details"} /> : null
              }
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default CheckerRecentTransaction;
