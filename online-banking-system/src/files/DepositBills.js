import { Button, Input,Label,CheckboxField,Message} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import React from "react";
const DepositBills = () =>{
    const [message,setMessage] = React.useState(<></>);
    const [amount,setAmount] = React.useState(null);
    const [confirmedAmount,setConfirmedAmount] = React.useState(null);
    const [checked,setChecked]  = React.useState(false);
    function handleDepositFunds(){
        console.warn("here",typeof (amount));
        setMessage(<></>)
        if(isNaN(amount) || parseInt(amount)<=0 || amount==null){
            setMessage(<Message colorTheme="error">Enter a valid Amount!</Message>);
            return;
        }
        if(amount!=confirmedAmount){
            setMessage(<Message colorTheme="error">Amounts must match!</Message>);
            return;
        }


        //call deposit funds api

        setMessage(<Message colorTheme="success">${amount} deposited into your account</Message>)

    }
    return(<WindowWrapper showSideNav={true}>
        <div>
            {message}
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Deposit Cash</h1>
            </div>
            <div style={{margin:"0 30%"}}>
                <div style={{margin:"30px 0"}}>
                <Label>Amount: $ </Label>
                <Input value={amount} onChange={(event)=>{setAmount(event.target.value)}}  placeholder="Enter Amount"/>   
                </div>      
                <div style={{margin:"30px 0"}}>
                <Label>Confirm Amount: $ </Label>
                <Input value={confirmedAmount} onChange={(event)=>{setConfirmedAmount(event.target.value)}} placeholder="Enter Amount"/>     
                </div>
                <CheckboxField value={checked} onChange={(event)=>{setChecked(!checked)}}  margin="10px" label="I agree to all terms and conditions"/>
                <Button isDisabled={!checked} onClick={handleDepositFunds} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit!</Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default DepositBills;