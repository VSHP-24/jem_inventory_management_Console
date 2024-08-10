import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../services/apiBrands";

function SelectBrands() {
  const { isPending, data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isPending) return brands;

  return (
    <>
      <option value="" itemType="String">
        ----- Select a Brand -----
      </option>
      {brands.map((brand) => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </>
  );
}

export default SelectBrands;
