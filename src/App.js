import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import UserForm from './components/UserForm';
import Check from './components/Check';
import CheckForm from './components/CheckForm';
// import SampleContextProvider from './contexts/SampleContext.js' 
import './App.css'
import Banner from "./images/banner.gif";
import Footer from "./images/banner.png";
import Banner_B from "./images/banner_REVIEW.gif";
import Footer_B from "./images/banner_REVIEW_B.png";
function App() {
  let mode = "user";
  return mode=="check"?(
  <table width="950" border="0" align="center" cellpadding="0" cellspacing="0" className='app-background'>
    <tr>
        <td><img src={Banner_B} width="950" height="150"/></td>
    </tr>
    <Router>
    <Routes >
      <Route path="/check-form" element={<CheckForm />} />
      <Route path="/check" element={<Check />} />
    </Routes>
    </Router>
      <tr>
        <td align="center" valign="top" bgcolor="#FFFFFF"><img src={Footer_B} width="950" height="75"/></td>
      </tr>
    </table>
):(
    // <SampleContextProvider>
    <table width="950" border="0" align="center" cellpadding="0" cellspacing="0" className='app-background'>
          <tr>
              <td><img src={Banner} width="950" height="150"/></td>
          </tr>
      <Router>
        <Routes >
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*"element={<Navigate to='/login' />} />
        </Routes>
      </Router>
      <tr>
      <td align="center" valign="top" bgcolor="#FFFFFF"><img src={Footer} width="950" height="75"/></td>
    </tr>
    </table>
      
  );
}

export default App;
