import styled from "styled-components";

import Heading from "../../ui/Heading";

import { device } from "../../utils/devices";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;

  @media ${device.laptopL} {
    font-size: 1rem;
  }

  @media ${device.laptopS} {
    font-size: 1.4rem;
  }

  @media ${device.tablet} {
    font-size: 1.2rem;
  }
`;

const StyledCategoryDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
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

function CategoryDetailPage({ category }) {
  const { name } = category;

  return (
    <StyledDetailPage>
      <StyledCategoryDetails>
        <StyledHeading as="h2">CATEGORY DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>
      </StyledCategoryDetails>
    </StyledDetailPage>
  );
}

export default CategoryDetailPage;
