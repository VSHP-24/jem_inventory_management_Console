import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { NavTabButton } from "./NavTabButton";

const StyledNav = styled.nav`
  border: 1px solid var(--color-gold-700);
  background-color: var(--color-gold-200);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.2rem;
  display: flex;
  gap: 0.4rem;
  width: 100%;
  justify-content: space-around;
`;

function NavTabs({ fieldComponent, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get(fieldComponent) || options.at(0).value;

  function handleClick(value) {
    searchParams.delete("brand");
    searchParams.delete("category");
    searchParams.set(fieldComponent, value);
    setSearchParams(searchParams);
  }
  return (
    <StyledNav>
      {options.map((option) => (
        <NavTabButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentValue}
        >
          {option.label}
        </NavTabButton>
      ))}
    </StyledNav>
  );
}

export default NavTabs;
