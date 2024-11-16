import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react"
import WindowWrapper from "../components/WindowWrapper"
import React, { useState, useLocation} from "react";
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
    const reqType= 'cust'
    const accountId = location.state
    useEffect(() => {
        const fetchBalance = async () => {
            try{
                const response = await axios.getAdapter('http//localhost:3000/account-balance', {
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

    const handleDeposit = async () =>{
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
            try {
                // Update balance on the server
                await axios.put('http://localhost:3000/account-balance', {
                    accountId: accountId,
                    balance: newBalance,
                    reqType: "customer",
                });
                
                setBalance(newBalance);
                setMessage(`You have deposited $${amountNum}. Your new balance is $${newBalance.toFixed(2)}.`);
                setAmount(""); // Clear the input
            } catch (error) {
                console.error("Error updating account balance:", error);
                setMessage("Error updating account balance.");
            }

        
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