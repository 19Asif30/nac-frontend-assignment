import React, { createContext, useEffect, useReducer } from "react";
import makeData from "./makeData";
import { reducer } from "./Reducer";
import PropTypes from "prop-types";
export const MyContext = createContext();

const AppContext = ({ children }) => {
  const handleClick = async () => {
    try {
      let res = await fetch("https://sheetdb.io/api/v1/46h3j5y8r4kdw");
      let data = await res.json();
      dispatch({ type: "fetch_data", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const [state, dispatch] = useReducer(reducer, makeData([]));

  const value = { state, dispatch };

  useEffect(() => {
    handleClick();
  }, []);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default AppContext;

AppContext.propTypes = {
  children: PropTypes.element,
};
