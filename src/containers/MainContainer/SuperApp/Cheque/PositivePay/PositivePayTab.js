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

import classes from "./AccountLimit.module.css";
import { postApiData } from "../../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../../components/utilities/nodeApiList";
import Loader from "../../../../../components/common/loader";
import SweetAlertPopup from "../../../../../components/common/sweetAlertPopup";
import PositivePaySearch from "./PositivePay";
import PositivePayRequest from "./PositivePayRequest";
// import LoanTab from "./LoanTab";

const defaultFormData = {
  email: "",
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

const PositivePayTab = () => {

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

  const [valueTable, setValueTable] = React.useState(0);
  const [ToggleState, setToggleState] = useState(true);
  // const [accList, setAccList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [custNo, setCustNo] = useState([]);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   handleCustomerFetch()
  // }, [user]);



  const handleCustomerFetch = async () => {
    try {
      setIsloading(true);
      let payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.CORPORATE_CUSTOMER, payload);
      console.log("addhar", response);
      if (response?.status === true) {
        setCustNo(response?.data?.custDetails);
        setIsloading(false);
      } else {
        SweetAlertPopup(response?.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };



  const handleChange = (event, newValue) => {
    setValueTable(newValue);
  };




  const navigate = useNavigate();


  // useEffect(() => {
  //   const getAccountList = async () => {
  //     try {
  //       const payload = {
  //         username: user?.userId,
  //         sessionId: user?.sessionId,
  //       };
  //       setIsloading(true);
  //       const response = await postApiData(
  //         apiList.FETCH_ACC_CORPORATE,
  //         payload
  //       );
  //       // console.log("response", response);
  //       // setShowBal(response.data?.accBal);
  //       setAccList(response?.data?.accountlst);
  //       setIsloading(false);
  //     } catch (err) {
  //       // console.log(err)
  //       setIsloading(false);
  //     }
  //   };

  //   getAccountList();
  // }, []);

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <Grid item xs={12} sm={12} md={12}>
        {/* <div className={classes.gridtitle}>Financial Overview</div> */}
        <Box className={classes.tableMainBox}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              // color:'var(--common-heading-color)',
              backgroundColor: "var(--primary-color)",
              borderRadius: 2,
            }}
          >
            <Tabs
              value={valueTable}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab style={{ color: 'var(--common-heading-color)' }} label="Positive Pay Request" {...a11yProps(0)} />
              <Tab style={{ color: 'var(--common-heading-color)' }} label="Positive Pay Search" {...a11yProps(1)} />
              {/* <Tab label="Deposits" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <div className={classes.tabContent}>
            <CustomTabPanel value={valueTable} index={0}>
            <PositivePayRequest />
            </CustomTabPanel>
            <CustomTabPanel value={valueTable} index={1}>
              <PositivePaySearch />
            </CustomTabPanel>
          </div>
          {/* <CustomTabPanel value={valueTable} index={2}>
                  Item Three
                </CustomTabPanel> */}
        </Box>
      </Grid>
    </>
  );
};

export default PositivePayTab;
