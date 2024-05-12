import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';


import { Link } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({ ID: '', password: '' });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => { // check login 
        // Login logic here
        if(user.ID == 'admin' && user.password == 'admin'){
          navigate('/check');
        }
        else{
          navigate('/user');
        }
        //
        alert("login");
    };
    return (
        <div class="container mx-auto flex flex-col w-full">
          
            <StudentHeader></StudentHeader>
            <h1 class="text-center text-3xl font-bold text-gray-800 mt-12" >登入使用<span class="text-red-500">（請先新增帳號）</span></h1>
            <div class="flex flex-col justify-center items-center">
              <input
                  type="text"
                  name="ID"
                  value={user.ID}
                  onChange={handleInputChange}
                  placeholder="Email"
                  class="block w-1/2 my-2 p-1 border border-gray-300 bg-white"
              />
              <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  placeholder="密碼"
                  class="block w-1/2 my-2 p-1 border border-gray-300 bg-white"
              />
            </div>
            <div class="flex flex-row justify-center items-center mt-4 my-5">
                <div class="flex flex-col justify-center items-center">
                  <Link to="/password"><p class="my-3">忘記密碼</p></Link>
                  <Link to="/register"><button class="rounded-full text-white py-2 w-72 mx-2 bg-primary ">新增帳號</button></Link>
                </div>
                <button onClick={login} class="rounded-full text-white py-2 w-72 mx-2 mt-12 bg-secondary">登入</button>
            </div>
            <div align="center">
              <span class="style18">申請報名登錄時間：113 年 1 月 11 日（四）至 1 月 25 日（四）下午5時止</span>
            </div>
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
  
export default Login;