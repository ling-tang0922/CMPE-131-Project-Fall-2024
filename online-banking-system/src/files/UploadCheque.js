import { Button, Input,Label,CheckboxField,VisuallyHidden, Message} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const UploadCheque = () =>{
    const [frontImage,setFrontImage] = React.useState(null);
    const [backImage,setBackImage] = React.useState(null);
    const [message, setMessage] = React.useState(<></>);
    const frontHiddenInput = React.useRef(null);
    const backHiddenInput = React.useRef(null);
    const [amount,setAmount] = React.useState(null);
    const [checked,setChecked] = React.useState(false);
    const handleFrontImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setFrontImage(imageUrl);
        }
      };
      const handleBackImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setBackImage(imageUrl);
        }
      };
      const uploadCheque = ()=>{
        setMessage(<></>)
        if(isNaN(amount) || parseInt(amount)<=0 || amount==null){
            setMessage(<Message colorTheme="error">Please enter a valid amount!</Message>);
            return;
        }
        if(frontImage==null || backImage==null){
          setMessage(<Message colorTheme="error">Please upload both sides of the check!</Message>);
            return;
        }
        //call transfer funds api

        setMessage(<Message colorTheme="success">${amount} deposited to your account</Message>)
      }

    return(<WindowWrapper showSideNav={true}>
        <div>
          {message}
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Upload Check</h1>
            </div>

            <div style={{margin:"0 30%"}}>
            {frontImage && (
        <div>
          <h3>Preview:</h3>
          <img src={frontImage} alt="Preview" style={{ width: '100%', maxHeight: '300px' }} />
        </div>
      )}
                <div>
                <VisuallyHidden >
                    <input
                    type="file"
                    accept="image/*"
                    tabIndex={-1}
                    ref={frontHiddenInput}
                    onChange={handleFrontImageChange}
                    multiple={false}
                    // accept={acceptedFileTypes.join(",")}
                    />
          </VisuallyHidden>
          </div>

          
                <div  style={{"display":"flex",justifyContent: "flex-end",marginTop:"20px"}}>
                <Button onClick={()=>{frontHiddenInput.current.click()}}>+ Upload Front Side</Button>
                </div>

                {backImage && (
        <div>
          <h3>Preview:</h3>
          <img src={backImage} alt="Preview" style={{ width: '100%', maxHeight: '300px' }} />
        </div>
      )}
                <div>
                <VisuallyHidden >
                    <input
                    type="file"
                    accept="image/*"
                    tabIndex={-1}
                    ref={backHiddenInput}
                    onChange={handleBackImageChange}
                    multiple={false}
                    // accept={acceptedFileTypes.join(",")}
                    />
          </VisuallyHidden>
          </div>

          
                <div  style={{"display":"flex",justifyContent: "flex-end",marginTop:"20px"}}>
                <Button onClick={()=>{backHiddenInput.current.click()}}>+ Upload Back Side</Button>
                </div>


                <div style={{margin:"30px 0"}}>
                <Label>Amount: $</Label>
                <Input value={amount} onChange={(event)=>{setAmount(event.target.value)}}  placeholder="Enter Amount"/>   
                </div>     
                <p>Note: Make sure you have signed on the back side of the check.</p>
                <CheckboxField value={checked} onChange={()=>{setChecked(!checked)}}  margin="10px 0px" label="I agree to all terms and conditions."/>
                <Button isDisabled={!checked} onClick={uploadCheque} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit Check!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default UploadCheque;