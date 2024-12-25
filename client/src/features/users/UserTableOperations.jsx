import { useSearchParams } from "react-router-dom";

import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function UserTableOperations() {
  const [searchParams] = useSearchParams();

  let sortByOptions = [];

  const showUsers = searchParams.get("userOptions");

  if (showUsers === "allUsers") {
    sortByOptions = [
      { value: "name-asc", label: "Sort by Name ( A - Z )" },
      { value: "name-desc", label: "Sort by Name ( Z - A )" },
      { value: "email-asc", label: "Sort by Email ( A - Z )" },
      { value: "email-desc", label: "Sort by Email ( Z - A )" },
    ];
  }
  return (
    <TableOperations>
      {showUsers === "allUsers" && <SortBy sortByOptions={sortByOptions} />}
    </TableOperations>
  );
}

export default UserTableOperations;
