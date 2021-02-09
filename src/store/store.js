import React, {createContext, useContext, useReducer} from 'react';
import {reducer} from './reducer';
import {initialState} from './initialState'
export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);
