import styled, { css } from "styled-components";

import { device } from "../utils/devices";

export const NavTabButton = styled.button`
  background-color: var(--color-gold-200);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-grey-800);
      color: var(--color-gold-100);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-grey-800);
    color: var(--color-gold-100);
  }

  @media ${device.laptopL} {
    padding: 0.4rem;
  }

  @media ${device.tablet} {
    padding: 0.2rem;
  }
`;
