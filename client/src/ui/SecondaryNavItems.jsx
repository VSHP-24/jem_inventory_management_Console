import styled from "styled-components";

const StyledCreate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  /* padding: 6.4rem; */
  padding: 6rem;
  height: 100%;
  align-items: center;
`;

function SecondaryNavItems({ children }) {
  return <StyledCreate>{children}</StyledCreate>;
}

export default SecondaryNavItems;
