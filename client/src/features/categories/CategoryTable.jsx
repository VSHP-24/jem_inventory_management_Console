import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CategoryRow from "./CategoryRow";
// import Menus from "../../ui/Menus";

import { useGetCategories } from "./useGetCategories";

function CategoryTable() {
  const { isPending, categories } = useGetCategories();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr  .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={categories}
        render={(category, i) => (
          <CategoryRow category={category} index={i} key={category.id} />
        )}
      />
    </Table>
  );
}

export default CategoryTable;
