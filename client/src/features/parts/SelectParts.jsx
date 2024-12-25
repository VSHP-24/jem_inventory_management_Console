import { useGetParts } from "./useGetParts";

function SelectParts({ placeholder = "----- Select a Part -----" }) {
  const { isPending, parts } = useGetParts();

  if (isPending) return parts;

  return (
    <>
      <option value="" itemType="String">
        {placeholder}
      </option>

      {parts
        .filter((part) => !part.isDeleted)
        .map((part) => (
          <option key={part.id} value={part.id}>
            {part.name}
          </option>
        ))}
    </>
  );
}

export default SelectParts;
