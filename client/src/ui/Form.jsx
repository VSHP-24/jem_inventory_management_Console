import styled, { css } from "styled-components";
import { device } from "../utils/devices";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

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
    padding: 2.4rem 4rem;

  /* Box */
  background-color: var(--color-gold-200);
  border: 1px solid var(--color-gold-500);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;

  @media ${device.laptopS} {
    padding: 1.4rem;
    font-size: 1.2rem;
  }

  @media ${device.tablet} {
    padding: 1.2rem;
    font-size: 1rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
