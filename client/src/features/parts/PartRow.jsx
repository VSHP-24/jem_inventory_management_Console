import { useState } from "react";

import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";

import { useDeletePart } from "./useDeletePart";
import PartForm from "./PartForm";

function PartRow({
  part,
  index,
  openId,
  close,
  open,
  setPosition,
  position,
  id,
}) {
  const [showForm, setShowForm] = useState(false);

  const { name } = part;
  const { isDeleting, deletePart } = useDeletePart();

  function handleViewDetails() {
    console.log(`handleViewDetails in PartTable`);
    close();
  }
  function handleEdit() {
    setShowForm((show) => !show);
    close();
  }
  function handleDelete() {
    deletePart(id);
    close();
  }
  return (
    <>
      <Table.Row>
        <div>
          {(index <= 8 && `0${index + 1}`) ||
            (index === 9 && `${index + 1}`) ||
            index + 1}
        </div>
        <div>{name}</div>

        <TableMenuButton
          id={id}
          openId={openId}
          close={close}
          open={open}
          setPosition={setPosition}
        />
        {openId === id && (
          <TableMenuList
            id={id}
            openId={openId}
            position={position}
            onHandleViewDetails={handleViewDetails}
            onHandleEdit={handleEdit}
            onHandleDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </Table.Row>
      {showForm && <PartForm partToEdit={part} setShowForm={setShowForm} />}
    </>
  );
}

export default PartRow;
