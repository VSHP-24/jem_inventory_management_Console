import styled, { css } from "styled-components";

import { device } from "../utils/devices";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;

      @media ${device.laptopL} {
        font-size: 1.6rem;
      }

      @media ${device.mobileM} {
        font-size: 1.2rem;
      }
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.8rem;
      font-weight: 500;

      @media ${device.laptopL} {
        font-size: 1.4rem;
      }

      @media ${device.mobileM} {
        font-size: 1rem;
      }
    `}

  line-height: 1.4
`;

export default Heading;
