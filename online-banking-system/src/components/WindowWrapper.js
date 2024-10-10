//a wrapper to all the components

const WindowWrapper= ({children})=>{
    return(<div style={{margin:"0px", height:"100vh",display:"flex",width:"100vw",fontFamily:"Roboto"}}><div style={{ flex: 1}}>
        {children}
      </div></div>)

}
export default WindowWrapper;