import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SubCategoryRow from "./SubCategoryRow";

import { useGetSubCategories } from "./useGetSubCategories";

function SubCategoryTable() {
  const { isPending, subCategories } = useGetSubCategories();

  function DeletedSubCategory() {
    return (
      <Table
        modalWindowedTable={true}
        menuListRequired={false}
        columns=".5fr 1fr 1fr .5fr"
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Category</div>
          <div>SubCategory</div>
        </Table.Header>

        <Table.Body
          data={subCategories.filter(
            (subCategory) =>
              subCategory.isDeleted || subCategory.category.isDeleted
          )}
          render={(subCategory, i) => (
            <SubCategoryRow
              subCategory={subCategory}
              index={i}
              key={subCategory.id}
              id={subCategory.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Table
      deletedTableContent={<DeletedSubCategory />}
      columns=".5fr 1fr 1fr .5fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Category</div>
        <div>SubCategory</div>
      </Table.Header>

      <Table.Body
        data={subCategories.filter(
          (subCategory) =>
            !subCategory.isDeleted && !subCategory.category.isDeleted
        )}
        render={(subCategory, i) => (
          <SubCategoryRow
            subCategory={subCategory}
            index={i}
            key={subCategory.id}
            id={subCategory.id}
          />
        )}
      />
    </Table>
  );
}

export default SubCategoryTable;
