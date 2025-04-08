import React from 'react'
import { useNavigate } from 'react-router-dom';
import classes from '../common/GoBackButton.module.css'
import { Button } from '@mui/material';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const GoBackButton = () => {

    const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This will go back to the previous page or route
  };

  



  return (
   <>
   
   
<div className={classes.mainbuttonpage} onClick={goBack}>
  <KeyboardBackspaceIcon/>

</div>
   
   
   </>
  )
}

export default GoBackButton
