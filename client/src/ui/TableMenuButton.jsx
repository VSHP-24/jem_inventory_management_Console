import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { device } from "../utils/devices";

const StyledMenuButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  width: 2.5rem;
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

  grid-column: -1;
  grid-row: 1;
`;

function TableMenuButton({ id, openId, close, open, setPosition }) {
  function handleClickMenuButton(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x + 30,
      y: window.innerHeight - rect.bottom,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledMenuButton onClick={handleClickMenuButton}>
      <HiEllipsisVertical />
    </StyledMenuButton>
  );
}

export default TableMenuButton;
