import CustomersTable from "../features/customers/CustomerTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Customer() {
  return (
    <>
      <Row>
        <Heading as="h2">Customers Data</Heading>
      </Row>

      <CustomersTable />
    </>
  );
}

export default Customer;
