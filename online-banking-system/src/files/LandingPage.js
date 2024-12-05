import React, { useEffect } from 'react';
import WindowWrapper from "../components/WindowWrapper";
import NavBar from "../components/NavBar";
import ImageSlider from "../components/ImageSlider";

const LandingPage = () => {
    const slides = [
        { url: "http://localhost:3000/image-1.jpg", title: "Experience Banking Anywhere", description: "Access your account and manage finances from the comfort of your favorite beach." },
        { url: "http://localhost:3000/image-2.jpg", title: "Sailing Through Your Finances", description: "Enjoy seamless fund transfers and payments on-the-go, wherever life takes you." },
        { url: "http://localhost:3000/image-3.jpg", title: "Nature Meets Technology", description: "Our app simplifies your financial journey, helping you stay connected and in control." },
        { url: "http://localhost:3000/image-4.jpg", title: "Urban Banking Made Easy", description: "Experience hassle-free banking in the city that never sleeps—anytime, anywhere." },
        { url: "http://localhost:3000/image-5.jpg", title: "Travel with Confidence", description: "Manage your finances internationally—transfer funds and check your balance wherever you are." }
    ];

    const loadFont = () => {
        const link = document.createElement("link");
        link.href = "https://fonts.cdnfonts.com/css/segoe-ui-variable";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    };

    useEffect(() => {
        loadFont();
    }, []);

    const containerStyles = {
        height: "400px",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    };

    const testimonialStyle = {
        flex: "1",
        padding: "20px",
        boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.3)",
        fontSize: "18px",
        lineHeight: "1.6",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        fontWeight: "500",
        letterSpacing: "0.5px",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px"
    };

    const featureBoxStyle = {
        margin: "20px 0px", 
        boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)", 
        display: "flex", 
        flexDirection: "row", 
        minHeight: "500px",
        justifyContent: "space-between",
    };

    const featureContentStyle = {
        flex: "2",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        textAlign: "center", 
    };

    const featureImageStyle = {
        width: "800px", 
        height: "500px", 
        objectFit: "cover", 
    };

    const featureTitleStyle = {
        fontSize: "45px",
        fontWeight: "bold",
        color: "green",
        marginBottom: "10px",
    };

    const featureDescStyle = {
        fontSize: "33px",
        color: "#555",
        marginTop: "0",
    };

    return (
        <WindowWrapper>
            <NavBar />
            <div style={{ margin: "10vh 0 0 0" }}>
                <div style={containerStyles}>
                    <ImageSlider slides={slides} />
                </div>

                <div style={{ display: "flex", minHeight: "300px", flexDirection: "row", boxSizing: "border-box", margin: "10px", gap: "20px" }}>
                    <div style={testimonialStyle}>
                        “As a college student balancing classes and a part-time job, I want to easily manage my finances online, so that I can focus on my studies and social life without worrying about banking hassles. Thanks to this app, my finances and budgeting, transferring money, and depositing checks are easier than ever. I highly recommend it to any student looking to manage their finances easily.” -Sam Darnold
                    </div>

                    <div style={testimonialStyle}>
                        “Thanks to this online banking app I was able to make better decisions about where my money was going. The app made it so easy to see all of my transactions, and I never realized just how much I was spending. The program's interface made it easy for me to understand, and I was able to make an account in no time. I would like to recommend this program to anyone that wants to be more conscious with their spending.” -Robbert Bobbert
                    </div>

                    <div style={testimonialStyle}>
                        “At first I was hesitant about using this new program. My brother is the tech wiz in the family, and I’m not really good at learning new things on a computer. However, after creating an account for myself, I was surprised by how easy it was to use this bank. Even when I had questions, it was easy to reach out to the employees for help so I could organize my funds in a timely manner.” -Michael Jordan
                    </div>
                </div>

                <div style={{ margin: "10px" }}>
                    <div style={featureBoxStyle}>
                        <div style={featureImageStyle}>
                            <img style={{ objectFit: "cover", height: "100%", width: "100%" }} src="/BankSignUp.jpg" alt="Easy Account Setup" />
                        </div>
                        <div style={featureContentStyle}>
                            <h3 style={featureTitleStyle}>Easy Account Setup</h3>
                            <p style={featureDescStyle}>Quickly register for your online banking account in just a few minutes.</p>
                        </div>
                    </div>

                    <div style={featureBoxStyle}>
                        <div style={featureContentStyle}>
                            <h3 style={featureTitleStyle}>Seamless Fund Transfers</h3>
                            <p style={featureDescStyle}>Transfer money effortlessly to friends or family within our bank.</p>
                        </div>
                        <div style={featureImageStyle}>
                            <img style={{ objectFit: "cover", height: "100%", width: "100%" }} src="/TransferFunds.jpg" alt="Seamless Fund Transfers" />
                        </div>
                    </div>

                    <div style={featureBoxStyle}>
                        <div style={featureImageStyle}>
                            <img style={{ objectFit: "cover", height: "100%", width: "100%" }} src="/ElectronicCheckDeposit.jpg" alt="Electronic Check Deposit" />
                        </div>
                        <div style={featureContentStyle}>
                            <h3 style={featureTitleStyle}>Electronic Check Deposit</h3>
                            <p style={featureDescStyle}>Conveniently deposit checks by simply uploading images from your device.</p>
                        </div>
                    </div>

                    <div style={featureBoxStyle}>
                        <div style={featureContentStyle}>
                            <h3 style={featureTitleStyle}>Secure ATM Withdrawals</h3>
                            <p style={featureDescStyle}>Withdraw cash at ATMs using your secure login credentials.</p>
                        </div>
                        <div style={featureImageStyle}>
                            <img style={{ objectFit: "cover", height: "100%", width: "100%" }} src="/OnlineATMPhoto.gif" alt="Secure ATM Withdrawals" />
                        </div>
                    </div>
                </div>
            </div>
        </WindowWrapper>
    );
}

export default LandingPage;
