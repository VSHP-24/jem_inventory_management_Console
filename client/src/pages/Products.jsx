import Row from "../ui/Row";
import Heading from "../ui/Heading";
import ProductTable from "../features/products/ProductTable";
import ProductTableOperations from "../features/products/ProductTableOperations";

function Products() {
  return (
    <>
      <Row>
        <Heading as="h2">All Products</Heading>
      </Row>
      <Row>
        <ProductTableOperations />
      </Row>
      <Row>
        <ProductTable />
      </Row>
    </>
  );
}

export default Products;
