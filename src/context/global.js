import React, { createContext, useState } from 'react'
export const GlobalContext = createContext()
const GlobalContextProvider = (props) => {
    
    const url = "https://comm-dev.wegeek.ltd/teecp-backend/api/";
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