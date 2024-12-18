import styled, { css } from "styled-components";
import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import PartDetailPage from "./PartDetailPage";
import PartForm from "./PartForm";

import { useDeletePart } from "./useDeletePart";
import { useEditPart } from "./useEditPart";
import { device } from "../../utils/devices";

const columnType = {
  partDetails: css`
    @media ${device.laptopL} {
      grid-column: 3;
    }
    @media ${device.mobileM} {
      grid-column: 3;
    }
  `,

  heading: css`
    font-weight: 600;
    display: none;

    @media ${device.laptopL} {
      grid-column: 2;
      display: block;
    }
  `,
};

const StyledColumnLaptopL = styled.div`
  ${(props) => columnType[props.type]}
`;

function PartRow({ part, index, id, deletedTable }) {
  const { name, quantity } = part;
  const { isDeleting, deletePart } = useDeletePart();
  const { editPart } = useEditPart();

  function handleRestoreButtonClick() {
    editPart({ ...part, isDeleted: false });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Part"
      detailPageContent={<PartDetailPage part={part} />}
      editFormContent={<PartForm type="modal" partToEdit={part} />}
      deleteContentFrom={deletePart}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>

      {!deletedTable && (
        <>
          <StyledColumnLaptopL as="header" type="heading">
            Name
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="partDetails">{name}</StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Quantity
          </StyledColumnLaptopL>

          <StyledColumnLaptopL type="partDetails">
            {quantity}
          </StyledColumnLaptopL>
        </>
      )}
      {deletedTable && (
        <>
          <div>{name}</div>
          <div>{quantity}</div>
          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default PartRow;
