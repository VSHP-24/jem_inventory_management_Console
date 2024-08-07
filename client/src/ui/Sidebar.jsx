import { NavLink } from "react-router-dom";

import styled from "styled-components";
import mainNavList from "./../utils/mainNavList.js";

const StyledAside = styled.aside`
  font-size: 1 rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gold-500);
  justify-content: space-around;
  padding: 1.6rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-grey-900);
  font-size: 1.2rem;
  font-weight: 500;
`;

const StyledIcon = styled.div``;

const StyledIconLabel = styled.div``;

function MainNav() {
  return (
    <StyledAside>
      {mainNavList.map((el) => (
        <StyledNavLink to={el.name} key={el.name}>
          <StyledIcon>
            <el.icon />
          </StyledIcon>
          <StyledIconLabel>{el.name}</StyledIconLabel>
        </StyledNavLink>
      ))}
    </StyledAside>
  );
}

export default MainNav;
