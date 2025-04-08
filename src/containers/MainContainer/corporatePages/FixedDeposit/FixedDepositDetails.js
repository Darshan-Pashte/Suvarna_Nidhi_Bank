import React, { useEffect } from "react";
import classes from "./FixedDepositDetails.module.css";

import { useState } from "react";

import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FixedDepositCashCert from "./FixedDepositCashCert";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import Loader from "../../../../components/common/loader";
import GoBackButton from "../../../../components/common/GoBackButton";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #DAE2F6",
    color: "#323232",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

function createData(
  name,
  account,
  accountType,
  balance,
  withdrawable,
  currency,
  uncleared,
  amb
) {
  return {
    name,
    account,
    accountType,
    balance,
    withdrawable,
    currency,
    uncleared,
    amb,
  };
}

//   const rows = userData[0].transhistory.map((data) =>
//     createData(...Object.values(data))
//   );
const FixedDepositDetailsCorporate = () => {
  const [value, setValue] = React.useState(0);

  
  // const goBack = () => {
  //   navigate(-1); 
  // };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const navigate = useNavigate();

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  const [depositList, setDepositList] = useState([]);

  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const getDeposit = async () => {
      try {
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId,
        };
        setIsloading(true);
        const response = await postApiData(apiList.FETCHDEPOSIT, payload);
        // console.log("response", response);
        setDepositList(response?.data?.depositesDetails);
        if(response.status == false)
        SweetAlertPopup(response?.message,"Error","error")
        // setShowBal(response.data?.accBal);

        setIsloading(false);
      } catch (err) {
        // console.log(err);
        setIsloading(false);
      }
    };

    getDeposit();
  }, []);

  return (
    <>
    {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

    <div className={classes.mainpagePayment}>
<GoBackButton/>

{/* <div className={classes.backbuttondesign}>
  <button onClick={goBack}>BACK</button>

</div> */}

      <div className={classes.mainpayment}>
        <div className={classes.mainupper}>
          <div className={classes.mainupperheader}>Deposit</div>
          <div className={classes.mainupperheader1}>
            Deposit Account Details
          </div>
        </div>
        <div className={classes.mainlower}>
          <Box className={classes.tableMainBox}>
            {/* <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: " #DAE2F6",
              borderRadius: '8px 8px 0 0',
            }}
          >
             <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
            //   aria-label="basic tabs example"
              indicatorColor="secondary"
            >
              <Tab label="Fixed Deposit / Cash Certificate" {...a11yProps(0)} />
              <Tab label="Fixed Deposit Monthly" {...a11yProps(1)} />
              <Tab label="Fixed Deposit Quarterly" {...a11yProps(2)} />
              <Tab label="Matured Roupya Dhanvardh department" {...a11yProps(3)} />
             
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
  <FixedDepositCashCert/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Item Four
          </CustomTabPanel> */}

            <div className={classes.depositcardmain}>
            {depositList ? <>
              { depositList && depositList?.map((details, index) => {
                return (
                  <div
                    className={classes.depositcard}
                    onClick={() =>
                      navigate("/account/fixeddepositcashcert", {
                        state: details,
                      })
                    }
                  >
                    <div className={classes.depositcardicon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <circle cx="25" cy="25" r="24.5" stroke="#183883" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M28.7542 20.797L30.4527 18.314C28.8823 18.4075 26.983 18.7764 25.1606 19.3035C23.9223 19.6618 22.5433 19.6077 21.2612 19.3712C20.8574 19.2967 20.4595 19.2034 20.0744 19.0973L21.2281 20.7957C23.5839 21.6653 26.398 21.6657 28.7542 20.797ZM20.6407 21.6415C23.3511 22.7175 26.6375 22.7171 29.3475 21.6405C30.4494 22.7836 31.5875 24.2061 32.4645 25.694C33.3813 27.2495 33.96 28.788 33.998 30.1094C34.034 31.3599 33.5947 32.4373 32.3571 33.2645C31.0455 34.1411 28.7601 34.7854 25.012 34.8217C21.2629 34.8579 18.974 34.2572 17.6587 33.4069C16.4209 32.6066 15.973 31.5409 16.0012 30.2833C16.0311 28.9539 16.6031 27.3934 17.5179 25.805C18.3912 24.2886 19.5297 22.8284 20.6407 21.6415ZM19.831 17.983C20.3446 18.1447 20.8888 18.2856 21.4426 18.3878C22.6415 18.609 23.8494 18.6419 24.8827 18.3429C26.196 17.963 27.5746 17.6552 28.8665 17.4728C27.7641 17.1099 26.4313 16.8232 25.0217 16.8232C22.9872 16.8232 21.0984 17.4202 19.831 17.983ZM18.8735 17.3294C20.2259 16.652 22.5125 15.8232 25.0217 15.8232C27.4844 15.8232 29.7154 16.6216 31.062 17.2916C31.0846 17.3029 31.107 17.3141 31.1291 17.3253C31.4919 17.5086 31.7868 17.6811 32 17.8232L29.9478 20.8232C34.6787 25.6596 40.3251 35.6737 25.0217 35.8216C9.71822 35.9695 15.2659 25.8445 20.0379 20.8232L18 17.8232C18.1426 17.7295 18.321 17.6226 18.5311 17.5081C18.6373 17.4503 18.7515 17.3904 18.8735 17.3294Z"
                          fill="#183883"
                        />
                        <path
                          d="M27.4062 26.9258L27.1992 27.6133H22.2852L22.4883 26.9258H27.4062ZM25.418 33L22.3477 29.3945L22.3398 28.8906H23.6836C24.0898 28.8906 24.4362 28.832 24.7227 28.7148C25.0091 28.5951 25.2279 28.418 25.3789 28.1836C25.5326 27.9492 25.6094 27.6589 25.6094 27.3125C25.6094 26.8021 25.4492 26.401 25.1289 26.1094C24.8112 25.8151 24.3555 25.668 23.7617 25.668H22.2852L22.4883 25H23.7617C24.3346 25 24.8138 25.099 25.1992 25.2969C25.5872 25.4948 25.8789 25.7682 26.0742 26.1172C26.2721 26.4635 26.3711 26.862 26.3711 27.3125C26.3711 27.7344 26.276 28.1146 26.0859 28.4531C25.8984 28.7891 25.6081 29.056 25.2148 29.2539C24.8242 29.4492 24.3255 29.5469 23.7188 29.5469H23.4375L26.3281 32.9414V33H25.418ZM27.4336 25L27.2305 25.6875L23.0898 25.668L23.2773 25H27.4336Z"
                          fill="#183883"
                        />
                      </svg>
                    </div>
                    <div className={classes.depositcardtitle}>
                      {details.accountSchme}
                    </div>
                  </div>
                );
              })}</> : <div className={classes.nodata}>
              No data avaliable</div>}
            </div>
          </Box>
        </div>
      </div>
    </div>
    </>
  );
};

export default FixedDepositDetailsCorporate;
