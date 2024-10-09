import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PartRow from "./PartRow";
import Button from "../../ui/Button";

import { useGetParts } from "./useGetParts";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function PartTable() {
  const { isPending, parts } = useGetParts();

  function handleClick() {
    console.log(parts.filter((part) => part.isDeleted));
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns=".5fr 1fr 1fr .5fr">
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
      <StyledButton size="medium" variation="danger" onClick={handleClick}>
        Deleted Items
      </StyledButton>
    </>
  );
}

export default PartTable;
