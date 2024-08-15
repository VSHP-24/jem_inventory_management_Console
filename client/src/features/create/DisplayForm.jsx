import { useSearchParams } from "react-router-dom";

import BrandForm from "./BrandForm";
import BikeForm from "./BikeForm";
import CategoryForm from "./CategoryForm";
import PartForm from "./PartForm";
import ProductForm from "./ProductForm";
import SubCategoryForm from "./SubCategoryForm";

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
