import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lastFiveCodes, setLastFiveCodes] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load last five codes from localStorage on component mount
    const savedLastFiveCodes = localStorage.getItem("lastFiveCodes");
    if (savedLastFiveCodes) {
      setLastFiveCodes(JSON.parse(savedLastFiveCodes));
    }

    // Load history from localStorage on component mount
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Save last five codes to localStorage when it changes
    localStorage.setItem("lastFiveCodes", JSON.stringify(lastFiveCodes));
  }, [lastFiveCodes]);

  useEffect(() => {
    // Save history to localStorage when it changes
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <AppContext.Provider
      value={{ lastFiveCodes, setLastFiveCodes, history, setHistory }}
    >
      {children}
    </AppContext.Provider>
  );
};
