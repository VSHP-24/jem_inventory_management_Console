import Table from "../../ui/Table";
import TableMenuButton from "../../ui/TableMenuButton";
import TableMenuList from "../../ui/TableMenuList";

function ModelRow({
  model,
  index,
  openId,
  close,
  open,
  setPosition,
  position,
  id,
}) {
  const { name, brand, version, year } = model;
  function handleViewDetails() {
    console.log(`handleViewDetails in ModelTable`);
    close();
  }
  function handleEdit() {
    console.log(`handleEdit in ModelTable`);
    close();
  }
  function handleDelete() {
    console.log(`handleDelete in ModelTable`);
    close();
  }
  return (
    <Table.Row>
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{brand.name}</div>
      <div>{name}</div>
      <div>{version}</div>
      <div>{year}</div>

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
        />
      )}
    </Table.Row>
  );
}

export default ModelRow;
