import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  display: flex;
  background-color: blue;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  padding: 1rem;
  background-color: yellow;
`;

function Create() {
  return (
    <StyledNav>
      <StyledLink to="new-bike">New Bike</StyledLink>
      <StyledLink to="new-brand">New Brand</StyledLink>
      <StyledLink to="new-category">New Category</StyledLink>
      <StyledLink to="new-part">New Part</StyledLink>
      <StyledLink to="new-product">New Product</StyledLink>
      <StyledLink to="new-subcategory">New SubCategory</StyledLink>
    </StyledNav>
  );
}

export default Create;
