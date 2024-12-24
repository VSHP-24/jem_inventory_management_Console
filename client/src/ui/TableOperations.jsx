import styled from "styled-components";

import { device } from "../utils/devices";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

export default TableOperations;
