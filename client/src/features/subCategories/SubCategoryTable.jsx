import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SubCategoryRow from "./SubCategoryRow";

import { useGetSubCategories } from "./useGetSubCategories";
import Pagination from "../../ui/Pagination";

function SubCategoryTable() {
  const { isPending, subCategories } = useGetSubCategories();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "category-asc";
  const [field, direction] = sortBy.split("-");

  let filteredCategories =
    searchParams.get("category")?.split(",") ||
    searchParams.get("category") ||
    "";

  let sortedSubCategories;
  let filterDeletedSubCategories = [];
  let filterAvailableSubCategories = [];

  if (!isPending) {
    // SORT

    sortedSubCategories = subCategories.sort((a, b) => {
      if (direction === "asc" && field === "category") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase()) return 1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase())
          return -1;
      }
      if (direction === "desc" && field === "category") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase())
          return -1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase()) return 1;
      }
      if (direction === "asc") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
      }
      if (direction === "desc" && field !== "price") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
      }

      return null;
    });

    // Filter Deleted SubCategories
    filterDeletedSubCategories = sortedSubCategories.filter(
      (subCategory) => subCategory.isDeleted || subCategory.category.isDeleted
    );
    // Filter Available SubCategories
    filterAvailableSubCategories = sortedSubCategories.filter(
      (subCategory) =>
        !subCategory.isDeleted &&
        !subCategory.category.isDeleted &&
        (filteredCategories === "" ||
          filteredCategories.includes(String(subCategory.category.id)))
    );
  }

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
          data={filterDeletedSubCategories}
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
        data={filterAvailableSubCategories}
        render={(subCategory, i) => (
          <SubCategoryRow
            subCategory={subCategory}
            index={i}
            key={subCategory.id}
            id={subCategory.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableSubCategories.length} />
      </Table.Footer>
    </Table>
  );
}

export default SubCategoryTable;
