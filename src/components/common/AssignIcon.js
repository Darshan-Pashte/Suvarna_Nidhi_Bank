import React from 'react';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import classes from "../../containers/MainContainer/AirtelUpi/Airtel.module.css";
import { PROTECTED_ROUTES } from '../../routes/Routes';
import { Button } from '@mui/material';

const AssignIcon = ({ rowIndex, data, handleNavigate, url, topLevelPath , url1}) => {
  const shouldRenderEditIcon = PROTECTED_ROUTES.some(route => {
      const childRoute = route.childRoutes?.find(child => child.url === url1);
      if (childRoute?.grandChild[3].arr=="1") {
        // You might need to specify a specific condition to determine if an edit icon should be shown
        return true;
      }
      else return false;
    }
   
  );

  return (
    <>
      {shouldRenderEditIcon ? (
        <span
          className={classes.editButton}
        >
         <Button sx={{color:"black"}} onClick={() => handleNavigate(url, data[rowIndex])}><AddCircleOutline /></Button> 
        </span>
      ) : (
        <span><Button disabled ><AddCircleOutline/></Button></span>
      )}
    </>
  );
};

export default AssignIcon;
