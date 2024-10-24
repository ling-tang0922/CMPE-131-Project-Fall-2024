import { Button, Input,Label,CheckboxField} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";

const TransferFunds = () =>{
    return(<WindowWrapper showSideNav={true}>
        <div>
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Transfer Funds</h1>
            </div>
            <div style={{margin:"0 30%"}}>
                <div style={{margin:"30px 0"}}>
                <Label>Reciever Phone Number: $</Label>
                <Input  placeholder="Enter Reciever Phone Number"/>   
                </div>  
                <div style={{margin:"30px 0"}}>
                <Label>Verify Phone Number: $</Label>
                <Input  placeholder="Verify Reciever Phone Number"/>   
                </div>
                <div style={{margin:"30px 0"}}>
                <Label>Amount: $</Label>
                <Input  placeholder="Enter Amount"/>   
                </div>     
                <CheckboxField  margin="10px" label="I agree to all terms and conditions"/>
                <Button colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Transfer Funds!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default TransferFunds;