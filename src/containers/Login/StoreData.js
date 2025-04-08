import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const StoreData = ({ children }) => {
  const [data, setData] = useState("Initial Data");

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
