import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import UserForm from './components/UserForm';
import Check from './components/Check';
import CheckForm from './components/CheckForm'; 
import Password from './components/Password'; 
import DnD from './components/DnD';
import Admin from './components/Admin';
import AdminScore from './components/AdminScore';
import AdminForm from './components/AdminForm';
import Account from './components/Account';
import System from './components/System';
import GlobalContextProvider from './context/global.js' 
import { SessionProvider } from './context/session.js' 
import './App.css'
import {NextUIProvider} from "@nextui-org/react";


function App() {
  return (
    
    <GlobalContextProvider>
    <SessionProvider>
    <NextUIProvider>
      <Router>
        <Routes >
          <Route path="/system" element={<System />} />
          <Route path="/account-manage" element={<Account />} />
          <Route path="/admin-form" element={<AdminForm />} />
          <Route path="/admin-score" element={<AdminScore />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dnd" element={<DnD />} />
          <Route path="/check-form" element={<CheckForm />} />
          <Route path="/check" element={<Check />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<Password />} />
          <Route path="*"element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </NextUIProvider>
    </SessionProvider>
    </GlobalContextProvider>
  );
}

export default App;
