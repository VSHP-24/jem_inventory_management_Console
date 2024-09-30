import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ModelRow from "./ModelRow";
import Button from "../../ui/Button";

import { useGetModels } from "./useGetModels";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function ModelTable() {
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
            <ModelRow model={model} index={i} key={model.id} id={model.id} />
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
