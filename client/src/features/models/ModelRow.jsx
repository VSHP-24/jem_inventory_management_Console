import toast from "react-hot-toast";
import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import ModelDetailPage from "./ModelDetailPage";
import ModelForm from "./ModelForm";

import { useDeleteModel } from "./useDeleteModel";
import { useEditModel } from "./useEditModel";

function ModelRow({ model, index, id, deletedTable }) {
  const { name, brand, version, year } = model;
  const { isDeleting, deleteModel } = useDeleteModel();

  const { editModel } = useEditModel();

  function handleRestoreButtonClick() {
    if (!model.isDeleted)
      return toast.error(
        `${model.brand.name} brand is deleted . Restore brand first ! `
      );
    editModel({ ...model, isDeleted: false });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Model"
      detailPageContent={<ModelDetailPage model={model} />}
      editFormContent={<ModelForm modelToEdit={model} />}
      deleteContentFrom={deleteModel}
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
      {deletedTable && (
        <RestoreButton onHandleRestoreButtonClick={handleRestoreButtonClick} />
      )}
    </Table.Row>
  );
}

export default ModelRow;
