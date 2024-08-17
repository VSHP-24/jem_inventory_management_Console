import { useSearchParams } from "react-router-dom";

// import BrandForm from "./BrandForm";
// import BikeForm from "./BikeForm";
// import CategoryForm from "./CategoryForm";
// import PartForm from "./PartForm";
// // import ProductForm from "./ProductForm";
// import SubCategoryForm from "./SubCategoryForm";
import BrandTable from "../brands/BrandTable";
import ModelTable from "../models/ModelTable";
import CategoryTable from "../categories/CategoryTable";
import SubCategoryTable from "../subCategories/SubCategoryTable";
import PartTable from "../parts/PartTable";

function DisplayManageTable() {
  const [searchParmas] = useSearchParams();

  const showTable = searchParmas.get("tableType") || "brands";

  if (showTable === "brands") return <BrandTable />;
  if (showTable === "bikes") return <ModelTable />;
  if (showTable === "categories") return <CategoryTable />;
  if (showTable === "subCategories") return <SubCategoryTable />;
  if (showTable === "parts") return <PartTable />;

  //   if (showTable === "bikes") return <BikeForm />;
  //   if (showTable === "categories") return <CategoryForm />;
  //   if (showTable === "subCategories") return <SubCategoryForm />;
  //   if (showTable === "parts") return <PartForm />;
}

export default DisplayManageTable;
