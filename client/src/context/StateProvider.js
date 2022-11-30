// One of the context providers
// Creating our own context
// import React hooks
import React, {createContext, useContext, useReducer} from "react";

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
    // Render StateContext
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Custom State or Hook
export const useStateValue = () => useContext(StateContext);