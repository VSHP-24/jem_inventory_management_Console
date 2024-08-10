import ProductForm from "../features/create/ProductForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Create() {
  return (
    <>
      <Row>
        <Heading as="h2">Create</Heading>
      </Row>

      <ProductForm />
    </>
  );
}

export default Create;
