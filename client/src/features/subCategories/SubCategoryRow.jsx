import toast from "react-hot-toast";
import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import SubCategoryDetailPage from "./SubCategoryDetailPage";
import SubCategoryForm from "./SubCategoryForm";

import { useDeleteSubCategory } from "./useDeleteSubCategory";
import { useEditSubCategory } from "./useEditSubCategory";

function SubCategoryRow({ subCategory, index, id, deletedTable }) {
  const { name, category } = subCategory;
  const { isDeleting, deleteSubCategory } = useDeleteSubCategory();

  const { editSubCategory } = useEditSubCategory();

  function handleRestoreButtonClick() {
    if (!subCategory.isDeleted)
      return toast.error(
        `${subCategory.category.name} category is deleted . Restore Category first ! `
      );
    editSubCategory({ ...subCategory, isDeleted: false });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="SubCategory"
      detailPageContent={<SubCategoryDetailPage subCategory={subCategory} />}
      editFormContent={<SubCategoryForm subCategoryToEdit={subCategory} />}
      deleteContentFrom={deleteSubCategory}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{category.name}</div>
      <div>{name}</div>
      {deletedTable && (
        <RestoreButton onHandleRestoreButtonClick={handleRestoreButtonClick} />
      )}
    </Table.Row>
  );
}

export default SubCategoryRow;
