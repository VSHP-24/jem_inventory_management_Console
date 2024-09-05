import { useState } from "react";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";

import { useGetBrands } from "./useGetBrands";

function BrandTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, brands } = useGetBrands();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr  .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={brands}
        render={(brand, i) => (
          <BrandRow
            brand={brand}
            index={i}
            key={brand.id}
            openId={openId}
            close={close}
            open={open}
            id={brand.id}
            position={position}
            setPosition={setPosition}
          />
        )}
      />
    </Table>
  );
}

export default BrandTable;
