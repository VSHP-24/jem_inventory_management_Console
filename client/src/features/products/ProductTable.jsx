import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";

import { useGetProducts } from "./useGetProducts";
import { useSearchParams } from "react-router-dom";

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

  function DeletedProducts() {
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
          data={products.filter(
            (product) =>
              product.isDeleted ||
              product.brand.isDeleted ||
              product.model.isDeleted ||
              product.category.isDeleted ||
              product.subCategory.isDeleted
          )}
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
        data={products.filter(
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
        )}
        render={(product, i) => (
          <ProductRow
            product={product}
            index={i}
            key={product.id}
            id={product.id}
          />
        )}
      />
    </Table>
  );
}

export default ProductTable;
