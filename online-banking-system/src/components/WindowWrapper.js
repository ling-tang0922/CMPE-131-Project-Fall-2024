//a wrapper to all the components
import SideNav from "./SideNav";
const WindowWrapper = ({ children, showSideNav = false }) => {
  return (
      <div style={{
          margin: "0px",
          minHeight: "100vh",
          display: "flex",
          width: "100vw",
          fontFamily: "Roboto",
        //   backgroundColor: "#FBF6EE"
      }}>
          <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                  {showSideNav && <SideNav />}
                  <div style={{
                      marginLeft: (showSideNav) ? "260px" : "10px",
                      flex: "1"
                  }}>
                      {children}
                  </div>
              </div>
          </div>
      </div>
  );
}

export default WindowWrapper;