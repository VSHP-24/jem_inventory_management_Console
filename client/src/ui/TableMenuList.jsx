import styled from "styled-components";

import { HiOutlineEye, HiPencil, HiTrash } from "react-icons/hi2";
import { createPortal } from "react-dom";

const StyledMenuOptions = styled.ul`
  position: absolute;
  background-color: var(--color-gold-500);
  padding: 0;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  bottom: ${(props) => props.position.y}px;
  z-index: 100;
  width: 14rem;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--color-grey-800);
    color: var(--color-gold-100);
  }
`;

function TableMenuList({
  position,
  onHandleViewDetails,
  onHandleEdit,
  onHandleDelete,
  id,
  openId,
}) {
  if (openId !== id) {
    return null;
  }
  return createPortal(
    <StyledMenuOptions position={position}>
      <StyledButton onClick={onHandleViewDetails}>
        <div>
          <HiOutlineEye />
        </div>
        <span>View Details</span>
      </StyledButton>
      <StyledButton onClick={onHandleEdit}>
        <div>
          <HiPencil />
        </div>
        <span>Edit</span>
      </StyledButton>
      <StyledButton onClick={onHandleDelete}>
        <div>
          <HiTrash />
        </div>
        <span>Delete</span>
      </StyledButton>
    </StyledMenuOptions>,
    document.body
  );
}

export default TableMenuList;
