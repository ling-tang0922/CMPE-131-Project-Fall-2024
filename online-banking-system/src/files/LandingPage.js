import WindowWrapper from "../components/WindowWrapper";
import NavBar from "../components/NavBar";
import ImageSlider from "../components/ImageSlider";

const LandingPage = () =>{

    const slides = [
        {url: "http://localhost:3000/image-1.jpg", title: "Beach"},
        {url: "http://localhost:3000/image-2.jpg", title: "Boat"},
        {url: "http://localhost:3000/image-3.jpg", title: "Forest"},
        {url: "http://localhost:3000/image-4.jpg", title: "City"},
        {url: "http://localhost:3000/image-5.jpg", title: "Italy"}
        
    ]

    const containerStyles = {
        height: "400px",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    };

    return(<WindowWrapper>
        <NavBar>
        </NavBar>
        <div style={{"margin":"10vh 0 0 0"}}>
        <div>
            <div style = {containerStyles}>
                <ImageSlider slides = {slides}/>
            </div>
        </div>

        <div style={{"display":"flex","minHeight":"300px",flexDirection:"row", boxSizing: "border-box",margin:"10px"}}>
        <div style={{flex:"1",marginRight:"20px",boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.3)", fontSize: "20px"}}>
        “As a college student balancing classes and a part-time job, I want to easily manage my finances online, so that I can focus on my studies and social life without worrying about banking hassles. 
        Thanks to this app, my finances and budgeting, transferring money, and depositing checks are easier than ever. 
        I highly recommend it to any student looking to manage their finances easily.” -Sam Darnold
        </div>
        <div style={{flex:"1",marginRight:"20px",boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.3)", fontSize: "20px"}}>
        “Thanks to this online banking app I was able to make better decisions to where my money was going. 
        The app made it so easy to see all of my transactions and I never realized just how much I was spending. 
        The program's interface made it easy for me to understand and I was able to make an account in no time. 
        I would like to recommend this program to anyone that wants to be more conscious with their spending.” -Robbert Bobbert
        </div>
        <div style={{flex:"1",marginRight:"20px",boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.3)", fontSize: "20px"}}>
        “At first I was hesitant about using this new program. My brother is the tech wiz in the family and I’m not really good at learning new things on a computer.
        However after creating an account for myself, I was surprised by how easy it was to use this bank.
        Even when I had questions about certain aspects of the system, it was very easy to reach out to the employees for help so I could organize my funds in a timely manner.”
         -Michael Jordan
        </div>
        </div>
        <div style={{"margin":"10px"}}>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
            <div style={{"flex":"1",height:"100%",}}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" alt ="1"></img>
            </div>
            <div style={{"flex":"2"}}></div>
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
        <div style={{"flex":"2"}}></div>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" alt ="2"></img>
            </div>
            
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" alt ="3"></img>
            </div>
            <div style={{"flex":"2"}}></div>
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
        <div style={{"flex":"2"}}></div>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" alt ="4"></img>
            </div>
            
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" alt ="5"></img>
            </div>
            <div style={{"flex":"2"}}></div>
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
        <div style={{"flex":"2"}}></div>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" alt ="6"></img>
            </div>
            
        </div>
        
        
        </div>
        </div>
        </WindowWrapper>)
}
export default LandingPage;