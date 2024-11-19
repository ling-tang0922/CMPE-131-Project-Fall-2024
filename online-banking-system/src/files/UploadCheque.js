import { Button, Input,Label,CheckboxField,VisuallyHidden} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom"
import axios from "axios";

const UploadCheque = () =>{
    const location = useLocation()
    const [uploadedImage,setUploadedImage] = React.useState(null);
    const hiddenInput = React.useRef(null);
    const [balance, setBalance] = useState('')
    const [message, setMessage] = useState('')
    const [amount, setAmount] = useState('')
    const bankID = location.state

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setUploadedImage(imageUrl);
        }
      };
    const onFilePickerChange = (event) => {
        const { files } = event.target;
        if (!files || files.length === 0) {
          return;
        }
        setUploadedImage(Array.from(files)[0]);
      };

    const updateBalance = async (newBalance) => {
      try{
        const response = await axios.put('http://localhost:4000/account-balance', {
          bankID: bankID,
          balance: newBalance,
          reqType: 'customer'
        })
        setMessage(`Your new balance of $${newBalance.toFixed(2)} has been updated successfully.`)
      }catch(error){
        console.error("Error updating account balance")
        setMessage("Error updating account balance")
      }
    }
    const amountInput = (e) => {
      setBalance((Number(e.target.value) + Number(balance)).toString())
    }
    useEffect(() =>{
      const fetchBalance = async ()=>{
        try{
          const response = await axios.get('http://localhost:4000/account-balance', {
            params : {bankID: bankID}
          })
          setBalance(response.data.balance)
        }catch(error){
          console.error("Error fetching account balance:", error)
          setMessage("Error fetching account balance")
        }
      }
    }, [bankID])
    return(<WindowWrapper showSideNav={true}>
        <div>
            <div style={{"display":"flex",justifyContent:"center"}}>
                <h1>Upload Check</h1>
            </div>

            <div style={{margin:"0 30%"}}>
            {uploadedImage && (
        <div>
          <h3>Preview:</h3>
          <img src={uploadedImage} alt="Preview" style={{ width: '100%', maxHeight: '300px' }} />
        </div>
      )}
                <div>
                <VisuallyHidden >
                    <input
                    type="file"
                    accept="image/*"
                    tabIndex={-1}
                    ref={hiddenInput}
                    onChange={handleImageChange}
                    multiple={false}
                    // accept={acceptedFileTypes.join(",")}
                    />
          </VisuallyHidden>
          </div>
                <div  style={{"display":"flex",justifyContent: "flex-end",marginTop:"20px"}}>
                <Button onClick={()=>{hiddenInput.current.click()}}>+ Upload Check</Button>
                </div>
                <VisuallyHidden></VisuallyHidden>
                <div style={{margin:"30px 0"}}>
                <Label>Amount: $</Label>
                <Input  placeholder="Enter Amount"/>   
                </div>     
                <div style={{margin:"30px 0"}}>
                <Label>Verify Amount: $</Label>
                <Input  
                  placeholder="Verify Amount"
                  value={amount}
                  onChange={amountInput}
                  />   
                </div>
                <p>Note: Make sure you have signed on the back side of the check</p>
                <CheckboxField  margin="10px 0px" label="I agree to all terms and conditions"/>
                <Button onClick={() => updateBalance(balance)} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit Check!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
}   
export default UploadCheque;