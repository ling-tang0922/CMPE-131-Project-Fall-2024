import SideNavEmployee from "./SideNavManager";
const WindowWrapperManager = ({ children, showSideNavEmployee = false }) => {
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

export default WindowWrapperManager;