import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
// import { SampleContext } from '../contexts/SampleContext';

import { Link } from 'react-router-dom';

function Login() {
    // const [email, setEmail] = useState('');
    const [user, setUser] = useState({ ID: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        // Login logic here
        console.log('Logging in', user);
        alert("login");
    };
    // const [password, setPassword] = useState('');
    // const { userid, setUserid } = useContext(SampleContext);
    // const navigate = useNavigate();
  
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   try {
    //     const response = await axios.post('https://ctfmidterm-21d491f65c05.herokuapp.com/register_server/api/login/', {
    //       email,
    //       password
    //     });
    //     console.log(response.data); // 處理登入成功
    //     if(response.data.status === "invalid"){
    //       alert("login failed, Wrong email or password");
    //     }
    //     else{
    //       setUserid(response.data.user_id.user_id);
    //       navigate('/chatroom');
    //     }
    //   } catch (error) {
    //     console.error(error); // 處理錯誤情況
    //   }
    // };
    return (
        <>
          <div className="container">
            <h1 className="title">登入使用<span className="highlight">（請先新增帳號）</span></h1>
            <input
                type="text"
                name="ID"
                value={user.ID}
                onChange={handleInputChange}
                placeholder="Email"
                className="input"
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="密碼"
                className="input"
            />
            <div className="button-container">
                <Link to="/register"><button className="button secondary">新增帳號</button></Link>
                <Link to="/user"><button onClick={login} className="button primary">登入</button></Link>
            </div>
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
        </>
        
          
);
    {/* return (
      <div className='login-board'>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" className='login-button'>Login</button>
          <button type="submit" className='login-button' onClick={()=>{navigate('/');}}>home page</button>
        </form>
      </div>
    ); */}
  }
  
  export default Login;