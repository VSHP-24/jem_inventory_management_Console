import styled from "styled-components";

import Heading from "../../ui/Heading";

import { device } from "../../utils/devices";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;

  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const StyledSubCategoryDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StyledHeader = styled.div`
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const StyledDetails = styled.div`
  font-weight: 300;
`;

const StyledHeading = styled(Heading)`
  padding-bottom: 2rem;
`;

function SubCategoryDetailPage({ subCategory }) {
  const { name, category } = subCategory;

  return (
    <StyledDetailPage>
      <StyledSubCategoryDetails>
        <StyledHeading as="h2">SUBCATEGORY DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Category</StyledHeader>
          <StyledDetails>
            {category.name ? category.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
      </StyledSubCategoryDetails>
    </StyledDetailPage>
  );
}

export default SubCategoryDetailPage;
