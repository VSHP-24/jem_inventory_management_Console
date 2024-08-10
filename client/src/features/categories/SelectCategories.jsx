import { useQuery } from "@tanstack/react-query";
import { getCategoris } from "../../services/apiCategories";

function SelectCategories() {
  const { isPending, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoris,
  });

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
