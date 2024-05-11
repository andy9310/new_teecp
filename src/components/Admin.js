import React, { useState, useContext } from 'react';
import './User.css';
import checkboard from "../images/3C.png";
import accountManage from "../images/3B.png";
import system from "../images/3E.png";
import C from "../images/C.png";
import { Link } from 'react-router-dom';


function Admin() {
    
    return (
        <>
            <div class="text-center mt-4 mb-4">
                <img class="relative inline top-16 h-28 mr-4" src={C} />
                <div class="inline-block text-left align-middle font-bold">
                    <p class="text-4xl">管理端</p>
                    <p class="text-xl">Review</p>
                </div>
            </div>
            <div class="flex flex-row">
                <Link to="/dnd">
                    <div className='menu-board'>
                        <div>
                            <img src={checkboard} />
                            <p>書面審查評分</p>
                        </div>
                    </div>
                </Link>
                <Link to="/dnd">
                    <div className='menu-board'>
                        <div>
                            <img src={accountManage} />
                            <p>帳號管理</p>
                        </div>
                    </div>
                </Link>
                <Link to="/dnd">
                    <div className='menu-board'>
                        <div>
                            <img src={system} />
                            <p>系統參數</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
        
          
    );
}
export default Admin;