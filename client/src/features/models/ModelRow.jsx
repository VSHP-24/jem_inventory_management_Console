import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

function ModelRow({ model, index }) {
  const { name, brand, version, year } = model;
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

      <Menus.Menu>
        <Menus.Toggle id={model.id} />
        <Menus.List id={model.id}>
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

export default ModelRow;
