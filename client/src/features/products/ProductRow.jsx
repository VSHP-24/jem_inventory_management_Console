import Table from "../../ui/Table";
import TableMenus from "../../ui/TableMenus";

function ProductRow({ product, index }) {
  const { brand, model, category, subCategory, id } = product;
  function handleViewDetails() {
    console.log(`handleViewDetails in ProductTable`);
  }
  function handleEdit() {
    console.log(`handleEdit in ProductTable`);
  }
  function handleDelete() {
    console.log(`handleDelete in ProductTable`);
  }
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{brand.name}</div>
      <div>{model.name}</div>
      <div>{category.name}</div>
      <div>{subCategory.name}</div>

      <TableMenus
        onHandleViewDetails={handleViewDetails}
        onHandleEdit={handleEdit}
        onHandleDelete={handleDelete}
        id={id}
      />
    </Table.Row>
  );
}

export default ProductRow;
