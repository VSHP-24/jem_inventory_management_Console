import Table from "../../ui/Table";
import ModelForm from "./ModelForm";

import { useDeleteModel } from "./useDeleteModel";

function ModelRow({ model, index, id }) {
  const { name, brand, version, year } = model;
  const { isDeleting, deleteModel } = useDeleteModel();

  return (
    <Table.Row
      id={id}
      deleteContentFrom={deleteModel}
      isDeleting={isDeleting}
      modalWindowContent={<ModelForm modelToEdit={model} />}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{brand.name}</div>
      <div>{name}</div>
      <div>{version}</div>
      <div>{year}</div>
    </Table.Row>
  );
}

export default ModelRow;
