import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import BrandDetailPage from "./BrandDetailPage";
import BrandForm from "./BrandForm";

import { useDeleteBrand } from "./useDeleteBrand";
import { useEditBrand } from "./useEditBrand";

function BrandRow({ brand, index, id, deletedTable }) {
  const { name } = brand;
  const { isDeleting, deleteBrand } = useDeleteBrand();

  const { editBrand } = useEditBrand();

  function handleRestoreButtonClick() {
    editBrand({ ...brand, isDeleted: false });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Brand"
      detailPageContent={<BrandDetailPage brand={brand} />}
      editFormContent={<BrandForm brandToEdit={brand} />}
      deleteContentFrom={deleteBrand}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{name}</div>
      {deletedTable && (
        <RestoreButton onHandleRestoreButtonClick={handleRestoreButtonClick} />
      )}
    </Table.Row>
  );
}

export default BrandRow;
