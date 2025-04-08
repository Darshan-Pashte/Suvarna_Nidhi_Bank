import classes from "../Login/Login.module.css";
import "./Login.css";
import React from "react";
import { useContext, useState } from "react";
// import headerLogo from "../../assets/headerLogo.png";
import LoginContainer from "./LoginContainer";
import FooterCommon from "./FooterCommon";
import CorporateMain from "./CorporateMain";
import LoginContext from "./LoginContext";
import { useEffect } from "react";
import { ConnContext } from "../../context/ConContext";

const Login = () => {

  const [ToggleState, setToggleState] = useState(1);
  const [displayOtp, setOtp] = useState(false);
  const [tries, setTries] = useState("");
  const [response, setResponse] = useState("");
  const { useFormData, defaultFormData, setLoanAccounts, loanAccounts, setCustNoContext, custNoContext, setApiStore, apiStore,setlLoanAccountLoad ,setlLoanAccountLoadCorporate} = useContext(ConnContext);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useFormData;

  const otp = (value) => {
    setOtp(value);
  };

  const responses = (value) => {
    setResponse(value);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

    useEffect(()=>{
      setApiStore(false)
      setValue("custNo","")
      setlLoanAccountLoad(false)
      setlLoanAccountLoadCorporate(false)
    },[])


  // console.log("ParentOtp",displayOtp);

  return (
    <>
    
      <div className={classes.mainfullpage}>
        <div className={classes.tabBodyContent} style={{height:'100%'}}>
          <div className="content-container" style={{height:'100%'}}>
            <div 
              className={`content ${getActiveClass(1, "active-content")}` } style={{height:'100%'}}
            >
              <LoginContext.Provider value={{ otpDisplay: displayOtp, setOtp: otp , setTries:setTries , tries:tries, setResponse:responses, response:response}}>
                <LoginContainer />
              </LoginContext.Provider>
            </div>
            <div
              className={`content ${getActiveClass(2, "active-content")}`}
            >
              <CorporateMain/>
            </div>
          </div>
       
        </div>
      {/* <FooterCommon/> */}
      </div>
  
    </>
  );
};

export default Login;
