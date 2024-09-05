import { useState } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CategoryRow from "./CategoryRow";

import { useGetCategories } from "./useGetCategories";

function CategoryTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, categories } = useGetCategories();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr  .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={categories}
        render={(category, i) => (
          <CategoryRow
            category={category}
            index={i}
            key={category.id}
            openId={openId}
            close={close}
            open={open}
            id={category.id}
            position={position}
            setPosition={setPosition}
          />
        )}
      />
    </Table>
  );
}

export default CategoryTable;
