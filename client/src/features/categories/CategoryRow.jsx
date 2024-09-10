import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";
import { useDeleteCategory } from "./useDeleteCategory";

function CategoryRow({
  category,
  index,
  openId,
  close,
  open,
  setPosition,
  position,
  id,
}) {
  const { name } = category;
  const { isDeleting, deleteCategory } = useDeleteCategory();

  function handleViewDetails() {
    console.log(`handleViewDetails in CategoryTable`);
    close();
  }
  function handleEdit() {
    console.log(`handleEdit in CategoryTable`);
    close();
  }
  function handleDelete() {
    deleteCategory(id);
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

export default CategoryRow;
