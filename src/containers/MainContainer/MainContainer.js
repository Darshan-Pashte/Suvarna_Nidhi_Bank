import classes from './MainContainer.module.css';
import React, { useContext } from 'react';
import routes from '../../routes/Routes';
// import { PROTECTED_ROUTES, PROTECTED_ROUTES_CORPORATE, PROTECTED_ROUTES_SERVICES, PROTECTED_ROUTES_SETTINGS, } from '../../routes/Routes';
import { Route, Link, Routes } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
import Dashboard from './Dashboard/Dashboard';
import Payment1Mobile from './SuperApp/Payments/Payment1Mobile';
import AccountLimit from './SuperApp/AccountLimit/IMPS/AccountLimit';
// import AccountLimit from './SuperApp/AccountLimit/AccountLimit';
import FixedDepositDetails from './SuperApp/Account/FixedDeposit/FixedDepositDetails';
import FixedDepositCashCert from './SuperApp/Account/FixedDeposit/FixedDepositCashCert';
import FixedDepositScheme from './SuperApp/Account/FixedDeposit/FixedDepositScheme';
import FixedDepositInterestRate from './SuperApp/Account/FixedDeposit/FixedDepositInterestRate';
import OpenDeposit from './SuperApp/Account/FixedDeposit/Opendeposit';
import OpendepositeChild from './SuperApp/Account/FixedDeposit/OpendepositeChild';
import OpendepositeChild1 from './SuperApp/Account/FixedDeposit/OpenDepositChild1';
import LoansFields from './SuperApp/Loans/LoansFields';
import { useSelector } from 'react-redux';

const MainContainer = ({ title, opens }) => {
  const theme = useSelector((state) => state.theme.theme);

  const { PROTECTED_ROUTES, PROTECTED_ROUTES_SERVICES, PROTECTED_ROUTES_SETTINGS } = routes();
  let processedRoutes = PROTECTED_ROUTES.flatMap((route) => {
    return [
      route.childRoutes
        ? route.childRoutes.map((childRoute, id) => {
            return <Route key={id} path={`${route.url + childRoute.url}`} element={childRoute.component} />;
          })
        : [],
      <Route path={route.url} element={route.component} />,
    ];
  })
    .filter(Boolean)
    .flat();

  let processedRoutesServices = PROTECTED_ROUTES_SERVICES.flatMap((route) => {
    return [
      route.childRoutes
        ? route.childRoutes.map((childRoute, id) => {
            return <Route key={id} path={`${route.url + childRoute.url}`} element={childRoute.component} />;
          })
        : [],
      <Route path={route.url} element={route.component} />,
    ];
  })
    .filter(Boolean)
    .flat();

  let processedRoutesSettings = PROTECTED_ROUTES_SETTINGS.flatMap((route) => {
    return [
      route.childRoutes
        ? route.childRoutes.map((childRoute, id) => {
            return <Route key={id} path={`${route.url + childRoute.url}`} element={childRoute.component} />;
          })
        : [],
      <Route path={route.url} element={route.component} />,
    ];
  })
    .filter(Boolean)
    .flat();

    // let processedRoutesCorporate = PROTECTED_ROUTES_CORPORATE.flatMap((route) => {
    //   return [
    //     route.childRoutes
    //       ? route.childRoutes.map((childRoute, id) => {
    //           return <Route key={id} path={`${route.url + childRoute.url}`} element={childRoute.component} />;
    //         })
    //       : [],
    //     <Route path={route.url} element={route.component} />,
    //   ];
    // })
    //   .filter(Boolean)
    //   .flat();

  return (
    <div style={{display: opens ? "none" : "block"}} className={`${classes.Dashboard} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
      <Routes>{processedRoutes}</Routes>
      <Routes>{processedRoutesServices}</Routes>
      <Routes>{processedRoutesSettings}</Routes>
      {/* <Routes>{processedRoutesCorporate}</Routes> */}
      <Routes>
      {/* <Route path="/payments/payment1mobile" element={<Payment1Mobile/>} />, */}
      {/* <Route path='/account/accountlimit' element={<AccountLimit/>} />, */}
      {/* <Route path='/account/fixeddepositdetails' element={<FixedDepositDetails/>} />, */}
      {/* <Route path='/account/fixeddepositcashcert' element={<FixedDepositCashCert/>} />, */}
      {/* <Route path='/account/fixeddepositscheme' element={<FixedDepositScheme/>} />, */}
      {/* <Route path='/account/fixeddepositintrate' element={<FixedDepositInterestRate/>} />, */}
      {/* <Route path='/account/opendeposit' element={<OpenDeposit/>} />, */}
      {/* <Route path='/account/opendepositchild' element={<OpendepositeChild/>} />, */}
      {/* <Route path='/account/opendepositchild1' element={<OpendepositeChild1/>} />, */}
      {/* <Route path='/loans/loansfields' element={<LoansFields  />} />, */}
      </Routes>
    </div>
  );
};

export default MainContainer;
