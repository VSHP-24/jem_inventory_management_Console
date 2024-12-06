import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Order() {
  return (
    <>
      <Row>
        <Heading as="h2">Orders Data</Heading>
      </Row>

      <Row>
        <OrderTableOperations />
      </Row>

      <OrderTable />
    </>
  );
}

export default Order;
