import styled, { css } from "styled-components";

import { device } from "../utils/devices";

const StyledFormRow = styled.div`
  gap: 0.5rem;
  padding: 0.5rem 0.2rem;

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
    `}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    max-width: 100dvw;
    gap: 1.2rem;
    align-items: center;

    @media ${device.laptopL} {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    @media ${device.tablet} {
      gap: 0.5rem;
      font-size: 1rem;
      justify-self: center;
    }

    @media ${device.mobileM} {
      gap: 0.5rem;
      font-size: 0.85rem;
      justify-self: center;
    }
  }

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const Label = styled.label`
  font-weight: 700;

  @media ${device.tablet} {
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
  }
`;

const Error = styled.span`
  grid-column-start: 2;
  font-size: 1rem;
  color: var(--color-red-800);
  font-weight: 800;

  @media ${device.tablet} {
    font-size: 0.9rem;
  }

  @media ${device.mobileM} {
    font-size: 0.8rem;
  }
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
