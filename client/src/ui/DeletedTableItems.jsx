import styled from "styled-components";

import Modal from "./Modal";
import Button from "./Button";

const StyledButton = styled(Button)`
  width: 100%;
`;

function DeletedTableItems({ deletedTableContent }) {
  return (
    <Modal>
      <Modal.Open opens="deleted-items">
        <StyledButton size="medium" variation="danger">
          Deleted Items
        </StyledButton>
      </Modal.Open>
      <Modal.Window name="deleted-items">{deletedTableContent}</Modal.Window>
    </Modal>
  );
}

export default DeletedTableItems;
