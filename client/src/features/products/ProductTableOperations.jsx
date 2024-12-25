import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

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

  const sortByOptions = [
    { value: "brand-asc", label: "Sort by Brand ( A - Z )" },
    { value: "brand-desc", label: "Sort by Brand ( Z - A )" },
    { value: "model-asc", label: "Sort by Model ( A - Z )" },
    { value: "model-desc", label: "Sort by Model ( Z - A )" },
    { value: "category-asc", label: "Sort by Category ( A - Z )" },
    { value: "category-desc", label: "Sort by Category ( Z - A )" },
    { value: "subCategory-asc", label: "Sort by SubCategory ( A - Z )" },
    { value: "subCategory-desc", label: "Sort by SubCategory ( Z - A )" },
    { value: "price-asc", label: "Sort by Price ( Low --> High )" },
    { value: "price-desc", label: "Sort by Price ( High --> Low )" },
  ];

  return (
    <TableOperations>
      <Filter filterList={filterList} />
      <SortBy sortByOptions={sortByOptions} />
    </TableOperations>
  );
}

export default ProductTableOperations;
