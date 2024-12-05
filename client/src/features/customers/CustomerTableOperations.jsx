import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function CustomerTableOperations() {
  let sortByOptions = [
    { value: "name-asc", label: "Sort by Name ( A - Z )" },
    { value: "name-desc", label: "Sort by Name ( Z - A )" },
    { value: "email-asc", label: "Sort by Email ( A - Z )" },
    { value: "email-desc", label: "Sort by Email ( Z - A )" },
  ];

  return (
    <TableOperations>
      <SortBy sortByOptions={sortByOptions} />
    </TableOperations>
  );
}

export default CustomerTableOperations;
