import styled from "styled-components";
import StyledNavLink from "./StyledNavLink";

const Img = styled.img`
  height: 2.4rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledNavLink to="Dashboard">
      <Img src="/jem.png" alt="JEM Logo" />
    </StyledNavLink>
  );
}

export default Logo;
