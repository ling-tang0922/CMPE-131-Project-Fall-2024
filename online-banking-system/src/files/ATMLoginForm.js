import React, { useState, useEffect } from "react";
import './ATMLoginForm.css';
import NavBar from "../components/ATMNavBar";

const ATMLoginForm = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountPin, setAccountPin] = useState('');
    const [focusedField, setFocusedField] = useState('accountNumber'); 

    const handleKeyPress = (num) => {
        if (focusedField === 'accountPin') {
            if (accountPin.length < 4) {
                setAccountPin(accountPin + num);
            }
        } else {
            setAccountNumber(accountNumber + num);
        }
    };

    const handleBackspace = () => {
        if (focusedField === 'accountPin') {
            setAccountPin(accountPin.slice(0, -1));
        } else {
            setAccountNumber(accountNumber.slice(0, -1));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Account Number:', accountNumber);
        console.log('Account PIN:', accountPin);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            handleBackspace();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [accountPin, accountNumber]);

    return (
        <div className='wrapper'>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder='Account Number'
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        onFocus={() => setFocusedField('accountNumber')} 
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Account Pin'
                        value={accountPin}
                        onChange={(e) => setAccountPin(e.target.value)}
                        onFocus={() => setFocusedField('accountPin')} 
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




