import styled from "styled-components";

import mainNavList from "./../utils/mainNavList.js";
import StyledNavLink from "./StyledNavLink.jsx";

import { device } from "../utils/devices.js";

const StyledAside = styled.aside`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gold-300);
  justify-content: space-around;
  padding: 0.4rem 0.2rem 2.4rem;

  @media ${device.laptopS} {
    grid-row: 3 / span 1;
    flex-direction: row;
  }

  @media ${device.mobileM} {
    grid-row: 2;
    flex-direction: column;
  }
`;

const StyledNavLinks = styled(StyledNavLink)`
  color: var(--color-grey-900);

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-gold-100);
    background-color: var(--color-grey-800);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-900);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-gold-100);
  }

  @media ${device.laptopL} {
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media ${device.laptopS} {
    flex-direction: column;
    height: 5rem;
    gap: 0;
    padding: 0 1rem;
  }

  @media ${device.tablet} {
    & svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  @media ${device.mobileM} {
    justify-content: space-evenly;
    & svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const StyledIcon = styled.div`
  font-size: 2rem;

  @media ${device.laptopL} {
    font-size: 1rem;
  }
  @media ${device.laptopS} {
    font-size: 2rem;
  }

  @media ${device.tablet} {
    font-size: 1.8rem;
  }

  @media ${device.mobileM} {
    font-size: 1.6rem;
  }
`;

const StyledIconLabel = styled.span`
  font-size: 1.2rem;

  @media ${device.laptopL} {
    font-size: 1rem;
  }
  @media ${device.laptopS} {
    font-size: 1rem;
  }

  @media ${device.tablet} {
    font-size: 0.8rem;
  }

  @media ${device.mobileM} {
    font-size: 0.75rem;
  }
`;

// THESE ARE NAV COMPONENTS IN THE ASIDE COMPONENT
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
