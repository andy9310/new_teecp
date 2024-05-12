import React, { useState, useContext } from 'react';
import './User.css';
import AdminHeader from '../side_components/adminside_header';
import AdminFooter from '../side_components/adminside_footer';
import {Reorder, useMotionValue} from 'framer-motion'
import { useRaisedShadow } from "../side_components/use-raised-shadow";
import { Link } from 'react-router-dom';
import print_pic from "../images/PRINT.png";
import store_pic from "../images/STORE.png";
import leftarrow from "../images/left-arrow.svg";
import rightarrow from "../images/right-arrow.svg";
import search from "../images/search.svg";
import lock from "../images/lock.svg";
import trash from "../images/trash.svg";
import pen from "../images/pen.svg";
import { Button,Modal} from 'react-bootstrap'; 
function System(){
 return (
    <div class="container z-0 mx-auto flex flex-col w-full">
        <AdminHeader></AdminHeader>
        <div class="flex flex-col justify-evenly items-center mt-2">
            <div class="bg-white w-1/2 my-6 shadow-xl rounded-xl flex flex-col" >
                <div class="my-3 mx-5">
                    <div class="my-5">
                        <h2>通知信副本對象</h2>
                        <input type='text' class="border-0  w-full text-black text-base border-b border-gray-400" placeholder="帳號"></input>
                    </div>
                    <h1 class="mb-5 mt-10">開放時間起:2024/02/22 09:00</h1>
                    <h1 class="my-5">開放時間屹:2024/04/22 09:00</h1>
                    <div class="flex flex-row justify-start my-2">
                        <button class=" w-20 h-10 text-white bg-primary rounded-md">儲存</button>
                    </div>
                    <div class="w-full border-b border-gray-400 my-3"></div>
                    <button class=" w-40 h-10 text-white bg-red-500 rounded-md">年度刪除資料</button>
                </div>
            </div>
        </div>
        <AdminFooter></AdminFooter>
    </div>
 );
}
export default System;