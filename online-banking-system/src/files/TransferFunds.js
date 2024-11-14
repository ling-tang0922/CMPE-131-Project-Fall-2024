import { Button, Input,Label,CheckboxField,Message} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React from "react";
const TransferFunds = () =>{

    const [message,setMessage] = React.useState(<></>);
    const [amount,setAmount] = React.useState(null);
    const [contact,setContact] = React.useState(null);
    const [confirmedContact,setConfirmedContact] = React.useState(null);
    const [checked,setChecked]  = React.useState(false);
    function handleDepositFunds(){
        setMessage(<></>)
        if(isNaN(amount) || parseInt(amount)<=0 || amount==null){
            setMessage(<Message colorTheme="error">Enter a valid Amount!</Message>);
            return;
        }
        if(!contact){
            setMessage(<Message colorTheme="error">Enter Contact Details!</Message>);
            return;
        }
        if(contact!=confirmedContact){
            setMessage(<Message colorTheme="error">Contacts must match!</Message>);
            return;
        }

        //call transfer funds api

        setMessage(<Message colorTheme="success">${amount} sent to {contact}</Message>)

    }

    return(<WindowWrapper showSideNav={true}>
        <div>
            {message}
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Transfer Funds</h1>
            </div>
            <div style={{margin:"0 30%"}}>
                <div style={{margin:"30px 0"}}>
                <Label>Reciever Phone Number: $</Label>
                <Input value={contact} onChange={(event)=>{setContact(event.target.value)}} placeholder="Enter Reciever Phone Number"/>   
                </div>  
                <div style={{margin:"30px 0"}}>
                <Label>Verify Phone Number: $</Label>
                <Input value={confirmedContact} onChange={(event)=>{setConfirmedContact(event.target.value)}}  placeholder="Verify Reciever Phone Number"/>   
                </div>
                <div style={{margin:"30px 0"}}>
                <Label>Amount: $</Label>
                <Input value={amount} onChange={(event)=>{setAmount(event.target.value)}}  placeholder="Enter Amount"/>   
                </div>     
                <CheckboxField value={checked} onChange={()=>{setChecked(!checked)}} margin="10px" label="I agree to all terms and conditions"/>
                <Button onClick={handleDepositFunds} isDisabled = {!checked} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Transfer Funds!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default TransferFunds;