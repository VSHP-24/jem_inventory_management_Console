import Table from "../../ui/Table";
import TableMenus from "../../ui/TableMenus";

function PartRow({ part, index }) {
  const { name } = part;
  function handleViewDetails() {
    console.log(`handleViewDetails in PartTable`);
  }
  function handleEdit() {
    console.log(`handleEdit in PartTable`);
  }
  function handleDelete() {
    console.log(`handleDelete in PartTable`);
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

export default PartRow;
