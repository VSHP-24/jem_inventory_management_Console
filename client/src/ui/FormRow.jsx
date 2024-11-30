import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  ${(props) =>
    props.displayDirection === "horizontal" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr;
      gap: 0.5rem;
    `}

  ${(props) =>
    props.displayDirection === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.8rem 0;
    `}
    padding: 1.2rem 0;

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
