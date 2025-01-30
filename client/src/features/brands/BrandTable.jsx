import { Navigate, useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { useGetBrands } from "./useGetBrands";
import { PAGE_SIZE } from "../../utils/constants";

///////////////////////////////////
// DELETED BRAND TABLE COMPONENT
///////////////////////////////////

function DeletedBrands({ filterDeletedBrands }) {
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

////////////////////////////////////////
// AVAILABLE BRAND TABLE COMPONENT
////////////////////////////////////////

function BrandTable() {
  const { isPending, brands } = useGetBrands();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "brand-asc";
  const [, direction] = sortBy.split("-");

  let sortedBrands, currentPage, pageCount;
  let filterDeletedBrands = [];
  let filterAvailableBrands = [];

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

    // FILTER DELETED BRANDS
    filterDeletedBrands = sortedBrands.filter((brand) => brand.isDeleted);

    // FILTER AVAILABLE BRANDS
    filterAvailableBrands = sortedBrands.filter((brand) => !brand.isDeleted);

    // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(brands.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  // IF SEARCHPARAMS PAGE IS GREATER THAN EXISTING PAGE COUNTS, PAGE WILL BE REDIRECTED TO FIRST PAGE OF THE TABLE
  if (currentPage > pageCount || currentPage < 1)
    return <Navigate replace to="/manage" />;

  return (
    <Table
      columns=".35fr 2fr .1fr"
      deletedTableContent={
        <DeletedBrands filterDeletedBrands={filterDeletedBrands} />
      }
      tablePosition="static"
    >
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
