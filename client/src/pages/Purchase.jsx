import PurchaseTable from "../features/purchases/PurchaseTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Purchase() {
  return (
    <>
      <Row>
        <Heading as="h2">Purchases</Heading>
      </Row>
      <PurchaseTable />
    </>
  );
}

export default Purchase;
