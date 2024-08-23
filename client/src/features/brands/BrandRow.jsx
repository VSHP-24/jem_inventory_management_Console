import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

function BrandRow({ brand, index }) {
  const { name, brandLogo } = brand;

  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <img src={brandLogo} alt={name} />
      <div>{name}</div>

      <Menus.Menu>
        <Menus.Toggle id={brand.id} />
        <Menus.List id={brand.id}>
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

export default BrandRow;
