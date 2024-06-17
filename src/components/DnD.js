import {Reorder, useMotionValue} from 'framer-motion'
import { useState, useEffect, useContext } from 'react';
import { Table } from "reactstrap";
import { useRaisedShadow } from "../side_components/use-raised-shadow";
import {Card, CardBody,Button} from "@nextui-org/react"; // use Nextui as 
import Status from './status';
import CheckHeader from '../side_components/checkside_header';
import CheckFooter from '../side_components/checkside_footer';
import {
    IonButton,
    IonItem,
    IonReorder,
    IonReorderGroup,
  } from '@ionic/react';
import DragSign from "../images/reorder-four.svg";
import { useSession } from '../context/session';
import { GlobalContext } from '../context/global';
import { redirect, useNavigate, Link } from 'react-router-dom';

function DnD(){
    const navigate = useNavigate();
    const { url } = useContext(GlobalContext);
    const { user_session, userId, studentNumber } = useSession();
    // user meta data
    const [studentA_array, setStudentA_Array] = useState([]);
    const [studentB_array, setStudentB_Array] = useState([]);
    // A B 
    const [A_items, setAItems] = useState([{
        "user-id":12,
        "app-id":2,
        "team":'CSP',
        "advisor":'楊鈞安',
    }]);
    const [B_items, setBItems] = useState([]);
    const [A_isDisabled, setAIsDisabled] = useState(true);
    const [B_isDisabled, setBIsDisabled] = useState(true);

    /// get all user
    const get_all_user = async() => {
        let getHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Authorization": `Bearer ${user_session}`,
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
                    const student_array = JSON.parse(text).filter(user =>('student' in user) && user['student']['studentNumber']!=="");
                    student_array .map((student)=>{ getAllData(student['id']) })
                    //setStudentA_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "A"));
                    //setStudentB_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "B"));
                    alert("get user metadata success");
                })
            }
            else{
                alert("get user metadata failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get user metadata error");
            console.error(error);
        });
    }
    
    /// get all application metadata 
    // const get_all_application = async() =>{
    //     let getHeader = {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         "Authorization": `Bearer ${user_session}`,
    //     }
    //     const requestOptions = {
    //         method: "GET",
    //         headers: getHeader,
    //         redirect: "follow",
    //     }
    //     await fetch(url+'/application/',requestOptions)
    //     .then((response)=>{
    //         if(response.status == "200"){
    //             response.text().then(text => {

    //                 console.log(JSON.parse(text));  
    //                 // JSON.parse(text).map((student)=>{ getAllData(student['id']) })
    //                 //setStudentA_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "A"));
    //                 //setStudentB_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "B"));
    //                 alert("get user metadata success");
    //             })
    //         }
    //         else{
    //             alert("get user metadata failed");
    //         }
    //     })
    //     .then((result)=>console.log(result))
    //     .catch((error)=>{
    //         alert("get user metadata error");
    //         console.error(error);
    //     });
    // }

    /// get all application data
    const getAllData = async(id) => {
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
        let id_string = id.toString();
        await fetch(url+'/application/'+id_string,requestOptions)
        .then((response)=>{

            if(response.status == "200" ){
                response.text().then(text => {
                    //console.log(JSON.parse(text)['name']);  // important
                    // set the data
                    console.log(JSON.parse(text));
                    if(JSON.parse(text)['applicationForm']['basicProfile']['applicationType'] === "A"){
                        
                        let item = {
                            "user-id":id,
                            "app-id":JSON.parse(text)['id'],
                            "team":JSON.parse(text)['applicationForm']['basicProfile']['team'],
                            "advisor":JSON.parse(text)['applicationForm']['basicProfile']['advisor'],
                        }
                        console.log([...A_items, item]);
                        setAItems([...A_items, item])
                    }
                    else if(JSON.parse(text)['applicationForm']['basicProfile']['applicationType'] === "B"){
                        let item = {
                            "user-id":id,
                            "id":JSON.parse(text)['id'],
                            "team":JSON.parse(text)['applicationForm']['basicProfile']['team'],
                            "advisor":JSON.parse(text)['applicationForm']['basicProfile']['advisor'],
                        }
                        setBItems([...B_items, item])
                    }else{
                        console.log("no type found");
                    }
                    
                })
                // alert("fetch stored application data success");
                return 'success'
            }
            else{
                alert("fetch stored application data failed");
                return 'failed'
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get application/:id error");
            console.error(error);
        });
    };


    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    function handleReorder(event) {

        console.log('Dragged from index', event.detail.from, 'to', event.detail.to); // debugv0.1.0
        setAItems(event.detail.complete(A_items));
        console.log(A_items);
    }
    
    /// use effect
    useEffect(()=>{
        // get_all_application();
        get_all_user();
    },[]);

    return (
        <div class="container mx-auto flex flex-col w-full">
            <CheckHeader></CheckHeader>
            
            <div align="left" class="relative">
              <p class="text-red-500"><strong>【審查開放時間:113年2月6日至113年6月1日(六)上午12時止】 </strong></p>
              <p><strong>【書面審查評分方式】 </strong></p>
              <ul>
                  <li class="style1">1.請以序號表示推薦錄取名次等級，排名評分為【1】者表極力推薦優先錄取</li>
                  <li class="style1">2.專案A有{A_items.length}名學生申請，專案B有{B_items.length}名學生申請，每個等級可推薦一名(依指導意願排序)</li>
              </ul>
              <Status></Status>
            </div>
            <div class="flex flex-row justify-evenly items-center mt-2"> 
                
                <div class="flex flex-col ">
                    <h1 class="font-bold">專案A</h1>
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-white w-24 border border-zinc-950"></h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">排名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學生姓名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">組別</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1>
                            </div>
                        </div>
                        {/* <tbody class=""> */}
                            <IonReorderGroup disabled={A_isDisabled} onIonItemReorder={handleReorder}>
                            
                                {A_items.map((item,index)=>(
                                    <IonItem >
                                        <div class="bg-stone-300 justify-center">
                                                <td class="w-24 border border-zinc-950"><IonReorder slot="end"><ion-icon src={DragSign}></ion-icon></IonReorder></td>
                                                <td class="w-24 border border-zinc-950">{index+1}</td>
                                                <td class="w-24 border border-zinc-950 underline"><Link to={`/check-form/${item['user-id']}`}>{item['user-id']}</Link></td>
                                                <td class="w-24 border border-zinc-950">{item['team']}</td>
                                                <td class="w-24 border border-zinc-950">{item['advisor']}</td>
                                        </div>
                                    </IonItem>
                                 ))}
                               
                            
                            </IonReorderGroup>
                        
                    </div>    
                    <div class="flex flex-row justify-evenly mt-4">
                        <button class="w-24 bg-green-400 rounded-full hover:translate-y-[-4px]" onClick={()=>{setAIsDisabled(!A_isDisabled);}}>點擊解鎖</button>
                        <button class="w-24 bg-sky-500 rounded-full hover:translate-y-[-4px]" >儲存</button>
                    </div>
                    
                    
                </div>
                <div class="flex flex-col ">
                    <h1 class="font-bold">專案B</h1>
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-white w-24 border border-zinc-950"></h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">排名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學生姓名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">組別</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1>
                            </div>
                        </div>
                        {/* <tbody class=""> */}
                            <IonReorderGroup disabled={B_isDisabled} onIonItemReorder={handleReorder}>
                            
                                {/* {A_items.map((item,index)=>(
                                    <IonItem Reorder key={index}>
                                        <div class="bg-stone-300 justify-center">
                                                <td class="w-24 border border-zinc-950"><IonReorder slot="end"><ion-icon src={DragSign}></ion-icon></IonReorder></td>
                                                <td class="w-24 border border-zinc-950"><IonReorder slot="end"></IonReorder></td>
                                                <td class="w-24 border border-zinc-950">{item['id']}</td>
                                                <td class="w-24 border border-zinc-950">{item['team']}</td>
                                                <td class="w-24 border border-zinc-950">{item['advisor']}</td>
                                        </div>
                                    </IonItem>
                                 ))} */}
                               
                            
                            </IonReorderGroup>
                        
                    </div>    
                    <div class="flex flex-row justify-evenly mt-4">
                        <button class="w-24 bg-green-400 rounded-full hover:translate-y-[-4px]" onClick={()=>{setBIsDisabled(!B_isDisabled);}}>點擊解鎖</button>
                        <button class="w-24 bg-sky-500 rounded-full hover:translate-y-[-4px]" onClick={()=>{setAItems(A_items);}}>儲存</button>
                    </div>
                </div>
            </div>
            <CheckFooter></CheckFooter>
        </div>
    );
}
export default DnD;
