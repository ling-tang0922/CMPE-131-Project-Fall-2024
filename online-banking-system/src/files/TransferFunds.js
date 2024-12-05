import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import { useNavigate} from "react-router-dom";

import axios from "axios";

const TransferFunds = () =>{
    const navigate = useNavigate()
    const senderBalance = sessionStorage.getItem("accountBalance") || 0
    const senderPhoneNumber = sessionStorage.getItem("PhoneNumber")
    const [amount, setAmount] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [verifyPhoneNumber, setVerifyPhoneNumber] = useState('')
    const bankID = sessionStorage.getItem("bankID") || {}
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const senderAccountStatus = sessionStorage.getItem("accountStatus")
    // Backend:
    const verifyInputs = () =>{
        
        if(!phoneNumber || !verifyPhoneNumber || phoneNumber !== verifyPhoneNumber){
            alert("Provided phone numbers don't match.")
            return false
        }
        else if(phoneNumber === senderPhoneNumber){
            alert("You can't transfer funds to yourself.")
            return false
        }
        else if(!amount){
            alert("Please enter an amount.")
            return false
        }
        else if(Number(amount) <= 0){
            alert("Please enter a valid amount.")
            return false
        }
        else if(Number(amount) > Number(senderBalance)){
            alert("Insufficient funds.")
            return false
        }
        else if(senderAccountStatus === 'closed'){
            alert("Your account is closed. Please open account to transfer funds.")
            return false
        }
       else {axios.get('http://localhost:4000/account-settings',{
            params: {PhoneNumber: phoneNumber}
            
        })
        .then(response =>{
            console.log('Response recieved:', response.data)
            if(response.data.success){
                console.log('Reciever BankID:', response.data.bankID)
                if(response.data.accountStatus === 'closed'){
                    alert("Reciever account is closed. Please open account to transfer funds.")
                    return false
                }
                handleTransfer(response.data.bankID, response.data.accountBalance)
            }
             else {
                console.error('No matching account found');
                alert('No matching account found');
            }
        })
        .catch(error =>{
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                alert("Invalid Phone Number");

            } else {
                alert("Error Phone Number");
            }
        })
    }
    }
    const handleTransfer = (recieverBankID, recieverBalance) =>{
        const senderNewBalance = Number(senderBalance) - Number(amount)
        const recieverNewBalance = Number(recieverBalance) + Number(amount)

        axios.put('http://localhost:4000/UpdateAccountBalance', {
            bankID: bankID, newBalance: senderNewBalance
        })
        .then(response=>{
            console.log('Response recieved:', response.data)
            if(response.data.succuss){
                sessionStorage.setItem("accountBalance", senderNewBalance);
                alert('Success!')
            }
        })
        .catch(error=>{
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
                
            } else {
                alert("Error validating credentials");
                
            }
        })
        axios.post('http://localhost:4000/add-transaction',{
            transactionID: '', 
            bankID: bankID, 
            accountBalance: senderNewBalance, 
            transaction: -(Number(amount)), 
            connectedAccount: recieverBankID, 
            date: formattedDate, 
            type: 'Transfer'
        })
        .then(response => {
            if(response.data.success){
              console.log('Response recieved:', response.data);
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

        axios.put('http://localhost:4000/UpdateAccountBalance', {
            bankID: recieverBankID, newBalance: recieverNewBalance
        })
        .then(response=>{
            console.log('Response recieved:', response.data)
            if(response.data.succuss){
                alert('Success!')
            }
        })
        .catch(error=>{
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
                return
            } else {
                alert("Error validating credentials");
                return
            }
        })
        axios.post('http://localhost:4000/add-transaction',{
            transactionID: '', 
            bankID: recieverBankID, 
            accountBalance: recieverNewBalance, 
            transaction: Number(amount), 
            connectedAccount: bankID, 
            date: formattedDate, 
            type: 'Transfer'
        })
        .then(response => {
            if(response.data.success){
              console.log('Response recieved:', response.data);
              sessionStorage.setItem("accountBalance", senderNewBalance);
              alert('Success!')
              navigate('/Dashboard');
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

    
    //
    return(<WindowWrapper showSideNav={true}>
        <div>
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Transfer Funds</h1>
            </div>
            <div style={{margin:"0 30%"}}>
                <div style={{margin:"30px 0"}}>
                <Label>Reciever Phone Number: $</Label>
                <Input
                value={phoneNumber}
                onChange={(e)=> setPhoneNumber(e.target.value)} 
                placeholder="Enter Reciever Phone Number"/>   
                </div>  
                <div style={{margin:"30px 0"}}>
                <Label>Verify Phone Number: $</Label>
                <Input 
                value={verifyPhoneNumber}
                onChange={(e)=> setVerifyPhoneNumber(e.target.value)} 
                placeholder="Verify Reciever Phone Number"/>   
                </div>
                <div style={{margin:"30px 0"}}>
                <Label>Amount: $</Label>
                <Input  
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
                placeholder="Enter Amount"/>   
                </div>     
                <CheckboxField  margin="10px" label="I agree to all terms and conditions"/>
                <Button onClick={verifyInputs} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Transfer Funds!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default TransferFunds;