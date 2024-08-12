import BikeForm from "../features/create/BikeForm";
import BrandForm from "../features/create/BrandForm";
import CategoryForm from "../features/create/CategoryForm";
import PartForm from "../features/create/PartForm";
import ProductForm from "../features/create/ProductForm";
import SubCategoryForm from "../features/create/SubCategoryForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Create() {
  return (
    <>
      <Row>
        <Heading as="h2">Create</Heading>
      </Row>

      {/* NEW PRODUCT , PART, CATEGORY BUTTON SHOULD BE HERE COMMONLY  */}

      <BrandForm />
      <BikeForm />
      <CategoryForm />
      <SubCategoryForm />
      <PartForm />
      <ProductForm />
    </>
  );
}

export default Create;
