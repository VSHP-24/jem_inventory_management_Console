import styled from "styled-components";
import SecondaryNavItems from "../ui/SecondaryNavItems";

export const StyledButton = styled.button`
  background-color: transparent;
  font-size: 1.6rem;
  padding: 2rem;
`;

function Manage() {
  return (
    <SecondaryNavItems>
      <StyledButton>Bikes</StyledButton>
      <StyledButton>Brands</StyledButton>
      <StyledButton>Categories</StyledButton>
      <StyledButton>Parts</StyledButton>
      <StyledButton>Products</StyledButton>
      <StyledButton>SubCategories</StyledButton>
    </SecondaryNavItems>
  );
}

export default Manage;
