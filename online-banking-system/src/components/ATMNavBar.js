import { useNavigate } from "react-router-dom";

const ATMNavBar = () => {
    const navigate = useNavigate();
    return (
        <div style={{ position: "fixed", top: 0, backgroundColor: "white", width: "100%", border: "solid black", borderWidth: "0 0 1px 0", zIndex: 1000 }}>
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
                        Back to Home
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default ATMNavBar;


    

