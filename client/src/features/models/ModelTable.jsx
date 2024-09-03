import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";
import ModelRow from "./ModelRow";

import { useGetModels } from "./useGetModels";

function ModelTable() {
  const { isPending, models } = useGetModels();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr 1fr .75fr .5fr .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Brand</div>
        <div>Bike Model</div>
        <div>Version</div>
        <div>Year</div>
      </Table.Header>

      <Table.Body
        data={models}
        render={(model, i) => (
          <ModelRow model={model} index={i} key={model.id} />
        )}
      />
    </Table>
  );
}

export default ModelTable;
