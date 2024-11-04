import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useGetBrands } from "../brands/useGetBrands";
import { useGetCategories } from "../categories/useGetCategories";
import SortBy from "../../ui/SortBy";

function ManageTableOperations() {
  const [searchParams] = useSearchParams();

  const { isPending: brandIsPending, brands } = useGetBrands();
  const { isPending: categoryIsPending, categories } = useGetCategories();
  const isPending = brandIsPending || categoryIsPending;

  const showTable = searchParams.get("tableType");

  let filterList = [];
  let sortByOptions = [];

  if (!isPending) {
    if (showTable === "bikes") {
      filterList = [
        {
          filterTitle: "Brands",
          filterOptions: brands,
          filterField: "brand",
        },
      ];
      sortByOptions = [
        { value: "brand-asc", label: "Sort by Brand ( A - Z )" },
        { value: "brand-desc", label: "Sort by Brand ( Z - A )" },
        { value: "model-asc", label: "Sort by Model ( A - Z )" },
        { value: "model-desc", label: "Sort by Model ( Z - A )" },
      ];
    } else if (showTable === "categories") {
      sortByOptions = [
        { value: "category-asc", label: "Sort by Category ( A - Z )" },
        { value: "category-desc", label: "Sort by Category ( Z - A )" },
      ];
    } else if (showTable === "subCategories") {
      filterList = [
        {
          filterTitle: "Categories",
          filterOptions: categories,
          filterField: "category",
        },
      ];
      sortByOptions = [
        { value: "category-asc", label: "Sort by Category ( A - Z )" },
        { value: "category-desc", label: "Sort by Category ( Z - A )" },
        { value: "subCategory-asc", label: "Sort by SubCategory ( A - Z )" },
        { value: "subCategory-desc", label: "Sort by SubCategory ( Z - A )" },
      ];
    } else {
      sortByOptions = [
        { value: "brand-asc", label: "Sort by Brand ( A - Z )" },
        { value: "brand-desc", label: "Sort by Brand ( Z - A )" },
      ];
    }
  }

  return (
    <TableOperations>
      {(showTable === "bikes" || showTable === "subCategories") && (
        <Filter filterList={filterList} />
      )}
      <SortBy sortByOptions={sortByOptions} />
    </TableOperations>
  );
}

export default ManageTableOperations;
