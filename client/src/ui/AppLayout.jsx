import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 11rem 1fr;
  grid-template-rows: 5.2rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-gold-100);
  overflow-y: scroll;
  padding: 1.6rem 2.4rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
