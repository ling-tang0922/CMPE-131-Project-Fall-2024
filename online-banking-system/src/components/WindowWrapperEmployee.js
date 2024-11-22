import SideNavEmployee from "./SideNavEmployee";
const WindowWrapperEmployee = ({ children, showSideNavEmployee = false }) => {
  const bankID = localStorage.getItem("bankID")
  return (
    <div
      style={{
        margin: "0px",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Roboto",
        viewport: "width=device-width, initial-scale=1",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {showSideNavEmployee && <SideNavEmployee />}
          <div
            style={{
              marginLeft: showSideNavEmployee ? "260px" : "0px",
              flex: "1",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowWrapperEmployee;