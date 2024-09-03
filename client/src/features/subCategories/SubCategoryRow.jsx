import Table from "../../ui/Table";
import TableMenus from "../../ui/TableMenus";

function SubCategoryRow({ subCategory, index }) {
  const { name, category } = subCategory;
  function handleViewDetails() {
    console.log(`handleViewDetails in SubCategoryTable`);
  }
  function handleEdit() {
    console.log(`handleEdit in SubCategoryTable`);
  }
  function handleDelete() {
    console.log(`handleDelete in SubCategoryTable`);
  }
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{category.name}</div>
      <div>{name}</div>

      <TableMenus
        onHandleViewDetails={handleViewDetails}
        onHandleEdit={handleEdit}
        onHandleDelete={handleDelete}
      />
    </Table.Row>
  );
}

export default SubCategoryRow;
