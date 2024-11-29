import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 1rem 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  color: var(--color-gold-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &:hover,
  &:active {
    color: var(--color-grey-900);
    background-color: var(--color-gold-700);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
