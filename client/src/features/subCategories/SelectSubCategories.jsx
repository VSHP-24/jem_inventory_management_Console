import { useGetSubCategories } from "./useGetSubCategories";

function SelectSubCategories() {
  const { isPending, subCategories } = useGetSubCategories();

  if (isPending) return subCategories;

  return (
    <>
      <option value="" itemType="String">
        ----- Select a SubCategory -----
      </option>
      {subCategories.map((subCategory) => (
        <option key={subCategory.id} value={subCategory.id}>
          {subCategory.name}
        </option>
      ))}
    </>
  );
}

export default SelectSubCategories;
