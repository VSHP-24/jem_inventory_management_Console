import Table from "../../ui/Table";
import ProductDetailPage from "./ProductDetailPage";
import ProductForm from "./ProductForm";
import RestoreButton from "../../ui/RestoreButton";

import { useDeleteProduct } from "./useDeleteProduct";
import { useEditProduct } from "./useEditProduct";
import toast from "react-hot-toast";

function ProductRow({ product, index, id, deletedTable }) {
  const { name, brand, model, category, subCategory, price } = product;
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { editProduct } = useEditProduct();

  function handleRestoreButtonClick() {
    if (!product.isDeleted) {
      if (product.brand.isDeleted)
        return toast.error(
          `${product.brand.name} brand is deleted. Restore Brand first !`
        );
      if (product.model.isDeleted)
        return toast.error(
          `${product.model.name} bike model is deleted. Restore Bike Model first !`
        );
      if (product.category.isDeleted)
        return toast.error(
          `${product.category.name} category is deleted. Restore Category first !`
        );
      if (product.subCategory.isDeleted)
        return toast.error(
          `${product.subCategory.name} subCategory is deleted. Restore SubCategory first !`
        );
      if (product.brand.isDeleted)
        return toast.error(
          `${product.brand.name} brand is deleted. Restore Brand first !`
        );
    }
    editProduct({ ...product, isDeleted: false });
  }

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
      {!deletedTable && (
        <>
          <div>{brand.name}</div>
          <div>{model.name}</div>
          <div>{category.name}</div>
          <div>{subCategory.name}</div>
          <div>₹ {price}</div>
        </>
      )}
      {deletedTable && (
        <>
          <div>{name}</div>
          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default ProductRow;
