import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

import { useGetParts } from "../parts/useGetParts";

function PurchaseTableOperations() {
  const { isPending, parts } = useGetParts();

  const orderStatus = [
    {
      id: "order_placed",
      name: "Placed",
    },
    {
      id: "order_received",
      name: "Received",
    },
    {
      id: "cancelled",
      name: "Cancelled",
    },
  ];

  let filterList = [];
  if (!isPending) {
    filterList = [
      {
        filterTitle: "Status",
        filterOptions: orderStatus,
        filterField: "status",
      },
      {
        filterTitle: "Parts",
        filterOptions: parts,
        filterField: "part",
      },
    ];
  }

  const sortByOptions = [
    { value: "part-asc", label: "Sort by Part ( A - Z )" },
    { value: "part-desc", label: "Sort by Part ( Z - A )" },
    { value: "vendor-asc", label: "Sort by Vendor ( A - Z )" },
    { value: "vendor-desc", label: "Sort by Vendor ( Z - A )" },
    { value: "quantity-asc", label: "Sort by Quantity ( A - Z )" },
    { value: "quantity-desc", label: "Sort by Quantity ( Z - A )" },
  ];

  return (
    <TableOperations>
      <Filter filterList={filterList} />
      <SortBy sortByOptions={sortByOptions} />
    </TableOperations>
  );
}

export default PurchaseTableOperations;
