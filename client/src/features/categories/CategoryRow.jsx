import { useState } from "react";

import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";

import { useDeleteCategory } from "./useDeleteCategory";
import CategoryForm from "./CategoryForm";

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
  const [showForm, setShowForm] = useState(false);

  const { name } = category;
  const { isDeleting, deleteCategory } = useDeleteCategory();

  function handleViewDetails() {
    console.log(`handleViewDetails in CategoryTable`);
    close();
  }
  function handleEdit() {
    setShowForm((show) => !show);
    close();
  }
  function handleDelete() {
    deleteCategory(id);
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
      {showForm && (
        <CategoryForm categoryToEdit={category} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default CategoryRow;
