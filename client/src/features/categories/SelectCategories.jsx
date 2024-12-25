import { useGetCategories } from "./useGetCategories";

function SelectCategories({ placeholder = "----- Select a Category -----" }) {
  const { isPending, categories } = useGetCategories();

  if (isPending) return categories;

  return (
    <>
      <option value="" itemType="String">
        {placeholder}
      </option>

      {categories
        .filter((category) => !category.isDeleted)
        .map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </>
  );
}

export default SelectCategories;
