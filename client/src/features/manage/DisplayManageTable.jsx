import { useSearchParams } from "react-router-dom";

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
}

export default DisplayManageTable;
