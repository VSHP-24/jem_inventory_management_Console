import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CategoryRow from "./CategoryRow";

import { useGetCategories } from "./useGetCategories";

function CategoryTable() {
  const { isPending, categories } = useGetCategories();

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
          data={categories.filter((category) => category.isDeleted)}
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
        data={categories.filter((category) => !category.isDeleted)}
        render={(category, i) => (
          <CategoryRow
            category={category}
            index={i}
            key={category.id}
            id={category.id}
          />
        )}
      />
    </Table>
  );
}

export default CategoryTable;
