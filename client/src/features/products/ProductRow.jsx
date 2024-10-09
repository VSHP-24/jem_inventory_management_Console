import Table from "../../ui/Table";
import ProductDetailPage from "./ProductDetailPage";
import ProductForm from "./ProductForm";

import { useDeleteProduct } from "./useDeleteProduct";

function ProductRow({ product, index, id }) {
  const { brand, model, category, subCategory, price } = product;
  const { isDeleting, deleteProduct } = useDeleteProduct();

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Product"
      detailPageContent={<ProductDetailPage product={product} />}
      editFormContent={<ProductForm productToEdit={product} />}
      deleteContentFrom={deleteProduct}
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
      <div>₹ {price}</div>
    </Table.Row>
  );
}

export default ProductRow;
