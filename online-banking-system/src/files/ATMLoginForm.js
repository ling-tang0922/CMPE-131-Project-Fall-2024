import React from "react";
import './ATMLoginForm.css';

const ATMLoginForm = () => 
{
    return(
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Account Number' required/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Account Pin' required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default ATMLoginForm