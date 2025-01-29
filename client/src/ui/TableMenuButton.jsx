import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

import { device } from "../utils/devices";

const StyledMenuButton = styled.button`
  background: none;
  border: none;
  padding-right: 2.5rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  width: 0.5rem;
  justify-self: center;

  &:hover {
    background-color: var(--color-gold-700);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);

    @media ${device.mobileM} {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  @media ${device.tablet} {
    justify-self: flex-end;
    width: 1.5rem;
  }

  position: ${(props) => props?.tablePosition};
  top: ${(props) => props.top};
  right: ${(props) => props?.right};
`;

function TableMenuButton({
  id,
  openId,
  close,
  open,
  setPosition,
  tablePosition = "absolute",
  top = "0.5rem",
  right = "0.5rem",
}) {
  function handleClickMenuButton(e) {
    e.stopPropagation();

    // THIS SETS THE POSITION , JUST BELOW THE SELECTED TABLE MENU BUTTON
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x + 30,
      y: window.innerHeight - rect.bottom,
    });

    // IF NO OPEN ID OR DIFFERENT ID EXIST ,THIS OPENS THE MENUS TO THE SELECTED ONE , IF SAME OPEN ID , IT CLOSES
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledMenuButton
      tablePosition={tablePosition}
      top={top}
      right={right}
      onClick={handleClickMenuButton}
    >
      <HiEllipsisVertical />
    </StyledMenuButton>
  );
}

export default TableMenuButton;
