import Table from "../../ui/Table";
import TableMenus from "../../ui/TableMenus";

function BrandRow({ brand, index }) {
  const { name } = brand;
  function handleViewDetails() {
    console.log(`handleViewDetails in BrandTable`);
  }
  function handleEdit() {
    console.log(`handleEdit in BrandTable`);
  }
  function handleDelete() {
    console.log(`handleDelete in BrandTable`);
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

export default BrandRow;
