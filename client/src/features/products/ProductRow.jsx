import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

function ProductRow({ product, index }) {
  const { brand, model, category, subCategory } = product;
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

      <Menus.Menu>
        <Menus.Toggle id={product.id} />
        <Menus.List id={product.id}>
          <Menus.Button icon={<HiSquare2Stack />} onClick={"hello"}>
            Duplicate
          </Menus.Button>

          <Menus.Button icon={<HiPencil />} onClick={"hello"}>
            Edit
          </Menus.Button>

          <Menus.Button icon={<HiTrash />} onClick={"hello"}>
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default ProductRow;
