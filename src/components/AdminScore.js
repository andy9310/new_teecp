import React, { useState, useContext, useEffect } from 'react';
import AdminHeader from '../side_components/adminside_header';
import AdminFooter from '../side_components/adminside_footer';
import {Reorder, useMotionValue} from 'framer-motion'
import { useRaisedShadow } from "../side_components/use-raised-shadow";
import { Link } from 'react-router-dom';
import print_pic from "../images/PRINT.png";
import store_pic from "../images/STORE.png";
import { useSession } from '../context/session';
import { GlobalContext } from '../context/global';
function AdminScore(){

    /// gobal
    const { url } = useContext(GlobalContext);
    const { user_session } = useSession();

    /// status
    const [Aadvisor_active, setA_AdvisorActive] = useState(true);
    const [Badvisor_active, setB_AdvisorActive] = useState(true); 
    const [company_array, setCompanyArray] = useState([]);
    const [advisor_array, setAdvisorArray] = useState([]);  
    const [student_array, setStudentArray] = useState([]);
    const [allscore, setAllScore] = useState([]);
    const [advisor_to_scores, setAdvisor_to_scores] = useState([]);
    // get all reviewer: advisor / company
    /// get all user api 
    const get_all_user = async() =>{
        let getHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "GET",
            headers: getHeader,
            redirect: "follow",
        }
        await fetch(url+'/user/',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {

                    console.log(JSON.parse(text));  
                    setStudentArray(JSON.parse(text).filter(user=> user['manager']===false && ('student' in user)  && (user['student']['studentNumber']!==undefined || user['student']['studentNumber']!=='' 
                    )));
                    setAdvisorArray(JSON.parse(text).filter(user=> !(user['manager']===false && ('student' in user) &&  (user['student']['studentNumber']!=='' 
                        || user['student']['studentNumber']!==undefined)) && user['manager']===false && ('reviewer' in user) && (user['reviewer']['type'] === "ADVISOR")));
                    setCompanyArray(JSON.parse(text).filter(user=> !(user['manager']===false && ('student' in user) && (user['student']['studentNumber']!=='' 
                        || user['student']['studentNumber']!==undefined)) && user['manager']===false && ('reviewer' in user) && (user['reviewer']['type'] === "COMPANY")));
                    
                    alert("get user success");
                })
            }
            else{
                alert("get user failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get user error");
            console.error(error);
        });
    }

    // get all score api
    const get_all_score = async() =>{
        let getHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "GET",
            headers: getHeader,
            redirect: "follow",
        }
        await fetch(url+'/score/',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    console.log(JSON.parse(text));  
                    setAllScore(JSON.parse(text));
                    alert("get all score success");
                })
            }
            else{
                alert("get all score failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get all score error");
            console.error(error);
        });
       
    };

    // modify advisor array
    const modify_advisor_array = ()=>{
        advisor_array.map((advisor)=>{
            setAdvisor_to_scores(prev=>({...prev,
                [advisor['reviewer']['name']] : allscore.filter(score=>score['reviewer']===advisor['reviewer']['name'])}));
        })
    }

    // use effect

    useEffect(()=>{
        get_all_user();
        get_all_score();
        modify_advisor_array();
        console.log(advisor_to_scores);
      },[])

    
    return (
        <div class="container mx-auto flex flex-col w-full">
            <AdminHeader></AdminHeader>
            <div class="flex flex-col justify-evenly items-center mt-2"> 
                
                <div class="flex flex-col ">
                    <div class="flex flex-row justify-between">
                        <h1 class="font-bold">專案A</h1>
                        
                            {
                            Aadvisor_active?
                            <div class="flex flex-row ">
                                <button class="h-10 w-10 bg-slate-300 rounded-md mx-1 my-1" >教授</button>
                                <button class="h-10 w-10 bg-slate-100 rounded-md mx-1 my-1" onClick={()=>{setA_AdvisorActive(false)}}>企業</button>
                            </div>:
                            <div class="flex flex-row ">
                                <button class="h-10 w-10 bg-slate-100 rounded-md mx-1 my-1" onClick={()=>{setA_AdvisorActive(true)}}>教授</button>
                                <button class="h-10 w-10 bg-slate-300 rounded-md mx-1 my-1" >企業</button>
                            </div>
                            }
                        
                    </div>
                    {
                    Aadvisor_active?
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">編號</h1>
                                {/* <h1 class="bg-sky-500 w-24 border border-zinc-950">入學年度</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">入學方式</h1> */}
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學號</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">姓名</h1>
                                {/* <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1> */}
                                {
                                    advisor_array.map((advisor_info)=>(
                                        <h1 class="bg-sky-500 w-24 border border-zinc-950">{advisor_info['reviewer']['name']}</h1>
                                    ))
                                }
                            </div>
                        </div>
                            {student_array.map((student,index)=>(
        
                                <div class="bg-white justify-center">
                                        <td class="w-24 border border-zinc-950">{index+1}</td>
                                        <td class="w-24 border border-zinc-950">{student['student']['studentNumber']}</td>
                                        <td class="w-24 border border-zinc-950">{student['name']}</td>
                                        {/* <td class="w-24 border border-zinc-950">{item}</td> */}
                                        { 
                                        advisor_array.map((advisor)=>(
                                            <td class="w-24 border border-zinc-950 items-center text-center">
                                                <select class="w-12"required onChange={(event)=>{}}>
                                                    <option value="" selected>{ advisor_to_scores[advisor['reviewer']['name']].filter(score=>score['id']===student['id'])[0]['rank'] }</option>
                                                    
                                                        {
                                                        student_array.map((student, index) =>(
                                                            <option key={index} value={index+1}>
                                                            {index+1}
                                                            </option>
                                                        ))
                                                        }
                                                    
                                                </select>
                                            </td> ))
                                        }    
                                </div>
                                
                            ))}
                    </div>
                    :
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">編號</h1>
                                {/* <h1 class="bg-sky-500 w-24 border border-zinc-950">入學年度</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">入學方式</h1> */}
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學號</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">姓名</h1>
                                {/* <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1> */}
                                {
                                    company_array.map((company_info)=>(
                                        <h1 class="bg-sky-500 w-24 border border-zinc-950">{company_info['reviewer']['name']}</h1>
                                    ))
                                }
                            </div>
                        </div>
                            {student_array.map((student,index)=>(
        
                                <div class="bg-white justify-center">
                                        <td class="w-24 border border-zinc-950">{index+1}</td>
                                        <td class="w-24 border border-zinc-950">{student['student']['studentNumber']}</td>
                                        <td class="w-24 border border-zinc-950">{student['name']}</td>
                                        {/* <td class="w-24 border border-zinc-950">{item}</td> */}
                                        { 
                                        company_array.map(()=>(
                                            <td class="w-24 border border-zinc-950 items-center text-center">
                                                <select class="w-12"required onChange={(event)=>{}}>
                                                    <option value="">--</option>
                                                    <optgroup>
                                                        {
                                                        student_array.map((student, index) =>(
                                                            <option key={index} value={index+1}>
                                                            {index+1}
                                                            </option>
                                                        ))
                                                        }
                                                    </optgroup>
                                                </select>
                                            </td> ))
                                        }    
                                </div>
                                
                            ))}
                    </div>
                    }        
                </div>
                {/* <div class="flex flex-col mt-24">
                    <div class="flex flex-row justify-between">
                        <h1 class="font-bold">專案B</h1>
                        {
                            Badvisor_active?
                            <div class="flex flex-row ">
                                <button class="h-10 w-10 bg-slate-300 rounded-md mx-1 my-1" >教授</button>
                                <button class="h-10 w-10 bg-slate-100 rounded-md mx-1 my-1" onClick={()=>{setB_AdvisorActive(false)}}>企業</button>
                            </div>:
                            <div class="flex flex-row ">
                                <button class="h-10 w-10 bg-slate-100 rounded-md mx-1 my-1" onClick={()=>{setB_AdvisorActive(true)}}>教授</button>
                                <button class="h-10 w-10 bg-slate-300 rounded-md mx-1 my-1" >企業</button>
                            </div>
                            }
                    </div>
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
                </div> */}
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