import { Navigate, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CategoryRow from "./CategoryRow";

import { useGetCategories } from "./useGetCategories";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";

function DeletedCategories({ filterDeletedCategories }) {
  if (!filterDeletedCategories || filterDeletedCategories.length === 0)
    return <Empty resourceName={"Deleted Categories"} />;

  return (
    <Table
      columns=".5fr 1fr  .5fr"
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedCategories}
        render={(category, i) => (
          <CategoryRow
            category={category}
            index={i}
            key={category.id}
            id={category.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

function CategoryTable() {
  const { isPending, categories } = useGetCategories();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "category-asc";
  const [, direction] = sortBy.split("-");

  let sortedCategories;
  let filterDeletedCategories = [];
  let filterAvailableCategories = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    //SORT
    sortedCategories = categories.sort((a, b) => {
      if (direction === "asc") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
      }
      if (direction === "desc") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
      }
      return null;
    });

    // Filter Deleted Categories

    filterDeletedCategories = sortedCategories.filter(
      (category) => category.isDeleted
    );

    // Filter Available Categories

    filterAvailableCategories = sortedCategories.filter(
      (category) => !category.isDeleted
    );

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(categories.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  if (currentPage > pageCount)
    return <Navigate replace to="/manage?tableType=categories" />;

  return (
    <Table
      deletedTableContent={
        <DeletedCategories filterDeletedCategories={filterDeletedCategories} />
      }
      columns=".5fr 1fr  .5fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={filterAvailableCategories}
        render={(category, i) => (
          <CategoryRow
            category={category}
            index={i}
            key={category.id}
            id={category.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableCategories.length} />
      </Table.Footer>
    </Table>
  );
}

export default CategoryTable;
