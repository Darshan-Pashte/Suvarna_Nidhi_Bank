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

// import classes from "../../../MainContainer/corporatePages/home/CorporateHome.module.css";
import classes from "../Accounts/CorporateAccount.module.css";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import DataTable from "../../SuperApp/Home/tableTab2Home";
// import SliderTestimonials from "./HomeSlider/HomeSlider";
import AccountStatement from "../../SuperApp/CorporateHome/AccountStatement";
// import AccountStatementHome from "./AccountStatementHome";
import Loader from "../../../../components/common/loader";
import LoanTab from "../../SuperApp/Home/LoanTab";
import BankAccountTable from "../../SuperApp/CorporateHome/BankAccounttable";
import BankAccounttable from "../../SuperApp/CorporateHome/BankAccounttable";
import TableAccountStatement from "../../SuperApp/CorporateHome/tableAccountStatement";
import FinancialOverview from "../home/FinancialOverview/FinancialOverview";
import LoanTabCorporate from "./LoanTabCorporate";
// import SavingAccount from "../../../../assets/AccountsPics/SavingAccount.svg";
// import CurrentLimit from "../../../../assets/images/backupImages/Bhagini/Customerlimit.svg";
import CorporateAccountStatement from "../home/HomeAccountStatement/CorporateAccountStatement";
import GoBackButton from "../../../../components/common/GoBackButton";

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

const CorporateAccount = () => {
  const [valueTable, setValueTable] = React.useState(0);
  const [CurrentLimit, setCurrentLimit] = useState(null);

  const handleChange = (event, newValue) => {
    setValueTable(newValue);
  };

  const bankName = process.env.REACT_APP_FLAVOUR;

  useEffect(() => {
    const importedImage = async () => {
      const CurrentLimit = await import(`../../../../assets/Banks/${bankName}/images/Customerlimit.svg`);
      setCurrentLimit(CurrentLimit.default);
    };
    importedImage(); 
  }, [bankName]);

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
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [ToggleState, setToggleState] = useState(true);
  const [accList, setAccList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getAccountList = async () => {
      setIsloading(true);
      try {
        const payload = {
          username: user?.userId,
          sessionId: user?.sessionId,
        };
        const response = await postApiData(
          apiList.FETCH_ACC_CORPORATE,
          payload
        );
        // console.log("response", response);
        // setShowBal(response.data?.accBal);
        setAccList(response?.data?.accountlst);
        setIsloading(false);
      } catch (err) {
        // console.log(err)
        setIsloading(false);
      }
    };

    getAccountList();
  }, []);

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "10rem",
    height: "4rem",
    "&:hover": {
        background: "var(--button-hover-color)",
        color: "white",
    },
    "@media (max-width: 568px)": {
        width: "100%",
        height: "35px",

    },
}));


  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <div className={classes.redrow}>
        <div>
          <div style={{ display: "flex", alignItems:"center", gap: '5px' }}>
            <GoBackButton />
            <div className={classes.SubHeading}>
              Financial Overview
            </div>
          </div>
        </div>

      </div>
      <div className={classes.sbox}>
        <div className={classes.cardsmainpage}>
          <Grid item xs={12} sm={12} md={12}>

            <div className={classes.financialOverviewaccount}>
              <FinancialOverview accList={accList} />
            </div>
          </Grid>

          <Grid
            container
            columnSpacing={3}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.SubHeadinCorporateAccount}>Account Statement</div>
              <div className={classes.cardsBox}>

                <CorporateAccountStatement accList={accList} />

              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.SubHeadinCorporateAccount}>Set Customer Limit</div>
              <div className={classes.cardsBox}>
                <Box className={classes.accountsMarginBox}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img

                        className={classes.iconImagesPaddingType1}
                        src={CurrentLimit}
                        alt="Saving Account"
                      />
                    </div>
                    <ColorButton2 style={{ marginTop: "-0.3rem" }} onClick={() => navigate("/account/setacclimit")} variant="contained" type="button">
                      Set Customer Limit
                    </ColorButton2>
                  </div>
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} marginBottom={5}>
            <div className={classes.SubHeadinCorporateAccount}>
              Account Statements
            </div>

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
                  <Tab
                    style={{ color: "var(--common-heading-color)" }}
                    label="Recent Transactions"
                    {...a11yProps(0)}
                  />
                  {/* <Tab
                    style={{ color: "var(--common-heading-color)" }}
                    label="Loans"
                    {...a11yProps(1)}
                  /> */}
                  {/* <Tab label="Deposits" {...a11yProps(2)} /> */}
                </Tabs>
              </Box>
              <div className={classes.tabContent}>
                <CustomTabPanel value={valueTable} index={0}>
                  <TableAccountStatement accList={accList} />
                </CustomTabPanel>
                <CustomTabPanel value={valueTable} index={1}>
                  <LoanTabCorporate accList={accList} />
                </CustomTabPanel>
              </div>
            </Box>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default CorporateAccount;
