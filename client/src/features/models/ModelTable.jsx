import { Navigate, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ModelRow from "./ModelRow";

import { useGetModels } from "./useGetModels";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";
import styled from "styled-components";
import { device } from "../../utils/devices";

const modelTableStyles = {
  defaultColumns: ".5fr 1fr 1fr .75fr .75fr .1fr",
  laptopL: { columns: ".25fr 1fr 1fr ", rows: "1fr 1fr 1fr 1fr" },
  tablet: { columns: ".25fr 1fr 1fr", rows: "1fr 1fr 1fr 1fr" },
  mobileM: { columns: ".15fr 1fr 1fr", rows: "1fr 1fr 1fr 1fr" },
};

const StyledTableColumnLaptopL = styled.div`
  @media ${device.laptopL} {
    grid-column: 2;
  }
`;

const InvisibileBox = styled.div`
  color: var(--color-gold-400);
`;

function DeletedModels({ filterDeletedModels }) {
  if (!filterDeletedModels || filterDeletedModels.length === 0)
    return <Empty resourceName={"Deleted Bike Models"} />;

  return (
    <Table
      columns=".5fr 1fr 1fr 1fr .5fr"
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Bike Model</div>
        <div>Version</div>
        <div>Year</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedModels}
        render={(model, i) => (
          <ModelRow
            model={model}
            index={i}
            key={model.id}
            id={model.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

function ModelTable() {
  const { isPending, models } = useGetModels();
  const [searchParams] = useSearchParams();

  let filteredBrands =
    searchParams.get("brand")?.split(",") || searchParams.get("brand") || "";

  const sortBy = searchParams.get("sortBy") || "brand-asc";
  const [field, direction] = sortBy.split("-");

  let sortedModels;
  let filterDeletedModels = [];
  let filterAvailableModels = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT

    sortedModels = models.sort((a, b) => {
      if (direction === "asc" && field === "brand") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase()) return 1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase())
          return -1;
      }
      if (direction === "desc" && field === "brand") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase())
          return -1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase()) return 1;
      }
      if (direction === "asc" && field !== "price") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
      }
      if (direction === "desc" && field !== "price") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
      }

      return null;
    });
    // Filter Deleted Models
    filterDeletedModels = sortedModels.filter(
      (model) => model.isDeleted || model.brand.isDeleted
    );
    // Filter Available Models
    filterAvailableModels = sortedModels.filter(
      (model) =>
        !model.isDeleted &&
        !model.brand.isDeleted &&
        (filteredBrands === "" ||
          filteredBrands.includes(String(model.brand.id)))
    );

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(models.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  if (currentPage > pageCount)
    return <Navigate replace to="/manage?tableType=bikes" />;

  return (
    <Table
      deletedTableContent={
        <DeletedModels filterDeletedModels={filterDeletedModels} />
      }
      columns={modelTableStyles}
    >
      <Table.Header>
        <div>Sl No.</div>
        <StyledTableColumnLaptopL>Brand</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Bike Model</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Version</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Year</StyledTableColumnLaptopL>

        <InvisibileBox>Hello</InvisibileBox>
      </Table.Header>

      <Table.Body
        data={filterAvailableModels}
        render={(model, i) => (
          <ModelRow model={model} index={i} key={model.id} id={model.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableModels.length} />
      </Table.Footer>
    </Table>
  );
}

export default ModelTable;
