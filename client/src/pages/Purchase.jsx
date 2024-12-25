import PurchaseTable from "../features/purchases/PurchaseTable";
import PurchaseTableOperations from "../features/purchases/PurchaseTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Purchase() {
  return (
    <>
      <Row>
        <Heading as="h2">Purchases</Heading>
      </Row>

      <Row>
        <PurchaseTableOperations />
      </Row>
      <PurchaseTable />
    </>
  );
}

export default Purchase;
