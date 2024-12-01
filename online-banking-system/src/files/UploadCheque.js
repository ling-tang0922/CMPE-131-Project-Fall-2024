import { Button, Input,Label,CheckboxField,VisuallyHidden} from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const UploadCheque = () =>{
    const navigate = useNavigate()
    const [uploadedImage,setUploadedImage] = React.useState(null);
    const hiddenInput = React.useRef(null);
    const balance = sessionStorage.getItem("accountBalance") || 0;
    const [amount, setAmount] = useState('');
    const bankID = sessionStorage.getItem("bankID") || {};
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    // Bankend:

    const updateBalance = () =>{
      const newBalance = (Number(balance) + Number(amount)).toString()
      axios.put('http://localhost:4000/UpdateAccountBalance', {
        bankID: bankID,
        newBalance: newBalance,
      })
    
      .then(response => {
        console.log('Response received:', response.data);
        if (response.data.success) {
          sessionStorage.setItem("accountBalance", newBalance);
          console.log('Updated')
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("Error validating credentials");
        }
      })

      axios.post('http://localhost:4000/add-transaction',{
        transactionID: '', 
        bankID: bankID, 
        accountBalance: newBalance, 
        transaction: amount, 
        connectedAccount: 'N/A', 
        date: formattedDate, 
        type: 'Check Deposit'
      })
      .then(response => {
        if(response.data.success){
          console.log('Response recieved:', response.data);
          alert("Check deposited successfully");
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
                <Input  
                  placeholder="Enter Amount"
                  />   
                </div>     
                <div style={{margin:"30px 0"}}>
                <Label>Verify Amount: $</Label>
                <Input  
                  placeholder="Verify Amount"
                  value={amount}
                  onChange={(e)=> setAmount(e.target.value)}
                  />   
                </div>
                <p>Note: Make sure you have signed on the back side of the check</p>
                <CheckboxField  margin="10px 0px" label="I agree to all terms and conditions"/>
                <Button onClick={() => updateBalance()} colorTheme="fill" style={{backgroundColor:"black",color:"white"}} width="100%">Deposit Check!<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faPlay}></FontAwesomeIcon></Button>
            </div>
        </div>
    </WindowWrapper>)
} 
export default UploadCheque;