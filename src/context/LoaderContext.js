import React, { createContext, useReducer, useState } from "react";
import { initialState } from "./store/LoaderStore";
import { LoaderReducer } from "./reducer/LoaderReducer";
import LoginContainerChild from "../containers/Login/LoginChildContainer";
import CorporateContainer from "../containers/Login/CorporateContainer";
import LoginContainer1 from "../containers/Login/LoginContainer1";

export const LoaderContext = createContext();
export const DataContext = createContext();

export const LoaderProvider = ({ children }) => {


  const [state, dispatch] = useReducer(LoaderReducer, initialState);
  const [banklink, setBankLink] = useState("https://bank.sbi/");
  const [npci, setNpciLink] = useState("https://www.npci.org.in");
  const [rbi, setRbiLink] = useState("https://www.rbi.org.in");
  const displayBankLink = "bank.sbi";
  const displayNpciLink = "www.npci.org.in";
  const displayRbiLink = "www.rbi.org.in";
  const [captcha, setCaptcha] = useState(false);
  const portalAllowsed = process.env.REACT_APP_PORTAL_ACCESS;

  const [portalAccess, setPortalAccess] = useState(portalAllowsed)
  // const [portalAccess, setPortalAccess] = useState([
  //   { name: "Personal", Component: <LoginContainer1 captcha={captcha}/> },
  //   { name: "Corporate", Component: <CorporateContainer captcha={captcha} /> },
  // ]);
  const [loader, setLoader] = useState("Bhagini");

  return (
    <LoaderContext.Provider value={{ state, dispatch }}>
      <DataContext.Provider
        value={{
          banklink,
          setBankLink,
          npci,
          setNpciLink,
          rbi,
          setRbiLink,
          displayBankLink,
          displayNpciLink,
          displayRbiLink,
          portalAccess,
          setLoader,
          loader,
          setCaptcha,
          captcha
        }}
      >
        {children}
      </DataContext.Provider>
    </LoaderContext.Provider>
  );
};
