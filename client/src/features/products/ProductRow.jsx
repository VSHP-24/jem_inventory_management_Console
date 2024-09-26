import { useState } from "react";

import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";
import ProductForm from "./ProductForm";

import { useDeleteProduct } from "./useDeleteProduct";

function ProductRow({
  product,
  index,
  openId,
  close,
  open,
  setPosition,
  position,
  id,
}) {
  const [showForm, setShowForm] = useState(false);

  const { brand, model, category, subCategory } = product;
  const { isDeleting, deleteProduct } = useDeleteProduct();

  function handleViewDetails() {
    console.log(`handleViewDetails in ProductTable`);
    close();
  }
  function handleEdit() {
    setShowForm((show) => !show);
    close();
  }
  function handleDelete() {
    deleteProduct(id);
    close();
  }

  return (
    <>
      <Table.Row>
        <div>
          {(index <= 8 && `0${index + 1}`) ||
            (index === 9 && `${index + 1}`) ||
            index + 1}
        </div>
        <div>{brand.name}</div>
        <div>{model.name}</div>
        <div>{category.name}</div>
        <div>{subCategory.name}</div>

        <TableMenuButton
          id={id}
          openId={openId}
          close={close}
          open={open}
          setPosition={setPosition}
        />
        {openId === id && (
          <TableMenuList
            id={id}
            openId={openId}
            position={position}
            onHandleViewDetails={handleViewDetails}
            onHandleEdit={handleEdit}
            onHandleDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </Table.Row>
      {showForm && (
        <ProductForm productToEdit={product} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default ProductRow;
