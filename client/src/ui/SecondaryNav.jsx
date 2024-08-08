import styled from "styled-components";
import secondaryNavList from "./../utils/secondaryNavList";
import StyledNavLink from "./StyledNavLink";

const StyledNav = styled.nav`
  display: flex;
  gap: 4.8rem;
`;

const StyledNavLinks = styled(StyledNavLink)`
  color: var(--color-gold-100);
`;

const StyledIcon = styled.div`
  font-size: 3rem;
`;

const StyledIconLabel = styled.span`
  font-size: 1rem;
`;

function SecondaryNav() {
  return (
    <StyledNav>
      {secondaryNavList.map((el) => (
        <StyledNavLinks to={el.name} key={el.name}>
          <StyledIcon>
            <el.icon />
          </StyledIcon>
          <StyledIconLabel>{el.name}</StyledIconLabel>
        </StyledNavLinks>
      ))}
    </StyledNav>
  );
}

export default SecondaryNav;
