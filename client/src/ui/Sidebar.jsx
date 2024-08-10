import styled from "styled-components";
import mainNavList from "./../utils/mainNavList.js";
import StyledNavLink from "./StyledNavLink.jsx";

const StyledAside = styled.aside`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gold-300);
  justify-content: space-around;
  padding: 0.4rem 0.2rem 2.4rem;
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
