import styled from "styled-components";

import { HiOutlineEye, HiPencil, HiTrash } from "react-icons/hi2";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import { useOutsideClick } from "../hooks/useOutsideClick";

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
  id,
  openId,
  close,
  position,
  isDeleting,
  contentType,
  detailPageContent,
  editFormContent,
  deleteContentFrom,
}) {
  const ref = useOutsideClick(close);

  if (openId !== id) {
    return null;
  }

  return createPortal(
    <Modal ref={ref} closeMenuList={close}>
      <StyledMenuOptions position={position}>
        <Modal.Open opens="view-details">
          <StyledButton>
            <div>
              <HiOutlineEye />
            </div>
            <span>View Details</span>
          </StyledButton>
        </Modal.Open>

        <Modal.Window name="view-details">{detailPageContent}</Modal.Window>

        <Modal.Open opens="edit">
          <StyledButton>
            <div>
              <HiPencil />
            </div>
            <span>Edit</span>
          </StyledButton>
        </Modal.Open>

        <Modal.Window name="edit">{editFormContent}</Modal.Window>

        <Modal.Open opens="delete">
          <StyledButton disabled={isDeleting}>
            <div>
              <HiTrash />
            </div>
            <span>Delete</span>
          </StyledButton>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeleting}
            onConfirm={deleteContentFrom}
            resourceName={contentType}
          />
        </Modal.Window>
      </StyledMenuOptions>
    </Modal>,
    document.body
  );
}

export default TableMenuList;
