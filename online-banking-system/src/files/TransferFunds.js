import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TransferFunds = () =>{
    const [message, setMessage] = useState('')
    const [senderBalance, setSenderBalance] = useState('')
    const [recieverBalance, setRecieverBalance] = useState('')
    const [amount, setAmount] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const location = useLocation()
    const {bankID} = location.state
    const [recieverBankID, setRecieverBankID] = useState('')
    // Backend:
    const fetchBalance = async () =>{
        axios.get('http://localhost:4000/account-settings',{
            params: {bankdID : bankID, PhoneNumber: null}
        })
        .then(response =>{
            console.log('Response recieved:', response.data)
            if(response.data.success){
                const balance = response.data.accountBalance
                setSenderBalance(balance)
            }
        })
        .catch(error => {
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                setMessage("Invalid credentials");
            } else {
                setMessage("Error validating credentials");
            }
        })

        axios.get('http://localhost:4000/account-settings',{
            params: {bankdID : null, PhoneNumber: phoneNumber}
        })
        .then(response =>{
            console.log('Response recieved:', response.data)
            if(response.data.success){
                const balance = response.data.accountBalance
                const bankID = response.data.bankID
                setRecieverBalance(balance)
                setRecieverBankID(bankID)
            }
        })
        .catch(error => {
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                setMessage("Invalid credentials");
            } else {
                setMessage("Error validating credentials");
            }
        })
    }
    fetchBalance()

    const handleTransfer = async () =>{
        const senderNewBalance = Number(senderBalance) - Number(amount)
        const recieverNewBalance = Number(recieverBalance) + Number(amount)
        axios.put('http://localhost:4000/UpdateAccountBalance', {
            params: {bankID: bankID, newBalance: senderNewBalance}
        })
        .then(response=>{
            console.log('Response recieved:', response.data)
            if(response.data.succuss){
                setMessage('Success!')
            }
        })
        .catch(error=>{
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                setMessage("Invalid credentials");
            } else {
                setMessage("Error validating credentials");
            }
        })

        axios.put('http://localhost:4000/UpdateAccountBalance', {
            params: {bankID: recieverBankID, newBalance: recieverNewBalance}
        })
        .then(response=>{
            console.log('Response recieved:', response.data)
            if(response.data.succuss){
                setMessage('Success!')
            }
        })
        .catch(error=>{
            console.error('Error occured:', error)
            if (error.response && error.response.status === 401) {
                setMessage("Invalid credentials");
            } else {
                setMessage("Error validating credentials");
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
                <Button onClick={() => handleTransfer()} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Transfer Funds!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default TransferFunds;