import styled from "styled-components";
import mainNavList from "./../utils/mainNavList.js";
import StyledNavLink from "./StyledNavLink.jsx";

const StyledAside = styled.aside`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gold-500);
  justify-content: space-around;
  padding: 0.4rem 1.2rem 2.4rem;
`;

const StyledNavLinks = styled(StyledNavLink)`
  color: var(--color-grey-900);
`;

const StyledIcon = styled.div`
  font-size: 2rem;
`;

const StyledIconLabel = styled.span`
  font-size: 1.2rem;
`;

function MainNav() {
  return (
    <StyledAside>
      {mainNavList.map((el) => (
        <StyledNavLinks type="vertical" to={el.name} key={el.name}>
          <StyledIcon>
            <el.icon />
          </StyledIcon>
          <StyledIconLabel>{el.name}</StyledIconLabel>
        </StyledNavLinks>
      ))}
    </StyledAside>
  );
}

export default MainNav;
