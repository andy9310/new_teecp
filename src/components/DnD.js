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
import { getSession } from '../context/utils';

function DnD(){

    const { url } = useContext(GlobalContext);
    const { user_session, userId ,session_login, userName } = useSession();
    // user meta data
    const [studentA_array, setStudentA_Array] = useState([]);
    const [studentB_array, setStudentB_Array] = useState([]);
    // A B 
    const [A_isDisabled, setAIsDisabled] = useState(true);
    const [B_isDisabled, setBIsDisabled] = useState(true);
    // store status
    const [AstoreStatus, setAStoreStatus] = useState(false);
    const [BstoreStatus, setBStoreStatus] = useState(false);

    // get all application data
    const getAllData = async() => {
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
        await fetch(url+'/application/',requestOptions)
        .then((response)=>{

            if(response.status == "200" ){
                response.text().then(text => {
                    // set the data
                    console.log(JSON.parse(text));
                    let check = false;
                    if('scores' in JSON.parse(text)[0]){ // save before
                        JSON.parse(text).map((application)=>{
                            if(application['scores'].filter(score=>score['reviewer']===userName).length!==0){
                                check = true;
                            }
                        })
                    }
                    if(check === false){
                        setStudentA_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "A" ));
                        setStudentB_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "B"));
                    }
                    else{

                        setStudentA_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "A" ).sort(function(a,b){
                            let a_rank = a['scores'].filter(score=>score['reviewer']===userName);
                            let b_rank = b['scores'].filter(score=>score['reviewer']===userName);
                            return a_rank > b_rank;
                        }))
                        setStudentB_Array(JSON.parse(text).filter(application =>  application["applicationForm"]["basicProfile"]["applicationType"] === "B" ).sort(function(a,b){
                            let a_rank = a['scores'].filter(score=>score['reviewer']===userName);
                            let b_rank = b['scores'].filter(score=>score['reviewer']===userName);
                            return a_rank > b_rank;
                        }))
                    }
                    
                })
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
    const convert_rank = ()=>{
        
    }
    const sendScore = async(id,index)=>{
        let request_body = {
            "rank": index+1,
            "reviewerId":userId
        }
        let postHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            redirect: "follow",
            body: JSON.stringify(request_body)
        }
        await fetch(url+'/score/'+id.toString(),requestOptions)
        .then((response)=>{
            if(response.status == "200" ){
                alert("store score success");
                return 'success'
            }
            else{
                alert("store score failed");
                return 'failed'
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("store scoreerror");
            console.error(error);
        });

    }

    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    function handleReorder(event) {
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to); // debugv0.1.0
        setStudentA_Array(event.detail.complete(studentA_array));
        console.log(studentA_array);
    }

    // // get all score api
    // const get_all_score = async() =>{
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
    //     await fetch(url+'/score/',requestOptions)
    //     .then((response)=>{
    //         if(response.status == "200"){
    //             response.text().then(text => {
    //                 console.log(JSON.parse(text));  
    //                 let sort_score = JSON.parse(text).filter(score=>score['reviewer']===userName);
    //                 sort_score.sort(function(a,b){
                        
    //                 });
    //                 alert("get all score success");
    //             })
    //         }
    //         else{
    //             alert("get all score failed");
    //             getAllData();
    //         }
    //     })
    //     .then((result)=>console.log(result))
    //     .catch((error)=>{
    //         alert("get all score error");
    //         console.error(error);
    //     });
       
    // };
    
    /// use effect
    useEffect(()=>{
        const sessionUser = getSession('user');
        if (sessionUser) {
            session_login(sessionUser);
        }
    },[]);
    useEffect(()=>{
        if(user_session){
            getAllData();
        }
    },[user_session]);
    useEffect(()=>{
        if(AstoreStatus === true){
            studentA_array.map((item,index)=>{
                sendScore(item['id'],index);
            });
        }
    },[AstoreStatus]);
    useEffect(()=>{
        if(BstoreStatus === true){
            studentB_array.map((item,index)=>{
                sendScore(item['id'],index);
            });
        }
    },[BstoreStatus]);

    return (
        <div class="container mx-auto flex flex-col w-full">
            <CheckHeader></CheckHeader>
            
            <div align="left" class="relative">
              <p class="text-red-500"><strong>【審查開放時間:113年2月6日至113年6月1日(六)上午12時止】 </strong></p>
              <p><strong>【書面審查評分方式】 </strong></p>
              <ul>
                  <li class="style1">1.請以序號表示推薦錄取名次等級，排名評分為【1】者表極力推薦優先錄取</li>
                  <li class="style1">2.專案A有{studentA_array.length}名學生申請，專案B有{studentB_array.length}名學生申請，每個等級可推薦一名(依指導意願排序)</li>
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
                            
                                {studentA_array.map((item,index)=>(
                                    <IonItem >
                                        <div class="bg-stone-300 justify-center">
                                                <td class="w-24 border border-zinc-950"><IonReorder slot="end"><ion-icon src={DragSign}></ion-icon></IonReorder></td>
                                                <td class="w-24 border border-zinc-950">{index+1}</td>
                                                <td class="w-24 border border-zinc-950 underline"><Link to={`/check-form/${item['id']}`}>{item['id']}</Link></td>
                                                <td class="w-24 border border-zinc-950">{item['applicationForm']['basicProfile']['team']}</td>
                                                <td class="w-24 border border-zinc-950">{item['applicationForm']['basicProfile']['advisor']}</td>
                                        </div>
                                    </IonItem>
                                 ))}
                               
                            
                            </IonReorderGroup>
                        
                    </div>    
                    <div class="flex flex-row justify-evenly mt-4">
                        <button class="w-24 bg-green-400 rounded-full hover:translate-y-[-4px]" onClick={()=>{setAIsDisabled(!A_isDisabled);}}>點擊解鎖</button>
                        <button class="w-24 bg-sky-500 rounded-full hover:translate-y-[-4px]" onClick={()=>{setStudentA_Array(studentA_array);setAStoreStatus(true);}}>儲存</button>
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
                            
                                {studentB_array.map((item,index)=>(
                                    <IonItem >
                                    <div class="bg-stone-300 justify-center">
                                            <td class="w-24 border border-zinc-950"><IonReorder slot="end"><ion-icon src={DragSign}></ion-icon></IonReorder></td>
                                            <td class="w-24 border border-zinc-950">{index+1}</td>
                                            <td class="w-24 border border-zinc-950 underline"><Link to={`/check-form/${item['id']}`}>{item['id']}</Link></td>
                                            <td class="w-24 border border-zinc-950">{item['applicationForm']['basicProfile']['team']}</td>
                                            <td class="w-24 border border-zinc-950">{item['applicationForm']['basicProfile']['advisor']}</td>
                                    </div>
                                </IonItem>
                                 ))}
                               
                            
                            </IonReorderGroup>
                        
                    </div>    
                    <div class="flex flex-row justify-evenly mt-4">
                        <button class="w-24 bg-green-400 rounded-full hover:translate-y-[-4px]" onClick={()=>{setBIsDisabled(!B_isDisabled);}}>點擊解鎖</button>
                        <button class="w-24 bg-sky-500 rounded-full hover:translate-y-[-4px]" onClick={()=>{setStudentB_Array(studentB_array);setBStoreStatus(true);}}>儲存</button>
                    </div>
                </div>
            </div>
            <CheckFooter></CheckFooter>
        </div>
    );
}
export default DnD;
