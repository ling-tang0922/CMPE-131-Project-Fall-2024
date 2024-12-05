import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react"
import WindowWrapper from "../components/WindowWrapper"
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DepositBills = () =>{
    const navigate = useNavigate()
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const [amount, setAmount] = useState('')
    const [confirmAmount, setConfirmAmount] = useState('')
    const [termsAgreed, setTermsAgreed] = useState('')
    const balance = sessionStorage.getItem("accountBalance") || 0
    const bankID = sessionStorage.getItem("bankID")
    const accountStatus = sessionStorage.getItem("accountStatus")
    const checkValues = () =>{
        if(accountStatus === 'closed'){
            alert("Account is closed. Please open account to deposit.")
            return false
        }
        
        if(!termsAgreed){
            alert("You must agree to the terms and conditions")
            return false
        }
        if(amount !== confirmAmount){
            alert("Amounts do not match.")
            return false
        }
        if(!amount || parseFloat(amount) <= 0){
            alert("Please enter a valid deposit amount.")
            return false
        }
        handleDeposit()
    }
    const handleDeposit = () =>{
        const amountNum = parseFloat(confirmAmount);
        const newBalance = (Number(balance) + Number(amountNum))

        axios.put('http://localhost:4000/UpdateAccountBalance',{
            bankID: bankID, newBalance: newBalance
        })
        .then(response => {
            console.log('Response recieved:', response.data)
            if(response.data.success){
                sessionStorage.setItem("accountBalance", newBalance)
                alert('Success!')
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
              alert("Invalid credentials");
            } else {
              alert("Error validating credentials");
            }
        })
        axios.post('http://localhost:4000/add-transaction',{
            transactionID: '', 
            bankID: bankID, 
            accountBalance: newBalance, 
            transaction: amount, 
            connectedAccount: 'N/A', 
            date: formattedDate, 
            type: 'Cash Deposit'
        })
        .then(response => {
            
            if(response.data.success){
                console.log('Response recieved:', response.data)
                navigate('/dashboard')
                window.location.reload()
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
              alert("Invalid input values");
            } else {
              alert("Error validating input values");
            }
        })
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
                <Button onClick={checkValues} 
                colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit!</Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default DepositBills;