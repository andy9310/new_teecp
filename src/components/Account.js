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

function Account(){
    const [professor_items, setProfessorItems] = useState([[1,2],[1,2],[1,2],[1,2]]);
    const [business_items, setBusinessItems] = useState([[3,4],[3,4],[3,4]]);
    const [student_items, setStudentItems] = useState([[5,6,7],[5,6,7],[5,6,7],[5,6,7],[5,6,7],[5,6,7],[5,6,7],[5,6,7]]);
    const [addstatus_one, setAddStatus_one] = useState(false);
    const [addstatus_two, setAddStatus_two] = useState(false);
    const [revisestatus, setReviseStatus] = useState(false);
    const numbers = [1,2,3,4,5];
    const add_board_one = ()=>{
        setAddStatus_one(!addstatus_one);
    }
    const add_board_two = ()=>{
        setAddStatus_two(!addstatus_two);
    }
    const add_board_three = ()=>{
        setReviseStatus(!revisestatus);
    }
    const handleClose = ()=>{
        setAddStatus_one(false);
    }
    return(
        <>
        {addstatus_one?
            <div class="absolute top-40 left-1/2 z-50 bg-white shadow-xl text-white w-1/3 h-60 rounded-lg flex flex-col">
                <h1 class="font-bold mt-6 mx-6 text-black">新增審查帳號(教授)</h1>
                <div class="grid-section m-3 grid bg-white md:grid-cols-2">
                    <div>
                        <h2>帳號</h2>
                        <input type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="帳號"></input>
                    </div>
                    <div>
                        <h2>密碼</h2>
                        <input type='text' class="border-0  text-base border-b border-gray-400" placeholder="密碼"></input>
                    </div>
                    <div>
                        <h2>姓名</h2>
                        <input type='text'  class="border-0  text-base border-b border-gray-400" placeholder="姓名"></input>
                    </div>
                </div>
                <div class="flex flex-row justify-end mx-3 mt-3 bottom-0">
                    <button class="text-sky-400 mx-3">取消</button>
                    <button class="text-sky-400 mx-3">送出</button>
                </div>
            </div>
          :<></>
        }
        {addstatus_two?
            <div class="absolute top-2/3 left-1/2 z-50 bg-white shadow-xl text-white w-1/3 h-60 rounded-lg flex flex-col">
                <h1 class="font-bold mt-6 mx-6 text-black">新增審查帳號(企業)</h1>
                <div class="grid-section m-3 grid bg-white md:grid-cols-2">
                    <div>
                        <h2>帳號</h2>
                        <input type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="帳號"></input>
                    </div>
                    <div>
                        <h2>密碼</h2>
                        <input type='text' class="border-0  text-base border-b border-gray-400" placeholder="密碼"></input>
                    </div>
                    <div>
                        <h2>姓名</h2>
                        <input type='text'  class="border-0  text-base border-b border-gray-400" placeholder="姓名"></input>
                    </div>
                </div>
                <div class="flex flex-row justify-end mx-3 mt-3 bottom-0">
                    <button class="text-sky-400 mx-3">取消</button>
                    <button class="text-sky-400 mx-3">送出</button>
                </div>
            </div>
          :<></>
        }
        {revisestatus?
            <div class="absolute top-full left-1/2 z-50 bg-white shadow-xl text-white w-1/3 h-60 rounded-lg flex flex-col">
                <h1 class="font-bold mt-6 mx-6 text-black">編輯學生帳號</h1>
                <div class="grid-section m-3 grid bg-white md:grid-cols-2">
                    <div>
                        <h2>帳號</h2>
                        <input type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="帳號"></input>
                    </div>
                    <div>
                        <h2>學號/准考證號碼</h2>
                        <input type='text' class="border-0  text-base border-b border-gray-400" placeholder="學號/准考證號碼"></input>
                    </div>
                    <div>
                        <h2>姓名</h2>
                        <input type='text'  class="border-0  text-base border-b border-gray-400" placeholder="姓名"></input>
                    </div>
                </div>
                <div class="flex flex-row justify-end mx-3 mt-3 bottom-0">
                    <button class="text-sky-400 mx-3">取消</button>
                    <button class="text-sky-400 mx-3">送出</button>
                </div>
            </div>
          :<></>
        }
        <div class="container z-0 mx-auto flex flex-col w-full">
            <AdminHeader></AdminHeader>
            <div class="flex flex-col justify-evenly items-center mt-2">
                <div class="bg-slate-200 w-full my-6 shadow-xl rounded-xl" >
                    <div class="flex flex-row justify-between">
                        <h1 class="font-bold mt-6 mx-6">審查帳號管理(教授)</h1>
                        <div>
                            <button class="mt-6 mx-3 border bg-primary w-16 rounded-lg text-white" onClick={add_board_one}>新增</button>
                            <button class="mt-6 mx-3 border w-12 bg-primary rounded-full"><ion-icon src={search}></ion-icon></button>
                        </div>
                    </div>
                    <table class="w-full">
                        <thead>
                            <tr class="border-b-1 border-black ">
                                <th class="text-left "><p class="ml-6 my-3">email</p></th>
                                <th class="text-left "><p class="ml-6 my-3">姓名</p></th>
                                <th class="text-left "><p class="ml-6 my-3">動作</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {professor_items.map((single_items)=>(
                                <tr class="border-b-1 border-black">
                                    {
                                        single_items.map((item)=>(
                                            <td><p class="ml-6 my-3">{item}</p></td>
                                        ))
                                        
                                    }
                                    <td>
                                        <div class="ml-6 my-3">
                                            <button><ion-icon class="mx-2" src={lock}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={pen}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={trash}></ion-icon></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="justify-end flex flex-row mt-6">
                        <h1 class="mx-2">Rows per page:</h1>
                        <select class="mx-2 border-b-1 border-black bg-slate-200">
                            <option value="">1</option>
                            <optgroup>
                                {numbers.map((num) => {
                                return (
                                    <option key={num} value={num}>
                                    {num}
                                    </option>
                                );
                                })}
                            </optgroup>
                        </select>
                        <h1 class="mx-2">1-4</h1>
                        <button class="mx-2"><ion-icon src={leftarrow}></ion-icon></button>
                        <button class="mx-2"><ion-icon src={rightarrow}></ion-icon></button>
                    </div>
                </div>

                <div class="bg-slate-200 w-full my-6 shadow-xl rounded-xl" >
                    <div class="flex flex-row justify-between">
                        <h1 class="font-bold mt-6 mx-6">審查帳號管理(企業)</h1>
                        <div>
                            <button class="mt-6 mx-3 border bg-primary w-16 rounded-lg text-white" onClick={add_board_two}>新增</button>
                            <button class="mt-6 mx-3 border w-12 bg-primary rounded-full"><ion-icon src={search}></ion-icon></button>
                        </div>
                    </div>
                    <table class="w-full">
                        <thead>
                            <tr class="border-b-1 border-black ">
                                <th class="text-left "><p class="ml-6 my-3">email</p></th>
                                <th class="text-left "><p class="ml-6 my-3">姓名</p></th>
                                <th class="text-left "><p class="ml-6 my-3">動作</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {business_items.map((single_items)=>(
                                <tr class="border-b-1 border-black">
                                    {
                                        single_items.map((item)=>(
                                            <td><p class="ml-6 my-3">{item}</p></td>
                                        ))
                                        
                                    }
                                    <td>
                                        <div class="ml-6 my-3">
                                            <button><ion-icon class="mx-2" src={lock}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={pen} ></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={trash}></ion-icon></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="justify-end flex flex-row mt-6">
                        <h1 class="mx-2">Rows per page:</h1>
                        <select class="mx-2 border-b-1 border-black bg-slate-200">
                            <option value="">1</option>
                            <optgroup>
                                {numbers.map((num) => {
                                return (
                                    <option key={num} value={num}>
                                    {num}
                                    </option>
                                );
                                })}
                            </optgroup>
                        </select>
                        <h1 class="mx-2">1-4</h1>
                        <button class="mx-2"><ion-icon src={leftarrow}></ion-icon></button>
                        <button class="mx-2"><ion-icon src={rightarrow}></ion-icon></button>
                    </div>
                </div>

                <div class="bg-slate-200 w-full my-6 shadow-xl rounded-xl" >
                    <div class="flex flex-row justify-between">
                        <h1 class="font-bold mt-6 mx-6">學生帳號管理</h1>
                        <div>
                            <button class="mt-6 mx-3 border bg-primary w-16 rounded-lg text-white" >新增</button>
                            <button class="mt-6 mx-3 border w-12 bg-primary rounded-full"><ion-icon src={search}></ion-icon></button>
                        </div>
                    </div>
                    <table class="w-full">
                        <thead>
                            <tr class="border-b-1 border-black ">
                                <th class="text-left "><p class="ml-6 my-3">帳號</p></th>
                                <th class="text-left "><p class="ml-6 my-3">學號/准考證號碼</p></th>
                                <th class="text-left "><p class="ml-6 my-3">姓名</p></th>
                                <th class="text-left "><p class="ml-6 my-3">動作</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {student_items.map((single_items)=>(
                                <tr class="border-b-1 border-black">
                                    {
                                        single_items.map((item)=>(
                                            <td><p class="ml-6 my-3">{item}</p></td>
                                        ))
                                        
                                    }
                                    <td>
                                        <div class="ml-6 my-3">
                                            <button><ion-icon class="mx-2" src={lock}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={pen} onClick={add_board_three}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={trash}></ion-icon></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="justify-end flex flex-row mt-6">
                        <h1 class="mx-2">Rows per page:</h1>
                        <select class="mx-2 border-b-1 border-black bg-slate-200">
                            <option value="">1</option>
                            <optgroup>
                                {numbers.map((num) => {
                                return (
                                    <option key={num} value={num}>
                                    {num}
                                    </option>
                                );
                                })}
                            </optgroup>
                        </select>
                        <h1 class="mx-2">1-4</h1>
                        <button class="mx-2"><ion-icon src={leftarrow}></ion-icon></button>
                        <button class="mx-2"><ion-icon src={rightarrow}></ion-icon></button>
                    </div>
                </div>
                
                
                
                
            </div>
            <AdminFooter></AdminFooter>
        </div>
    </>
    );
}
export default Account;