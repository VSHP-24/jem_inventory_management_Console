import { useGetSubCategories } from "./useGetSubCategories";

function SelectSubCategories({
  placeholder = "----- Select a SubCategory -----",
}) {
  const { isPending, subCategories } = useGetSubCategories();

  if (isPending) return subCategories;

  return (
    <>
      <option value="" itemType="String">
        {placeholder}
      </option>
      {subCategories
        .filter(
          (subCategory) =>
            !subCategory.isDeleted && !subCategory.category.isDeleted
        )
        .map((subCategory) => (
          <option key={subCategory.id} value={subCategory.id}>
            {subCategory.name}
          </option>
        ))}
    </>
  );
}

export default SelectSubCategories;
