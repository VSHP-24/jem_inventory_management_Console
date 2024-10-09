import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  display: grid;
  grid-template-columns: 55rem 15rem;
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;
`;

const StyledBrandDetails = styled.main``;

const StyledBrandImages = styled.aside`
  height: 30rem;
`;

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

function BrandDetailPage({ brand }) {
  const { name, brandLogo } = brand;

  return (
    <StyledDetailPage>
      <StyledBrandDetails>
        <StyledHeading as="h2">BRAND DETAILS</StyledHeading>
        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>
      </StyledBrandDetails>

      <StyledBrandImages>
        <img src={brandLogo} alt={name} />
      </StyledBrandImages>
    </StyledDetailPage>
  );
}

export default BrandDetailPage;
