import { Navigate, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PartRow from "./PartRow";

import { useGetParts } from "./useGetParts";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";

function DeletedParts({ filterDeletedParts }) {
  if (!filterDeletedParts || filterDeletedParts.length === 0)
    return <Empty resourceName={"Deleted Parts"} />;

  return (
    <Table
      columns=".5fr 1fr 1fr .5fr"
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
        <div>Quantity</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedParts}
        render={(part, i) => (
          <PartRow
            part={part}
            index={i}
            key={part.id}
            id={part.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

function PartTable() {
  const { isPending, parts } = useGetParts();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "part-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedParts;
  let filterDeletedParts = [];
  let filterAvailableParts = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT

    sortedParts = parts.sort((a, b) => {
      if (direction === "asc" && field !== "quantity") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
      }
      if (direction === "desc" && field !== "quantity") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
      }
      if (field === "quantity") {
        return (a[field] - b[field]) * modifier;
      }

      return null;
    });

    // Filter Deleted Parts
    filterDeletedParts = sortedParts.filter((part) => part.isDeleted);
    // Filter Available Parts
    filterAvailableParts = sortedParts.filter((part) => !part.isDeleted);

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(parts.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  if (currentPage > pageCount) return <Navigate replace to="/Inventory" />;

  return (
    <Table
      deletedTableContent={
        <DeletedParts filterDeletedParts={filterDeletedParts} />
      }
      columns=".5fr 1fr 1fr .5fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
        <div>Quantity</div>
      </Table.Header>

      <Table.Body
        data={filterAvailableParts}
        render={(part, i) => (
          <PartRow part={part} index={i} key={part.id} id={part.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableParts.length} />
      </Table.Footer>
    </Table>
  );
}

export default PartTable;
