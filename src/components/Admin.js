import React, { useState, useContext } from 'react';
import './User.css';
import checkboard from "../images/3C.png";
import accountManage from "../images/3B.png";
import system from "../images/3E.png";
import C from "../images/C.png";
import { Link } from 'react-router-dom';
import AdminHeader from '../side_components/adminside_header';
import AdminFooter from '../side_components/adminside_footer';

function Admin() {
    
    return (
        <div class="container mx-auto flex flex-col w-full">
            <AdminHeader></AdminHeader>
            <div class="mt-14 text-center mt-4 mb-4 flex flex-row justify-center">
                <img class="relative inline h-28 mr-4" src={C} />
                <div class="mt-4 inline-block text-left align-middle font-bold">
                    <p class="text-4xl">管理端</p>
                    <p class="text-xl">Review</p>
                </div>
            </div>
            <div class="flex flex-row justify-evenly mt-20">
                <Link to="/admin-score">
                        <div class="bg-green-500 w-72 h-96 flex flex-col justify-center text-center items-center rounded-3xl">
                            <img class="w-36" src={checkboard} />
                            <p class="text-4xl font-bold text-white" >書面審查評分</p>
                        </div>
                </Link>
                <Link to="/account-manage">
                        <div class="bg-green-500 w-72 h-96 flex flex-col justify-center text-center items-center rounded-3xl">
                            <img class="w-36" src={accountManage} />
                            <p class="text-4xl font-bold text-white" >帳號管理</p>
                        </div>
                </Link>
                <Link to="/system">
                        <div class="bg-green-500 w-72 h-96 flex flex-col justify-center text-center items-center rounded-3xl">
                            <img class="w-36" src={system} />
                            <p class="text-4xl font-bold text-white" >系統參數</p>
                        </div>
                </Link>
            </div>
            <AdminFooter></AdminFooter>
        </div>
        
          
    );
}
export default Admin;