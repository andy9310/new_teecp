import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveSession, getSession, clearSession } from './utils';
import { GlobalContext } from './global';

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);
export const SessionProvider = ({ children }) => {
    const { url } = useContext(GlobalContext);
    const [user_session, setUserSession] = useState(null);
    const [userType, setUserType] = useState(null); // 'manager', 'student', 'reviewer'
    const [userName, setUserName] = useState('使用者');
    const [userId, setUserId] = useState(null);
    const [studentNumber, setStudentNumber] = useState(null);
    const [reviewerInfo, setReviewerInfo] = useState({});
    
    // website storage
    useEffect(() => {
        const sessionUser = getSession('user');
        if (sessionUser) {
            setUserSession(sessionUser);
        }
    }, []);

    const session_login = async(session) => {
        setUserSession(session);
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
        .then(async(response)=>{
            if(response.status == "200"){
                await response.text().then( (text) => {
                    console.log(JSON.parse(text));
                    setUserName(JSON.parse(text)['name']);
                    // setId(JSON.parse(text)['id']);
                    if(JSON.parse(text)['manager']){
                        setUserType('manager');
                    }
                    else if(('student'in JSON.parse(text)) && ('studentNumber'in JSON.parse(text)['student']) && JSON.parse(text)['student']['studentNumber'] !== ''){
                        
                        setUserType('student');
                        setStudentNumber(JSON.parse(text)['student']['studentNumber']);
                        setUserId(JSON.parse(text)['id']);
                    }
                    else{
                        setUserType('reviewer');
                        setReviewerInfo(JSON.parse(text)['reviewer']);
                    }
                    
                })
            }
            else{
                alert("fetch user session failed");
            }
        })
        .then((result)=>{return result;})
        .catch((error)=>{
            alert("get user me error");
            console.error(error);
        });
        saveSession('user', session);
    };

    const session_logout = () => {
        setUserSession(null);
        setUserType(null);
        clearSession('user');
    };
    return (
        <SessionContext.Provider value={{ setUserSession,user_session, session_login, session_logout, userName, setUserName, userId, studentNumber, userType }}>
        {children}
        </SessionContext.Provider>
    );
};