import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";
import { useDeleteSubCategory } from "./useDeleteSubCategory";

function SubCategoryRow({
  subCategory,
  index,
  openId,
  close,
  open,
  setPosition,
  position,
  id,
}) {
  const { name, category } = subCategory;
  const { isDeleting, deleteSubCategory } = useDeleteSubCategory();

  function handleViewDetails() {
    console.log(`handleViewDetails in SubCategoryTable`);
    close();
  }
  function handleEdit() {
    console.log(`handleEdit in SubCategoryTable`);
    close();
  }
  function handleDelete() {
    deleteSubCategory(id);
    close();
  }
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{category.name}</div>
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

export default SubCategoryRow;
