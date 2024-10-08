import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import PurchaseRow from "./PurchaseRow";

import { useGetPurchases } from "./useGetPurchases";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function PurchaseTable() {
  const { isPending, purchases } = useGetPurchases();

  function handleClick() {
    console.log(
      purchases.filter(
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
      <Table columns=".75fr 1.5fr 1.5fr 1fr 1.5fr 1.5fr 1.5fr .1fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Part</div>
          <div>Vendor</div>
          <div>Quantity</div>
          <div>Created On</div>
          <div>Status</div>
          <div>Modified On</div>
        </Table.Header>

        <Table.Body
          data={purchases.filter((purchase) => !purchase.isDeleted)}
          render={(purchase, i) => (
            <PurchaseRow
              purchase={purchase}
              index={i}
              key={purchase.id}
              id={purchase.id}
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

export default PurchaseTable;
