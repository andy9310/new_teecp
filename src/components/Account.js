import React, { useState, useContext, useEffect } from 'react';
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
import close_circle from "../images/close_circle.svg";
import lock from "../images/lock.svg";
import trash from "../images/trash.svg";
import pen from "../images/pen.svg";
import { Button,Modal} from 'react-bootstrap'; 
import { GlobalContext } from '../context/global';
import { SessionProvider, useSession } from '../context/session';
import { getSession } from '../context/utils';
function Account(){
    // reset session
    const { user_session, userName, setUserSession,session_login } = useSession();
    useEffect(() => {
        const sessionUser = getSession('user');
        if (sessionUser) {
          setUserSession(sessionUser);
          session_login(sessionUser);
        }
    }, []);
    

    /// status reset
    const [reset, setReset] = useState(true);
    const [now_create_advisor, setCreateAdvisor] = useState({
        "account":"",
        "password":"",
        "name":"",
        "unit":"",
        "jobName":"",
        "pEmail":"",
        "sEmail":""
    }); 
    const [now_create_company, setCreateCompany] = useState({
        "account":"",
        "password":"",
        "name":"",
        "unit":"",
        "jobName":"",
        "pEmail":"",
        "sEmail":""
    }); 
    const [now_revise_advisor, setReviseAdvisor] = useState({
        "account":"",
        "password":"",
        "name":"",
        "unit":"",
        "jobName":"",
        "pEmail":"",
        "sEmail":""
    }); 
    const [now_revise_company, setReviseCompany] = useState({
        "account":"",
        "password":"",
        "name":"",
        "unit":"",
        "jobName":"",
        "pEmail":"",
        "sEmail":""
    }); 
    
    /// front data 
    const [company_array, setCompanyArray] = useState([]);
    const [advisor_array, setAdvisorArray] = useState([]); 
    const [student_array, setStudentArray] = useState([]);


    /// status
    const [addstatus_one, setAddStatus_one] = useState(false);
    const [addstatus_two, setAddStatus_two] = useState(false);
    const [revisestatus, setReviseStatus] = useState(false);
    const [getAll, setGetAll] = useState(0);
    const { url } = useContext(GlobalContext);

    const numbers = [1,2,3,4,5];
    const add_board_one = ()=>{
        setAddStatus_one(!addstatus_one);
        if(addstatus_two === true){
            setAddStatus_two(false);
        }
        if(revisestatus === true){
            setReviseStatus(false);
        }
    }
    const add_board_two = ()=>{
        setAddStatus_two(!addstatus_two);
        if(addstatus_one === true){
            setAddStatus_one(false);
        }
        if(revisestatus === true){
            setReviseStatus(false);
        }
    }
    const add_board_three = ()=>{
        setReviseStatus(!revisestatus);
    }
    const handleClose = ()=>{
        setAddStatus_one(false);
    }
    
    /// delete api
    const delete_account = async(id) => {
        let deleteHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "DELETE",
            headers: deleteHeader,
            redirect: "follow",
        }
        await fetch(url+'/user/'+id,requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    console.log(JSON.parse(text));  
                    alert("delete user success");
                    setReset(!reset);
                })
            }
            else{
                alert("delete user failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("delete user error");
            console.error(error);
        });
    }

    ///create api   
    const create_account = async(type) => {
        let request_body = {};
        if(type === "ADVISOR"){
            request_body = {
                "name": now_create_advisor['name'],
                "account": now_create_advisor['account'],
                "password": now_create_advisor['password'],
                "manager": false,
                "reviewer":{
                    "type": type,
                    "unit": now_create_advisor['unit'],
                    "name": now_create_advisor['name'],
                    "jobName":now_create_advisor['jobName'],
                    "primaryEmail":now_create_advisor['pEmail'],
                    "secondEmail":now_create_advisor['sEmail']
                }
            }
        }
        else{
            request_body = {
                "name": now_create_company['name'],
                "account": now_create_company['account'],
                "password": now_create_company['password'],
                "manager": false,
                "reviewer":{
                    "type": type,
                    "unit": now_create_company['unit'],
                    "name": now_create_company['name'],
                    "jobName":now_create_company['jobName'],
                    "primaryEmail":now_create_company['pEmail'],
                    "secondEmail":now_create_company['sEmail']
                }
            }
        }
        
        console.log(request_body);
        let createHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: createHeader,
            redirect: "follow",
            body: JSON.stringify(request_body)
        }
        await fetch(url+'/user/',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    console.log(JSON.parse(text));  
                    alert("create user success");
                    setReset(!reset);
                    if(type==='ADVISOR'){
                        setCreateAdvisor({
                            "account":"",
                            "password":"",
                            "name":"",
                            "unit":"",
                            "jobName":"",
                            "pEmail":"",
                            "sEmail":""
                        });
                    }
                    else{
                        setCreateCompany({
                            "account":"",
                            "password":"",
                            "name":"",
                            "unit":"",
                            "jobName":"",
                            "pEmail":"",
                            "sEmail":""
                        });
                    }
                    
                })
            }
            else{
                alert("create user failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("create user error");
            console.error(error);
        });
    }

    //// revise api
    const revise = async(id,type) => {
        let request_body = {};
        if(type === "ADVISOR"){
            request_body = {
                "name": now_create_advisor['name'],
                "account": now_create_advisor['account'],
                "password": now_create_advisor['password'],
                "manager": false,
                "reviewer":{
                    "type": type,
                    "unit": now_create_advisor['unit'],
                    "name": now_create_advisor['name'],
                    "jobName":now_create_advisor['jobName'],
                    "primaryEmail":now_create_advisor['pEmail'],
                    "secondEmail":now_create_advisor['sEmail']
                }
            }
        }
        else if(type === "COMPANY"){
            request_body = {
                "name": now_create_company['name'],
                "account": now_create_company['account'],
                "password": now_create_company['password'],
                "manager": false,
                "reviewer":{
                    "type": type,
                    "unit": now_create_company['unit'],
                    "name": now_create_company['name'],
                    "jobName":now_create_company['jobName'],
                    "primaryEmail":now_create_company['pEmail'],
                    "secondEmail":now_create_company['sEmail']
                }
            }
        }
        else{ // revise student 
            request_body = {
                "name": "string",
                "password": "string",
                "resetTime": "string",
                "manager": true,
                "student": {
                    "studentNumber": "string",
                    "userId": 0
                },
                "reviewer": {
                    "type": "ADVISOR",
                    "unit": "string",
                    "name": "string",
                    "jobName": "string",
                    "primaryEmail": "string",
                    "secondEmail": "string"
                }
            }
        }
        let patchHeader = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "PATCH",
            headers: patchHeader,
            redirect: "follow",
            body: JSON.stringify(request_body)
        }
        await fetch(url+'/user/'+id,requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    console.log(JSON.parse(text));  
                    alert("patch user success");
                    setReset(!reset);
                    if(type==='ADVISOR'){
                        setCreateAdvisor({
                            "account":"",
                            "password":"",
                            "name":"",
                            "unit":"",
                            "jobName":"",
                            "pEmail":"",
                            "sEmail":""
                        });
                    }
                    else{
                        setCreateCompany({
                            "account":"",
                            "password":"",
                            "name":"",
                            "unit":"",
                            "jobName":"",
                            "pEmail":"",
                            "sEmail":""
                        });
                    }
                    
                })
            }
            else{
                alert("create user failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("create user error");
            console.error(error);
        });
    }

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
                    // TODO
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
    // effect 
    useEffect(()=>{
        if(user_session){
            get_all_user();
        }
    },[getAll,reset,user_session])

    return(
        <>
        {addstatus_one?
            <div class="absolute top-40 left-1/2 z-50 bg-white shadow-xl text-white w-1/3 h-1/2 rounded-lg flex flex-col">
                <div class="flex flex-row justify-between">
                    <h1 class="font-bold mt-6 mx-6 text-black">新增審查帳號(教授)</h1>
                    <button class="text-black" onClick={()=>{add_board_one()}} ><ion-icon size="large" class="mx-2" src={close_circle}></ion-icon></button>
                </div>
                <div class="grid-section m-3 grid bg-white md:grid-cols-2">
                    <div>
                        <h2>帳號</h2>
                        <input onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['account'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['account']}
                        type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="帳號"></input>
                    </div>
                    <div>
                        <h2>密碼</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['password'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['password']}
                        type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="密碼"></input>
                    </div>
                    <div>
                        <h2>姓名</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['name'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['name']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="姓名"></input>
                    </div>
                    <div>
                        <h2>審查單位名稱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['unit'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['unit']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="審查單位名稱"></input>
                    </div>
                    <div>
                        <h2>審查委員職稱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['jobName'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['jobName']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="審查委員職稱"></input>
                    </div>
                    <div>
                        <h2>主要聯繫信箱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['pEmail'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['pEmail']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="主要聯繫信箱"></input>
                    </div>
                    <div>
                        <h2>次要聯繫信箱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_advisor};
                            newData['sEmail'] = e.target.value;
                            setCreateAdvisor(newData);
                        }}
                        value={now_create_advisor['sEmail']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="次要聯繫信箱"></input>
                    </div>
                </div>
                <div class="flex flex-row justify-end mx-3 mt-3 bottom-0">
                    <button class="text-sky-400 mx-3" onClick={()=>{setCreateAdvisor({
                        "account":"",
                        "password":"",
                        "name":"",
                        "unit":"",
                        "jobName":"",
                        "pEmail":"",
                        "sEmail":""
                    })}}>清除</button>
                    <button class="text-sky-400 mx-3" onClick={()=>{create_account("ADVISOR");}}>送出</button>
                </div>
            </div>
          :<></>
        }
        {addstatus_two?
            <div class="absolute top-2/3 left-1/2 z-50 bg-white shadow-xl text-white w-1/3 h-1/2 rounded-lg flex flex-col">
                <div class="flex flex-row justify-between">
                    <h1 class="font-bold mt-6 mx-6 text-black">新增審查帳號(企業)</h1>
                    <button class="text-black" onClick={()=>{add_board_two()}} ><ion-icon size="large" class="mx-2" src={close_circle}></ion-icon></button>
                </div>
                <div class="grid-section m-3 grid bg-white md:grid-cols-2">
                    <div>
                        <h2>帳號</h2>
                        <input onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['account'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['account']}
                        type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="帳號"></input>
                    </div>
                    <div>
                        <h2>密碼</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['password'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['password']}
                        type='text' class="border-0  text-black text-base border-b border-gray-400" placeholder="密碼"></input>
                    </div>
                    <div>
                        <h2>姓名</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['name'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['name']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="姓名"></input>
                    </div>
                    <div>
                        <h2>審查單位名稱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['unit'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['unit']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="審查單位名稱"></input>
                    </div>
                    <div>
                        <h2>審查委員職稱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['jobName'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['jobName']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="審查委員職稱"></input>
                    </div>
                    <div>
                        <h2>主要聯繫信箱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['pEmail'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['pEmail']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="主要聯繫信箱"></input>
                    </div>
                    <div>
                        <h2>次要聯繫信箱</h2>
                        <input  onChange={(e) => {
                            const newData = {...now_create_company};
                            newData['sEmail'] = e.target.value;
                            setCreateCompany(newData);
                        }}
                        value={now_create_company['sEmail']}
                        type='text'  class="border-0 text-black text-base border-b border-gray-400" placeholder="次要聯繫信箱"></input>
                    </div>
                </div>
                <div class="flex flex-row justify-end mx-3 mt-3 bottom-0">
                    <button class="text-sky-400 mx-3" onClick={()=>{setCreateCompany({
                        "account":"",
                        "password":"",
                        "name":"",
                        "unit":"",
                        "jobName":"",
                        "pEmail":"",
                        "sEmail":""
                    })}}>清除</button>
                    <button class="text-sky-400 mx-3" onClick={()=>{create_account("COMPANY");}} >送出</button>
                </div>
            </div>
          :<></>
        }
        {revisestatus?
            <div class="absolute top-full left-1/2 z-50 bg-white shadow-xl text-white w-1/3 h-1/2 rounded-lg flex flex-col">
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
                            <button class="mt-6 mx-3 border bg-primary w-16 rounded-lg text-white" onClick={()=>{add_board_one()}}>新增</button>
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
                            {advisor_array.map((single_items)=>(
                                <tr class="border-b-1 border-black">
                                    <td><p class="ml-6 my-3">{single_items['account']}</p></td>
                                    <td><p class="ml-6 my-3">{single_items['name']}</p></td>
                                    <td>
                                        <div class="ml-6 my-3">
                                            <button><ion-icon class="mx-2" src={lock}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={pen}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={trash} onClick={()=>{delete_account(single_items['id']); } }></ion-icon></button>
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
                            {company_array.map((single_items)=>(
                                <tr class="border-b-1 border-black">
                                    <td><p class="ml-6 my-3">{single_items['account']}</p></td>
                                    <td><p class="ml-6 my-3">{single_items['name']}</p></td>
                                    <td>
                                        <div class="ml-6 my-3">
                                            <button><ion-icon class="mx-2" src={lock}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={pen} ></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={trash} onClick={()=>{delete_account(single_items['id']); } } ></ion-icon></button>
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
                            {student_array.map((single_items)=>(
                                <tr class="border-b-1 border-black">
                                    <td><p class="ml-6 my-3">{single_items['account']}</p></td>
                                    <td><p class="ml-6 my-3">{single_items['student']['studentNumber']}</p></td>
                                    <td><p class="ml-6 my-3">{single_items['name']}</p></td>
                                    <td>
                                        <div class="ml-6 my-3">
                                            <button><ion-icon class="mx-2" src={lock}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={pen} onClick={add_board_three}></ion-icon></button>
                                            <button><ion-icon class="mx-2" src={trash} onClick={()=>{delete_account(single_items['id']); } }></ion-icon></button>
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