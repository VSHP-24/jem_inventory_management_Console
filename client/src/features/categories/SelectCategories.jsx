import { useGetCategories } from "./useGetCategories";

function SelectCategories() {
  const { isPending, categories } = useGetCategories();
  if (isPending) return categories;

  return (
    <>
      <option value="" itemType="String">
        ----- Select a Category -----
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </>
  );
}

export default SelectCategories;
