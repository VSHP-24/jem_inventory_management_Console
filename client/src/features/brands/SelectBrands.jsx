import { useGetBrands } from "./useGetBrands";

function SelectBrands({ placeholder = "----- Select a Brand -----" }) {
  const { isPending, brands } = useGetBrands();
  if (isPending) return brands;

  return (
    <>
      <option value="" itemType="String">
        {placeholder}
      </option>

      {brands
        .filter((brand) => !brand.isDeleted)
        .map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
    </>
  );
}

export default SelectBrands;
