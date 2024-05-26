import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveSession, getSession, clearSession } from './utils';
import { GlobalContext } from './global';

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);
export const SessionProvider = ({ children }) => {
    const { url } = useContext(GlobalContext);
    const [user_session, setUserSession] = useState(null);
    const [userName, setUserName] = useState('使用者');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const sessionUser = getSession('user');
        if (sessionUser) {
            setUserSession(sessionUser);
        }
    }, []);

    const session_login = async(session) => {
        const userDetails = { session };
        setUserSession(userDetails);
        let getHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${session}`,
        }
        const requestOptions = {
            method: "GET",
            headers: getHeader,
            redirect: "follow",
        }
        await fetch(url+'/user/me',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    console.log(JSON.parse(text)['name']);  // important
                    setUserName(JSON.parse(text)['name']);
                    setUserId(JSON.parse(text)['id']);
                })
                alert("fetch user session success");
            }
            else{
                alert("fetch user session failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get user me error");
            console.error(error);
        });
        saveSession('user', userDetails);
    };

    const session_logout = () => {
        setUserSession(null);
        clearSession('user');
    };
    return (
        <SessionContext.Provider value={{ user_session, session_login, session_logout, userName, setUserName, userId }}>
        {children}
        </SessionContext.Provider>
    );
};