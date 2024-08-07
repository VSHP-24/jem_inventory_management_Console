import styled from "styled-components";

const Img = styled.img`
  height: 2.4rem;
  width: auto;
`;

function Logo() {
  return <Img src="/jem.png" alt="JEM Logo" />;
}

export default Logo;
