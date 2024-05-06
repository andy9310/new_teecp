import React, { useState, useContext } from 'react';
import './User.css';
import checkboard from "../images/3C.png";
import C from "../images/C.png";
import { Link } from 'react-router-dom';


function Check() {
    
    return (
        <>
                <div className="student-sign">
                    <img src={C} />
                    <div className="inline-block text-left align-middle font-bold">
                        <p className="text-4xl">審查端</p>
                        <p className="text-xl">Review</p>
                    </div>
                </div>
                <Link to="/check-form">
                    <div className='menu-board'>
                        <div>
                            <img src={checkboard} />
                            <p>書面審查評分</p>
                        </div>
                    </div>
                </Link>
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
  
  export default Check;