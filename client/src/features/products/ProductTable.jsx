import styled from "styled-components";
import { Navigate, useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { useGetProducts } from "./useGetProducts";
import { PAGE_SIZE } from "../../utils/constants";
import { device } from "../../utils/devices";

const productTableStyles = {
  defaultColumns: ".75fr 1fr 1.5fr 1.25fr 1.5fr 1fr ",
  laptopL: { columns: ".25fr 1fr 1fr ", rows: "1fr 1fr 1fr 1fr 1fr" },
  tablet: { columns: ".25fr 1fr 1fr", rows: "1fr 1fr 1fr 1fr 1fr" },
  mobileM: { columns: ".35fr 1fr 2fr", rows: "1fr 1fr 1fr 1fr 1fr" },
};

const StyledTableColumnLaptopL = styled.div`
  @media ${device.laptopL} {
    grid-column: 2;
  }
`;

///////////////////////////////////
// DELETED PRODUCTS TABLE COMPONENT
///////////////////////////////////
function DeletedProducts({ filterDeletedProducts }) {
  if (!filterDeletedProducts || filterDeletedProducts.length === 0)
    return <Empty resourceName={"Deleted Products"} />;

  return (
    <Table
      columns=".35fr 1fr .25fr"
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={filterDeletedProducts}
        render={(product, i) => (
          <ProductRow
            product={product}
            index={i}
            key={product.id}
            id={product.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

////////////////////////////////////////
// AVAILABLE PRODUCT TABLE COMPONENT
////////////////////////////////////////

function ProductTable() {
  const { isPending, products } = useGetProducts();
  const [searchParams] = useSearchParams();

  let filteredBrands =
    searchParams.get("brand")?.split(",") || searchParams.get("brand") || "";
  let filteredModels =
    searchParams.get("model")?.split(",") || searchParams.get("model") || "";
  let filteredCategories =
    searchParams.get("category")?.split(",") ||
    searchParams.get("category") ||
    "";
  let filteredSubCategories =
    searchParams.get("subCategory")?.split(",") ||
    searchParams.get("subCategory") ||
    "";

  const sortBy = searchParams.get("sortBy") || "brand-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedProducts;
  let filterDeletedProducts = [];
  let filterAvailableProducts = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT
    sortedProducts = products.sort((a, b) => {
      if (direction === "asc" && field !== "price") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase()) return 1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase())
          return -1;
      }
      if (direction === "desc" && field !== "price") {
        if (a[field].name.toUpperCase() > b[field].name.toUpperCase())
          return -1;
        if (b[field].name.toUpperCase() > a[field].name.toUpperCase()) return 1;
      }
      if (field === "price") {
        return (a[field] - b[field]) * modifier;
      }
      return null;
    });

    // FILTER DELETED PRODUCTS
    filterDeletedProducts = sortedProducts.filter(
      (product) =>
        product.isDeleted ||
        product.brand.isDeleted ||
        product.model.isDeleted ||
        product.category.isDeleted ||
        product.subCategory.isDeleted
    );

    // FILTER AVAILABLE PRODUCTS
    filterAvailableProducts = sortedProducts.filter(
      (product) =>
        !product.isDeleted &&
        !product.brand.isDeleted &&
        !product.model.isDeleted &&
        !product.category.isDeleted &&
        !product.subCategory.isDeleted &&
        (filteredBrands === "" ||
          filteredBrands.includes(String(product.brand.id))) &&
        (filteredModels === "" ||
          filteredModels.includes(String(product.model.id))) &&
        (filteredCategories === "" ||
          filteredCategories.includes(String(product.category.id))) &&
        (filteredSubCategories === "" ||
          filteredSubCategories.includes(String(product.subCategory.id)))
    );

    // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(products.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  // IF SEARCHPARAMS PAGE IS GREATER THAN EXISTING PAGE COUNTS, PAGE WILL BE REDIRECTED TO FIRST PAGE OF THE TABLE
  if (currentPage > pageCount || currentPage < 1)
    return <Navigate replace to="/Products" />;

  return (
    <Table
      deletedTableContent={
        <DeletedProducts filterDeletedProducts={filterDeletedProducts} />
      }
      columns={productTableStyles}
    >
      <Table.Header>
        <div>Sl No.</div>

        <StyledTableColumnLaptopL>Brand</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Model</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Category</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>SubCategory</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Price</StyledTableColumnLaptopL>
      </Table.Header>

      <Table.Body
        data={filterAvailableProducts}
        render={(product, i) => (
          <ProductRow
            product={product}
            index={i}
            key={product.id}
            id={product.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableProducts.length} />
      </Table.Footer>
    </Table>
  );
}

export default ProductTable;
