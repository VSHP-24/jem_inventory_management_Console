import styled from "styled-components";
import { MdOutlineRestore } from "react-icons/md";

import Button from "./Button";

import { device } from "../utils/devices";

const StyledButton = styled(Button)`
  background: none;
  border: none;
  padding: 0;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  width: 3rem;

  &:hover {
    background-color: var(--color-gold-700);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);

    @media ${device.laptopL} {
      width: 2rem;
      height: 2rem;
    }
    @media ${device.tablet} {
      width: 1.8rem;
      height: 1.8rem;
    }

    @media ${device.mobileM} {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

function RestoreButton({ onHandleRestoreButtonClick }) {
  return (
    <StyledButton onClick={onHandleRestoreButtonClick}>
      <MdOutlineRestore />
    </StyledButton>
  );
}

export default RestoreButton;
