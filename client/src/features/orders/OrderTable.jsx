import { useSearchParams } from "react-router-dom";
import { useGetOrders } from "./useGetOrder";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

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

    // Filter Deleted Orders
    filterDeletedOrders = sortedOrders.filter(
      (order) => order.isDeleted || !order.user.user.active
    );

    // Filter Available Orders
    filterAvailableOrders = sortedOrders.filter(
      (order) =>
        !order.isDeleted &&
        order.user.user.active &&
        (filteredPaymentMethod === "" ||
          filteredPaymentMethod.includes(order.paymentMethod)) &&
        (filteredPaymentStatus === "" ||
          filteredPaymentStatus.includes(order.paymentStatus)) &&
        (filteredOrderStatus === "" ||
          filteredOrderStatus.includes(order.orderStatus))
    );
  }

  function DeletedOrders() {
    return (
      <Table
        columns={".75fr 5fr 1fr .75fr"}
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Order Id</div>
          <div>Name</div>
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

  if (isPending) return <Spinner />;

  return (
    <Table
      deletedTableContent={<DeletedOrders />}
      columns=".75fr 4fr 2fr 1fr 1.5fr 1.5fr 3fr .75fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Order Id</div>
        <div>Customer Name</div>
        <div>Total Cost</div>
        <div>Payment Method</div>
        <div>Payment Status</div>
        <div>Order Status</div>
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
