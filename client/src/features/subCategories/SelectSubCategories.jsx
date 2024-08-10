import { useQuery } from "@tanstack/react-query";
import { getSubCategories } from "../../services/apiSubCategories";

function SelectSubCategories() {
  const { isPending, data: subCategories } = useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
  });

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
