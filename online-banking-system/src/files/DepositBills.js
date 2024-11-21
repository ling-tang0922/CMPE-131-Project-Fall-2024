import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react"
import WindowWrapper from "../components/WindowWrapper"
import React, { useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom'

const DepositBills = () =>{
    const location = useLocation()
    const [amount, setAmount] = useState('')
    const [confirmAmount, setConfirmAmount] = useState('')
    const [termsAgreed, setTermsAgreed] = useState('')
    const [balance, setBalance] = useState(0)
    const [message, setMessage] = useState('')
    const bankID = location.state
    
    const fetchBalance = () =>{
        axios.get('http://localhost:4000/account-settings', {
            params:{bankID: bankID}
        })
        .then(response =>{
            console.log('Response recieved:', response.data)
            if(response.data.success){
                const accountBalance = response.data.accountBalance
                setBalance(accountBalance)
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
              setMessage("Invalid credentials");
            } else {
              setMessage("Error validating credentials");
            }
          })
    }
    fetchBalance()

    const handleDeposit = () =>{
        const amountNum = parseFloat(amount);
        if(!termsAgreed){
            alert("You must agree to the terms and conditions")
            return
        }
        if(amount !== confirmAmount){
            alert("Amounts do not match.")
            return
        }
        if(!amount || parseFloat(amount) <= 0){
            alert("Please enter a valid deposit amount.")
            return
        }
        const newBalance = (balance + amountNum)

        axios.put('http://localhost:4000/user-account-balance-update',{
            params: {bankID: bankID, newBalance: newBalance}
        })
        .then(response => {
            console.log('Response recieved:', response.data)
            if(response.data.success){
                setMessage('Success!')
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
              setMessage("Invalid credentials");
            } else {
              setMessage("Error validating credentials");
            }
        })

        setMessage(`You have deposited $${amountNum}. Your new balance is $${newBalance.toFixed(2)}.`);
        setAmount(""); // Clear the input
    }
    return(<WindowWrapper showSideNav={true}>
        <div>
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Deposit Cash</h1>
            </div>
            <div style={{margin:"0 30%"}}>
                <div style={{margin:"30px 0"}}>
                <Label>Amount: $ </Label>
                <Input  
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e)=> setAmount(e.target.value)}/>   
                </div>      
                <div style={{margin:"30px 0"}}>
                <Label>Confirm Amount: $ </Label>
                <Input 
                    placeholder="Enter Amount"
                    value={confirmAmount}
                    onChange={(e)=> setConfirmAmount(e.target.value)}/>     
                </div>
                <CheckboxField
                    checked={termsAgreed}  
                    margin="10px" 
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    label="I agree to all terms and conditions"/>
                <Button onClick={handleDeposit} 
                colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit!</Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default DepositBills;