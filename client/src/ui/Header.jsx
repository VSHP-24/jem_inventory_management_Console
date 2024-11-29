import styled from "styled-components";
import Logo from "./Logo";
import SecondaryNav from "./SecondaryNav";
import Logout from "../features/authentication/Logout";

const StyledHeader = styled.header`
  background-color: var(--color-grey-900);
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 6rem 2rem 0.8rem;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
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
