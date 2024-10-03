import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;
`;

const StyledSubCategoryDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 10rem 1fr;
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
