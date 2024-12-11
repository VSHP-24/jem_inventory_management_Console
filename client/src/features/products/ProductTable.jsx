import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";

import { useGetProducts } from "./useGetProducts";
import { Navigate, useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";

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

    // Filter Deleted Products

    filterDeletedProducts = sortedProducts.filter(
      (product) =>
        product.isDeleted ||
        product.brand.isDeleted ||
        product.model.isDeleted ||
        product.category.isDeleted ||
        product.subCategory.isDeleted
    );

    // Filter Available Products

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

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(products.length / PAGE_SIZE);
  }

  function DeletedProducts() {
    if (!filterDeletedProducts || filterDeletedProducts.length === 0)
      return <Empty resourceName={"Deleted Products"} />;

    return (
      <Table
        columns="2fr 10fr .75fr"
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

  if (isPending) return <Spinner />;

  if (!filterAvailableProducts || filterAvailableProducts.length === 0)
    return <Empty resourceName={"Products"} />;

  if (currentPage > pageCount) return <Navigate replace to="/Products" />;

  return (
    <Table
      deletedTableContent={<DeletedProducts />}
      columns=".75fr 1.25fr 1.5fr 1.25fr 2fr 1fr .75fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Brand</div>
        <div>Model</div>
        <div>Category</div>
        <div>SubCategory</div>
        <div>Price</div>
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
