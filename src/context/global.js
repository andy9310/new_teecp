import React, { createContext, useState } from 'react'
export const GlobalContext = createContext()
const GlobalContextProvider = (props) => {
    const [userName, setUserName] = useState('使用者');
    const url = "http://localhost:8080/api";
    return (
         <GlobalContext.Provider 
            value={{
                userName,
                setUserName,
                url,
             }}>
               {props.children}
         </GlobalContext.Provider>
    )
}
export default GlobalContextProvider;