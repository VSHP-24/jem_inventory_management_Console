import { useState } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SubCategoryRow from "./SubCategoryRow";

import { useGetSubCategories } from "./useGetSubCategories";

function SubCategoryTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, subCategories } = useGetSubCategories();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr 1fr .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Category</div>
        <div>SubCategory</div>
      </Table.Header>

      <Table.Body
        data={subCategories}
        render={(subCategory, i) => (
          <SubCategoryRow
            subCategory={subCategory}
            index={i}
            key={subCategory.id}
            openId={openId}
            close={close}
            open={open}
            id={subCategory.id}
            position={position}
            setPosition={setPosition}
          />
        )}
      />
    </Table>
  );
}

export default SubCategoryTable;
