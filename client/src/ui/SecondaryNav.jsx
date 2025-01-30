import styled from "styled-components";

import secondaryNavList from "./../utils/secondaryNavList";
import StyledNavLink from "./StyledNavLink";
import { device } from "../utils/devices";

const StyledNav = styled.nav`
  display: flex;
  gap: 2.4rem;

  @media ${device.tablet} {
    gap: 1.2rem;
  }

  @media ${device.mobileM} {
    gap: 1rem;
  }
`;

const StyledNavLinks = styled(StyledNavLink)`
  color: var(--color-gold-100);
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-900);
    background-color: var(--color-gold-700);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-gold-100);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-grey-900);
  }

  @media ${device.tablet} {
    & svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

const StyledIcon = styled.div`
  font-size: 2rem;

  @media ${device.laptopS} {
    font-size: 1rem;
  }

  @media ${device.tablet} {
    font-size: 1.8rem;
  }
`;

const StyledIconLabel = styled.span`
  font-size: 1rem;

  @media ${device.laptopS} {
    font-size: 1rem;
  }

  @media ${device.tablet} {
    font-size: 0.8rem;
  }
`;

// THESE ARE HEADER NAV COMPONENTS
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
