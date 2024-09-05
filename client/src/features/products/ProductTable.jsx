import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";

import { useGetProducts } from "./useGetProducts";
import { useState } from "react";

function ProductTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, products } = useGetProducts();

  if (isPending) return <Spinner />;

  return (
    <Table columns="1fr 1fr 1.75fr 1.5fr 2fr .75fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Brand</div>
        <div>Model</div>
        <div>Category</div>
        <div>SubCategory</div>
      </Table.Header>

      <Table.Body
        data={products}
        render={(product, i) => (
          <ProductRow
            product={product}
            index={i}
            key={product.id}
            openId={openId}
            close={close}
            open={open}
            id={product.id}
            position={position}
            setPosition={setPosition}
          />
        )}
      />
    </Table>
  );
}

export default ProductTable;
