import React, { useState, useContext } from 'react';
import studentboard from "../images/3D.png";
import C from "../images/C.png";
import { Link } from 'react-router-dom';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';
function User() {
    
    return (
      <div class="container mx-auto flex flex-col w-full">
            <StudentHeader></StudentHeader>
            <div class="mt-14 text-center mt-4 mb-4 flex flex-row justify-center">
                <img class="relative inline h-28 mr-4" src={C} />
                <div class="mt-4 inline-block text-left align-middle font-bold">
                    <p class="text-4xl">報名端</p>
                    <p class="text-xl">Registration</p>
                </div>
            </div>
            <div class="flex flex-row justify-evenly my-20">
              <Link to="/user-form">
                          <div class="bg-green-500 w-72 h-96 flex flex-col justify-center text-center items-center rounded-3xl">
                              <img class="w-36" src={studentboard} />
                              <p class="text-4xl font-bold text-white" >報考資料</p>
                          </div>
              </Link>
            </div>
            <StudentFooter></StudentFooter>
      </div>
        
          
  );
}
  
  export default User;