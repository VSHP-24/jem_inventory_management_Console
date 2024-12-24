import styled from "styled-components";

import StyledNavLink from "./StyledNavLink";

import { device } from "../utils/devices";

const Img = styled.img`
  height: ${(props) => props.height};
  width: auto;

  @media ${device.tablet} {
    height: 1.8rem;
  }

  @media ${device.mobileM} {
    height: 1.6rem;
  }
`;

function Logo({ allowRedirect = true, height = "2.4rem" }) {
  return (
    <>
      {allowRedirect && (
        <StyledNavLink to="Dashboard">
          <Img src="/jem.png" alt="JEM Logo" height={height} />
        </StyledNavLink>
      )}
      {!allowRedirect && <Img src="/jem.png" alt="JEM Logo" height={height} />}
    </>
  );
}

export default Logo;
