import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {  useSession }  from '../context/session';

function Status(){
    const { userName, session_logout } = useSession();
    return(
        <div class="absolute right-1 top-1/4 h-10 w-40 flex flex-row text-center justify-center my-auto">
            <h2 class="p-1 text-black font-bold">{userName}您好</h2>
            <Link to="/login"><button class="p-1 bg-primary text-white rounded-md mx-3"onClick={session_logout}>登出</button></Link>
        </div>
    );
}
export default Status;