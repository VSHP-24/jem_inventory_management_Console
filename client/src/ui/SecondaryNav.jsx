import { NavLink } from "react-router-dom";

import styled from "styled-components";
import secondaryNavList from "./../utils/secondaryNavList";

const StyledNav = styled.nav`
  display: flex;
  gap: 4.8rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-gold-100);
  line-height: 1;
`;

const StyledIcon = styled.div`
  font-size: 3rem;
`;

const StyledIconLabel = styled.div`
  font-size: 1rem;
`;

function SecondaryNav() {
  return (
    <StyledNav>
      {secondaryNavList.map((el) => (
        <StyledNavLink to={el.name} key={el.name}>
          <StyledIcon>
            <el.icon />
          </StyledIcon>
          <StyledIconLabel>{el.name}</StyledIconLabel>
        </StyledNavLink>
      ))}
    </StyledNav>
  );
}

export default SecondaryNav;
