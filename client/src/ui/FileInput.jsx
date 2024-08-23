import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.2rem;
  border-radius: var(--border-radius-md);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.4rem 1rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-md);
    border: none;
    color: var(--color-gold-100);
    background-color: var(--color-grey-700);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-grey-800);
    }
  }
`;

export default FileInput;
