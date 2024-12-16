import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { device } from "../utils/devices";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 11rem 1fr;
  grid-template-rows: 5.2rem 1fr 2.25rem;
  height: 100vh;
  overflow: clip;
  max-width: 160rem;

  @media ${device.desktop} {
    max-width: 100rem;
  }

  @media ${device.laptopL} {
    max-width: 90rem;
  }

  @media ${device.laptopS} {
    max-width: 60rem;
    grid-template-columns: 1fr;
    grid-template-rows: 5rem 1fr 5rem 2rem;
  }

  @media ${device.tablet} {
    max-width: 50rem;
  }

  @media ${device.mobileM} {
    max-width: 40rem;
    grid-template-columns: 5rem 1fr;
    grid-template-rows: 7.5rem 1fr 3rem;
  }
`;

const Main = styled.main`
  background-color: var(--color-gold-100);
  overflow-y: scroll;
  padding: 1.6rem 2.4rem 6.4rem;

  @media ${device.laptopS} {
    grid-row: 2 / span 1;
  }

  @media ${device.mobileM} {
    grid-column: 2 / span 1;
    padding: 1rem 1.4rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
