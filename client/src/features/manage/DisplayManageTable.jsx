import { useSearchParams } from "react-router-dom";

import BrandTable from "../brands/BrandTable";
import ModelTable from "../models/ModelTable";
import CategoryTable from "../categories/CategoryTable";
import SubCategoryTable from "../subCategories/SubCategoryTable";

function DisplayManageTable() {
  const [searchParams] = useSearchParams();

  // IF SEARCHPARAMS DOESN'T HAVE TABLE TYPE , DEFAULT IS SET TO BRANDS
  const showTable = searchParams.get("tableType") || "brands";

  if (showTable === "brands") return <BrandTable />;
  if (showTable === "bikes") return <ModelTable />;
  if (showTable === "categories") return <CategoryTable />;
  if (showTable === "subCategories") return <SubCategoryTable />;
}

export default DisplayManageTable;
