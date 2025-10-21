"use client"
import { createContext,useState} from "react";

export const Context = createContext();
const ContextProvider = (props) => {

const [themeColor,setThemeColor] = useState("light")



  

  const contextValue = {
    setThemeColor,
    themeColor
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;