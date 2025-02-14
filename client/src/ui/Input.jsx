import styled from "styled-components";

import { device } from "../utils/devices";

const Input = styled.input`
  border: 1px solid var(--color-grey-600);
  background-color: var(--color-gold-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 30rem;

  @media ${device.tablet} {
    width: 100%;
  }
`;

export default Input;
