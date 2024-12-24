import styled from "styled-components";
import { Navigate, useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";
import OrderRow from "./OrderRow";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { PAGE_SIZE } from "../../utils/constants";
import { device } from "../../utils/devices";
import { useGetOrders } from "./useGetOrder";

const orderTableStyles = {
  defaultColumns: ".75fr 4fr 2fr 1.25fr 1fr 1.25fr 2.5fr .001fr",
  laptopL: { columns: ".1fr .35fr .5fr", rows: "1fr 1fr 1fr 1fr 1fr 1fr " },
  tablet: { columns: ".1fr .35fr .5fr", rows: "1fr 1fr 1fr 1fr 1fr" },
  mobileM: { columns: ".25fr 1.25fr .001fr", rows: "1fr 1fr 1fr 1fr 1fr" },
};

const StyledTableColumnLaptopL = styled.div`
  font-size: 1rem;
  justify-self: center;

  @media ${device.laptopL} {
    grid-column: 2;
  }
`;

const InvisibileBox = styled.div`
  color: var(--color-gold-400);
`;

///////////////////////////////////
// DELETED ORDERS TABLE COMPONENT
///////////////////////////////////
function DeletedOrders({ filterDeletedOrders }) {
  if (!filterDeletedOrders || filterDeletedOrders.length === 0)
    return <Empty resourceName={"Deleted Orders"} />;

  return (
    <Table
      columns={"2fr 5fr .75fr"}
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Order Id</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedOrders}
        render={(order, i) => (
          <OrderRow
            order={order}
            index={i}
            key={order.id}
            id={order.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

////////////////////////////////////////
// AVAILABLE ORDERS TABLE COMPONENT
////////////////////////////////////////

function OrderTable() {
  const { isPending, orders } = useGetOrders();

  const [searchParams] = useSearchParams();

  let filteredPaymentMethod =
    searchParams.get("paymentMethod")?.split(",") ||
    searchParams.get("paymentMethod") ||
    "";
  let filteredPaymentStatus =
    searchParams.get("paymentStatus")?.split(",") ||
    searchParams.get("paymentStatus") ||
    "";
  let filteredOrderStatus =
    searchParams.get("orderStatus")?.split(",") ||
    searchParams.get("orderStatus") ||
    "";

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedOrders;
  let filterDeletedOrders = [];
  let filterAvailableOrders = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT
    sortedOrders = orders.sort((a, b) => {
      if (direction === "asc" && field === "name") {
        if (a.user.user[field].toUpperCase() > b.user.user[field].toUpperCase())
          return 1;
        if (b.user.user[field].toUpperCase() > a.user.user[field].toUpperCase())
          return -1;
      } else if (direction === "desc" && field === "name") {
        if (a.user.user[field].toUpperCase() > b.user.user[field].toUpperCase())
          return -1;
        if (b.user.user[field].toUpperCase() > a.user.user[field].toUpperCase())
          return 1;
      } else if (direction === "asc" && field !== "cost") {
        if (a[field].toUpperCase() > b[field].toUpperCase()) return 1;
        if (b[field].toUpperCase() > a[field].toUpperCase()) return -1;
      } else if (direction === "desc" && field !== "cost") {
        if (a[field].toUpperCase() > b[field].toUpperCase()) return -1;
        if (b[field].toUpperCase() > a[field].toUpperCase()) return 1;
      } else if (field === "cost") {
        return (a[field] - b[field]) * modifier;
      }
      return null;
    });

    // FILTER DELETED ORDERS
    filterDeletedOrders = sortedOrders.filter((order) => order.isDeleted);

    // FILTER AVAILABLE ORDERS
    filterAvailableOrders = sortedOrders.filter(
      (order) =>
        !order.isDeleted &&
        (filteredPaymentMethod === "" ||
          filteredPaymentMethod.includes(order.paymentMethod)) &&
        (filteredPaymentStatus === "" ||
          filteredPaymentStatus.includes(order.paymentStatus)) &&
        (filteredOrderStatus === "" ||
          filteredOrderStatus.includes(order.orderStatus))
    );

    // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(orders.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  // IF SEARCHPARAMS PAGE IS GREATER THAN EXISTING PAGE COUNTS, PAGE WILL BE REDIRECTED TO FIRST PAGE OF THE TABLE
  if (currentPage > pageCount || currentPage < 1)
    return <Navigate replace to="/Orders" />;

  return (
    <Table
      deletedTableContent={
        <DeletedOrders filterDeletedOrders={filterDeletedOrders} />
      }
      columns={orderTableStyles}
    >
      <Table.Header>
        <StyledTableColumnLaptopL>Sl No.</StyledTableColumnLaptopL>

        <StyledTableColumnLaptopL>Order Id</StyledTableColumnLaptopL>

        <StyledTableColumnLaptopL>Name</StyledTableColumnLaptopL>

        <StyledTableColumnLaptopL>Amount</StyledTableColumnLaptopL>

        <StyledTableColumnLaptopL>Method</StyledTableColumnLaptopL>

        <StyledTableColumnLaptopL>Settlement</StyledTableColumnLaptopL>

        <StyledTableColumnLaptopL>Order Status</StyledTableColumnLaptopL>

        <InvisibileBox>Hello</InvisibileBox>
      </Table.Header>

      <Table.Body
        data={filterAvailableOrders}
        render={(order, i) => (
          <OrderRow order={order} index={i} key={order.id} id={order.id} />
        )}
      />

      <Table.Footer>
        <Pagination count={filterAvailableOrders.length} />
      </Table.Footer>
    </Table>
  );
}

export default OrderTable;
