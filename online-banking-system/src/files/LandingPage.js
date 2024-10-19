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
        <div style={{flex:"1",marginRight:"20px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",}}>Information</div>
        <div style={{flex:"1",marginRight:"20px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",}}>Information</div>
        <div style={{flex:"1",marginRight:"20px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",}}>Information</div>
        </div>
        <div style={{"margin":"10px"}}>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
            <div style={{"flex":"1",height:"100%",}}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"></img>
            </div>
            <div style={{"flex":"2"}}></div>
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
        <div style={{"flex":"2"}}></div>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"></img>
            </div>
            
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"></img>
            </div>
            <div style={{"flex":"2"}}></div>
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
        <div style={{"flex":"2"}}></div>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"></img>
            </div>
            
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"></img>
            </div>
            <div style={{"flex":"2"}}></div>
        </div>
        <div style={{margin:"20px 0px",boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.3)",display:"flex",flexDirection:"row"}}>
        <div style={{"flex":"2"}}></div>
            <div style={{"flex":"1",height:"100%", }}>
                <img style={{objectFit: "cover",height:"100%",width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"></img>
            </div>
            
        </div>
        
        
        </div>
        </div>
        </WindowWrapper>)
}
export default LandingPage;