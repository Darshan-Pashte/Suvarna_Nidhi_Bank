import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import classes from "../checkerApprove/Checker.module.css";
// import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { postApiData } from "../../../components/utilities/nodeApiServices";

import { apiList } from "../../../components/utilities/nodeApiList";


import Loader from "../../../components/common/loader";

import refresh from "../../../assets/refresh.svg";
// import CheckApproval from "./CheckerApproval";
import MUIDataTable from "mui-datatables";
import CheckerSliderTestimonials from "../checkerApprove/CheckerHome/CheckerSliderTestimonials";
import CheckApproval from "../checkerApprove/CheckerHome/CheckerApproval";
import AuthorizerSlider from "./AuthorizerSlider";
import ApprovalNotification from "./ApprovalNotification";
import SweetAlertPopup from "../../../components/common/sweetAlertPopup";
import { convertDate } from "../../../components/utilities/convertDate";
import CheckerRecentTransaction from "../checkerApprove/CheckerHome/checkerRecentTransaction";
import CorporateAccountStatement from "../corporatePages/home/HomeAccountStatement/CorporateAccountStatement";
import SliderTestimonials from "../corporatePages/home/HomeSlider/HomeSlider";
// import CheckerSliderTestimonials from "./CheckerSliderTestimonials";


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


const AuthorizeHome = () => {
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
  const [accList, setAccList] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const [totalRecord, settotalRecord] = useState(0);
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAccountList()
        await getTransactionListView();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getAccountList = async () => {
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId
      };
      setIsloading(true)
      const response = await postApiData(apiList.FETCH_ACC_CORPORATE, payload, {
        Authorization: "Bearer " + user?.token,
      });
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setAccList(response?.data?.accountlst)
      setIsloading(false)

    } catch (err) {
      // console.log(err)
      setIsloading(false)
    }

  };


  const getTransactionListView = async () => {

    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        fromDt: convertDate(new Date(), 1),
        toDt: convertDate(new Date(), 1),
        status: "C",
        transtype: "all",
      };

      const response = await postApiData(
        apiList.CORPORATE_TRANSACTION_VIEW + `?pageNo=${1}&pageSize=${10}`,
        payload
      );

      if (response.status == true) {
        setResponseData(response.data)
        settotalRecord(response.data.totalRecords)
      } else {
        setResponseData("")
        settotalRecord("")
        // SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.cardsmainpage}>
        {/* <div className={classes.gridtitle}>Account Statement</div> */}
        <div className={classes.cardscontent}>
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            style={{ padding: "0.1vw"}}
          >

            {/* <Grid item xs={12} sm={12} md={12} ><div className={classes.gridtitle}>Hi,{user?.customerName}(Welcome to Mahesh Bank)</div> </Grid> */}
            <Grid item xs={12} sm={12} md={6} >
             
                <div className={classes.gridtitle}>Account Details</div>
            
              <div className={classes.cardsBoxCard}>
                {isLoading ? (<Loader loading={true} />) : (<><Loader loading={false} /><SliderTestimonials accList={accList} /></>)}
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.gridtitle}>Account Statement</div>

              <div className={classes.cardsBox}>

                <div className={classes.accountstatement}><CorporateAccountStatement accList={accList} /></div>
              </div>
            </Grid>


            {/* <Grid item xs={12} sm={12} md={6}>
              <div className={classes.corporateHomeMain}>
                <div className={classes.gridtitle}>Approvals Notifications</div>
              </div>

              <div className={classes.cardsBox1}>
                <div className={classes.accountstatement}><ApprovalNotification accList={accList} /></div>
              </div>
            </Grid> */}


            <Grid item xs={12} sm={12} md={12}>
              <CheckerRecentTransaction status={"C"} responseData={responseData} />
            </Grid>


          </Grid>
        </div>
      </div>
    </>
  );
};

export default AuthorizeHome;
