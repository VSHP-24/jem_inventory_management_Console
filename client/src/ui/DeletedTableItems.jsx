import styled from "styled-components";

import Modal from "./Modal";
import Button from "./Button";
import { device } from "../utils/devices";

const StyledButton = styled(Button)`
  width: 100%;

  @media ${device.tablet} {
    width: fit-content;
    padding: 0.75rem;
  }
  @media ${device.mobileM} {
    width: 100%;
  }
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
