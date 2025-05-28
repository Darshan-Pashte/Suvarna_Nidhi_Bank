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

import classes from "./CorporateHome.module.css";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import DataTable from "../../SuperApp/CorporateHome/tableTab2Home";

// import AccountStatement from "../CorporateHome/AccountStatement";

import Loader from "../../../../components/common/loader";
import AccountStatementHome from "../../SuperApp/Home/AccountStatementHome";
import LoanTab from "../../SuperApp/Home/LoanTab";
// import SliderTestimonials from "../../SuperApp/Home/HomeSlider/HomeSlider";
import CorporateAccountStatement from "./HomeAccountStatement/CorporateAccountStatement";
import ApprovalsPending from "./HomeApprovalPending/ApprovalsPending";
import TransferFunds from "./HomeTransferFunds/TransferFunds";
// import ApprovalsPending from "../../SuperApp/CorporateHome/ApprovalsPending";
// import TransferFunds from "./TransferFunds/TransferFunds";
import BulkUpload from "./HomeBulkUpload/BulkUpload";
import FinancialOverview from "./FinancialOverview/FinancialOverview";
import SliderTestimonials from "./HomeSlider/HomeSlider";
// import CorporateAccountStatement from "./HomeAccountStatement/CorporateAccountStatement";
import refresh from "../../../../assets/refresh.svg"

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


const Home = () => {
  const [valueTable, setValueTable] = React.useState(0);
  const theme = useSelector((state) => state.theme.theme);

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


  useEffect(() => {
    const getAccountList = async () => {
      try {
        const payload = {
          username: user?.userId,
          sessionId: user?.sessionId
        };
        setIsloading(true)
        const response = await postApiData(apiList.FETCH_ACC_CORPORATE, payload, {
          Authorization: "Bearer " + user?.token,
          // Authorization: "Bearer " + sessionStorage.getItem("updatedToken"),
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

    getAccountList()
  }, [])

  return (
    <>
      <div className={classes.cardsmainpage}>


        {/* <div className={`${classes.gridtitle} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>Account Statement</div> */}

        <div className={classes.cardscontent}>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >

            {/* <Grid item xs={12} sm={12} md={12} ><div className={classes.gridtitlefirst}>Hi,{user?.customerName}(Welcome to Mahesh Bank)</div> </Grid> */}
            <Grid item xs={12} sm={12} md={6} >
              <div className={`${classes.gridtitle} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>Account Details</div>
              <div className={`${classes.cardsBoxCard} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
                {isLoading ? (<Loader loading={true} />) : (<><Loader loading={false} /><SliderTestimonials accList={accList} /></>)}
              </div>
            </Grid>


            <Grid item xs={12} sm={12} md={6}>
              <div className={`${classes.gridtitle} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>Account Statement</div>

              <div className={classes.cardsBox}>

                <div className={classes.accountstatement}><CorporateAccountStatement accList={accList} /></div>
              </div>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.corporateHomeMain}>
                <div className={`${classes.gridtitle} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>Financial Overview</div>
                {/* <div className={classes.gridimage}> <img src={refresh} alt="headerLogo" /></div> */}
              </div>

              <div className={classes.accountstatement}><FinancialOverview accList={accList} /></div>

            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;
