import { useNavigate } from "react-router-dom";

const ATMDashboardNavBar = () => {
    const navigate = useNavigate();
    return (
        <div style={{ position: "fixed", top: 0, backgroundColor: "#CBF3C6", width: "100%", zIndex: 1000 }}>
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "10vh", padding: "0 20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img 
                        style={{ height: "10vh", cursor: "pointer" }} 
                        src="logo_131_1.png" 
                        alt="Logo" 
                        onClick={() => navigate('/')} 
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button 
                        style={{ 
                            cursor: "pointer", 
                            fontSize: "18px", 
                            border: "none", 
                            background: "none", 
                            color: "black" 
                        }} 
                        onClick={() => navigate('/')}
                    >
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default ATMDashboardNavBar;