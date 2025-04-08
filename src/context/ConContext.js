import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

export const ConnContext = createContext();
export const ConnProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loanAccounts, setLoanAccounts] = useState([]);
  const [loanAccountsCorporate, setLoanAccountsCorporate] = useState([]);
  const [apiStore, setApiStore] = useState(false);
  const [loanAccountLoad, setlLoanAccountLoad] = useState(false);
  const [loanAccountLoadCorporate, setlLoanAccountLoadCorporate] = useState(false);
  const [custNoContext, setCustNoContext] = useState("");

  let defaultFormData = {
    custNo: "",
    fromDate: null,
    toDate: null,
    accountNumber: "",
  };

  console.log("defaultFormData", defaultFormData)

  const [contextData, setContextData] = useState(defaultFormData);
  const clearContextData = () => {
    setContextData(defaultFormData);
  };


  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    formState,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const useFormData = {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState,
    watch,
    reset,
    register,
  };

  return (
    <ConnContext.Provider
      value={{
        useFormData,
        defaultFormData,
        loanAccounts,
        setLoanAccounts,
        setApiStore,
        apiStore,
        setCustNoContext,
        custNoContext,
        setlLoanAccountLoad,
        loanAccountLoad,
        loanAccountLoadCorporate,
        setlLoanAccountLoadCorporate,
        loanAccountsCorporate,
        setLoanAccountsCorporate
      }}
    >
      {children}
    </ConnContext.Provider>
  );
};