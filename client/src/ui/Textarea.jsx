import styled from "styled-components";

import { device } from "../utils/devices";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-600);
  background-color: var(--color-gold-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  width: 30rem;
  height: 8rem;

  @media ${device.tablet} {
    width: 100%;
  }
`;

export default Textarea;
