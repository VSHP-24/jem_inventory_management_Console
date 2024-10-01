import Table from "../../ui/Table";
import ProductForm from "./ProductForm";

import { useDeleteProduct } from "./useDeleteProduct";

function ProductRow({ product, index, id }) {
  const { brand, model, category, subCategory } = product;
  const { isDeleting, deleteProduct } = useDeleteProduct();

  return (
    <Table.Row
      id={id}
      deleteContentFrom={deleteProduct}
      isDeleting={isDeleting}
      contentType="Product"
      editFormContent={<ProductForm productToEdit={product} />}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{brand.name}</div>
      <div>{model.name}</div>
      <div>{category.name}</div>
      <div>{subCategory.name}</div>
    </Table.Row>
  );
}

export default ProductRow;
