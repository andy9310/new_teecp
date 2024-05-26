import React, { useState, useContext } from 'react';
import './UserForm.css';
import studentboard from "../images/3D.png";
import add_sign from "../images/add_sign.svg";
import correct from "../images/correct.svg";
import C from "../images/C.png";
import { Link } from 'react-router-dom';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';
import Status from './status';
import { useSession } from '../context/session';
import { GlobalContext } from '../context/global';

function UserForm() {
    const { url } = useContext(GlobalContext);
    const { user_session, userId } = useSession();
    const year = new Date().getFullYear();
    const month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    const day = ('0' + new Date().getDate()).slice(-2);
    const hour = ('0' + new Date().getHours()).slice(-2);
    const day_string = "上午";
    const minute = ('0' + new Date().getMinutes()).slice(-2);
    const second = ('0' + new Date().getSeconds()).slice(-2);
    const timestamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

    const [time, setTime] = useState(timestamp);
    const [file, setFile] = useState('');
    const [seminars, setSeminars] = useState([1,2]);
    const [teach_plans, setTeachPlan] = useState([1,2]);
    const [courses, setCourse] = useState([1,2]);
    const [extras, setExtra] = useState([1,2]);
    const [proofs, setProof] = useState([1,2]);
    const [button_disable, setButton] = useState(true);
    const [print_disable, setPrint] = useState(true);
    const [submit_disable, setSubmit] = useState(false);

    function getBase64(file) { // for upload file 
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
          setFile(reader.result);
        };
        return reader.result;
    }
    
    const getStoredData = async() => {
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
        await fetch(url+'/application/'+{userId},requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    //console.log(JSON.parse(text)['name']);  // important
                    
                })
                alert("fetch stored application data success");
            }
            else{
                alert("fetch stored application data failed");
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get application :id error");
            console.error(error);
        });
    };
    const submitForm = () => {
        if(window.confirm("一經送出即無法修改，您確定要送出了?")){
            setPrint(false);
            setSubmit(true);
        }
        else{
            setPrint(true);
        }
    };
    function Seminar(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>研討會論文{props.number}</summary>
                <h2>研討會名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>論文名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>作者群</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
            </details>
        );
    }
    function TeachPlan(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>建教計畫研究報告{props.number}</summary>
                <h2>計畫名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>計畫稱號</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>指導教授</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>研究報告名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>作者</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
            </details>
        );
    }
    function Course(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>修課課程報告{props.number}</summary>
                <h2>課程名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>授課教師</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>研究報告名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>作者群</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <div >
                    <h3>報告上傳</h3>
                    <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                </div>
            </details>
        );
    }
    function Extra(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>其他有助審查資料{props.number}</summary>
                <h2>名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <div >
                    <h3>資料上傳</h3>
                    <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                </div>
            </details>
        );
    }
    function Proof(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>外語能力證明{props.number}</summary>
                <h2>名稱</h2>
                <input type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <div >
                    <h3>證明上傳</h3>
                    <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                </div>
            </details>
        );
    }
    const add_seminar =() => {
        setSeminars(v => [...v, v.length+1]);
    }
    const add_teach_plan =() => {
        setTeachPlan(v => [...v, v.length+1]);
    }
    const add_course =() => {
        setCourse(v => [...v, v.length+1]);
    }
    const add_extra =() => {
        setExtra(v => [...v, v.length+1]);
    }
    const add_proof =() => {
        setProof(v => [...v, v.length+1]);
    }
    return (
        <div class="container mx-auto flex flex-col w-full"> 
            <StudentHeader></StudentHeader>
            <div class="mt-6 mb-6 shadow-2xl bg-white px-8 py-4">
                
                <div class="justify-between text-center flex flex-row relative">
                    {
                        submit_disable?
                        <h1 class="p-2.5 my-2 w-10/12 bg-green-500 text-white border border-transparent rounded-md border-green-500 outline outline-1 outline-green-500 text-left"><ion-icon src={correct}></ion-icon> 報名資料已經成功送出，無法再更改，如有問題請聯繫電信所辦公室 02-33663075</h1>
                        :<h1 class="p-2.5 my-2 w-10/12 text-green-500 border border-transparent rounded-md border-green-500 outline outline-1 outline-green-500 text-left">上次自動儲存時間：{time}</h1>

                    }
                    <Status></Status>
                </div>
                <form class="grid gap-6 xl:grid-cols-2">
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1 ">
                            <h1 class="font-bold text-left">① 基本資料<span class="text-red-500 text-base">（必填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h2>組別</h2>
                                <select class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="1">電信</option>
                                    <option value="2">通信</option>
                                    <option value="3">資網</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>年級</h2>
                                <select class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="1">碩一</option>
                                    <option value="2">碩二及以上</option>
                                    <option value="3">博士</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>指導教授</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>申請專案別</h2>
                                <select class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="1">A</option>
                                    <option value="2">B</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>實驗室(選填)</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>行動電話</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>通訊地址</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">② 大學部就學資料<span class="text-red-500 text-base">（必填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h2>入學方式</h2>
                                <select class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="1">繁星推薦</option>
                                    <option value="2">個人申請</option>
                                    <option value="3">考試入學</option>
                                    <option value="4">其他</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業學校</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業科系</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            
                            <div class="p-1.5">
                                <h2>畢業成績</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級排名</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級人數</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">③ 碩士在學或曾在學資料<span class="text-red-500 text-base">（必填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h2>入學方式</h2>
                                <select class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="1">甄試入學</option>
                                    <option value="2">個人申請</option>
                                    <option value="3">逕讀博士</option>
                                    <option value="4">其他</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業學校</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業科系</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            
                            <div class="p-1.5">
                                <h2>畢業成績</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級排名</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級人數</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">④ 博士在學或曾在學資料<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h2>入學方式</h2>
                                <select class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="1">甄試入學</option>
                                    <option value="2">考試入學</option>
                                    <option value="3">碩士逕博</option>
                                    <option value="3">學士逕博</option>
                                    <option value="4">其他</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>入學年度</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>入學學期</h2>
                                <input type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑤ 切結書<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>切結書上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑥ 指導教授同意書<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>指導教授同意書上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑦ 就學研究計畫<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>就學研究計畫上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑧ 歷年成績單<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>大學歷年成績單上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            <div class="p-1.5">
                                <h3>碩士歷年成績單上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            <div class="p-1.5">
                                <h3>博士歷年成績單上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑨ 名次證明書<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>大學名次證明書上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            <div class="p-1.5">
                                <h3>碩士名次證明書上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            <div class="p-1.5">
                                <h3>博士名次證明書上傳</h3>
                                <input type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" onChange={e =>  getBase64(e.target.files[0]) }></input>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑩ 研討會論文<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {seminars.map((x) => <Seminar number={x}/>)} 
                            <button type="button" class="h-10 w-10" onClick={add_seminar}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑪ 建教計畫研究報告(含國科會)<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {teach_plans.map((x) => <TeachPlan number={x}/>)} 
                            <button type="button" class="h-10 w-10" onClick={add_teach_plan}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑫ 修課課程報告<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {courses.map((x) => <Course number={x}/>)} 
                            <button type="button" class="h-10 w-10" onClick={add_course}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑬ 其他有助審查資料<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {extras.map((x) => <Extra number={x}/>)} 
                            <button type="button" class="h-10 w-10" onClick={add_extra}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑭ 外語能力證明<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {proofs.map((x) => <Proof number={x}/>)} 
                            <button type="button" class="h-10 w-10" onClick={add_proof}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                
            </form>
            <div class="text-center flex flex-row items-center justify-around mt-4 ">
                <div class="mx-auto mb-5">
                    {
                    button_disable?
                    <button  class="rounded-full bg-slate-300 text-white py-2 px-16 m-1" disabled={button_disable}>手動儲存</button>
                    :<button  class="rounded-full bg-[rgb(29,71,110)] text-white py-2 px-16 m-1" disabled={button_disable}>手動儲存</button>
                    }
                </div >
                <div class="mx-auto">
                    {
                        submit_disable?
                        <button  class="rounded-full bg-slate-300 text-white py-2 px-16 m-1" >送出表單</button>
                        :<button  class="rounded-full bg-[rgb(29,71,110)] text-white py-2 px-16 m-1" onClick={submitForm} >送出表單</button>

                    }
                    
                    <p class="text-red-500" >一經送出即無法修改</p>
                </div>
                <div class="mx-auto">
                    {
                        print_disable?
                        <button class="rounded-full bg-slate-300 text-white py-2 px-16 m-1" disabled={true}><a href='../files/login-check.pdf' download class="text-white pointer-events-none">列印登錄確認表</a></button>
                        :<button class="rounded-full bg-[rgb(29,71,110)] text-white py-2 px-16 m-1" ><a href='../files/login-check.pdf' download class="text-white">列印登錄確認表</a></button>
                    }
                    <p >列印後請簽名上傳臺大網路報名系統</p>
                </div>
            </div>
            </div>
            <StudentFooter></StudentFooter>
        </div>
        
          
    );
}
export default UserForm;