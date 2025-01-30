import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { device } from "../utils/devices";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-900);
  grid-column: 1/-1;
  color: var(--color-gold-100);
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;

  @media ${device.laptopS} {
    font-size: 1.2rem;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-gold-100);
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media ${device.mobileM} {
    flex-direction: column;
    align-items: center;
  }
`;

function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();

  return (
    <StyledFooter>
      <Content>
        <p>{`© ${currentYear}, All Rights Reserved `}</p>
        <p>
          {`Developed by `}
          <StyledNavLink target="_blank" to="https://vshp.dev/">
            VSHP
          </StyledNavLink>
        </p>
      </Content>
    </StyledFooter>
  );
}

export default Footer;
