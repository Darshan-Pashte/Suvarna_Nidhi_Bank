import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../containers/Login/Login';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import ATMVerify from '../containers/Login/ATMVerify';
import Register from '../containers/Register/Register';
import ForgetPassword from '../containers/ForgetPassword/ForgetPassword';
import ResetPassword from '../containers/ForgetPassword/ResetPassword';
import ForgetPasswordCorporate from '../containers/ForgetPasswordCorporate/ForgetPasswordCorporate';
import Opps from '../layouts/Opps'

import SecurityTips from '../containers/Login/SecurityTips';
import PrivayPolicy from '../containers/Login/PrivacyPolicy';
import TermsConditions from '../containers/MainContainer/SuperApp/Terms&Conditions/Termsconditionmahesh';
import TermsConditionbhagini from '../containers/MainContainer/SuperApp/Terms&Conditions/Termsconditionbhagini';
import PrivayPolicyBhagini from '../containers/MainContainer/SuperApp/Privacypolicy/Privacypolicybhagini';
import Disclaimerbhagini from '../containers/MainContainer/SuperApp/Disclaimer/Disclaimerbhagini';
import SecurityTipsBhagini from '../containers/MainContainer/SuperApp/SecurityTips/Securitytipsbhagini';
import Disclaimer from '../containers/MainContainer/SuperApp/Disclaimer/Disclaimer';
import MerchantPrivayPolicy from '../containers/Login/MerchantPrivacyPolicy';


const AuthLayout = () => {
  const { loading, error ,isAuthenticated,menu} = useSelector((state) => state.auth);
  // console.log("isAuthenticated",isAuthenticated)
  // console.log("isAuthenticated",menu)
  const bankNames = process.env.REACT_APP_FLAVOUR;

  // Function to select the right TermsConditions component based on bank name
  const getTermsConditionsComponent = () => {
    if (bankNames === 'Mahesh' || bankNames === 'Samta' || bankNames === 'Suvarna') { 
      return <TermsConditions/>;
    }
    if (bankNames === 'Bhagini') {
      return <TermsConditionbhagini/>;
    }
    return null; // Return null if the bank name doesn't match expected values
  };

  const getPrivacyComponent = () => {
    if (bankNames === 'Mahesh' || bankNames === 'Samta' || bankNames === 'Suvarna') {
      return <PrivayPolicy/>;
    }
    if (bankNames === 'Bhagini') {
      return <PrivayPolicyBhagini/>;
    }
    return null; // Return null if the bank name doesn't match expected values
  };

  const getMerchantPrivacyComponent = () => {
    if (bankNames === 'Mahesh' || bankNames === 'Samta' || bankNames === 'Suvarna') {
      return <MerchantPrivayPolicy/>;
    }
    if (bankNames === 'Bhagini') {
      return <PrivayPolicyBhagini/>;
    }
    return null; // Return null if the bank name doesn't match expected values
  };

  const getDisclaimerComponent = () => {
    if (bankNames === 'Mahesh' || bankNames === 'Samta' || bankNames === 'Suvarna') {
      return <Disclaimer/>;
    }
    if (bankNames === 'Bhagini') {
      return <Disclaimerbhagini/>;
    }
    return null; // Return null if the bank name doesn't match expected values
  };

  const getSecurityComponent = () => {
    if (bankNames === 'Mahesh' || bankNames === 'Samta' || bankNames ==='Suvarna') {
      return <SecurityTips/>;
    }
    if (bankNames === 'Bhagini') {
      return <SecurityTipsBhagini/>;
    }
    return null; // Return null if the bank name doesn't match expected values
  };
// useEffect(() => {
//   if (window.location.href.includes("/dashboard"))
//   {
//      window.location.reload();
//   }
// }, [isAuthenticated]); 




  return (
    <Routes>
      {/* <Route path='/login' element={state.isAuthorized ? <Navigate to='/dashboard' /> : <Login />} /> */}
      <Route path='/login' element={isAuthenticated ? <Navigate  to='/dashboard' /> : <Login />} />
      <Route path='/register' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <Register />} />
      <Route path='/forgetpassword' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <ForgetPassword />} />
      <Route path='/forgetpasswordcorporate' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <ForgetPasswordCorporate />} />
      <Route path='/resetpassword' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <ResetPassword />}/>
      <Route path='/opps' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <Opps />} />
      <Route path='/termsconditions' element={isAuthenticated ? <Navigate  to='/dashboard'/> : getTermsConditionsComponent()} />
      <Route path='/securitytips' element={isAuthenticated ? <Navigate  to='/dashboard'/> : getSecurityComponent()} />
      <Route path='/privacypolicy' element={isAuthenticated ? <Navigate  to='/dashboard'/> : getPrivacyComponent()} />
      <Route path='/merchantpolicy' element={isAuthenticated ? <Navigate  to='/dashboard'/> : getMerchantPrivacyComponent()} />
      <Route path='/disclaimer' element={isAuthenticated ? <Navigate  to='/dashboard'/> : getDisclaimerComponent()} />
    </Routes>
  );
};

export default AuthLayout;
