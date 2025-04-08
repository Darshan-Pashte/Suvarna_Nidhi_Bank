import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from '../CorporateFundTransfer/CorporateFundTransfer.module.css'
import WithinBankPaymentDetails from './WithinBankPaymentDetails';
import WithinBankPreview from './WithinBankPreview';
import WithinBankSummary from './WithinBankSummary';
import styled from 'styled-components';
import { Button } from '@mui/base';




const WithinBank = () => {

  const [value, setValue] = React.useState('1');
  const [value1, setValue1] = React.useState('4');

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "300px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  return (
    <>


      <div className={classes.cardsmainpage}>
        <div className={classes.maintabbelowheading}>Fund Transfer</div>
        <div className={classes.headingMain}>

          <div className={classes.maintabbelowheading1}>Immediate Payment Service (IMPS)</div>
          <div>
            <ColorButton1 variant="contained" type="submit">
              Add New Beneficiary
            </ColorButton1>
          </div>
        </div>

        <Box className={classes.tableMainBox} sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value1}>


            <Box sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: " #DAE2F6",
              borderRadius: '8px 8px 0 0',
            }}>



              <TabList onChange={handleChange1} aria-label="lab API tabs example">
                {/* Within ABC Bank */}
                <Tab label="Single Payment" value="4" />
                <Tab label="Bulk Payment" value="5" />
                <Tab label="Group Payment" value="6" /></TabList>
            </Box>
            <TabPanel value="4"><WithinBankPaymentDetails /></TabPanel>
            <TabPanel value="5"><WithinBankPreview /></TabPanel>
            <TabPanel value="6"><WithinBankSummary /></TabPanel>

          </TabContext>
        </Box>
      </div>
    </>
  )
}

export default WithinBank
