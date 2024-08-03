import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <div>App Layout</div>;
      <Outlet />
    </>
  );
}

export default AppLayout;
