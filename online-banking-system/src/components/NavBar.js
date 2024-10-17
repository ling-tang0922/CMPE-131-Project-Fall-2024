import { useNavigate } from "react-router-dom";


const NavBar = () =>{
    const navigate = useNavigate();
    return(<div style={{"position":"fixed",backgroundColor:"white",width:"100%",border:"solid black", borderWidth:"0 0 1px 0",}}>
            <style>
                {`
                    text:hover {
                        color:red;
                        text-decoration:underline;
                        cursor:pointer;
                    }
                `}
            </style>
        
        <nav style={{display: "flex",alignItems:"center",minHeight:"10vh",}}>
        <div style={{display:"flex",width:"100%"}}>
        <div style={{"flex":1}}>
            <img style={{"height":"10vh"}} src="logo_131_1.png"></img>
            
        </div>
        <div style={{flex:"1",alignContent:"center",}}>
        <div style={{"textAlign":"right"}}>
        <text style={{margin:"0 10px"}}>Home</text>
        <text style={{margin:"0 10px"}}>About US</text>
        <text style={{margin:"0 10px"}} onClick={()=>{navigate('/CustomerLogin')}}>Customer Login</text>
        <text style={{margin:"0 10px"}}>Employee Login</text>
        <text style={{margin:"0 10px"}} onClick={()=>{navigate('/ATMLoginForm')}}>ATM</text>
        </div>
        </div>
        </div>
        
        </nav>

        
        </div>)
}   


export default NavBar;