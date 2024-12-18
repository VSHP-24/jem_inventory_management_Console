import styled from "styled-components";
import { device } from "../utils/devices";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 15rem 30rem 7rem;
  align-items: center;
  gap: 0.5rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
  &:button {
    gap: 1.2rem;
  }

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  grid-column-start: 2;
  font-size: 1rem;
  color: var(--color-red-800);
  font-weight: 800;
`;

function FormRowIncludedParts({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowIncludedParts;
