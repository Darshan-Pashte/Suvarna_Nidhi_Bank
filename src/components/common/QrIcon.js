import React from 'react';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import classes from "../../containers/MainContainer/AirtelUpi/Airtel.module.css";
import { PROTECTED_ROUTES } from '../../routes/Routes';
import { Button } from '@mui/material';

const QrIcon = ({ rowIndex, data, handleNavigate, url, topLevelPath , url1}) => {
  const shouldRenderEditIcon = PROTECTED_ROUTES.some(route => {
      const childRoute = route.childRoutes?.find(child => child.url === url1);
      if (childRoute?.grandChild[2]?.arr == "1") {
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
         <Button sx={{color:"black"}} onClick={() => handleNavigate(url, data[rowIndex])}><QrCodeIcon /></Button> 
        </span>
      ) : (
        <span><Button disabled ><QrCodeIcon/></Button></span>
      )}
    </>
  );
};

export default QrIcon;
