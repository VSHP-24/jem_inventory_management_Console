import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import CategoryDetailPage from "./CategoryDetailPage";
import CategoryForm from "./CategoryForm";

import { useDeleteCategory } from "./useDeleteCategory";
import { useEditCategory } from "./useEditCategory";

function CategoryRow({ category, index, id, deletedTable }) {
  const { name } = category;
  const { isDeleting, deleteCategory } = useDeleteCategory();

  const { editCategory } = useEditCategory();

  function handleRestoreButtonClick() {
    editCategory({ ...category, isDeleted: false });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Category"
      detailPageContent={<CategoryDetailPage category={category} />}
      editFormContent={<CategoryForm categoryToEdit={category} />}
      deleteContentFrom={deleteCategory}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{name}</div>
      {deletedTable && (
        <RestoreButton onHandleRestoreButtonClick={handleRestoreButtonClick} />
      )}
    </Table.Row>
  );
}

export default CategoryRow;
