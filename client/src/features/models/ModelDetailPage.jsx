import styled from "styled-components";

import Heading from "../../ui/Heading";

import { device } from "../../utils/devices";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;

  @media ${device.laptopS} {
    font-size: 1.4rem;
  }
  @media ${device.tablet} {
    font-size: 1.2rem;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
    flex-direction: column;
  }
`;

const StyledModelDetails = styled.main``;

const StyledModelImages = styled.aside`
  @media ${device.laptopS} {
    height: 20rem;
    width: 20rem;
    align-self: center;
  }
  @media ${device.tablet} {
    height: 15rem;
    width: 15rem;
    align-self: center;
  }
`;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media ${device.laptopS} {
    display: grid;
    grid-template-columns: 5rem 1fr;
  }

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
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

function ModelDetailPage({ model }) {
  const { name, brand, version, year, description, bikeImage } = model;

  return (
    <StyledDetailPage>
      <StyledModelDetails>
        <StyledHeading as="h2">BIKE MODEL DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Brand</StyledHeader>
          <StyledDetails>
            {brand.name ? brand.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Version</StyledHeader>
          <StyledDetails>{version ? version : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Year</StyledHeader>
          <StyledDetails>{year ? year : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Description</StyledHeader>
          <StyledDetails>
            {description ? description : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
      </StyledModelDetails>

      <StyledModelImages>
        <img src={bikeImage} alt={name} />
      </StyledModelImages>
    </StyledDetailPage>
  );
}

export default ModelDetailPage;
