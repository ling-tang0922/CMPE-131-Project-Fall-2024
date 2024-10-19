import React from "react";
import WindowWrapper from "../components/WindowWrapper";
import NavBar from "../components/NavBar";
import './AboutUs.css';

const AboutUs = () => {
    return (
            <WindowWrapper>
            <NavBar></NavBar>
            <div className="container">
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>
                        We are a group of 8 students at SJSU; this is our project for CMPE 131 Fall 2024. We hope you enjoy what we have to offer!
                    </p>
                    <p>
                        Our group consists of: Anthony Cuellar, Brandon Lau, Dallas Lendaris, Ethan John Bocaling, Leonardo Coronel, Ling Tang, Manav Sharma, and Roman Lozano.
                    </p>
                </div>
                <div className="picture">
                    <img className="picture" src={"logo_131_4.png"} alt="pic"/>  {/* temporary pic */}
                </div>
            </div>
            </WindowWrapper>
    );
}

export default AboutUs;