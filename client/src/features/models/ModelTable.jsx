import { useState } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ModelRow from "./ModelRow";

import { useGetModels } from "./useGetModels";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function ModelTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, models } = useGetModels();

  function handleClick() {
    console.log(
      models.filter((model) => model.isDeleted || model.brand.isDeleted)
    );
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns=".5fr 1fr 1fr .75fr .5fr .5fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Brand</div>
          <div>Bike Model</div>
          <div>Version</div>
          <div>Year</div>
        </Table.Header>

        <Table.Body
          data={models.filter(
            (model) => !model.isDeleted && !model.brand.isDeleted
          )}
          render={(model, i) => (
            <ModelRow
              model={model}
              index={i}
              key={model.id}
              openId={openId}
              close={close}
              open={open}
              id={model.id}
              position={position}
              setPosition={setPosition}
            />
          )}
        />
      </Table>
      <StyledButton size="medium" variation="danger" onClick={handleClick}>
        Deleted Items
      </StyledButton>
    </>
  );
}

export default ModelTable;
