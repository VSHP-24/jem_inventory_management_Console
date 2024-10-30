import { useGetModels } from "./useGetModels";

function SelectModels({ placeholder = "----- Select a Model -----" }) {
  const { isPending, models } = useGetModels();

  if (isPending) return models;

  return (
    <>
      <option value="" itemType="String">
        {placeholder}
      </option>
      {models
        .filter((model) => !model.isDeleted && !model.brand.isDeleted)
        .map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
    </>
  );
}

export default SelectModels;
