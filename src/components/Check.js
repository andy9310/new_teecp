import React, { useState, useContext,useEffect } from 'react';
import checkboard from "../images/3C.png";
import C from "../images/C.png";
import { Link } from 'react-router-dom';
import Status from './status';
import CheckHeader from '../side_components/checkside_header';
import CheckFooter from '../side_components/checkside_footer';
import { SessionProvider, useSession } from '../context/session';
import { getSession } from '../context/utils';

function Check() {
      const { setUserSession,session_login } = useSession();
      useEffect(() => {
        const sessionUser = getSession('user');
        if (sessionUser) {
          session_login(sessionUser);
        }
    }, []);
    return (
      <div class="container mx-auto flex flex-col w-full">
            <CheckHeader></CheckHeader>
            <div class="mt-14 text-center mt-4 mb-4 flex flex-row justify-center relative">
                <img class="relative inline h-28 mr-4" src={C} />
                <div class="mt-4 inline-block text-left align-middle font-bold">
                    <p class="text-4xl">審查端</p>
                    <p class="text-xl">Review</p>
                </div>
                <Status></Status>
            </div>
            <div class="flex flex-row justify-evenly my-20">
              <Link to="/dnd">
                <div class="bg-green-500 w-72 h-96 flex flex-col justify-center text-center items-center rounded-3xl">
                    <img class="w-36" src={checkboard} />
                    <p class="text-4xl font-bold text-white" >書面審查評分</p>
                </div>
              </Link>
            </div>
            <CheckFooter></CheckFooter>
      </div>    
  );
}
  
  export default Check;