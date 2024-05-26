import React, { useState, useContext,useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import './Register.css';
import Check from "../images/check.png";
import CheckIon from "../images/check-ion.svg";
import C from "../images/C.png";
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/global';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';

function Register() {
    const navigate = useNavigate();
    const { url } = useContext(GlobalContext);
    const [check_email, setCheckEmail] = useState(false);
    const [check_plen, setCheckPlen] = useState(false);
    const [check_pformat, setCheckPformat] = useState(false);
    const [check_studentNumber, setStudentNumber] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        studentNumber: '',
        password: '',
        passwordConfirm: ''
    });

    const register=async()=>{
        
        let request_body = {
            "name": user.name,
            "account": user.email,
            "password": user.password,
            "student": {
              "studentNumber": user.studentNumber,
            }
        }
        let registerHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        const requestOptions = {
            method: "POST",
            headers: registerHeader,
            redirect: "follow",
            body: JSON.stringify(request_body)
            }
        await fetch(url+'/auth/register',requestOptions)
        .then((response)=>{
            if(response.status === 200){
                alert("註冊成功，可以登入了");
                navigate('./login');
            }
            else{
                alert("註冊失敗，帳號已存在");
                window.location.reload();
            }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
            alert("register error");
            console.error(error);
        });
    };
    const registerCheck = () => {
        const email_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const password_format = /^[a-z0-9]+$/;
        // console.log('Logging in', user);
        if (user.password !== user.passwordConfirm) {
            alert("Passwords do not match.");
            window.location.reload();
        }
        else if(!email_format.test(user.email)){
            alert("信箱資料格式錯誤");
            window.location.reload();
        }
        else if( user.password.length < 8 || !password_format.test(user.password)){
            alert("密碼資料格式錯誤");
            window.location.reload();
        }
        else{
            register();
            
        }
        
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };
    useEffect(()=>{
        const email_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const password_format = /^[a-z0-9]+$/;
        if(!email_format.test(user.email)){
            setCheckEmail(false);
        }
        else{
            setCheckEmail(true);
        }
        if( user.password.length < 8){
            setCheckPlen(false);
        }
        else{
            setCheckPlen(true);
        }
        if(!password_format.test(user.password)){
            setCheckPformat(false);
        }
        else{
            setCheckPformat(true);
        }
    },[user]);

    return (
        <div class="container mx-auto flex flex-col w-full">
            <StudentHeader></StudentHeader>
            <div class="mt-14 text-center mt-4 mb-4 flex flex-row justify-center">
                <img class="relative inline h-28 mr-4" src={C} />
                <div class="mt-4 inline-block text-left align-middle font-bold">
                    <p class="text-4xl">報名端</p>
                    <p class="text-xl">Registration</p>
                </div>
            </div>
            <form class="w-1/2 mx-auto my-8 text-center items-center">
                <h1>註冊帳號</h1>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                    placeholder="姓名"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <input
                    type="password"
                    name="studentNumber"
                    value={user.studentNumber}
                    onChange={handleChange}
                    required
                    placeholder="學號/准考證號碼"
                    pattern="[a-z0-9]{8,}"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    placeholder="密碼"
                    pattern="[a-z0-9]{8,}"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <input
                    type="password"
                    name="passwordConfirm"
                    value={user.passwordConfirm}
                    onChange={handleChange}
                    required
                    placeholder="確認密碼"
                    pattern="[a-z0-9]{8,}"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
            </form>
            {user.password !== user.passwordConfirm && (
                <div>× 兩次輸入密碼不一致<br /></div>
            )}
            <div class="flex flex-col">
                <div class="flex flex-row ">
                    {
                        check_email?<ion-icon class="text-[#22c55e] text-xl"  src={CheckIon}></ion-icon>:
                        <ion-icon class="text-[#9ca3af] text-xl"  src={CheckIon}></ion-icon>
                    }
                     
                    信箱請使用合格電子郵件帳號<br />
                </div>
                <div class="flex flex-row ">
                    {
                        check_plen?<ion-icon class="text-[#22c55e] text-xl"  src={CheckIon}></ion-icon>:
                        <ion-icon class="text-[#9ca3af] text-xl"  src={CheckIon}></ion-icon>
                    }
                    密碼至少設定 8 個字元<br />
                </div>
                <div class="flex flex-row ">
                    {
                        check_pformat?<ion-icon class="text-[#22c55e] text-xl"  src={CheckIon}></ion-icon>:
                        <ion-icon class="text-[#9ca3af] text-xl"  src={CheckIon}></ion-icon>
                    } 
                    密碼由小寫英文字母或數字等字元組成<br />
                </div>
            </div>
            <p class="items-center text-center">
                <button type="submit" class="bg-primary text-white rounded-full w-60 py-1" onClick={registerCheck}>新增帳號</button>
            </p>
            <div align="left">
                    <p class="style1"><strong>【個資宣告】 </strong></p>
                    <ul>
                        <li class="style1">臺灣大學電信工程學研究所(以下簡稱本所)為支持個人資料保護，維護個人隱私權，謹以下列聲明，向您說明蒐集個人資料之目的、類別、利用範圍及方式等事項；如果您對於本網站的隱私權聲明、以下相關告知事項、或與個人資料保護有關之相關事項有任何疑問，歡迎逕與本所聯絡，謝謝。 </li>
                        <li class="style1">個人資料蒐集之目的與類別<br/> 本所為辦理招生作業審查，可能蒐集您的姓名、連絡方式、服務單位、職稱、學歷、成績、論文研究計畫及其他得以直接或間接識別使用者身分之個人資料…等相關資料，作為招生作業審查評分、以及通知等管理使用。 </li>
                        <li class="style1">個人資料的利用<br/> 本所蒐集的足以識別使用者身分的個人資料及其他相關資料，僅供本所教師及工作人員辦理招生作業管理使用，除非事先說明、或為完成提供服務之必要、或依照相關法令規定或有權主管機關之命令或要求，否則不會將足以識別使用者身分的個人資料提供給第三人（包括境內及境外）、或移作蒐集目的以外之使用。主管機關之命令或要求，否則不會將足以識別使用者身分的個人資料提供給第三人（包括境內及境外）、或移作蒐集目的以外之使用。 <br/>
                            <br/>
                        </li>
                    </ul>
            </div>
            <StudentFooter></StudentFooter>
        </div>
    );
}

export default Register;