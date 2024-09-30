import Table from "../../ui/Table";
import PartForm from "./PartForm";

import { useDeletePart } from "./useDeletePart";

function PartRow({ part, index, id }) {
  const { name } = part;
  const { isDeleting, deletePart } = useDeletePart();

  return (
    <Table.Row
      id={id}
      deleteContentFrom={deletePart}
      isDeleting={isDeleting}
      modalWindowContent={<PartForm partToEdit={part} />}
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
