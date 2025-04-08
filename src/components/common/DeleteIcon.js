import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import classes from "../../containers/MainContainer/AirtelUpi/Airtel.module.css";
import { PROTECTED_ROUTES } from "../../routes/Routes";
import { Button } from "@mui/material";


const DeletesIcons = ({
  data,
  rowIndex,
  handleDeleteContact,
  topLevelPath,
  url1
}) => {

  const shouldRenderEditIcon = PROTECTED_ROUTES.some(route => {
    const childRoute = route.childRoutes?.find(child => child.url === url1);
    if (childRoute?.grandChild[1].arr=="1") {
      // You might need to specify a specific condition to determine if an edit icon should be shown
      return true;
    }
    else return false;
  }
 
);
  return (
    <>
      {shouldRenderEditIcon ?<span
        className={classes.editButton}
      >
        <Button sx={{color:"black"}} onClick={() => handleDeleteContact(data[rowIndex])}><DeleteIcon /></Button>
      </span>: <span><Button disabled ><DeleteIcon/></Button></span>}
    </>
  );
};

export default DeletesIcons;
