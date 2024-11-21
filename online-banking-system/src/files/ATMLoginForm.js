import React, { useState, useEffect } from "react";
import './ATMLoginForm.css';
import NavBar from "../components/ATMNavBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
/*
***Backend
*/
const ATMLoginForm = () => {
    const navigate = useNavigate()
    const [bankID, setBankID] = useState('')
    const [bankPin, setBankPin] = useState('')
    const [focusedField, setFocusedField] = useState('bankID')
    const [message, setMessage] = useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        axios.get('http://localhost:4000/validate-credentials-ATMLogin',{
          params: {bankID: bankID, bankPin: bankPin }
        })
        .then(response =>{
          if(response.data.success){
            const bankID = response.data.bankID
            navigate('/DashBoard', {state: {bankID}})
          }
        })
        .catch(error =>{
          if(error.response && error.response.status === 401){
            setMessage("Invalid credentials")
          } else{
            setMessage("Error validating credentials")
          }
        })
      };
    const handleKeyPress = (num) => {
        if (focusedField === 'bankPin') {
            if (bankPin.length < 4) {
                setBankPin(bankPin + num)
            }
        } else {
            setBankID(bankID + num)
        }
    };

    const handleBackspace = () => {
        if (focusedField === 'bankPin') {
            setBankPin(bankPin.slice(0, -1));
        } else {
            setBankID(bankID.slice(0, -1));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            handleBackspace();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [])

    return (
        <div className='wrapper'>
            <NavBar />
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder='bankID'
                        value={bankID}
                        onChange={(e) => setBankID(e.target.value)}
                        onFocus={() => setFocusedField('bankID')} 
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Bank Pin'
                        value={bankPin}
                        onChange={(e) => setBankPin(e.target.value)}
                        onFocus={() => setFocusedField('bankPin')} 
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} onClick={() => handleKeyPress(num)}>
                        {num}
                    </button>
                ))}
                <button className="backspace" onClick={handleBackspace}>⌫</button>
                <button key={0} onClick={() => handleKeyPress(0)}>0</button>
            </div>
        </div>
    );
}

export default ATMLoginForm;




