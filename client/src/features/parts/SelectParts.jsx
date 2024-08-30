import { useGetParts } from "./useGetParts";

function SelectParts() {
  const { isPending, parts } = useGetParts();
  if (isPending) return parts;

  return (
    <>
      <option value="" itemType="String">
        ----- Select a Part -----
      </option>
      {parts.map((part) => (
        <option key={part.id} value={part.id}>
          {part.name}
        </option>
      ))}
    </>
  );
}

export default SelectParts;
