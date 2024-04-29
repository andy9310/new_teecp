import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import SampleContextProvider from './contexts/SampleContext.js' 
import './App.css'
import Banner from "./images/banner.gif";
import Footer from "./images/banner.png";

function App() {
  return (
    // <SampleContextProvider>
    <table width="950" border="0" align="center" cellpadding="0" cellspacing="0" className='app-background'>
          <tr>
              <td><img src={Banner} width="950" height="150"/></td>
          </tr>
      <Router>
        <Routes >
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
