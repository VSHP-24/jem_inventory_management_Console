import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";

import { useGetProducts } from "./useGetProducts";
import Menus from "../../ui/Menus";

function ProductTable() {
  const { isPending, products } = useGetProducts();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 1.5fr 1.5fr 1.5fr 2fr .001fr">
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
            <ProductRow product={product} index={i} key={product.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ProductTable;
