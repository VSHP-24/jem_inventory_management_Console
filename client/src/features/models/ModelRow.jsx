import Table from "../../ui/Table";
import TableMenus from "../../ui/TableMenus";

function ModelRow({ model, index }) {
  const { name, brand, version, year } = model;
  function handleViewDetails() {
    console.log(`handleViewDetails in ModelTable`);
  }
  function handleEdit() {
    console.log(`handleEdit in ModelTable`);
  }
  function handleDelete() {
    console.log(`handleDelete in ModelTable`);
  }
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{brand.name}</div>
      <div>{name}</div>
      <div>{version}</div>
      <div>{year}</div>

      <TableMenus
        onHandleViewDetails={handleViewDetails}
        onHandleEdit={handleEdit}
        onHandleDelete={handleDelete}
      />
    </Table.Row>
  );
}

export default ModelRow;
