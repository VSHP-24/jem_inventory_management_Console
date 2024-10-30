import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ModelRow from "./ModelRow";

import { useGetModels } from "./useGetModels";

function ModelTable() {
  const { isPending, models } = useGetModels();
  const [searchParams] = useSearchParams();

  let filteredBrands =
    searchParams.get("brand")?.split(",") || searchParams.get("brand") || "";

  function DeletedModels() {
    return (
      <Table
        columns=".5fr 1fr 1fr 1fr .5fr .5fr"
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Brand</div>
          <div>Bike Model</div>
          <div>Version</div>
          <div>Year</div>
        </Table.Header>

        <Table.Body
          data={models.filter(
            (model) => model.isDeleted || model.brand.isDeleted
          )}
          render={(model, i) => (
            <ModelRow
              model={model}
              index={i}
              key={model.id}
              id={model.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Table
      deletedTableContent={<DeletedModels />}
      columns=".5fr 1fr 1fr .75fr .5fr .5fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Brand</div>
        <div>Bike Model</div>
        <div>Version</div>
        <div>Year</div>
      </Table.Header>

      <Table.Body
        data={models.filter(
          (model) =>
            !model.isDeleted &&
            !model.brand.isDeleted &&
            (filteredBrands === "" ||
              filteredBrands.includes(String(model.brand.id)))
        )}
        render={(model, i) => (
          <ModelRow model={model} index={i} key={model.id} id={model.id} />
        )}
      />
    </Table>
  );
}

export default ModelTable;
