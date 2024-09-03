import styled from "styled-components";

import {
  HiEllipsisVertical,
  HiOutlineEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { useState } from "react";

const StyledMenuButton = styled.button`
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
  }
`;

const StyledMenuOptions = styled.ul`
  position: absolute;
  background-color: var(--color-gold-500);
  padding: 0;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  bottom: ${(props) => props.position.y}px;
  z-index: 100;
  width: 13rem;
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

function TableMenus({ onHandleViewDetails, onHandleEdit, onHandleDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);

  function handleClickMenuButton(e) {
    setIsOpen((cur) => !cur);
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x + 30,
      y: window.innerHeight - rect.bottom,
    });
  }
  return (
    <>
      <StyledMenuButton onClick={handleClickMenuButton}>
        <HiEllipsisVertical />
      </StyledMenuButton>
      {isOpen && (
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
        </StyledMenuOptions>
      )}
    </>
  );
}

export default TableMenus;
