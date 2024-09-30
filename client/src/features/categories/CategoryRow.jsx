import Table from "../../ui/Table";
import CategoryForm from "./CategoryForm";

import { useDeleteCategory } from "./useDeleteCategory";

function CategoryRow({ category, index, id }) {
  const { name } = category;
  const { isDeleting, deleteCategory } = useDeleteCategory();

  return (
    <Table.Row
      id={id}
      deleteContentFrom={deleteCategory}
      isDeleting={isDeleting}
      modalWindowContent={<CategoryForm categoryToEdit={category} />}
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

export default CategoryRow;
