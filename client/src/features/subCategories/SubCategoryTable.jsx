import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import SubCategoryRow from "./SubCategoryRow";

import { useGetSubCategories } from "./useGetSubCategories";

function SubCategoryTable() {
  const { isPending, subCategories } = useGetSubCategories();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns=".5fr 1fr 1fr .5fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Category</div>
          <div>SubCategory</div>
        </Table.Header>

        <Table.Body
          data={subCategories}
          render={(subCategory, i) => (
            <SubCategoryRow
              subCategory={subCategory}
              index={i}
              key={subCategory.id}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default SubCategoryTable;
