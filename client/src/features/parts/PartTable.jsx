import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import PartRow from "./PartRow";

import { useGetParts } from "./useGetParts";

function PartTable() {
  const { isPending, parts } = useGetParts();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns=".5fr 1fr .5fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
        </Table.Header>

        <Table.Body
          data={parts}
          render={(part, i) => <PartRow part={part} index={i} key={part.id} />}
        />
      </Table>
    </Menus>
  );
}

export default PartTable;
