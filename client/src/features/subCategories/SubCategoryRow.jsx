import Table from "../../ui/Table";
import SubCategoryForm from "./SubCategoryForm";

import { useDeleteSubCategory } from "./useDeleteSubCategory";

function SubCategoryRow({ subCategory, index, id }) {
  const { name, category } = subCategory;
  const { isDeleting, deleteSubCategory } = useDeleteSubCategory();

  return (
    <Table.Row
      id={id}
      deleteContentFrom={deleteSubCategory}
      isDeleting={isDeleting}
      modalWindowContent={<SubCategoryForm subCategoryToEdit={subCategory} />}
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
