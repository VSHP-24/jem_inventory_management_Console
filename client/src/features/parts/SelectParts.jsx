import { useQuery } from "@tanstack/react-query";
import { getParts } from "../../services/apiParts";

function SelectParts() {
  const { isPending, data: parts } = useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });

  if (isPending) return parts;

  return (
    <>
      <option value="" itemType="String">
        ----- Select All the Parts -----
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
