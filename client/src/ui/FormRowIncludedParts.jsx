import styled from "styled-components";

import { device } from "../utils/devices";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 15rem 2fr 0.75fr;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem 0.2rem;

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
    display: grid;
    grid-template-columns: 10rem 2fr 0.75fr;
    align-items: center;
  }

  @media ${device.laptopS} {
    display: grid;
    grid-template-columns: 7.5rem 2fr 0.5fr;
  }

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.mobileM} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  font-weight: 700;

  @media ${device.tablet} {
    font-size: 1rem;
    grid-column-start: span 2;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
    grid-column-start: span 2;
  }
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
