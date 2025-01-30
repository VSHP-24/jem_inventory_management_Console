import styled from "styled-components";
import { Navigate, useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SubCategoryRow from "./SubCategoryRow";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { PAGE_SIZE } from "../../utils/constants";
import { device } from "../../utils/devices";
import { useGetSubCategories } from "./useGetSubCategories";

const subCategoryTableStyles = {
  defaultColumns: ".5fr 1fr 1fr ",
  laptopL: { columns: ".25fr 1fr 1fr ", rows: "1fr 1fr " },
  tablet: { columns: ".25fr 1fr 1fr", rows: "1fr 1fr" },
  mobileM: { columns: ".35fr 1fr 1.5fr", rows: "1fr 1fr" },
};

const StyledTableColumnLaptopL = styled.div`
  @media ${device.laptopL} {
    grid-column: 2;
  }
`;

////////////////////////////////////////
// DELETED SUBCATEGORY TABLE COMPONENT
////////////////////////////////////////
function DeletedSubCategory({ filterDeletedSubCategories }) {
  if (!filterDeletedSubCategories || filterDeletedSubCategories.length === 0)
    return <Empty resourceName={"Deleted SubCategories"} />;

  return (
    <Table
      modalWindowedTable={true}
      menuListRequired={false}
      columns=".5fr 1fr 1fr .5fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Category</div>
        <div>SubCategory</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedSubCategories}
        render={(subCategory, i) => (
          <SubCategoryRow
            subCategory={subCategory}
            index={i}
            key={subCategory.id}
            id={subCategory.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

////////////////////////////////////////
// AVAILABLE SUBCATEGORY TABLE COMPONENT
////////////////////////////////////////
function SubCategoryTable() {
  const { isPending, subCategories } = useGetSubCategories();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "category-asc";
  const [field, direction] = sortBy.split("-");

  let filteredCategories =
    searchParams.get("category")?.split(",") ||
    searchParams.get("category") ||
    "";

  let sortedSubCategories, currentPage, pageCount;
  let filterDeletedSubCategories = [];
  let filterAvailableSubCategories = [];

  if (!isPending) {
    // SORT
    sortedSubCategories = subCategories.sort((a, b) => {
      if (direction === "asc" && field === "category") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase()) return 1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase())
          return -1;
      }
      if (direction === "desc" && field === "category") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase())
          return -1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase()) return 1;
      }
      if (direction === "asc") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
      }
      if (direction === "desc" && field !== "price") {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
      }

      return null;
    });

    // FILTER DELETED SUBCATEGORIES
    filterDeletedSubCategories = sortedSubCategories.filter(
      (subCategory) => subCategory.isDeleted || subCategory.category.isDeleted
    );

    // FILTER AVAILABLE SUBCATEGORIES
    filterAvailableSubCategories = sortedSubCategories.filter(
      (subCategory) =>
        !subCategory.isDeleted &&
        !subCategory.category.isDeleted &&
        (filteredCategories === "" ||
          filteredCategories.includes(String(subCategory.category.id)))
    );

    // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(subCategories.length / PAGE_SIZE) || 1;
  }

  if (isPending) return <Spinner />;

  // IF SEARCHPARAMS PAGE IS GREATER THAN EXISTING PAGE COUNTS, PAGE WILL BE REDIRECTED TO FIRST PAGE OF THE TABLE
  if (currentPage > pageCount || currentPage < 1)
    return <Navigate replace to="/manage?tableType=subCategories" />;

  return (
    <Table
      deletedTableContent={
        <DeletedSubCategory
          filterDeletedSubCategories={filterDeletedSubCategories}
        />
      }
      columns={subCategoryTableStyles}
    >
      <Table.Header>
        <div>Sl No.</div>
        <StyledTableColumnLaptopL>Category</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>SubCategory</StyledTableColumnLaptopL>
      </Table.Header>

      <Table.Body
        data={filterAvailableSubCategories}
        render={(subCategory, i) => (
          <SubCategoryRow
            subCategory={subCategory}
            index={i}
            key={subCategory.id}
            id={subCategory.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableSubCategories.length} />
      </Table.Footer>
    </Table>
  );
}

export default SubCategoryTable;
