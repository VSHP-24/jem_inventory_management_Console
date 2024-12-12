import { Navigate, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";

import { useGetBrands } from "./useGetBrands";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";

function BrandTable() {
  const { isPending, brands } = useGetBrands();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "brand-asc";
  const [, direction] = sortBy.split("-");

  let sortedBrands;
  let filterDeletedBrands = [];
  let filterAvailableBrands = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT
    sortedBrands = brands.sort((a, b) => {
      if (direction === "asc") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
      }
      if (direction === "desc") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
      }
      return null;
    });

    // Filter Deleted Brands

    filterDeletedBrands = sortedBrands.filter((brand) => brand.isDeleted);

    // Filter Available Brands

    filterAvailableBrands = sortedBrands.filter((brand) => !brand.isDeleted);

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(brands.length / PAGE_SIZE);
  }

  function DeletedBrands() {
    if (!filterDeletedBrands || filterDeletedBrands.length === 0)
      return <Empty resourceName={"Deleted Brands"} />;

    return (
      <Table
        columns="2fr 5fr .5fr"
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
        </Table.Header>

        <Table.Body
          data={filterDeletedBrands}
          render={(brand, i) => (
            <BrandRow
              brand={brand}
              index={i}
              key={brand.id}
              id={brand.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  if (currentPage > pageCount) return <Navigate replace to="/manage" />;

  return (
    <Table columns=".5fr 1fr .5fr" deletedTableContent={<DeletedBrands />}>
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={filterAvailableBrands}
        render={(brand, i) => (
          <BrandRow brand={brand} index={i} key={brand.id} id={brand.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableBrands.length} />
      </Table.Footer>
    </Table>
  );
}

export default BrandTable;
