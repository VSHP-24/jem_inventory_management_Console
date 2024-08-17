import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

function SubCategoryRow({ subCategory, index }) {
  const { name, category } = subCategory;
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{category.name}</div>
      <div>{name}</div>

      <Menus.Menu>
        <Menus.Toggle id={subCategory.id} />
        <Menus.List id={subCategory.id}>
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

export default SubCategoryRow;
