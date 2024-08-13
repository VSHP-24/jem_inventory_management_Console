import { useGetBrands } from "./useGetBrands";

function SelectBrands() {
  const { isPending, brands } = useGetBrands();
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
