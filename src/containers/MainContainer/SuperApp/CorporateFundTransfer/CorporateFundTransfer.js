import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from '../CorporateFundTransfer/CorporateFundTransfer.module.css'
import WithinBank from './WithinBank';
import SelfAccount from './SelfAccount';
import OtherAccount from './OtherAccount';


const CorporateFundTransfer = () => {
    const [value, setValue] = React.useState('1');
    const [value1, setValue1] = React.useState('4');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  return (
   <>
    <div className={classes.mainpagePayment}>
   {/* <Box  className={classes.tableMainBox} sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{  borderBottom: 1,
              borderColor: "divider",
              backgroundColor: " #DAE2F6",
              borderRadius: '8px 8px 0 0',}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Within ABC Bank" value="1" />
            <Tab label="To Self Account" value="2" />
            <Tab label="To Others Account" value="3" />
          </TabList>
        </Box>
       
        <TabPanel value="1"><WithinBank/></TabPanel>

       
        <TabPanel value="2"><SelfAccount/></TabPanel>
        <TabPanel value="3">
      <OtherAccount/>
        </TabPanel>
     
      </TabContext>
    </Box> */}
    </div>
   
   </>
  )
}

export default CorporateFundTransfer
