import styled from "styled-components";

import { device } from "../utils/devices";

const Select = styled.select`
  border: 1px solid var(--color-grey-600);
  background-color: var(--color-gold-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  width: 30rem;
  box-shadow: var(--shadow-sm);

  @media ${device.laptopS} {
    width: 100%;
  }

  @media ${device.tablet} {
    padding: 0.8rem;
    width: 100%;
  }

  @media ${device.mobileM} {
    width: 100%;
  }
`;

export default Select;
