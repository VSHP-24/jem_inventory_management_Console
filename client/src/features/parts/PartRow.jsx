import Table from "../../ui/Table";
import PartDetailPage from "./PartDetailPage";
import PartForm from "./PartForm";

import { useDeletePart } from "./useDeletePart";

function PartRow({ part, index, id }) {
  const { name } = part;
  const { isDeleting, deletePart } = useDeletePart();

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
    </Table.Row>
  );
}

export default PartRow;
