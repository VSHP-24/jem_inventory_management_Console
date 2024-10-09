import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import PartDetailPage from "./PartDetailPage";
import PartForm from "./PartForm";

import { useDeletePart } from "./useDeletePart";
import { useEditPart } from "./useEditPart";

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
      editFormContent={<PartForm partToEdit={part} />}
      deleteContentFrom={deletePart}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{name}</div>
      <div>{quantity}</div>
      {deletedTable && (
        <RestoreButton onHandleRestoreButtonClick={handleRestoreButtonClick} />
      )}
    </Table.Row>
  );
}

export default PartRow;
