import styled from "styled-components";
import { Navigate, useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PurchaseRow from "./PurchaseRow";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { useGetPurchases } from "./useGetPurchases";
import { PAGE_SIZE } from "../../utils/constants";
import { device } from "../../utils/devices";

const purchaseTableStyles = {
  defaultColumns: ".5fr 1fr 1.75fr .5fr 1.2fr 1.25fr 1fr ",
  laptopL: {
    columns: ".1fr .35fr .5fr",
    rows: "1fr 1fr 1fr 1fr 1fr 1fr",
  },
  tablet: { columns: ".1fr .5fr .5fr", rows: "1fr 1fr 1fr 1fr 1fr" },
  mobileM: { columns: ".35fr .75fr 2fr  ", rows: "1fr 1fr 1fr 1fr 1fr" },
};

const StyledTableColumnLaptopL = styled.div`
  font-size: 1.2rem;

  @media ${device.laptopL} {
    grid-column: 2;
  }
`;

//////////////////////////////////////
// DELETED PURCHASES TABLE COMPONENT
//////////////////////////////////////
function DeletedPurchases({ filterDeletedPurchases }) {
  if (!filterDeletedPurchases || filterDeletedPurchases.length === 0)
    return <Empty resourceName={"Deleted Purchases"} />;

  return (
    <Table
      columns=".5fr 1fr 1fr .5fr"
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Part</div>
        <div>Vendor</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedPurchases}
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

//////////////////////////////////////
// DELETED AVAILABLE TABLE COMPONENT
//////////////////////////////////////
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

  let sortedPurchases, currentPage, pageCount;
  let filterDeletedPurchases = [];
  let filterAvailablePurchases = [];

  if (!isPending) {
    // SORT
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

    // FILTER DELETED PURCHASES
    filterDeletedPurchases = sortedPurchases.filter(
      (purchase) => purchase.isDeleted
    );

    // FILTER AVAILABLE PURCHASES
    filterAvailablePurchases = sortedPurchases.filter(
      (purchase) =>
        !purchase.isDeleted &&
        (filteredParts === "" ||
          filteredParts.includes(String(purchase.part.id))) &&
        (filteredStatus === "" ||
          filteredStatus.includes(String(purchase.status))) &&
        (filteredVendors === "" ||
          filteredVendors.includes(String(purchase.vendor)))
    );

    // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(purchases.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  // IF SEARCHPARAMS PAGE IS GREATER THAN EXISTING PAGE COUNTS, PAGE WILL BE REDIRECTED TO FIRST PAGE OF THE TABLE
  if (currentPage > pageCount || currentPage < 1)
    return <Navigate replace to="/Purchases" />;

  return (
    <Table
      deletedTableContent={
        <DeletedPurchases filterDeletedPurchases={filterDeletedPurchases} />
      }
      columns={purchaseTableStyles}
    >
      <Table.Header>
        <StyledTableColumnLaptopL>Sl No.</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Part</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Vendor</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>QTY</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Created On</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Status</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Modified On</StyledTableColumnLaptopL>
      </Table.Header>

      <Table.Body
        data={filterAvailablePurchases}
        render={(purchase, i) => (
          <PurchaseRow
            purchase={purchase}
            index={i}
            key={purchase.id}
            id={purchase.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailablePurchases.length} />
      </Table.Footer>
    </Table>
  );
}

export default PurchaseTable;
