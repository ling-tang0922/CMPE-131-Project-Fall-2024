import React, { useState } from "react";
import './ATMLoginForm.css';
import NavBar from "../components/ATMNavBar";

const ATMLoginForm = () => {
    const [accountNumber, setAccountNumber] = useState('e'); // Account Number starts with 'e'
    const [accountPin, setAccountPin] = useState('');
    const [focusedField, setFocusedField] = useState(''); // Track which field is focused

    // Handle keypad number press
    const handleKeyPress = (num) => {
        if (focusedField === 'accountPin') {
            if (accountPin.length < 4) { // Account Pin max length is 4 digits
                setAccountPin(accountPin + num);
            }
        } else if (focusedField === 'accountNumber') {
            // For Account Number, user can enter only numbers after 'e'
            if (accountNumber.length < 5) { // 'e' + 4 digits
                setAccountNumber(accountNumber + num);
            }
        }
    };

    // Handle backspace key press
    const handleBackspace = () => {
        if (focusedField === 'accountPin') {
            setAccountPin(accountPin.slice(0, -1)); // Remove last character from PIN
        } else if (focusedField === 'accountNumber' && accountNumber.length > 1) {
            setAccountNumber(accountNumber.slice(0, -1)); // Don't delete 'e', only remove digits
        }
    };

    // Form submission logic
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Account Number:', accountNumber);
        console.log('Account PIN:', accountPin);
    };

    return (
        <div className="wrapper">
            <NavBar />
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="input-box">
                    <label htmlFor="accountNumber">Account ID</label>
                    <input
                        type="text"
                        id="accountNumber"
                        placeholder="Account Number"
                        value={accountNumber}
                        onFocus={() => setFocusedField('accountNumber')} // Focus on Account Number
                        required
                        maxLength={5} // 'e' + 4 digits
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="accountPin">Account Pin</label>
                    <input
                        type="password"
                        id="accountPin"
                        placeholder="Account Pin"
                        value={accountPin}
                        onFocus={() => setFocusedField('accountPin')} // Focus on Account Pin
                        required
                        maxLength={4} // Account Pin max length
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
};

export default ATMLoginForm;

