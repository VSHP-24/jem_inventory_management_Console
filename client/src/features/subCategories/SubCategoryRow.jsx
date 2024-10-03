import Table from "../../ui/Table";
import SubCategoryDetailPage from "./SubCategoryDetailPage";
import SubCategoryForm from "./SubCategoryForm";

import { useDeleteSubCategory } from "./useDeleteSubCategory";

function SubCategoryRow({ subCategory, index, id }) {
  const { name, category } = subCategory;
  const { isDeleting, deleteSubCategory } = useDeleteSubCategory();

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
    </Table.Row>
  );
}

export default SubCategoryRow;
