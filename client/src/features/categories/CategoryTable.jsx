import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CategoryRow from "./CategoryRow";

import { useGetCategories } from "./useGetCategories";
import Pagination from "../../ui/Pagination";

function CategoryTable() {
  const { isPending, categories } = useGetCategories();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "category-asc";
  const [, direction] = sortBy.split("-");

  let sortedCategories;
  let filterDeletedCategories = [];
  let filterAvailableCategories = [];

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
  }

  function DeletedCategories() {
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

  if (isPending) return <Spinner />;

  return (
    <Table deletedTableContent={<DeletedCategories />} columns=".5fr 1fr  .5fr">
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
