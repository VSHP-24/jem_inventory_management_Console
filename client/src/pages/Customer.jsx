import CustomersTable from "../features/customers/CustomerTable";
import CustomerTableOperations from "../features/customers/CustomerTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Customer() {
  return (
    <>
      <Row>
        <Heading as="h2">Customers Data</Heading>
      </Row>

      <Row>
        <CustomerTableOperations />
      </Row>

      <CustomersTable />
    </>
  );
}

export default Customer;
