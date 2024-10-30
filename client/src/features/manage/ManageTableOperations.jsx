import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useGetBrands } from "../brands/useGetBrands";
import { useGetCategories } from "../categories/useGetCategories";

function ManageTableOperations() {
  const [searchParams] = useSearchParams();

  const { isPending: brandIsPending, brands } = useGetBrands();
  const { isPending: categoryIsPending, categories } = useGetCategories();
  const isPending = brandIsPending || categoryIsPending;

  const showTable = searchParams.get("tableType");

  let filterList = [];

  if (!isPending) {
    if (showTable === "bikes") {
      filterList = [
        {
          filterTitle: "Brands",
          filterOptions: brands,
          filterField: "brand",
        },
      ];
    }
    if (showTable === "subCategories") {
      filterList = [
        {
          filterTitle: "Categories",
          filterOptions: categories,
          filterField: "category",
        },
      ];
    }
  }
  return (
    <TableOperations>
      {(showTable === "bikes" || showTable === "subCategories") && (
        <Filter filterList={filterList} />
      )}
    </TableOperations>
  );
}

export default ManageTableOperations;
