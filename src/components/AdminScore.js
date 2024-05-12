import React, { useState, useContext } from 'react';
import AdminHeader from '../side_components/adminside_header';
import AdminFooter from '../side_components/adminside_footer';
import {Reorder, useMotionValue} from 'framer-motion'
import { useRaisedShadow } from "../side_components/use-raised-shadow";
import { Link } from 'react-router-dom';
import print_pic from "../images/PRINT.png";
import store_pic from "../images/STORE.png";
function AdminScore(){
    const [A_items, setAItems] = useState([1,2,3,4,5]);
    const [number, setNumber] = useState(1);
    const [B_items, setBItems] = useState(["test","test","test"]);
    const numbers = [1,2,3,4,5];
    const [isDisabled, setIsDisabled] = useState(true);
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    function handleReorder(event) {
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to); // debugv0.1.0

        event.detail.complete();
    }
    
    function toggleReorder() {
        setIsDisabled((current_state) => !current_state);
    }
    return (
        <div class="container mx-auto flex flex-col w-full">
            <AdminHeader></AdminHeader>
            <div class="flex flex-col justify-evenly items-center mt-2"> 
                
                <div class="flex flex-col ">
                    <h1 class="font-bold">專案A</h1>
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">編號</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">入學年度</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">入學方式</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學號</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">姓名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">Appier</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">中科院航空所</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">台達電子</h1>
                            </div>
                        </div>
                            {A_items.map((item)=>(
        
                                <div class="bg-white justify-center">
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950"><Link to="/admin-form"><u>{item}</u></Link></td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950 items-center text-center">
                                            <select class="w-12"required onChange={(event)=>{setNumber(event.target.value);}}>
                                                <option value="">--</option>
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
                                        </td>    
                                        
                                        <td class="w-24 border border-zinc-950 items-center text-center">
                                            <select class="w-12"required onChange={(event)=>{setNumber(event.target.value);}}>
                                                <option value="">--</option>
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
                                        </td>    
                                        <td class="w-24 border border-zinc-950 items-center text-center">
                                            <select class="w-12"required onChange={(event)=>{setNumber(event.target.value);}}>
                                                <option value="">--</option>
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
                                        </td>    
                                </div>
                                
                            ))}
                    </div>        
                </div>
                <div class="flex flex-col mt-24">
                    <h1 class="font-bold">專案B</h1>
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">編號</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">入學年度</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">入學方式</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學號</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">姓名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">Appier</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">中科院航空所</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">台達電子</h1>
                            </div>
                        </div>
                            {A_items.map((item)=>(
        
                                <div class="bg-white justify-center">
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950">{item}</td>
                                        <td class="w-24 border border-zinc-950 items-center text-center">
                                            <select class="w-12"required onChange={(event)=>{setNumber(event.target.value);}}>
                                                <option value="">--</option>
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
                                        </td>    
                                        
                                        <td class="w-24 border border-zinc-950 items-center text-center">
                                            <select class="w-12"required onChange={(event)=>{setNumber(event.target.value);}}>
                                                <option value="">--</option>
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
                                        </td>    
                                        <td class="w-24 border border-zinc-950 items-center text-center">
                                            <select class="w-12"required onChange={(event)=>{setNumber(event.target.value);}}>
                                                <option value="">--</option>
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
                                        </td>    
                                </div>
                                
                            ))}
                    </div>        
                </div>
                <div class="flex flex-row justify-center mt-12">
                    <button class="mx-2.5"><img src={print_pic}></img></button>
                    <button class="mx-2.5"><img src={store_pic}></img></button>
                </div>
            </div>
            <AdminFooter></AdminFooter>
        </div>
    );
}
export default AdminScore;