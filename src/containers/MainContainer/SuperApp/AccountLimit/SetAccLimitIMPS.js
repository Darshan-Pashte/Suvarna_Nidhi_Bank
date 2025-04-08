import React, { useEffect } from "react";
import classes from "../AccountLimit/IMPS/AccountLimit.module.css";
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

const defaultFormData = {
  email: "",
  password: "",
};

const SetAccLimitIMPS = ({accountLimit,accnumber}) => {
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

  const [loanAmount, setLoanAmount] = useState(20000);
  const [isLoading, setIsloading] = useState(false);
  // const [accountLimit, setAccountLimit] = useState([]);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

  // console.log("accList", accountList);
  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  // console.log("user", user);

  // useEffect(() => {
  //   getAccountLimit();
  // }, [user && watch("accountNumber")]);

  // const getAccountLimit = async (data) => {
  //   try {
  //     const payload = {
  //       custNo: user?.userId,
  //       sessionId: user?.sessionId,
  //       accNo: watch("accountNumber")?.value,
  //       brCode: watch("accountNumber")?.code,
  //     };
  //     setIsloading(true);
  //     const response = await postApiData(apiList.GETACCLIMIT, payload);
  //     console.log("response", response);
  //     // setShowBal(response.data?.accBal);
  //     setAccountLimit(response?.data);
  //     setIsloading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsloading(false);
  //   }
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     setIsloading(true)

  //     const payload = {
  //       userId: username,
  //       sessionId: token,
  //       requestCode: "browseVpa",
  //       bankCode: data?.bankCode.code,
  //       mobileno: data?.mobileno,
  //       name: data?.name
  //     };

  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);
  //     if(response.respCode=="IS"){

  //       SweetAlertPopup(response?.respMsg, "Error", "error");
  //     }

  //     setIsloading(false)
  //     // reset()
  //   } catch (err) {
  //     console.log(err);
  //     setIsloading(false)
  //   }
  // };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
     background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#707070",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#FFF",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      <div className={classes.accountlimittop} >
      <Grid
              container
              columnSpacing={5}
              rowSpacing={5}
              style={{ padding: '1vw' }}
            >
              <Grid item sm={6} md={7}></Grid>
              <Grid item xs={12} sm={6} md={5}>
        <div className={classes.frowdataaff} >
          <div className={classes.frowtextaff}>
            Account
            <sup className={classes.required}>*</sup>
          </div>
          <div className={classes.widthtfield}>
            <AutocompleteForm
              controlerProps={{
                control: control,
                name: "accountNumber",
              }}
              TextFieldProps={{
                // style: { width: "28vw" },

                placeholder: "Select Account",
                onKeyDown: (event) => {
                  //const regex = /^[a-zA-Z]*$/;
                  const regex = /^[0-9]*$/;
                  const isBackspace = event.keyCode === 8;
                  const isValidInput = regex.test(event.key);

                  if (!isValidInput && !isBackspace) {
                    event.preventDefault();
                  }
                },
              }}
              rules={{
                required:
                  " Account " +
                  errorMessages.error_autocomplete_message,
              }}
              data={accountList}
              required={true}
            />
          </div>
        </div>
      
      
        </Grid>
      </Grid>
      </div>

<div className={classes.acclimitheading}>
  IMPS
</div>
      
      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              //  min={1000}
              min={accountLimit?.perTrnAmt}
              max={Number(accountLimit?.bankPerTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Per Day Transaction Max Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerTrnAmt}</div>
          </div>
        </div>
      </div>

      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Day Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              min={accountLimit?.perDayTrnAmt}
              max={Number(accountLimit?.bankPerDayTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Max Transaction Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmt}</div>
          </div>
        </div>
      </div>


<Divider/>
      <div className={classes.acclimitheading}>
NEFT
</div>

      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              //  min={1000}
              min={accountLimit?.perTrnAmt}
              max={Number(accountLimit?.bankPerTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Per Day Transaction Max Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerTrnAmt}</div>
          </div>
        </div>
      </div>

      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Day Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              min={accountLimit?.perDayTrnAmt}
              max={Number(accountLimit?.bankPerDayTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Max Transaction Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmt}</div>
          </div>
        </div>
      </div>

      <Divider/>
      <div className={classes.acclimitheading}>
Internal
</div>



      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              //  min={1000}
              min={accountLimit?.perTrnAmt}
              max={Number(accountLimit?.bankPerTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Per Day Transaction Max Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerTrnAmt}</div>
          </div>
        </div>
      </div>

      <div className={classes.accountlimtImpsupper}>
        <div className={classes.tableMainBoxInner}>
          <div className={classes.Impsuppertext}>Per Day Transaction Limit</div>

          <Box>
            <Slider
              // size="small"
              defaultValue={20000}
              aria-label="Small"
              valueLabelDisplay="on"
              min={accountLimit?.perDayTrnAmt}
              max={Number(accountLimit?.bankPerDayTrnAmt)}
              onChange={handleLoanAmountChange}
            />
          </Box>
          <div className={classes.Impslowertext}>
            <div className={classes.Impslowerlefttext}>
              Max Transaction Amount
            </div>
            <div className={classes.Impslowerrighttext}>₹ {accountLimit?.bankPerDayTrnAmt}</div>
          </div>
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
    </>
  );
};

export default SetAccLimitIMPS;
