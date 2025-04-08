import classes from './opps.module.css';

import styled from 'styled-components';

import { Button } from '@mui/base';
import opps from "./Opps.svg"
import { useNavigate } from 'react-router-dom';


const Opps = () => {
 
  const navigate = useNavigate();
  const BASEURL = process.env.REACT_APP_BASENAME;


  const handleButtonClick = () => {
    navigate(`/${BASEURL}/auth/login`);
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFF",
    
    // backgroundColor: "#F84B67",
    // backgroundColor: "#AA1313",
    backgroundColor: "#AE2121",
    fontFamily:'Poppins',
    boxShadow:' 0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
    fontSize:'15px',
    
    // border: "1px solid #CCC",
    border:'none',
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "20%",
    height: "38px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));




  return (
    <>
     
      <div className={classes.Opps}>
     
          <div className={classes.text}>session has expired due to inactivity. Please log in again to continue....</div>
            <img width="350px" height="350px" src={opps} alt="Opps"/>
           
         
      </div>

      <div className={classes.OppsButton}>
      <ColorButton1 onClick={handleButtonClick}>Login Again</ColorButton1>
      </div>
    </>

  );
};

export default Opps;
