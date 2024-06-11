import React, { useState, useContext, useEffect } from 'react';
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
    // gobal
    const { url } = useContext(GlobalContext);
    const { user_session, userId, studentNumber } = useSession();
    
    // timestamp
    const year = new Date().getFullYear();
    const month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    const day = ('0' + new Date().getDate()).slice(-2);
    const hour = ('0' + new Date().getHours()).slice(-2);
    const day_string = "上午";
    const minute = ('0' + new Date().getMinutes()).slice(-2);
    const second = ('0' + new Date().getSeconds()).slice(-2);
    const timestamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

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
        "rankOfYear": 0,
        "numberOfYear": 0
    });
    
    // master profile 
    const [masterProfile, setMasterProfile] = useState({
        "admission": "",
        "admissionYear": "",
        "admissionSemester": "",
        "graduateAtSchool": "",
        "graduateAtDepart": "",
        "graduateScore": "",
        "rankOfYear": 0,
        "numberOfYear": 0
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
    const [time, setTime] = useState(timestamp);
    const [button_disable, setButton] = useState(false);
    const [print_disable, setPrint] = useState(true);
    const [submit_disable, setSubmit] = useState(false);

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
        let id_string = userId.toString();
        await fetch(url+'/application/'+id_string,requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    //console.log(JSON.parse(text)['name']);  // important
                    // set the data
                    console.log( JSON.parse(text)['id'] );
                    console.log( JSON.parse(text)['applicationForm']['basicProfile'] );

                    setApplicationId( JSON.parse(text)['id'] );
                    setStatus( JSON.parse(text)['isSent'] );
                    setSendTime( JSON.parse(text)['sendAt'] );
                    setScores( JSON.parse(text)['scores'] ); // revise
                    setForms({
                        "studyResearchPlan": {
                            "file": forms["studyResearchPlan"]["file"],
                            "path": JSON.parse(text)["studyResearchPlan"]["path"]
                        },
                        "affidavit": {
                            "file": forms["affidavit"]["file"],
                            "path": JSON.parse(text)["affidavit"]["path"]
                        },
                        "professorConsentForm": {
                            "file": forms["professorConsentForm"]["file"],
                            "path": JSON.parse(text)["professorConsentForm"]["path"]
                        }    
                    });

                    setBasicProfile( JSON.parse(text)['applicationForm']['basicProfile'] ) ;
                    setBachelorProfile( JSON.parse(text)['applicationForm']['bachelorProfile'] ) ;
                    setMasterProfile( JSON.parse(text)['applicationForm']['masterProfile'] ) ;
                    setPhdProfile( JSON.parse(text)['applicationForm']['phdProfile'] ) ;
                    
                    setTranscript({
                        "bachelorTranscript": {
                            "file":transcript["bachelorTranscript"]["file"],
                            "path": JSON.parse(text)['transcript']['bachelorTranscript']['path']
                        },
                        "masterTranscript": {
                            "file":transcript["masterTranscript"]["file"],
                            "path": JSON.parse(text)['transcript']['masterTranscript']['path']
                        },
                        "phdTranscript": {
                            "file":transcript["phdTranscript"]["file"],
                            "path": JSON.parse(text)['transcript']['phdTranscript']['path']
                        }
                    });

                    setCertificate({
                        "bachelorRanking": {
                            "file": certificate["bachelorRanking"]["file"],
                            "path": JSON.parse(text)['rankingCertificate']['bachelorRanking']['path']
                        },
                        "masterRanking": {
                            "file": certificate["masterRanking"]["file"],
                            "path": JSON.parse(text)['rankingCertificate']["masterRanking"]['path']
                        },
                        "phdRanking": {
                            "file": certificate["phdRanking"]["file"],
                            "path": JSON.parse(text)['rankingCertificate']['phdRanking']['path']
                        } 
                    });
                    setConferencePaper( JSON.parse(text)['conferencePapers'] );
                    setResearchProjects( JSON.parse(text)['researchProjects'] );
                    setCourseProjects( JSON.parse(text)['courseProjects'] );
                    setAdditionalDocument( JSON.parse(text)['additionalDocuments'] );
                    setLanguageCertificate( JSON.parse(text)['languageCertificates'] );



                })
                alert("fetch stored application data success");
                return 'success'
            }
            else if(response.status == "500"){
                // NO build yet
                buildNewData();
                return 'unbuild'
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

    const buildNewData = async() => {
        let postHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            // redirect: "follow", 
        }
        await fetch(url+'/application/',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    alert("Build application data success");
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("post application error");
            console.error(error);
        });
    };

    const saveBasicProfile = async() => {
        let request_body = {
            "team": basicProfile['team'],
            "grade": basicProfile['grade'],
            "advisor": basicProfile['advisor'],
            "applicationType": basicProfile['applicationType'],
            "lab": basicProfile['lab'],
            "phone": basicProfile['phone'],
            "contactAddress": basicProfile['contactAddress']
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
        await fetch(url+'/application/'+applicationId.toString()+'/applicationForm/basic-profile',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch basic profile success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch basic profile error");
            console.error(error);
        });
    }; 

    const saveBachelorProfile = async() => {
        let request_body = {
            "admission": bachelorProfile['admission'],
            "graduateAtSchool": bachelorProfile['graduateAtSchool'],
            "graduateAtDepart": bachelorProfile['graduateAtDepart'],
            "graduateScore": bachelorProfile['graduateScore'],
            "rankOfYear": bachelorProfile['rankOfYear'],
            "numberOfYear": bachelorProfile['numberOfYear']
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
        await fetch(url+'/application/'+applicationId.toString()+'/applicationForm/bachelor-profile',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch Bachelor profile success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch Bachelor profile error");
            console.error(error);
        });
    }; 

    const saveMasterProfile = async() => {
        let request_body = {
            "admission": masterProfile['admission'],
            "admissionYear": masterProfile['admissionYear'],
            "admissionSemester": masterProfile['admissionSemester'],
            "graduateAtSchool": masterProfile['graduateAtSchool'],
            "graduateAtDepart": masterProfile['graduateAtDepart'],
            "graduateScore": masterProfile['graduateScore'],
            "rankOfYear": masterProfile['rankOfYear'],
            "numberOfYear": masterProfile['numberOfYear']
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
        await fetch(url+'/application/'+applicationId.toString()+'/applicationForm/master-profile',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch master profile success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch master profile error");
            console.error(error);
        });
    };

    const savePhdProfile = async() => {
        let request_body = {
            "admission": phdProfile['admission'],
            "admissionYear": phdProfile['admissionYear'],
            "admissionSemester": phdProfile['admissionSemester']
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
        await fetch(url+'/application/'+applicationId.toString()+'/applicationForm/phd-profile',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch phd profile success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch phd profile error");
            console.error(error);
        });
    }; 

    const upload_file = async(file) => {
        if(file === undefined){
            alert('no file');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        let postHeader = {
            // "Content-Type": "multipart/form-data",
            // "Accept": "multipart/form-data",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            redirect: "follow",
            body: formData
        }
        await fetch(url+'/file?studentNumber='+studentNumber+'&type=1',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    return JSON.parse(text)['filename'];
                })
            }
        })
        .then((result)=> {return result;})
        .catch((error)=>{
            alert("patch phd profile error");
            console.error(error);
        });

    }; 
    const saveForms = async() => {

        upload_file(forms['studyResearchPlan']['file']).then((response) => { 
            setForms( prev => ({ ...prev, ['studyResearchPlan'] : {'file':forms['studyResearchPlan']['file'] ,'path': response }}) )
        }); // revise
        upload_file(forms['affidavit']['file']).then((response) => {
            setForms( prev => ({ ...prev, ['affidavit']:{'file':forms['affidavit']['file'] ,'path': response }}) )
        }); // revise
        upload_file(forms['professorConsentForm']['file']).then((response) => {
            setForms( prev => ({ ...prev, ['professorConsentForm']:{'file':forms['professorConsentForm']['file'] ,'path': response }}) )
        }); // revise
       

        let request_body = forms
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
        await fetch(url+'/application/'+userId,requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch error");
            console.error(error);
        });
    };

    const saveTranscript = async() => {

        upload_file(transcript['bachelorTranscript']['file']).then((response) => {setForms( prev => ({ ...prev, ['bachelorTranscript']:{'file':transcript['bachelorTranscript']['file'] ,'path': response }}) )}); // revise
        upload_file(transcript['masterTranscript']['file']).then((response) => {setForms( prev => ({ ...prev, ['masterTranscript']:{'file':transcript['masterTranscript']['file'] ,'path': response }}) )}); // revise
        upload_file(transcript['phdTranscript']['file']).then((response) => {setForms( prev => ({ ...prev, ['phdTranscript']:{'file':transcript['phdTranscript']['file'] ,'path': response }}) )}); // revise

        let request_body = transcript;
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
        await fetch(url+'/application/'+applicationId.toString()+'/transcript',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch transcript success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch transcript error");
            console.error(error);
        });
    };

    const saveRankCertificate = async() => {

        upload_file(certificate['bachelorRanking']['file']).then((response) => {setForms( prev => ({ ...prev, ['bachelorRanking']:{'file':certificate['bachelorRanking']['file'] ,'path': response }}) )}); // revise
        upload_file(certificate['masterRanking']['file']).then((response) => {setForms( prev => ({ ...prev, ['masterRanking']:{'file':certificate['masterRanking']['file'] ,'path': response }}) )}); // revise
        upload_file(certificate['phdRanking']['file']).then((response) => {setForms( prev => ({ ...prev, ['phdRanking']:{'file':certificate['phdRanking']['file'] ,'path': response }}) )}); // revise

        let request_body = transcript;
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
        await fetch(url+'/application/'+applicationId.toString()+'/transcript',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch rank certificate success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch rank certificate error");
            console.error(error);
        });
    };

    // conference paper // ################################################

    const addConferencePaper = async() => {

        let patchHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: patchHeader,
            redirect: "follow",
        }
        await fetch(url+'/application/'+applicationId.toString()+'/conference-paper',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        getStoredData(); // check for the conference Id
                        alert('post conference-paper success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("post conference-paper error");
            console.error(error);
        });
    }; 


    const saveConferencePaper = async(index) => {
        
        upload_file( conferencePapers_file[index] ).then((response) => {
            const newData = [...conferencePapers];
            newData[index]['attachment'] = response;
            setConferencePaper(newData);
        }); // revise
        let request_body = {
            "conferenceName": conferencePapers[index]['conferenceName'],
            "paperName": conferencePapers[index]['paperName'],
            "authors": conferencePapers[index]['authors'],
            "attachment": {
                "path": conferencePapers[index]['attachment']
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
        await fetch(url+'/application/'+applicationId.toString()+'/conference-paper/'+conferencePapers[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch conference paper success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch conference paper error");
            console.error(error);
        });
    };

    const deleteConferencePaper = async(index) => {
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
        await fetch(url+'/application/'+applicationId.toString()+'/conference-paper/'+conferencePapers[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('delete conference paper success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("delete conference paper error");
            console.error(error);
        });
    };

    // research project//
    const addResearchProject = async() => {

        let postHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            redirect: "follow",
        }
        await fetch(url+'/application/'+applicationId.toString()+'/research-project',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        getStoredData(); // check for the research-project Id
                        alert('post research-project success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("post research-project error");
            console.error(error);
        });
    }; 

    const saveResearchProject = async(index) => {
        
        upload_file( researchProjects_file[index] ).then((response) => {
            const newData = [...researchProjects];
            newData[index]["attachment"] = response;
            setResearchProjects(newData);  
        }); // revise
        let request_body = {
            "projectName": researchProjects[index]['projectName'],
            "projectNumber": researchProjects[index]['projectNumber'],
            "advisor": researchProjects[index]['advisor'],
            "researchName": researchProjects[index]['researchName'],
            "author": researchProjects[index]['author'],
            "attachment": {
              "path": researchProjects[index]['attachment']
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
        await fetch(url+'/application/'+applicationId.toString()+'/research-project/'+ researchProjects[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch research project success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch research project error");
            console.error(error);
        });
    };

    const deleteReseachProject = async(index) => {
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
        await fetch(url+'/application/'+applicationId.toString()+'/research-project/'+researchProjects[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('delete research project success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("delete research project error");
            console.error(error);
        });
    };

    // course project //
    const addCourseProject = async() => {

        let postHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            redirect: "follow",
        }
        await fetch(url+'/application/'+applicationId.toString()+'/course-project',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        getStoredData(); // check for the research-project Id
                        alert('post course-project success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("post course-project error");
            console.error(error);
        });
    }; 

    const saveCourseProject = async(index) => {
        
        upload_file( courseProjects_file[index] ).then((response) => {
            const newData = [...courseProjects];
            newData[index]['attachment'] = response;
            setCourseProjects(newData);
        }); // revise
        let request_body = {
            "courseName": courseProjects[index]['courseName'],
            "courseTeacher": courseProjects[index]['courseTeacher'],
            "projectName": courseProjects[index]['projectName'],
            "authors": courseProjects[index]['authors'],
            "attachment": {
                "path": courseProjects[index]['attachment']
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
        await fetch(url+'/application/'+applicationId.toString()+'/conference-paper/'+ researchProjects[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch conference paper success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch conference paper error");
            console.error(error);
        });
    };

    const deleteCourseProject = async(index) => {
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
        await fetch(url+'/application/'+applicationId.toString()+'/research-project/'+researchProjects[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('delete research project success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("delete research project error");
            console.error(error);
        });
    };

    // additional document //
    const addAdditionalDocument = async() => {

        let postHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            redirect: "follow",
        }
        await fetch(url+'/application/'+applicationId.toString()+'/additional-document',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        getStoredData(); // check for the research-project Id
                        alert('post additional-document success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("post additional-document error");
            console.error(error);
        });
    }; 

    const saveAdditionalDocument = async(index) => {
        
        upload_file( additionalDocument_file[index] ).then((response) => {
            const newData = [...additionalDocument];
            newData[index]['attachment'] = response;
            setAdditionalDocument(newData);
        }); // revise
        let request_body = {
            "name": additionalDocument[index]['name'],
            "attachment": {
                "path": additionalDocument[index]['attachment']
            }
        }
        let patchHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST", // wrong
            headers: patchHeader,
            redirect: "follow",
            body: JSON.stringify(request_body)
        }
        await fetch(url+'/application/'+applicationId.toString()+'/additional-document/'+ additionalDocument[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch additional-document success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch additional-document error");
            console.error(error);
        });
    };

    const deleteAdditionalDocument = async(index) => {
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
        await fetch(url+'/application/'+applicationId.toString()+'/additional-document/'+additionalDocument[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('delete additional-document success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("delete additional-document error");
            console.error(error);
        });
    };

    //language certificate//
    const addLanguageCertificate = async() => {

        let postHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST",
            headers: postHeader,
            redirect: "follow",
        }
        await fetch(url+'/application/'+applicationId.toString()+'/language-certificate',requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        getStoredData(); // check for the research-project Id
                        alert('post language-certificate success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("post language-certificate error");
            console.error(error);
        });
    }; 

    const saveLanguageCertificate = async(index) => {
        
        upload_file( languageCertificate_file[index] ).then((response) => {
            const newData = [...languageCertificate];
            newData[index]['attachment'] = response;
            setLanguageCertificate(newData);
        }); // revise
        let request_body = {
            "name": languageCertificate[index]['name'],
            "attachment": {
                "path": languageCertificate[index]['attachment']
            }
        }
        let patchHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user_session}`,
        }
        const requestOptions = {
            method: "POST", // wrong
            headers: patchHeader,
            redirect: "follow",
            body: JSON.stringify(request_body)
        }
        await fetch(url+'/application/'+applicationId.toString()+'/language-certificate/'+ languageCertificate[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('patch language-certificate success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("patch language-certificate error");
            console.error(error);
        });
    };

    const deleteLanguageCertificate = async(index) => {
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
        await fetch(url+'/application/'+applicationId.toString()+'/language-certificate/'+languageCertificate[index]['id'],requestOptions)
        .then((response)=>{
            if(response.status == "200"){
                response.text().then(text => {
                    if( JSON.parse(text)['success'] ){
                        alert('delete language-certificate success');
                    }
                })
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("delete language-certificate error");
            console.error(error);
        });
    };
    const saveAll = () => {
        saveBasicProfile();
        saveBachelorProfile();
        saveMasterProfile();
        savePhdProfile();
        saveForms();
        saveTranscript();
        saveRankCertificate();
        conferencePapers.map( (x,index) => { saveConferencePaper(index); } );
        researchProjects.map( (x,index) => { saveResearchProject(index); } );
        courseProjects.map( (x,index) => { saveCourseProject(index); } );
        languageCertificate.map( (x,index) => { saveLanguageCertificate(index); } );
        additionalDocument.map( (x,index) => { saveAdditionalDocument(index); } );
    }
    useEffect(()=>{
        getStoredData();
    },[]);


    function getBase64(file) { // for upload file 
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
        };
        return reader.result;
    }
    
    
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
                <summary>研討會論文{props.number+1}</summary>
                <h2>研討會名稱</h2>
                <input onChange={(e) => {
                    const newData = [...conferencePapers];
                    newData[props.number]['conferenceName'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setConferencePaper(newData);
                }}
                value={props.paper['conferenceName']}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>論文名稱</h2>
                <input onChange={(e) => {
                    const newData = [...conferencePapers];
                    newData[props.number]['paperName'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setConferencePaper(newData);
                }}
                value={props.paper['paperName']}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <h2>作者群</h2>
                <input onChange={(e) => {
                    const newData = [...conferencePapers];
                    newData[props.number]['authors'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setConferencePaper(newData);
                }}
                value={props.paper['authors']}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   ></input>
                <div >
                    <h3>論文上傳</h3>
                    <input onChange={(e) => {
                        const newData = [...conferencePapers_file];
                        newData[props.number] = e.target.files[0];
                        // getBase64(e.target.files[0]);
                        setConferencePaperFiles(newData);
                    }}
                    value={ props.paper['attachment'] }
                    type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                </div>
            </details>
        );
    }
    function TeachPlan(props){
        return(
            <details class="rounded-md border border-black my-1 mx-1 p-1">
                <summary>建教計畫研究報告{props.number+1}</summary>
                <h2>計畫名稱</h2>
                <input onChange={(e) => {
                    const newData = [...researchProjects];
                    newData[props.number]['projectName'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setResearchProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['projectName']}</input>
                <h2>計畫稱號</h2>
                <input onChange={(e) => {
                    const newData = [...researchProjects];
                    newData[props.number]['projectNumber'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setResearchProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['projectNumber']}</input>
                <h2>指導教授</h2>
                <input onChange={(e) => {
                    const newData = [...researchProjects];
                    newData[props.number]['advisor'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setResearchProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['advisor']}</input>
                <h2>研究報告名稱</h2>
                <input onChange={(e) => {
                    const newData = [...researchProjects];
                    newData[props.number]['researchName'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setResearchProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['researchName']}</input>
                <h2>作者</h2>
                <input onChange={(e) => {
                    const newData = [...researchProjects];
                    newData[props.number]['author'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setResearchProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['author']}</input>
                <div >
                    <h3>報告上傳</h3>
                    <input onChange={(e) => {
                        const newData = [...researchProjects_file];
                        newData[props.number] = e.target.files[0];
                        // getBase64(e.target.files[0]);
                        setResearchProjectsFiles(newData);
                    }}
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
                <input onChange={(e) => {
                    const newData = [...courseProjects];
                    newData[props.number]['courseName'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setCourseProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['courseName']}</input>
                <h2>授課教師</h2>
                <input onChange={(e) => {
                    const newData = [...courseProjects];
                    newData[props.number]['courseTeacher'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setCourseProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['courseTeacher']}</input>
                <h2>研究報告名稱</h2>
                <input onChange={(e) => {
                    const newData = [...courseProjects];
                    newData[props.number]['projectName'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setCourseProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['projectName']}</input>
                <h2>作者群</h2>
                <input onChange={(e) => {
                    const newData = [...courseProjects];
                    newData[props.number]['authors'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setCourseProjects(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.project['authors']}</input>
                <div >
                    <h3>報告上傳</h3>
                    <input onChange={(e) => {
                        const newData = [...courseProjects_file];
                        newData[props.number] = e.target.files[0];
                        // getBase64(e.target.files[0]);
                        setCourseProjectsFiles(newData);
                    }}
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
                <input onChange={(e) => {
                    const newData = [...additionalDocument];
                    newData[props.number]['name'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setAdditionalDocument(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.data['name']}</input>
                <div >
                    <h3>資料上傳</h3>
                    <input  onChange={(e) => {
                        const newData = [...additionalDocument_file];
                        newData[props.number] = e.target.files[0];
                        // getBase64(e.target.files[0]);
                        setAdditionalDocumentFiles(newData);
                    }}
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
                <input onChange={(e) => {
                    const newData = [...languageCertificate];
                    newData[props.number]['name'] = e.target.value;
                    // getBase64(e.target.files[0]);
                    setLanguageCertificate(newData);
                }}
                type='text' class=" outline-none p-1.25 text-base border-b-2 w-full"   >{props.certificate['name']}</input>
                <div >
                    <h3>證明上傳</h3>
                    <input onChange={(e) => {
                        const newData = [...languageCertificate_file];
                        newData[props.number] = e.target.files[0];
                        // getBase64(e.target.files[0]);
                        setLanguageCertificateFiles(newData);
                    }}
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
                                <select onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['team'] = e.target.value;
                                    setBasicProfile(newData);
                                    }}  
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
                                <select onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['grade'] = e.target.value;
                                    setBasicProfile(newData); 
                                    }} 
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
                                <input onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['advisor'] = e.target.value;
                                    setBasicProfile(newData);
                                    }} 
                                    value={ basicProfile['advisor'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>申請專案別</h2>
                                <select onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['applicationType'] = e.target.value;
                                    setBasicProfile(newData);
                                    }} 
                                    value={ basicProfile['applicationType'] }
                                    class="border-b-2 w-full p-1.5">
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>
                            <div class="p-1.5">
                                <h2>實驗室(選填)</h2>
                                <input  onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['lab'] = e.target.value;
                                    setBasicProfile(newData);
                                    }} 
                                    value={ basicProfile['lab'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>行動電話</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['phone'] = e.target.value;
                                    setBasicProfile(newData);
                                    }} 
                                    value={ basicProfile['phone'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>通訊地址</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...basicProfile}; 
                                    newData['contactAddress'] = e.target.value;
                                    setBasicProfile(newData);
                                    }} 
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
                                <select onChange={(e)=>{ 
                                    const newData = {...bachelorProfile}; 
                                    newData['admission'] = e.target.value;
                                    setBachelorProfile(newData);
                                    }} 
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
                                <input onChange={(e)=>{ 
                                    const newData = {...bachelorProfile}; 
                                    newData['graduateAtSchool'] = e.target.value;
                                    setBachelorProfile(newData);
                                    }} 
                                    value={ bachelorProfile['graduateAtSchool'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業科系</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...bachelorProfile}; 
                                    newData['graduateAtDepart'] = e.target.value;
                                    setBachelorProfile(newData);
                                    }} 
                                    value={ bachelorProfile['graduateAtDepart'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            
                            <div class="p-1.5">
                                <h2>畢業成績</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...bachelorProfile}; 
                                    newData['graduateScore'] = e.target.value;
                                    setBachelorProfile(newData);
                                    }} 
                                    value={ bachelorProfile['graduateScore'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級排名</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...bachelorProfile}; 
                                    newData['rankOfYear'] = e.target.value;
                                    setBachelorProfile(newData);
                                    }} 
                                    value={ bachelorProfile['rankOfYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級人數</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...bachelorProfile}; 
                                    newData['numberOfYear'] = e.target.value;
                                    setBachelorProfile(newData);
                                    }} 
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
                                <select onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['admission'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
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
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['admissionYear'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
                                    value={ masterProfile['admissionYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>入學學期</h2> 
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['admissionSemester'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
                                    value={ masterProfile['admissionSemester'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業學校</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['graduateAtSchool'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
                                    value={ masterProfile['graduateAtSchool'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>畢業科系</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['graduateAtDepart'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
                                    value={ masterProfile['graduateAtDepart'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            
                            <div class="p-1.5">
                                <h2>畢業成績</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['graduateScore'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
                                    value={ masterProfile['graduateScore'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級排名</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['rankOfYear'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
                                    value={ masterProfile['rankOfYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>全年級人數</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...masterProfile}; 
                                    newData['numberOfYear'] = e.target.value;
                                    setMasterProfile(newData);
                                    }} 
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
                                <select onChange={(e)=>{ 
                                    const newData = {...phdProfile}; 
                                    newData['admission'] = e.target.value;
                                    setPhdProfile(newData);
                                    }} 
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
                                <input onChange={(e)=>{ 
                                    const newData = {...phdProfile}; 
                                    newData['admissionYear'] = e.target.value;
                                    setPhdProfile(newData);
                                    }} 
                                    value={ phdProfile['admissionYear'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
                            </div>
                            <div class="p-1.5">
                                <h2>入學學期</h2>
                                <input onChange={(e)=>{ 
                                    const newData = {...phdProfile}; 
                                    newData['admissionSemester'] = e.target.value;
                                    setPhdProfile(newData);
                                    }} 
                                    value={ phdProfile['admissionSemester'] }
                                    type='text' class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
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
                                <input onChange={(e) => {
                                    const newData = {...forms};
                                    newData.affidavit = { ...newData.affidavit,['path']:getBase64(e.target.files[0]), ['file']: e.target.files[0]};
                                    setForms(newData);
                                }} 
                                value={ forms['affidavit']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
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
                                <input onChange={(e) => {
                                    const newData = {...forms};
                                    newData.professorConsentForm = { ...newData.professorConsentForm, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setForms(newData);
                                }} 
                                value={ forms['professorConsentForm']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
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
                                <input onChange={(e) => {
                                    const newData = {...forms};
                                    newData.studyResearchPlan = { ...newData.studyResearchPlan, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setForms(newData);
                                }} 
                                value={ forms['studyResearchPlan']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full"></input>
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
                                <input onChange={(e) => {
                                    const newData = {...transcript};
                                    newData.bachelorTranscript = { ...newData.bachelorTranscript, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setTranscript(newData);
                                }} 
                                value={ transcript['bachelorTranscript']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                            </div>
                            <div class="p-1.5">
                                <h3>碩士歷年成績單上傳</h3>
                                <input onChange={(e) => {
                                    const newData = {...transcript};
                                    newData.masterTranscript = { ...newData.masterTranscript, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setTranscript(newData);
                                }}
                                value={ transcript['masterTranscript']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                            </div>
                            <div class="p-1.5">
                                <h3>博士歷年成績單上傳</h3>
                                <input onChange={(e) => {
                                    const newData = {...transcript};
                                    newData.phdTranscript = { ...newData.phdTranscript, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setTranscript(newData);
                                }}
                                value={ transcript['phdTranscript']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
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
                                <input onChange={(e) => {
                                    const newData = {...certificate};
                                    newData.bachelorRanking = { ...newData.bachelorRanking, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setCertificate(newData);
                                }}
                                value={ certificate['bachelorRanking']['path'] }
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                            </div>
                            <div class="p-1.5">
                                <h3>碩士名次證明書上傳</h3>
                                <input onChange={(e) => {
                                    const newData = {...certificate};
                                    newData.masterRanking = { ...newData.masterRanking, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setCertificate(newData);
                                }}
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                            </div>
                            <div class="p-1.5">
                                <h3>博士名次證明書上傳</h3>
                                <input onChange={(e) => {
                                    const newData = {...certificate};
                                    newData.phdRanking = { ...newData.phdRanking, ['file']: e.target.files[0]};
                                    // getBase64(e.target.files[0]);
                                    setCertificate(newData);
                                }}
                                type="file" class=" outline-none p-1.5 text-base border-b-2 w-full" ></input>
                            </div>
                            
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑩ 研討會論文<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            { conferencePapers.map((x,index ) => <Seminar paper={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" onClick={ addConferencePaper }><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑪ 建教計畫研究報告(含國科會)<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {researchProjects.map((x,index) => <TeachPlan project={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" onClick={addResearchProject}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑫ 修課課程報告<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {courseProjects.map((x,index) => <Course project={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" onClick={addCourseProject}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑬ 其他有助審查資料<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {additionalDocument.map((x,index) => <Extra data={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" onClick={addAdditionalDocument}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                    <div class=" bg-gray-300 flex flex-col justify-center items-center">
                        <div class="w-full ">
                            <h1 class="font-bold text-left">⑭ 外語能力證明<span class="text-red-500 text-base">（無則免填）</span></h1>
                        </div>
                        <div class="m-2 md:grid-cols-1 w-10/12 grid bg-white ">
                            {languageCertificate.map((x,index) => <Proof certificate={x} number={index}/>)} 
                            <button type="button" class="h-10 w-10" onClick={addLanguageCertificate}><ion-icon size="large" src={add_sign}></ion-icon></button>        
                        </div>
                    </div>
                
            </form>
            <div class="text-center flex flex-row items-center justify-around mt-4 ">
                <div class="mx-auto mb-5">
                    {
                    button_disable?
                    <button  class="rounded-full bg-slate-300 text-white py-2 px-16 m-1" disabled={button_disable}>手動儲存</button>
                    :<button  class="rounded-full bg-[rgb(29,71,110)] text-white py-2 px-16 m-1" disabled={button_disable} onClick={saveAll}>手動儲存</button>
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