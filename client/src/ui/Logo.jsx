import styled from "styled-components";
import StyledNavLink from "./StyledNavLink";

const Img = styled.img`
  height: ${(props) => props.height};
  width: auto;
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
