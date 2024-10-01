import Table from "../../ui/Table";
import BrandForm from "./BrandForm";

import { useDeleteBrand } from "./useDeleteBrand";

function BrandRow({ brand, index, id }) {
  const { name } = brand;
  const { isDeleting, deleteBrand } = useDeleteBrand();

  return (
    <Table.Row
      id={id}
      deleteContentFrom={deleteBrand}
      isDeleting={isDeleting}
      contentType="Brand"
      editFormContent={
        <BrandForm
          brandToEdit={brand}
          // setIsOpenModal={setIsOpenModal}
        />
      }
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{name}</div>
    </Table.Row>
  );
}

export default BrandRow;
