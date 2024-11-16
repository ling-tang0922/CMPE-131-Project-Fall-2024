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
    const [balance, setBalance] = useState(0)
    const reqType= 'cust'
    const accountId = location.state
    setBalance(axios.get('http://localhost:3000/account-balance', {
        params: {accountId: accountId}
    }))
    const handleDeposit = () =>{
        if(!accountId || !reqType || !balance)
        axios.put('http://localhost:3000/account-balance', {
                params: {accountId: accountId, otherAccountId: null, balance: balance, otherNewBalance: null, reqType: reqType}
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
                <Input  placeholder="Enter Amount"/>   
                </div>      
                <div style={{margin:"30px 0"}}>
                <Label>Confirm Amount: $ </Label>
                <Input placeholder="Enter Amount"/>     
                </div>
                <CheckboxField  margin="10px" label="I agree to all terms and conditions"/>
                <Button onClick={handleDeposit()} 
                colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit!</Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default DepositBills;