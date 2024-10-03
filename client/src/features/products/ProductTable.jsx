import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";
import Button from "../../ui/Button";

import { useGetProducts } from "./useGetProducts";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function ProductTable() {
  const { isPending, products } = useGetProducts();

  function handleClick() {
    console.log(
      products.filter(
        (product) =>
          product.isDeleted ||
          product.brand.isDeleted ||
          product.model.isDeleted ||
          product.category.isDeleted ||
          product.subCategory.isDeleted
      )
    );
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns=".75fr 1.25fr 1.5fr 1.25fr 2fr 1fr .75fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Brand</div>
          <div>Model</div>
          <div>Category</div>
          <div>SubCategory</div>
          <div>Price</div>
        </Table.Header>

        <Table.Body
          data={products.filter(
            (product) =>
              !product.isDeleted &&
              !product.brand.isDeleted &&
              !product.model.isDeleted &&
              !product.category.isDeleted &&
              !product.subCategory.isDeleted
          )}
          render={(product, i) => (
            <ProductRow
              product={product}
              index={i}
              key={product.id}
              id={product.id}
            />
          )}
        />
      </Table>
      <StyledButton size="medium" variation="danger" onClick={handleClick}>
        Deleted Items
      </StyledButton>
    </>
  );
}

export default ProductTable;
