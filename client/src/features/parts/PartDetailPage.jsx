import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;
`;

const StyledPartDetails = styled.main``;

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

function PartDetailPage({ part }) {
  const {
    name,
    length,
    insideDiameter,
    outsideDiameter,
    threadDiameter,
    threadPitch,
    shankLength,
    headHeight,
    headDiameter,
    allenKeySize,
    width,
    thickness,
    material,
    quantity,
  } = part;

  return (
    <StyledDetailPage>
      <StyledPartDetails>
        <StyledHeading as="h2">PART DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Quantity</StyledHeader>
          <StyledDetails>{quantity ? quantity : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Material</StyledHeader>
          <StyledDetails>{material ? material : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Length</StyledHeader>
          <StyledDetails>
            {length ? `${length} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Inside Diameter</StyledHeader>
          <StyledDetails>
            {insideDiameter ? `${insideDiameter} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Outside Diameter</StyledHeader>
          <StyledDetails>
            {outsideDiameter ? `${outsideDiameter} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Thread Diameter</StyledHeader>
          <StyledDetails>
            {threadDiameter ? `${threadDiameter} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Thread Pitch</StyledHeader>
          <StyledDetails>
            {threadPitch ? `${threadPitch} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Shank Length</StyledHeader>
          <StyledDetails>
            {shankLength ? `${shankLength} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Head Height</StyledHeader>
          <StyledDetails>
            {headHeight ? `${headHeight} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Head Diameter</StyledHeader>
          <StyledDetails>
            {headDiameter ? `${headDiameter} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Allen Key Size</StyledHeader>
          <StyledDetails>
            {allenKeySize ? `${allenKeySize} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Width</StyledHeader>
          <StyledDetails>{width ? `${width} mm` : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Thickness</StyledHeader>
          <StyledDetails>
            {thickness ? `${thickness} mm` : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
      </StyledPartDetails>
    </StyledDetailPage>
  );
}

export default PartDetailPage;
