import React, { useState, useContext } from 'react';
import Check from "../images/check.png";
import { Link,useNavigate } from 'react-router-dom';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';
import { GlobalContext } from '../context/global';

function Password() {
    const navigate = useNavigate();
    // const[check_url,setUrl] = useState('/login');
    const { url} = useContext(GlobalContext);
    const [user, setUser] = useState({
        email: '',
        token: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    
    const get_token = async() => { // check login 
        let request_body = {
          "account":user.email
        }
        // post login infor
        let getTokenHeader = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // "Authorization": `Bearer ${token}`,
        }
        const requestOptions = {
          method: "POST",
          headers: getTokenHeader,
          redirect: "follow",
          body: JSON.stringify(request_body)
        }
        if(user.email !== "" ){
          await fetch(url+'/auth/reset-password-token',requestOptions)
          .then((response)=>{
            if(response.status == "200"){
              response.text().then(text => {
                // console.log(JSON.parse(text)['token']);  // important
              })
              alert("user get token success");
            }
            else{
              alert("user get token failed");
            }
          })
          .then((result)=>console.log(result))
          .catch((error)=>{
            alert("get token error");
            console.error(error);
          });
        }
        else {
          alert("請輸入信箱");
        }
    };
    const reset_password = async() => { 
      let request_body = {
        "jwt_token":user.token,
        "password":user.password
      }
      // post login infor
      let resetHeader = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Authorization": `Bearer ${token}`,
      }
      const requestOptions = {
        method: "POST",
        headers: resetHeader,
        redirect: "follow",
        body: JSON.stringify(request_body)
      }
      
      await fetch(url+'/auth/reset-password',requestOptions)
        .then((response)=>{
          if(response.status == "200"){
            response.text().then(text => {
              if(JSON.parse(text)['success'] === true){
                alert("user reset password success");
              }
            })
          }
          else{
            alert("user reset password failed");
            window.location.reload();
          }
        })
        .then((result)=>console.log(result))
        .catch((error)=>{
          alert("get token error");
          console.error(error);
        });
    };
    const resetCheck = () => {
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
      else if(user.token === ""){
          alert("未輸入驗證碼");
          window.location.reload();
      }
      else{
          reset_password();
      }
      
    };
    
    return (
        <div class="container mx-auto flex flex-col w-full">
            <StudentHeader></StudentHeader>
            
            <form class="w-1/2 mx-auto my-8 text-center items-center">
                <h1 class="text-2xl font-bold">忘記密碼</h1>
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <div class="flex flex-row">
                    <input
                        type="text"
                        name="token"
                        value={user.token}
                        onChange={handleChange}
                        required
                        placeholder="驗證碼"
                        class="block w-full my-2 p-1 border border-gray-300 bg-white"
                    />
                    <button type="button" class="ml-3 mt-2 bg-slate-300 h-8 w-28 " onClick={get_token}>獲取驗證碼</button>
                </div>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    placeholder="新密碼"
                    pattern="[a-z0-9]{8,}"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <input
                    type="password"
                    name="passwordConfirm"
                    value={user.passwordConfirm}
                    onChange={handleChange}
                    required
                    placeholder="確認新密碼"
                    pattern="[a-z0-9]{8,}"
                    class="block w-full my-4 p-1 border border-gray-300 bg-white"
                />

                <button class="mt-10 bg-primary w-60 py-1 rounded-full" onClick={resetCheck}>確定</button>
                <div class="my-10 flex flex-col items-center">
                    <p>如需變更密碼，請輸入之前設定的電子郵件帳號。</p>
                    <p>系統將寄送驗證碼至該郵件帳號內。</p>
                </div>
                <p>如果您忘記或不清楚自己的電子郵件帳號，請與電信所所辦聯繫</p>
                
            </form>
            <StudentFooter></StudentFooter>
        </div>
    );
}

export default Password;