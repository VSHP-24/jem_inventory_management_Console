import { useQuery } from "@tanstack/react-query";
import { getModels } from "../../services/apiModels";

function SelectModels() {
  const { isPending, data: models } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  if (isPending) return models;

  return (
    <>
      <option value="" itemType="String">
        ----- Select a Model -----
      </option>
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </>
  );
}

export default SelectModels;
