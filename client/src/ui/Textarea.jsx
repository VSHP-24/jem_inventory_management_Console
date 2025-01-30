import styled from "styled-components";

import { device } from "../utils/devices";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-600);
  background-color: var(--color-gold-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  height: 8rem;
  width: 100%;
  max-width: 35rem;

  @media ${device.laptopL} {
    width: 100%;
  }
  @media ${device.laptopS} {
    width: 100%;
  }

  @media ${device.tablet} {
    width: 100%;
  }

  @media ${device.mobileM} {
    width: 100%;
  }
`;

export default Textarea;
