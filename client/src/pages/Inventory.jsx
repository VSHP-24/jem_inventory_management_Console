import PartTable from "../features/parts/PartTable";
import PartTableOperations from "../features/parts/PartTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Inventory() {
  return (
    <>
      <Row>
        <Heading as="h2">Inventory</Heading>
      </Row>

      <Row>
        <PartTableOperations />
      </Row>

      <PartTable />
    </>
  );
}

export default Inventory;
