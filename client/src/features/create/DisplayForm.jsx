import { useSearchParams } from "react-router-dom";
import BrandForm from "../brands/BrandForm";
import BikeForm from "../models/BikeForm";
import CategoryForm from "../categories/CategoryForm";
import SubCategoryForm from "../subCategories/SubCategoryForm";
import PartForm from "../parts/PartForm";
import ProductForm from "../products/ProductForm";

function DisplayForm() {
  const [searchParmas] = useSearchParams();

  const showForm = searchParmas.get("formType") || "new-brand";

  if (showForm === "new-brand") return <BrandForm />;
  if (showForm === "new-bike") return <BikeForm />;
  if (showForm === "new-category") return <CategoryForm />;
  if (showForm === "new-subCategory") return <SubCategoryForm />;
  if (showForm === "new-part") return <PartForm />;
  if (showForm === "new-product") return <ProductForm />;
}

export default DisplayForm;
