import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-600);

  font-size: 1.4rem;
  border-radius: 0.7rem;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 2fr 0.2fr 0.4fr 0.2fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  font-size: 1.2rem;

  border-bottom: 0.1rem solid var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  font-weight: 600;
  padding: 0.2rem 1.2rem;
`;

function ProductTable() {
  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Sl No.</div>
        <div>Product</div>
        <div>Brand</div>
        <div>Model</div>
        <div>Category</div>
        <div>SubCategory</div>
        <div>More Info</div>
      </TableHeader>
      {products.map((product, i) => (
        <ProductRow product={product} index={i} key={product.id}></ProductRow>
      ))}
    </Table>
  );
}

export default ProductTable;
