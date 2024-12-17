import styled, { css } from "styled-components";
import { device } from "../utils/devices";

const StyledFormRow = styled.div`
  gap: 0.5rem;
  padding: 1rem 0;
  ${(props) =>
    props.displayDirection === "horizontal" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 15rem 1fr;
    `}

  ${(props) =>
    props.displayDirection === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
      padding: 0.8rem 0;
    `}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    align-items: start;

    &:has(button) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  @media ${device.tablet} {
    padding: 1rem 0;
  }
`;

const Label = styled.label`
  font-weight: 500;

  @media ${device.tablet} {
    font-size: 1.2rem;
  }
`;

const Error = styled.span`
  grid-column-start: 2;
  font-size: 1rem;
  color: var(--color-red-800);
  font-weight: 800;
`;

function FormRow({ label, error, displayDirection = "horizontal", children }) {
  return (
    <StyledFormRow displayDirection={displayDirection}>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
export default FormRow;
