import { useSearchParams } from "react-router-dom";
import BrandForm from "../brands/BrandForm";
import ModelForm from "../models/ModelForm";
import CategoryForm from "../categories/CategoryForm";
import SubCategoryForm from "../subCategories/SubCategoryForm";
import PartForm from "../parts/PartForm";
import ProductForm from "../products/ProductForm";
import PurchaseForm from "../purchases/PurchaseForm";

function DisplayForm() {
  const [searchParams] = useSearchParams();

  const showForm = searchParams.get("formType") || "new-brand";

  if (showForm === "new-brand") return <BrandForm />;
  if (showForm === "new-bike") return <ModelForm />;
  if (showForm === "new-category") return <CategoryForm />;
  if (showForm === "new-subCategory") return <SubCategoryForm />;
  if (showForm === "new-part") return <PartForm />;
  if (showForm === "new-product") return <ProductForm />;
  if (showForm === "new-purchase") return <PurchaseForm />;
}

export default DisplayForm;
