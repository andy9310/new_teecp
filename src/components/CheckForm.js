import React, { useState, useContext, useEffect } from 'react';
import './UserForm.css';
import studentboard from "../images/3D.png";
import add_sign from "../images/add_sign.svg";
import delete_sign from "../images/trash.svg";
import correct from "../images/correct.svg";
import C from "../images/C.png";
import { Link } from 'react-router-dom';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';
import Status from './status';
import { useSession } from '../context/session';
import { GlobalContext } from '../context/global';
import { useNavigate,useParams } from 'react-router-dom';
import { getSession } from '../context/utils';

function CheckForm() {
    const { id } = useParams(); // application id
    
    // gobal
    const { url } = useContext(GlobalContext);
    const { user_session,session_login } = useSession();
    const [userid, setUser_Id] = useState(null);
    
    // application id
    const [applicationId, setApplicationId] = useState(0);

    // submit status
    const [status, setStatus] = useState(false);
    const [sendTime, setSendTime] = useState('');
    const [scores, setScores] = useState([]);

    // 
    // basic profile
    const [basicProfile, setBasicProfile] = useState({
        "team":"",
        "grade": "",
        "advisor": "",
        "applicationType": "",
        "lab": "",
        "phone": "",
        "contactAddress": ""
    });

    // bachlor profile
    const [bachelorProfile, setBachelorProfile] = useState({
        "admission": "",
        "graduateAtSchool": "",
        "graduateAtDepart": "",
        "graduateScore": "",
        "rankOfYear": "",
        "numberOfYear": ""
    });
    
    // master profile 
    const [masterProfile, setMasterProfile] = useState({
        "admission": "",
        "admissionYear": "",
        "admissionSemester": "",
        "graduateAtSchool": "",
        "graduateAtDepart": "",
        "graduateScore": "",
        "rankOfYear": "",
        "numberOfYear": ""
    });

    // phd profile
    const [phdProfile, setPhdProfile] = useState({
        "admission": "",
        "admissionYear": "",
        "admissionSemester": ""
    });
    
    // basic forms
    const [forms, setForms] = useState({
        "isSent": false,
        "studyResearchPlan": {
            "file": null,
            "path": ""
        },
        "affidavit": {
            "file": null,
            "path": ""
        },
        "professorConsentForm": {
            "file": null,
            "path": ""
        }
    });

    //transcript
    const [transcript, setTranscript] = useState({
        "bachelorTranscript": {
            "file":null,
            "path": ""
        },
        "masterTranscript": {
            "file":null,
            "path": ""
        },
        "phdTranscript": {
            "file":null,
            "path": ""
        }
    });
    
    // ranking certificate
    const [certificate, setCertificate] = useState({
        "bachelorRanking": {
            "file":null,
            "path": ""
        },
        "masterRanking": {
            "file":null,
            "path": ""
        },
        "phdRanking": {
            "file":null,
            "path": ""
        }
    }); 

    //conference paper
    const [conferencePapers , setConferencePaper] = useState([]);
    const [conferencePapers_file , setConferencePaperFiles] = useState([]);
    //research project
    const [researchProjects , setResearchProjects] = useState([]);
    const [researchProjects_file , setResearchProjectsFiles] = useState([]);
    // course projects
    const [courseProjects , setCourseProjects] = useState([]);
    const [courseProjects_file , setCourseProjectsFiles] = useState([]);
    // language certificate
    const [languageCertificate , setLanguageCertificate] = useState([]);
    const [languageCertificate_file , setLanguageCertificateFiles] = useState([]);
    // additional document
    const [additionalDocument , setAdditionalDocument] = useState([]);
    const [additionalDocument_file , setAdditionalDocumentFiles] = useState([]);
    
    // 
    const [time, setTime] = useState("");
    const [button_disable, setButton] = useState(false);
    const [print_disable, setPrint] = useState(true);
    const [submit_disable, setSubmit] = useState(false);

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
                    
                    
                    let application = JSON.parse(text).filter(application=>application['id'].toString() === id);
                    console.log();
                    setApplicationId( application[0]['id'] );
                    setStatus( application[0]['isSent'] );
                    setSendTime( application[0]['sendAt'] );
                    setScores( application[0]['scores'] ); // revise
                    setForms({
                        "isSent":application[0]["isSent"],
                        "studyResearchPlan": {
                            "file": forms["studyResearchPlan"]["file"],
                            "path": application[0]["studyResearchPlan"]['path']
                        },
                        "affidavit": {
                            "file": forms["affidavit"]["file"],
                            "path": application[0]["affidavit"]["path"]
                        },
                        "professorConsentForm": {
                            "file": forms["professorConsentForm"]["file"],
                            "path": application[0]["professorConsentForm"]["path"]
                        }    
                    });
                    setBasicProfile( application[0]['applicationForm']['basicProfile'] ) ;
                    setBachelorProfile( application[0]['applicationForm']['bachelorProfile'] ) ;
                    setMasterProfile( application[0]['applicationForm']['masterProfile'] ) ;
                    setPhdProfile( application[0]['applicationForm']['phdProfile'] ) ;
                    
                    setTranscript({
                        "bachelorTranscript": {
                            "file":transcript["bachelorTranscript"]["file"],
                            "path": application[0]['transcript']['bachelorTranscript']['path']
                        },
                        "masterTranscript": {
                            "file":transcript["masterTranscript"]["file"],
                            "path": application[0]['transcript']['masterTranscript']['path']
                        },
                        "phdTranscript": {
                            "file":transcript["phdTranscript"]["file"],
                            "path": application[0]['transcript']['phdTranscript']['path']
                        }
                    });

                    setCertificate({
                        "bachelorRanking": {
                            "file": certificate["bachelorRanking"]["file"],
                            "path": application[0]['rankingCertificate']['bachelorRanking']['path']
                        },
                        "masterRanking": {
                            "file": certificate["masterRanking"]["file"],
                            "path": application[0]['rankingCertificate']["masterRanking"]['path']
                        },
                        "phdRanking": {
                            "file": certificate["phdRanking"]["file"],
                            "path": application[0]['rankingCertificate']['phdRanking']['path']
                        } 
                    });
                    setConferencePaper( application[0]['conferencePapers'] );
                    setResearchProjects( application[0]['researchProjects'] );
                    setCourseProjects( application[0]['courseProjects'] );
                    setAdditionalDocument( application[0]['additionalDocuments'] );
                    setLanguageCertificate( application[0]['languageCertificates'] );


                })
                return 'success'
            }
            else{
                alert("get all application data failed");
                return 'failed'
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("get all application error");
            console.error(error);
        });
    };
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
    },[user_session])
    
    const Seminar = React.memo((props) => {
        return(
            <div class="rounded-md border border-black my-1 mx-1 p-1" >
                <div class="flex flex-column justify-between p-1">
                    <h1 class="font-bold">研討會論文{props.number+1}</h1>
                    <button type="button" class="h-5 w-5 m-2"><ion-icon size="large" src={delete_sign}></ion-icon></button>
                </div>
                <h2 class="p-1" >研討會名稱</h2>
                <div class="p-1">
                    <input 
                    value={props.paper['conferenceName']}
                    type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >
                    </input>
                </div>
                <h2 class="p-1">論文名稱</h2>
                <div class="p-1">
                    <input 
                    value={props.paper['paperName']}
                    type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                </div>
                <h2 class="p-1">作者群</h2>
                <div class="p-1">
                    <input 
                    value={props.paper['authors']}
                    type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                </div>
                <div >
                    <h3 class="p-1" >論文上傳</h3>
                    <input 
                    // value={ props.paper['attachment'] }
                    type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                </div>
            </div>
        );
    });
    function TeachPlan(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>建教計畫研究報告{props.number+1}</summary>
                <h2>計畫名稱</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['projectName']}</input>
                <h2>計畫稱號</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['projectNumber']}</input>
                <h2>指導教授</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['advisor']}</input>
                <h2>研究報告名稱</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['researchName']}</input>
                <h2>作者</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['author']}</input>
                <div >
                    <h3>報告上傳</h3>
                    <input 
                    type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                </div>
            </details>
        );
    }
    function Course(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>修課課程報告{props.number+1}</summary>
                <h2>課程名稱</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['courseName']}</input>
                <h2>授課教師</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['courseTeacher']}</input>
                <h2>研究報告名稱</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['projectName']}</input>
                <h2>作者群</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['authors']}</input>
                <div >
                    <h3>報告上傳</h3>
                    <input 
                    type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                </div>
            </details>
        );
    }
    function Extra(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>其他有助審查資料{props.number+1}</summary>
                <h2>名稱</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.data['name']}</input>
                <div >
                    <h3>資料上傳</h3>
                    <input  
                    type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                </div>
            </details>
        );
    }
    function Proof(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>外語能力證明{props.number+1}</summary>
                <h2>名稱</h2>
                <input 
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.certificate['name']}</input>
                <div >
                    <h3>證明上傳</h3>
                    <input 
                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                </div>
            </details>
        );
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
                                <select 
                                    value={basicProfile['team']}
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="EM">電波</option>
                                    <option value="CSP">通信</option>
                                    <option value="DS">資網</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>年級</h2>
                                <select 
                                    value={basicProfile['grade']}
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="FIRSTYEARMASTER">碩一</option>
                                    <option value="SECONDYEARMASTER">碩二及以上</option>
                                    <option value="FIRSTYEARPHD">博士</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>指導教授</h2>
                                <input 
                                    value={ basicProfile['advisor'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>申請專案別</h2>
                                <select 
                                    value={ basicProfile['applicationType'] }
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>實驗室(選填)</h2>
                                <input  
                                    value={ basicProfile['lab'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>行動電話</h2>
                                <input 
                                    value={ basicProfile['phone'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>通訊地址</h2>
                                <input 
                                    value={ basicProfile['contactAddress'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
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
                                <select 
                                    value={ bachelorProfile['admission'] }
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="STAR">繁星推薦</option>
                                    <option value="APPLICATION">個人申請</option>
                                    <option value="EXAM">考試入學</option>
                                    <option value="OTHER">其他</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業學校</h2> 
                                <input 
                                    value={ bachelorProfile['graduateAtSchool'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業科系</h2>
                                <input 
                                    value={ bachelorProfile['graduateAtDepart'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            
                            <div class="p-1.5">
                                <h2>畢業成績</h2>
                                <input 
                                    value={ bachelorProfile['graduateScore'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級排名</h2>
                                <input  
                                    value={ bachelorProfile['rankOfYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級人數</h2>
                                <input 
                                    value={ bachelorProfile['numberOfYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
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
                                <select 
                                    value={ masterProfile['admission'] }
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="EXAM">甄試入學</option>
                                    <option value="APPLICATION">個人申請</option>
                                    <option value="PHD">逕讀博士</option>
                                    <option value="OTHER">其他</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>入學年度</h2>
                                <input  
                                    value={ masterProfile['admissionYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>入學學期</h2> 
                                <input  
                                    value={ masterProfile['admissionSemester'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業學校</h2>
                                <input  
                                    value={ masterProfile['graduateAtSchool'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業科系</h2>
                                <input  
                                    value={ masterProfile['graduateAtDepart'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            
                            <div class="p-1.5">
                                <h2>畢業成績</h2>
                                <input  
                                    value={ masterProfile['graduateScore'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級排名</h2>
                                <input  
                                    value={ masterProfile['rankOfYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級人數</h2>
                                <input 
                                    value={ masterProfile['numberOfYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
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
                                <select 
                                    value={ phdProfile['admission'] }
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="APPLICATION">甄試入學</option>
                                    <option value="EXAM">考試入學</option>
                                    <option value="MASTER">碩士逕博</option>
                                    <option value="BACHELOR">學士逕博</option>
                                    <option value="OTHER">其他</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>入學年度</h2>
                                <input  
                                    value={ phdProfile['admissionYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>入學學期</h2>
                                <input  
                                    value={ phdProfile['admissionSemester'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑤ 切結書<span class="text-red-500 text-base">（必填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>切結書上傳</h3>
                                <input  
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                            <h1>已儲存 : {forms["affidavit"]["path"]}</h1>
                            <h1>儲存時間 : {time}</h1>
                            </div>
                            
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑥ 指導教授同意書<span class="text-red-500 text-base">（必填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>指導教授同意書上傳</h3>
                                <input 
                                // value={ forms['professorConsentForm']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            <h1>已儲存 : {forms["professorConsentForm"]["path"]}</h1>
                            <h1>儲存時間 : {time}</h1>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center relative h-96">
                        <div class="w-full absolute top-1">
                            <h1 class="font-bold text-left">⑦ 就學研究計畫<span class="text-red-500 text-base">（必填）</span></h1>
                        </div>
                        <div class="w-10/12 m-2 grid bg-white md:grid-cols-2 absolute top-10 h-80">
                            <div class="p-1.5">
                                <h3>就學研究計畫上傳</h3>
                                <input  
                                // value={ forms['studyResearchPlan']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            <h1>已儲存 : {forms["studyResearchPlan"]["path"]}</h1>
                            <h1>儲存時間 : {time}</h1>
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
                                <input  
                                // value={ transcript['bachelorTranscript']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                                <h1>已儲存 : {transcript["bachelorTranscript"]["path"]}</h1>
                                <h1>儲存時間 : {time}</h1>
                            </div>
                            <div class="p-1.5">
                                <h3>碩士歷年成績單上傳</h3>
                                <input 
                                // value={ transcript['masterTranscript']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                                <h1>已儲存 : {transcript["masterTranscript"]["path"]}</h1>
                                <h1>儲存時間 : {time}</h1>
                            </div>
                            <div class="p-1.5">
                                <h3>博士歷年成績單上傳</h3>
                                <input 
                                // value={ transcript['phdTranscript']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                                <h1>已儲存 : {transcript["phdTranscript"]["path"]}</h1>
                                <h1>儲存時間 : {time}</h1>
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
                                <input 
                                // value={ certificate['bachelorRanking']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                                <h1>已儲存 : {certificate["bachelorRanking"]["path"]}</h1>
                                <h1>儲存時間 : {time}</h1>
                            </div>
                            <div class="p-1.5">
                                <h3>碩士名次證明書上傳</h3>
                                <input 
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                                <h1>已儲存 : {certificate["masterRanking"]["path"]}</h1>
                                <h1>儲存時間 : {time}</h1>
                            </div>
                            <div class="p-1.5">
                                <h3>博士名次證明書上傳</h3>
                                <input 
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                                <h1>已儲存 : {certificate["phdRanking"]["path"]}</h1>
                                <h1>儲存時間 : {time}</h1>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑩ 研討會論文<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            { conferencePapers.map((x,index ) => <Seminar paper={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" ><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑪ 建教計畫研究報告(含國科會)<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {researchProjects.map((x,index) => <TeachPlan project={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" ><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑫ 修課課程報告<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {courseProjects.map((x,index) => <Course project={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" ><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑬ 其他有助審查資料<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {additionalDocument.map((x,index) => <Extra data={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" ><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑭ 外語能力證明<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {languageCertificate.map((x,index) => <Proof certificate={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" ><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                
            </form>
            
            </div>
            <StudentFooter></StudentFooter>
        </div>
        
          
    );
}
export default CheckForm;