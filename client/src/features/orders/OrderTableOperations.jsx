import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  const orderStatus = [
    {
      id: "order_placed",
      name: "Received",
    },
    {
      id: "order_confirmed",
      name: "Confirmed",
    },
    {
      id: "order_shipped",
      name: "Shipped",
    },
    {
      id: "cancelled",
      name: "Cancelled",
    },
  ];

  const paymentMethod = [
    {
      id: "cod",
      name: "COD",
    },
    {
      id: "upi",
      name: "UPI",
    },
    {
      id: "cards",
      name: "Cards",
    },
    {
      id: "netbanking",
      name: "Net Banking",
    },
  ];
  const paymentStatus = [
    {
      id: "paid",
      name: "Paid",
    },
    {
      id: "pending",
      name: "Pending",
    },
  ];

  let filterList = [
    {
      filterTitle: "Order Status",
      filterOptions: orderStatus,
      filterField: "orderStatus",
    },
    {
      filterTitle: "Payment Method",
      filterOptions: paymentMethod,
      filterField: "paymentMethod",
    },
    {
      filterTitle: "Payment Status",
      filterOptions: paymentStatus,
      filterField: "paymentStatus",
    },
  ];

  const sortByOptions = [
    { value: "name-asc", label: "Sort by Name ( A - Z )" },
    { value: "name-desc", label: "Sort by Name ( Z - A )" },
    { value: "cost-asc", label: "Sort by Cost ( A - Z )" },
    { value: "cost-desc", label: "Sort by Cost ( Z - A )" },
  ];

  return (
    <TableOperations>
      <Filter filterList={filterList} />
      <SortBy sortByOptions={sortByOptions} />
    </TableOperations>
  );
}

export default OrderTableOperations;
