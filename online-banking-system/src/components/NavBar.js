import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div style={{ position: "fixed", backgroundColor: "white", width: "100%", border: "solid black", borderWidth: "0 0 1px 0" }}>
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "10vh", padding: "0 20px" }}>
                <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
                    <img style={{ height: "10vh" }} src="logo_131_1.png" alt="Logo" />
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                    <span style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => navigate('/')}>Home</span>
                    <span style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => navigate('/AboutUs')}>About Us</span>
                    <span style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => navigate('/CustomerLogin')}>Customer Login</span>
                    <span style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => navigate('/EmployeeLogin')}>Employee Login</span>
                    <span style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => navigate('/ATMLoginForm')}>ATM</span>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
