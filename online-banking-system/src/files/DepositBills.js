import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";

const DepositBills = () =>{
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
                <Button colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit!</Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default DepositBills;