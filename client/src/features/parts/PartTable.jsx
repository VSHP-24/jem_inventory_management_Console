import { useState } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PartRow from "./PartRow";

import { useGetParts } from "./useGetParts";

function PartTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, parts } = useGetParts();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={parts}
        render={(part, i) => (
          <PartRow
            part={part}
            index={i}
            key={part.id}
            openId={openId}
            close={close}
            open={open}
            id={part.id}
            position={position}
            setPosition={setPosition}
          />
        )}
      />
    </Table>
  );
}

export default PartTable;
