import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react"
import WindowWrapper from "../components/WindowWrapper"
import React, { useState, useLocation, useEffect} from "react";
const axios = require('axios')

/*
***Backend Notes***
'DepositBills.js' uses two functions from app.js
    - Request Account Balance
    - Request Modification of Account Balance
*/

const DepositBills = () =>{
    const location = useLocation()
    const [amount, setAmount] = useState('')
    const [confirmAmount, setConfirmAmount] = useState('')
    const [termsAgreed, setTermsAgreed] = useState('')
    const [balance, setBalance] = useState(0)
    const [message, setMessage] = useState('')
    const reqType= 'cust'
    const accountId = location.state

    
    const updateBalance = async (newBalance) => {
        try{
            const response = await axios.put('http://localhost:4000/account-balance', {
                params : {accountId: accountId, balance: newBalance, reqType: reqType }
            })
            setMessage(`Your new balance of $${newBalance.toFixed(2)} has been updated successfully.`)
        }catch(error){
            console.error("Error updating account balance")
            setMessage("Error updating account balance")
        }
    }

    useEffect(() => {
        const fetchBalance = async () => {
            try{
                const response = await axios.get('http://localhost:4000/account-balance', {
                    params : {accountId: accountId}
                })
                setBalance(response.data.balance)

            }catch(error) {
                console.error("Error fetching account balance:", error)
                setMessage("Error fetching account balance")
            }
        }
        fetchBalance()
    }, [accountId])

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
                setBalance(newBalance);
                updateBalance(newBalance)
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