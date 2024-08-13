import { useGetModels } from "./useGetModels";

function SelectModels() {
  const { isPending, models } = useGetModels();

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
