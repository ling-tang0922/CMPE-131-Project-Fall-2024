//a wrapper to all the components
import SideNav from "./SideNav";
const WindowWrapper= ({children,showSideNav=false})=>{
    return(<div style={{margin:"0px", height:"100vh",display:"flex",width:"100vw",fontFamily:"Roboto"}}><div style={{ flex: 1}}>
      <div style={{display:"flex",flexDirection:"row"}}>
        {showSideNav && <SideNav></SideNav>}
        <div style={{marginLeft:"10px",flex:"1",marginLeft:(showSideNav)?"260px":"10px"}}>
        {children}
        </div>
        </div>
      </div></div>)

}
export default WindowWrapper;