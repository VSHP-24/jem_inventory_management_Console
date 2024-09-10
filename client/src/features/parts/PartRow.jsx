import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";
import { useDeletePart } from "./useDeletePart";

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
  const { name } = part;
  const { isDeleting, deletePart } = useDeletePart();

  function handleViewDetails() {
    console.log(`handleViewDetails in PartTable`);
    close();
  }
  function handleEdit() {
    console.log(`handleEdit in PartTable`);
    close();
  }
  function handleDelete() {
    deletePart(id);
    close();
  }
  return (
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
  );
}

export default PartRow;
