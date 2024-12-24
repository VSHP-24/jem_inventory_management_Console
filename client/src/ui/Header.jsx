import styled from "styled-components";

import Logo from "./Logo";
import SecondaryNav from "./SecondaryNav";
import Logout from "../features/authentication/Logout";

import { device } from "../utils/devices";

const StyledHeader = styled.header`
  background-color: var(--color-grey-900);
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 6rem 2rem 0.8rem;

  @media ${device.laptopS} {
    padding: 2rem;
    gap: 2rem;
  }

  @media ${device.mobileM} {
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    padding: 0 1rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  @media ${device.mobileM} {
    gap: 1rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <StyledContainer>
        <SecondaryNav />
        <Logout />
      </StyledContainer>
    </StyledHeader>
  );
}

export default Header;
