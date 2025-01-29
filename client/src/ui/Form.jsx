import styled, { css } from "styled-components";

import { device } from "../utils/devices";

const Form = styled.form`
  align-self: center;
  ${(props) =>
    props.type === "regular" &&
    css`
      /* Box */
      background-color: var(--color-gold-200);
      border: 1px solid var(--color-gold-500);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 60rem;
    `}

  /* Box */
  background-color: var(--color-gold-200);
  border: 1px solid var(--color-gold-500);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;

  @media ${device.laptopS} {
    width: 100%;
    padding: 1rem 2rem 1rem 1rem;
    font-size: 1rem;
  }

  @media ${device.tablet} {
    width: 100%;
    max-width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
