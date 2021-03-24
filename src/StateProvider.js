import React, { createContext, useContext, useReducer } from "react";

// * prepares the dataLayer
export const StateContext = createContext();

// * This will wrap our app and provide
// * The dataLayer to every component in the app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// * Pull information from the dataLayer
export const useStateValue = () => useContext(StateContext);

// * Now GOTO index.js
