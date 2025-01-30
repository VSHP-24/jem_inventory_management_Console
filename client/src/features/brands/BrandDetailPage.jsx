import styled from "styled-components";

import Heading from "../../ui/Heading";

import { device } from "../../utils/devices";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  display: flex;
  justify-content: space-between;
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

  @media ${device.mobileM} {
    font-size: 1rem;
    flex-direction: column;
  }
`;

const StyledBrandDetails = styled.main``;

const StyledBrandImages = styled.aside`
  @media ${device.laptopL} {
    height: 10rem;
    width: 10rem;
    align-self: center;
  }
  @media ${device.laptopS} {
    height: 10rem;
    width: 10rem;
    align-self: center;
  }
  @media ${device.tablet} {
    height: 10rem;
    width: 10rem;
    align-self: center;
  }
`;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${device.laptopL} {
    gap: 2rem;
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
