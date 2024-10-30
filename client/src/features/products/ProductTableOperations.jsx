import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

import { useGetBrands } from "../brands/useGetBrands";
import { useGetCategories } from "../categories/useGetCategories";
import { useGetModels } from "../models/useGetModels";
import { useGetSubCategories } from "../subCategories/useGetSubCategories";

function ProductTableOperations() {
  const { isPending: brandIsPending, brands } = useGetBrands();
  const { isPending: categoryIsPending, categories } = useGetCategories();
  const { isPending: modelIsPending, models } = useGetModels();
  const { isPending: subCategoryIsPending, subCategories } =
    useGetSubCategories();

  const isPending =
    brandIsPending ||
    categoryIsPending ||
    modelIsPending ||
    subCategoryIsPending;

  let filterList = [];
  if (!isPending) {
    filterList = [
      {
        filterTitle: "Brands",
        filterOptions: brands,
        filterField: "brand",
      },
      {
        filterTitle: "Models",
        filterOptions: models,
        filterField: "model",
        parentElement: "brand",
      },
      {
        filterTitle: "Categories",
        filterOptions: categories,
        filterField: "category",
      },
      {
        filterTitle: "SubCategories",
        filterOptions: subCategories,
        filterField: "subCategory",
        parentElement: "category",
      },
    ];
  }

  return (
    <TableOperations>
      <Filter filterList={filterList} />
    </TableOperations>
  );
}

export default ProductTableOperations;
