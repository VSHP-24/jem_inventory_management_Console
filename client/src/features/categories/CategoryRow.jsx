import Table from "../../ui/Table";
import TableMenus from "../../ui/TableMenus";

function CategoryRow({ category, index }) {
  const { name } = category;
  function handleViewDetails() {
    console.log(`handleViewDetails in CategoryTable`);
  }
  function handleEdit() {
    console.log(`handleEdit in CategoryTable`);
  }
  function handleDelete() {
    console.log(`handleDelete in CategoryTable`);
  }
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{name}</div>

      <TableMenus
        onHandleViewDetails={handleViewDetails}
        onHandleEdit={handleEdit}
        onHandleDelete={handleDelete}
      />
    </Table.Row>
  );
}

export default CategoryRow;
