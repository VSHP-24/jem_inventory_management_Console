import Table from "../../ui/Table";
import BrandDetailPage from "./BrandDetailPage";
import BrandForm from "./BrandForm";

import { useDeleteBrand } from "./useDeleteBrand";

function BrandRow({ brand, index, id }) {
  const { name } = brand;
  const { isDeleting, deleteBrand } = useDeleteBrand();

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
    </Table.Row>
  );
}

export default BrandRow;
