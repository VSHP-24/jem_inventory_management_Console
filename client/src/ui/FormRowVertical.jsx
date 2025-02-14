import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem 0;
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

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
