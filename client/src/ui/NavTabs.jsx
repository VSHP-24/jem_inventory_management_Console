import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { NavTabButton } from "./NavTabButton";
import { device } from "../utils/devices";

const StyledNav = styled.nav`
  border: 1px solid var(--color-gold-700);
  background-color: var(--color-gold-200);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.2rem;
  display: flex;
  gap: 0.4rem;
  justify-content: space-around;
  width: ${(props) => {
    return props.width;
  }};

  @media ${device.laptopL} {
    gap: 0.1rem;
    padding: 0 0.1rem;
    font-size: 1.2rem;
  }

  @media ${device.tablet} {
    width: 100%;
    font-size: 1.2rem;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
  }
`;

function NavTabs({ fieldComponent, options, width = "100%" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get(fieldComponent) || options.at(0).value;

  function handleClick(value) {
    searchParams.delete("brand");
    searchParams.delete("category");
    searchParams.delete("sortBy");
    searchParams.delete("page");
    searchParams.set(fieldComponent, value);
    setSearchParams(searchParams);
  }
  return (
    <StyledNav width={width}>
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
