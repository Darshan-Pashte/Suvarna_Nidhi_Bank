import React, { useEffect } from "react";
import classes from "./AccountLimit.module.css";
import {
  Box,
  Divider,
  Grid,
  Slider,
  TableCell,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { Button } from "@mui/base";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import Loader from "../../../../components/common/loader";
import MuiInput from "@mui/material/Input";
import { VolumeUp } from "@mui/icons-material";
import GoBackButton from "../../../../components/common/GoBackButton";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";

const Input = styled(MuiInput)`
  width: 100px;
`;

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

//
const SetAccLimit = () => {
  const {
    control,
    handleSubmit,
    getValues,
    register,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    // defaultValues: defaultFormData,
    mode: "onChange",
  });

  const filteredData = [
    {
      code: 0,
      value: "392387650080214",
    },
    {
      code: 1,
      value: "492387650080214",
    },
    {
      code: 2,
      value: "592387650080214",
    },
  ];
  const [accountLimit, setAccountLimit] = useState([]);

  const [perTrnAmt, setperTrnAmt] = useState(0);
  const [perDayTrnAmt, setperDayTrnAmt] = useState(0);
  const [perTrnAmtInt, setperTrnAmtInt] = useState(0);
  const [perDayTrnAmtInt, setperDayTrnAmtInt] = useState(0);
  const [perTrnAmtNeft, setperTrnAmtNeft] = useState(0);
  const [perDayTrnAmtNeft, setperDayTrnAmtNeft] = useState(0);

  const [perTrnAmtRTGS, setperTrnAmtRTGS] = useState(0);
  const [perDayTrnAmtRTGS, setperDayTrnAmtRTGS] = useState(0);

  // const [perTrnAmtImps, setperTrnAmtImps] = useState(0);
  // const [perDayTrnAmtImps, setperDayTrnAmtImps] = useState(0);
  // SLIDER

  const handleSliderChangeperTrnAmtRTGS = (event, newValue) => {
    setperTrnAmtRTGS(newValue);
  };

  const handleSliderChangeperDayTrnAmtRTGS = (event, newValue) => {
    setperDayTrnAmtRTGS(newValue);
  };

  const handleSliderChangeperTrnAmtIMPS = (event, newValue) => {
    setperTrnAmt(newValue);
  };

  const handleSliderChangesetperDayTrnAmtIMPS = (event, newValue) => {
    setperDayTrnAmt(newValue);
  };

  const handleSliderChangesetperTrnAmtInt = (event, newValue) => {
    setperTrnAmtInt(newValue);
  };

  const handleSliderChangesetperDayTrnAmtInt = (event, newValue) => {
    setperDayTrnAmtInt(newValue);
  };

  const handleSliderChangesetperTrnAmtNeft = (event, newValue) => {
    setperTrnAmtNeft(newValue);
  };

  const handleSliderChangesetperDayTrnAmtNeft = (event, newValue) => {
    setperDayTrnAmtNeft(newValue);
  };

  // INPUT

  const handleInputChangeperTrnAmtRTGS = (event) => {
    setperTrnAmtRTGS(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  const handleInputChangeperDayTrnAmtRTGS = (event) => {
    setperDayTrnAmtRTGS(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  const handleInputChangeperTrnAmt = (event) => {
    setperTrnAmt(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleInputChangesetperDayTrnAmt = (event) => {
    setperDayTrnAmt(event.target.value === "" ? 0 : Number(event.target.value));
  };


  const handleInputChangesetperTrnAmtNeft = (event) => {
    setperTrnAmtNeft(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  const handleInputChangesetperDayTrnAmtNeft = (event) => {
    setperDayTrnAmtNeft(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };


  const handleInputChangesetperTrnAmtInt = (event) => {
    setperTrnAmtInt(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  const handleInputChangesetperDayTrnAmtInt = (event) => {
    setperDayTrnAmtInt(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  useEffect(() => {
    if (watch("accountNumber"))
      getAccountLimit();
  }, [user, watch("accountNumber")]);

  const getAccountLimit = async (data) => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        // accNo: watch("accountNumber")?.value,
        // brCode: watch("accountNumber")?.code,
      };
      setIsloading(true);
      const response = await postApiData(apiList.GETACCLIMIT, payload);
      // console.log("response", response);
      setperTrnAmt(response?.data.perTrnAmt);
      setperDayTrnAmt(response?.data.perDayTrnAmt);
      setperTrnAmtInt(response?.data.perTrnAmtInt);
      setperDayTrnAmtInt(response?.data.perDayTrnAmtInt);
      setperTrnAmtNeft(response?.data.perTrnAmtNeft);
      setperDayTrnAmtNeft(response?.data.perDayTrnAmtNeft);
      setperTrnAmtRTGS(response?.data.perTrnAmtRtgs);
      setperDayTrnAmtRTGS(response?.data.perDayTrnAmtRtgs);
      setperTrnAmt(response?.data.perTrnAmt);
      setperDayTrnAmt(response?.data.perDayTrnAmt);

      setAccountLimit(response?.data);
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsloading(true);

      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
        perTrnAmt: perTrnAmt,
        perDayTrnAmt: perDayTrnAmt,
        perTrnAmtNeft: perTrnAmtNeft,
        // perDayTrnAmt: perDayTrnAmt,
        perDayTrnAmtNeft: perDayTrnAmtNeft,
        perTrnAmtRtgs: perTrnAmtRTGS,
        perDayTrnAmtRtgs: perDayTrnAmtRTGS,
        perTrnAmtInt: perTrnAmtInt,
        perDayTrnAmtInt: perDayTrnAmtInt,

      };
      const response = await postApiData(apiList.UPDATEACCLIMIT, payload);
      if (response.status == true) {
        SweetAlertPopup(response?.message, "Success", "success");
      } else {
        SweetAlertPopup(response?.message, "Error", "error");
        getAccountLimit();
      }

      setIsloading(false);
      // reset()
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: '0.8rem',
    width: "8rem",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
    "@media (max-width: 568px)": {
      width: "100%",
      height: "35px",
      
    },
  }));

  useEffect(() => {
    if (accountList) {
      setValue(
        "accountNumber",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.redrow}>

        <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
          <GoBackButton />
          <div className={classes.SubHeading}>
            Set Customer Limit
          </div>
        </div>
      </div>


      <div className={classes.sboxs}>
        <Box
          className={classes.mainContainer}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.tableMainBoxInner}>
            <div className={classes.accountlimittop}>
              <Grid
                container
                columnSpacing={5}
                rowSpacing={5}
                style={{ padding: "0.1vw" }}
              >
              
              </Grid>
            </div>

            <div  style={{marginTop:"20px"}} className={classes.acclimitheadingneft}>NEFT</div>

            <div className={classes.accountlimtImpsupper}>
              <div className={classes.tableMainBoxInner}>
                <div className={classes.Impsuppertext}>
                  Per Day Transaction Limit
                </div>

                <Box>
                  <Grid container>
                    <Grid item xs={12} sm={9} md={9}>
                      <Slider
                        value={
                          // typeof perDayTrnAmtNeft === "string" ?
                          perDayTrnAmtNeft ? Number(perDayTrnAmtNeft) : 0
                            // : 0
                        }
                        onChange={handleSliderChangesetperDayTrnAmtNeft}
                        aria-labelledby="input-slider"
                        max={accountLimit?.bankPerDayTrnAmtNeft}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={0} sm={1} md={1}></Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Input
                        value={perDayTrnAmtNeft}
                        onChange={handleInputChangesetperDayTrnAmtNeft}
                        sx={{
                          width: "100%",
                        }}
                        inputProps={{
                          min: 0,
                          max: accountLimit?.bankPerDayTrnAmtNeft,
                          type: "number",
                          "aria-labelledby": "input-slider",
                        }}
                      />
                    </Grid>
                  </Grid>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={classes.Impslowerlefttext}>
                      Current Limit{" "}
                      <div className={classes.Impslowerrighttext}>
                        ₹ {accountLimit?.perDayTrnAmtNeft}
                      </div>
                    </div>

                    <div className={classes.Impslowerlefttext}>
                      Per Day Transaction Max Amount :
                      <div className={classes.Impslowerrighttext}>
                        ₹ {accountLimit?.bankPerDayTrnAmtNeft}
                      </div>{" "}
                    </div>
                  </div>
                </Box>
                {/* <div className={classes.Impslowertext}>
          <div className={classes.Impslowerlefttext}>
            Max Transaction Amount
          </div>
          <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmtNeft}</div>
        </div> */}
              </div>
            </div>

            <Divider />
            {/* <div className={classes.acclimitheading}>Internal</div>

          <div className={classes.accountlimtImpsupper}>
            <div className={classes.tableMainBoxInner}>
              <div className={classes.Impsuppertext}>Per Transaction Limit</div>

              <Box>
                <Grid container>
                  <Grid item xs={12} sm={9} md={9}>
                    <Slider
                      value={
                        typeof perTrnAmtInt === "number" ? perTrnAmtInt : 0
                      }
                      onChange={handleSliderChangesetperTrnAmtInt}
                      aria-labelledby="input-slider"
                      max={accountLimit?.bankPerTrnAmtInt}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={0} sm={1} md={1}></Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Input
                      value={perTrnAmtInt}
                      onChange={handleInputChangesetperTrnAmtInt}
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        min: 0,
                        max: accountLimit?.bankPerTrnAmtInt,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={classes.Impslowerlefttext}>
                    Current Limit{" "}
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.perTrnAmtInt}
                    </div>
                  </div>

                  <div className={classes.Impslowerlefttext}>
                    Per Day Transaction Max Amount :
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.bankPerTrnAmtInt}
                    </div>{" "}
                  </div>
                </div>
              </Box>
          
            </div>
          </div>

          <div className={classes.accountlimtImpsupper}>
            <div className={classes.tableMainBoxInner}>
              <div className={classes.Impsuppertext}>
                Per Day Transaction Limit
              </div>

              <Box>
                <Grid container>
                  <Grid item xs={12} sm={9} md={9}>
                    <Slider
                      value={
                        typeof perDayTrnAmtInt === "number"
                          ? perDayTrnAmtInt
                          : 0
                      }
                      onChange={handleSliderChangesetperDayTrnAmtInt}
                      aria-labelledby="input-slider"
                      max={accountLimit?.bankPerDayTrnAmtInt}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={0} sm={1} md={1}></Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Input
                      value={perDayTrnAmtInt}
                      onChange={handleInputChangesetperDayTrnAmtInt}
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        min: 0,
                        max: accountLimit?.bankPerDayTrnAmtInt,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={classes.Impslowerlefttext}>
                    Current Limit{" "}
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.perDayTrnAmtInt}
                    </div>
                  </div>

                  <div className={classes.Impslowerlefttext}>
                    Per Day Transaction Max Amount :
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.bankPerDayTrnAmtInt}
                    </div>{" "}
                  </div>
                </div>
              </Box>
        
            </div>
          </div>

          <Divider /> */}

            <div className={classes.acclimitheading}>RTGS</div>
            {/* 
          <div className={classes.accountlimtImpsupper}>
            <div className={classes.tableMainBoxInner}> */}
            {/* <div className={classes.Impsuppertext}>Per Transaction Limit</div> */}

            {/* <Box>
                <Grid container>
                  <Grid item xs={12} sm={9} md={9}>
                    <Slider
                      value={
                        typeof perTrnAmtRTGS === "number" ? perTrnAmtRTGS : 0
                      }
                      onChange={handleSliderChangeperTrnAmtRTGS}
                      aria-labelledby="input-slider"
                      max={accountLimit?.bankPerTrnAmtRtgs}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={0} sm={1} md={1}></Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Input
                      value={perTrnAmtRTGS}
                      onChange={handleInputChangeperTrnAmtRTGS}
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        min: 0,
                        max: accountLimit?.bankPerTrnAmtRtgs,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={classes.Impslowerlefttext}>
                    Current Limit{" "}
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.perTrnAmtRtgs}
                    </div>
                  </div>

                  <div className={classes.Impslowerlefttext}>
                    Per Day Transaction Max Amount :
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.bankPerTrnAmtRtgs}
                    </div>{" "}
                  </div>
                </div>
              </Box> */}
            {/* <div className={classes.Impslowertext}>
<div className={classes.Impslowerlefttext}>
  Per Day Transaction Max Amount
</div>
<div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerTrnAmt}</div>
</div> */}
            {/* </div>
          </div> */}

            <div className={classes.accountlimtImpsupper}>
              <div className={classes.tableMainBoxInner}>
                <div className={classes.Impsuppertext}>
                  Per Day Transaction Limit
                </div>

                <Box>
                  <Grid container>
                    <Grid item xs={12} sm={9} md={9}>
                      <Slider
                        value={
                          // typeof perDayTrnAmtRTGS === "string"?
                          perDayTrnAmtRTGS ? Number(perDayTrnAmtRTGS) :0
                            // : 0
                        }
                        onChange={handleSliderChangeperDayTrnAmtRTGS}
                        aria-labelledby="input-slider"
                        max={accountLimit?.bankPerDayTrnAmtRtgs}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={0} sm={1} md={1}></Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Input
                        value={perDayTrnAmtRTGS}
                        onChange={handleInputChangeperDayTrnAmtRTGS}
                        sx={{
                          width: "100%",
                        }}
                        inputProps={{
                          min: 0,
                          max: accountLimit?.bankPerDayTrnAmtRtgs,
                          type: "number",
                          "aria-labelledby": "input-slider",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={classes.Impslowerlefttext}>
                      Current Limit{" "}
                      <div className={classes.Impslowerrighttext}>
                        ₹ {accountLimit?.perDayTrnAmtRtgs}
                      </div>
                    </div>

                    <div className={classes.Impslowerlefttext}>
                      Per Day Transaction Max Amount :
                      <div className={classes.Impslowerrighttext}>
                        ₹ {accountLimit?.bankPerDayTrnAmtRtgs}
                      </div>{" "}
                    </div>
                  </div>
                </Box>
                {/* <div className={classes.Impslowertext}>
<div className={classes.Impslowerlefttext}>
  Max Transaction Amount
</div>
<div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmt}</div>
</div> */}
              </div>
            </div>

            <Divider />
            {/* <div className={classes.acclimitheading}>IMPS</div>

          <div className={classes.accountlimtImpsupper}>
            <div className={classes.tableMainBoxInner}>
              <div className={classes.Impsuppertext}>Per Transaction Limit</div>

              <Box>
                <Grid container>
                  <Grid item xs={12} sm={9} md={9}>
                    <Slider
                      value={
                        typeof perTrnAmt === "number" ? perTrnAmt : 0
                      }
                      onChange={handleInputChangeperTrnAmt}
                      aria-labelledby="input-slider"
                      max={accountLimit?.bankPerTrnAmt}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={0} sm={1} md={1}></Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Input
                      value={perTrnAmt}
                      onChange={handleInputChangeperTrnAmt}
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        min: 0,
                        max: accountLimit?.bankPerTrnAmt,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={classes.Impslowerlefttext}>
                    Current Limit{" "}
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.perTrnAmt}
                    </div>
                  </div>

                  <div className={classes.Impslowerlefttext}>
                    Per Day Transaction Max Amount :
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.bankPerTrnAmt}
                    </div>{" "}
                  </div>
                </div>
              </Box>
             
            </div>
          </div>

          <div className={classes.accountlimtImpsupper}>
            <div className={classes.tableMainBoxInner}>
              <div className={classes.Impsuppertext}>
                Per Day Transaction Limit
              </div>

              <Box>
                <Grid container>
                  <Grid item xs={12} sm={9} md={9}>
                    <Slider
                      value={
                        typeof perDayTrnAmt === "number"
                          ? perDayTrnAmt
                          : 0
                      }
                      onChange={handleInputChangesetperDayTrnAmt}
                      aria-labelledby="input-slider"
                      max={accountLimit?.bankPerDayTrnAmt}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={0} sm={1} md={1}></Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Input
                      value={perDayTrnAmt}
                      onChange={handleInputChangesetperDayTrnAmt}
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        min: 0,
                        max: accountLimit?.bankPerDayTrnAmt,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={classes.Impslowerlefttext}>
                    Current Limit{" "}
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.perDayTrnAmt}
                    </div>
                  </div>

                  <div className={classes.Impslowerlefttext}>
                    Per Day Transaction Max Amount :
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.bankPerDayTrnAmt}
                    </div>{" "}
                  </div>
                </div>
              </Box>
             
            </div>
          </div> */}


            <Divider />
            <div className={classes.acclimitheading}>INTERNAL</div>

            {/* <div className={classes.accountlimtImpsupper}>
            <div className={classes.tableMainBoxInner}> */}
            {/* <div className={classes.Impsuppertext}>Per Transaction Limit</div> */}

            {/* <Box>
                <Grid container>
                  <Grid item xs={12} sm={9} md={9}>
                    <Slider
                      value={
                        typeof perTrnAmtInt === "number" ? perTrnAmtInt : 0
                      }
                      onChange={handleSliderChangesetperTrnAmtInt}
                      aria-labelledby="input-slider"
                      max={accountLimit?.bankPerTrnAmtInt}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={0} sm={1} md={1}></Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Input
                      value={perTrnAmtInt}
                      onChange={handleInputChangesetperTrnAmtInt}
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        min: 0,
                        max: accountLimit?.bankPerTrnAmtInt,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={classes.Impslowerlefttext}>
                    Current Limit{" "}
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.perTrnAmtInt}
                    </div>
                  </div>

                  <div className={classes.Impslowerlefttext}>
                    Per Day Transaction Max Amount :
                    <div className={classes.Impslowerrighttext}>
                      ₹ {accountLimit?.bankPerTrnAmtInt}
                    </div>{" "}
                  </div>
                </div>
              </Box> */}
            {/* <div className={classes.Impslowertext}>
<div className={classes.Impslowerlefttext}>
  Per Day Transaction Max Amount
</div>
<div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerTrnAmtNeft}</div>
</div> */}
            {/* </div>
          </div> */}

            <div className={classes.accountlimtImpsupper}>
              <div className={classes.tableMainBoxInner}>
                <div className={classes.Impsuppertext}>
                  Per Day Transaction Limit
                </div>

                <Box>
                  <Grid container>
                    <Grid item xs={12} sm={9} md={9}>
                      <Slider
                        value={
                          // typeof perDayTrnAmtInt === "string"?
                          perDayTrnAmtInt ? Number(perDayTrnAmtInt) :0
                            // : 0
                        }
                        onChange={handleSliderChangesetperDayTrnAmtInt}
                        aria-labelledby="input-slider"
                        max={accountLimit?.bankPerDayTrnAmtInt}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={0} sm={1} md={1}></Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Input
                        value={perDayTrnAmtInt}
                        onChange={handleInputChangesetperDayTrnAmtInt}
                        sx={{
                          width: "100%",
                        }}
                        inputProps={{
                          min: 0,
                          max: accountLimit?.bankPerDayTrnAmtInt,
                          type: "number",
                          "aria-labelledby": "input-slider",
                        }}
                      />
                    </Grid>
                  </Grid>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={classes.Impslowerlefttext}>
                      Current Limit{" "}
                      <div className={classes.Impslowerrighttext}>
                        ₹ {accountLimit?.perDayTrnAmtInt}
                      </div>
                    </div>

                    <div className={classes.Impslowerlefttext}>
                      Per Day Transaction Max Amount :
                      <div className={classes.Impslowerrighttext}>
                        ₹ {accountLimit?.bankPerDayTrnAmtInt}
                      </div>{" "}
                    </div>
                  </div>
                </Box>
                {/* <div className={classes.Impslowertext}>
<div className={classes.Impslowerlefttext}>
  Max Transaction Amount
</div>
<div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmtNeft}</div>
</div> */}
              </div>
            </div>
            <div className={classes.payment1mobileprepaidbutton}>
              {/* <ColorButton2 variant="contained" type="submit">
        Reset
      </ColorButton2> */}
              <ColorButton1 variant="contained" type="submit">
                Submit
              </ColorButton1>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default SetAccLimit;
