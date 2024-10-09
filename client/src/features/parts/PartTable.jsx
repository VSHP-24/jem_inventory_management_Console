import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PartRow from "./PartRow";

import { useGetParts } from "./useGetParts";

function PartTable() {
  const { isPending, parts } = useGetParts();

  function DeletedParts() {
    return (
      <Table
        columns=".5fr 1fr 1fr .5fr"
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
          <div>Quantity</div>
        </Table.Header>

        <Table.Body
          data={parts.filter((part) => part.isDeleted)}
          render={(part, i) => (
            <PartRow
              part={part}
              index={i}
              key={part.id}
              id={part.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Table deletedTableContent={<DeletedParts />} columns=".5fr 1fr 1fr .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
        <div>Quantity</div>
      </Table.Header>

      <Table.Body
        data={parts.filter((part) => !part.isDeleted)}
        render={(part, i) => (
          <PartRow part={part} index={i} key={part.id} id={part.id} />
        )}
      />
    </Table>
  );
}

export default PartTable;
