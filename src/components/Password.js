import React, { useState } from 'react';
import Check from "../images/check.png";
import { Link } from 'react-router-dom';
import StudentHeader from '../side_components/studentside_header';
import StudentFooter from '../side_components/studentside_footer';

function Password() {
    const[url,setUrl] = useState('/login');
    const [user, setUser] = useState({
        identity: '',
        ID: '',
        password: '',
        passwordConfirm: ''
    });
    const registerCheck = () => {
        const email_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const password_format = /^[a-z0-9]+$/;
        // console.log('Logging in', user);
        if (user.password !== user.passwordConfirm) {
            alert("Passwords do not match.");
            window.location.reload();
        }
        else if(!email_format.test(user.ID)){
            alert("資料格式錯誤");
            window.location.reload();
        }
        else if( user.password.length < 8 || !password_format.test(user.password)){
            alert("資料格式錯誤");
            window.location.reload();
        }
        else{
            alert("註冊成功，可以登入了");
        }
        
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // check for submit 
        if (user.password !== user.passwordConfirm) {
            alert("Passwords do not match.");
            setUrl('/password')
            return;
        }
    };

    return (
        <div class="container mx-auto flex flex-col w-full">
            <StudentHeader></StudentHeader>
            
            <form onSubmit={handleSubmit} class="w-1/2 mx-auto my-8 text-center items-center">
                <h1 class="text-2xl font-bold">忘記密碼</h1>
                <input
                    type="text"
                    name="identity"
                    value={user.identity}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    class="block w-full my-2 p-1 border border-gray-300 bg-white"
                />
                <div class="flex flex-row">
                    <input
                        type="email"
                        name="ID"
                        value={user.ID}
                        onChange={handleChange}
                        required
                        placeholder="驗證碼"
                        class="block w-full my-2 p-1 border border-gray-300 bg-white"
                    />
                    <button class="ml-3 mt-2 bg-slate-300 h-8 w-28 ">獲取驗證碼</button>
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

                <Link to={url}><button class="mt-10 bg-primary w-60 py-1 rounded-full">確定</button></Link>
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