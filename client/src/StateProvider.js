import React, { createContext, useContext, useReducer } from 'react';

//context
const UserContext = createContext();

//provider
const StateProvider =({initialState, reducer, children}) =>(
    <UserContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </UserContext.Provider>
)

export default StateProvider;

export const useStateValue =()=> useContext(UserContext);