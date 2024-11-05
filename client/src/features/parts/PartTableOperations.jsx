import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function PartTableOperations() {
  const sortByOptions = [
    { value: "part-asc", label: "Sort by Part ( A - Z )" },
    { value: "part-desc", label: "Sort by Part ( Z - A )" },
    { value: "quantity-asc", label: "Sort by Quantity ( A - Z )" },
    { value: "quantity-desc", label: "Sort by Quantity ( Z - A )" },
  ];

  return (
    <TableOperations>
      <SortBy sortByOptions={sortByOptions} />
    </TableOperations>
  );
}

export default PartTableOperations;
