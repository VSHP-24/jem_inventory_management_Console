import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PurchaseRow from "./PurchaseRow";

import { useGetPurchases } from "./useGetPurchases";

function PurchaseTable() {
  const { isPending, purchases } = useGetPurchases();

  const [searchParams] = useSearchParams();

  let filteredParts =
    searchParams.get("part")?.split(",") || searchParams.get("part") || "";
  let filteredStatus =
    searchParams.get("status")?.split(",") || searchParams.get("status") || "";
  let filteredVendors =
    searchParams.get("vendor")?.split(",") || searchParams.get("vendor") || "";

  const sortBy = searchParams.get("sortBy") || "part-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedPurchases;
  if (!isPending) {
    sortedPurchases = purchases.sort((a, b) => {
      if (direction === "asc" && field === "part") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase()) return 1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase())
          return -1;
      } else if (direction === "desc" && field === "part") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase())
          return -1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase()) return 1;
      } else if (direction === "asc" && field !== "quantity") {
        if (a[field].toUpperCase() > b[field].toUpperCase()) return 1;
        if (b[field].toUpperCase() > a[field].toUpperCase()) return -1;
      } else if (direction === "desc" && field !== "quantity") {
        if (a[field].toUpperCase() > b[field].toUpperCase()) return -1;
        if (b[field].toUpperCase() > a[field].toUpperCase()) return 1;
      } else if (field === "quantity") {
        return (a[field] - b[field]) * modifier;
      }
      return null;
    });
  }

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
          data={sortedPurchases.filter((purchase) => purchase.isDeleted)}
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
        data={sortedPurchases.filter(
          (purchase) =>
            !purchase.isDeleted &&
            (filteredParts === "" ||
              filteredParts.includes(String(purchase.part.id))) &&
            (filteredStatus === "" ||
              filteredStatus.includes(String(purchase.status))) &&
            (filteredVendors === "" ||
              filteredVendors.includes(String(purchase.vendor)))
        )}
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
