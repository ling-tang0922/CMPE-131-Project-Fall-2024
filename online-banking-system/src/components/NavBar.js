import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const bankID = localStorage.getItem("bankID")
    return (
        <div style={{ position: "fixed", backgroundColor: "#CBF3C6", width: "100%" , padding: 0, zIndex: 1000}}>
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "10vh", padding: "0" }}>
                <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
                <img 
                    style={{ height: "10vh", cursor: "pointer" }} 
                    src="logo_131_1.png" 
                    alt="Logo" 
                    onClick={() => navigate('/')} 
                />
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                    <span style={{ margin: "0 15px", cursor: "pointer", fontSize: "18px" }} onClick={() => navigate('/AboutUs')}>About Us</span>
                    <span style={{ margin: "0 15px", cursor: "pointer", fontSize: "18px" }} onClick={() => navigate('/CustomerLogin')}>Customer Login</span>
                    <span style={{ margin: "0 15px", cursor: "pointer", fontSize: "18px" }} onClick={() => navigate('/EmployeeLogin')}>Employee Login</span>
                    <span style={{ margin: "0 15px", cursor: "pointer", fontSize: "18px"}} onClick={() => navigate('/ATMLoginForm')}>ATM</span>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
