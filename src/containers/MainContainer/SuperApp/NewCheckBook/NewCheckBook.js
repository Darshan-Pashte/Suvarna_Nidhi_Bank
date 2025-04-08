import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from '../NewCheckBook/NewCheckBook.module.css'
import NewCheckBookDetails from './NewCheckBookDetails';
import NewCheckBookSummary from './NewCheckBookSummary';



  

const NewCheckBook = () => {

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
    
    
    <div className={classes.cardsmainpage}>
    
        
        <div className={classes.maintabbelowheading}> Request New Cheque Book</div>
         <Box  className={classes.tableMainBox} sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value1}>
 
 
          <Box sx={{  borderBottom: 1,
               borderColor: "divider",
               backgroundColor: " #DAE2F6",
               borderRadius: '8px 8px 0 0',}}>
          
         
 
           <TabList onChange={handleChange1} aria-label="lab API tabs example">
             Within ABC Bank
             <Tab label="Account Details" value="4"  />
             <Tab label="Summary" value="5" />
             </TabList>
             </Box>
       <TabPanel value="4"><NewCheckBookDetails/></TabPanel>
        <TabPanel value="5"><NewCheckBookSummary/></TabPanel>
          {/* <TabPanel value="6"><AddPayeeSummary/></TabPanel> */}
        
         </TabContext>
         </Box>
         </div>
    </>
  )
}

export default NewCheckBook
