import { useState } from "react";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";

import { useGetProducts } from "./useGetProducts";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function ProductTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

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

  const { isPending, products } = useGetProducts();

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns="1fr 1fr 1.75fr 1.5fr 2fr .75fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Brand</div>
          <div>Model</div>
          <div>Category</div>
          <div>SubCategory</div>
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
      <StyledButton size="medium" variation="danger" onClick={handleClick}>
        Deleted Items
      </StyledButton>
    </>
  );
}

export default ProductTable;
