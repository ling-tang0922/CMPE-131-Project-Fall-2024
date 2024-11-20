import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TransferFunds = () =>{

    //const location = useLocation()
    const [message, setMessage] = useState('')
    const [senderBalance, setSenderBalance] = useState('')
    const [recieverBalance, setRecieverBalance] = useState('')
    const [amount, setAmount] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    //const bankID = location.state
    const bankID = 123
    const [activate, setActivate] = useState(false)
    useEffect(() =>{
        const fetchBalance = async (bankIDInput, phoneNumberInput)=>{
            try{
                const response = await axios.get('http://localhost:4000/account-balance', {
                    params: {bankID : bankIDInput, phoneNumber: phoneNumberInput}
                })
                if(!activate){
                    setSenderBalance(response.data.balance)
                }
                else{
                    setRecieverBalance(response.data.balance)
                }
            }catch(error){
                console.error("Error fetching account balance", error)
                setMessage("Error fetching account balance")
            }
        }
        if(activate){
            fetchBalance(null, phoneNumber)
        }
    }, [activate, bankID])
    
    const handleTransfer = async () =>{
        const senderNewBalance = Number(senderBalance) - Number(amount)
        const recieverNewBalance = Number(recieverBalance) + Number(amount)
        try{
            await axios.put('http://localhost:4000/account-balance', {
                bankID: bankID,
                balance: senderNewBalance,
                reqType: 'customer',
                phoneNumber: null
            })
            await axios.put('http://localhost:4000/account-balance', {
                bankID: null,
                balance: recieverNewBalance,
                reqType: 'customer',
                phoneNumber: phoneNumber
            })
            setMessage(`$${amount} has been transfered to ${phoneNumber}`)
        }catch(error){
            console.error('Error updating both account balances')
            setMessage('Error updating both account balances')
        }
    }
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
                <Button onClick={() => setActivate(true)} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Transfer Funds!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default TransferFunds;