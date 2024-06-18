import React, { createContext, useState } from 'react'
export const GlobalContext = createContext()
const GlobalContextProvider = (props) => {
    
    const url = "http://localhost:8082/api";
    return (
         <GlobalContext.Provider 
            value={{
                url,
             }}>
               {props.children}
         </GlobalContext.Provider>
    )
}
export default GlobalContextProvider;