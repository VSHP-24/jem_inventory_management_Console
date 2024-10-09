import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PurchaseRow from "./PurchaseRow";

import { useGetPurchases } from "./useGetPurchases";

function PurchaseTable() {
  const { isPending, purchases } = useGetPurchases();

  function DeletedPurchases() {
    return (
      <Table
        columns=".75fr 2fr 3fr 2.5fr .1fr"
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Part</div>
          <div>Vendor</div>
          <div>Created On</div>
        </Table.Header>

        <Table.Body
          data={purchases.filter((purchase) => purchase.isDeleted)}
          render={(purchase, i) => (
            <PurchaseRow
              purchase={purchase}
              index={i}
              key={purchase.id}
              id={purchase.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Table
      deletedTableContent={<DeletedPurchases />}
      columns=".75fr 1.5fr 1.5fr 1fr 1.5fr 1.5fr 1.5fr .1fr"
    >
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
  );
}

export default PurchaseTable;
