import styled from "styled-components";
import { useRecentOrders } from "./useRecentOrders";
import Spinner from "../../ui/Spinner";
import { useRecentPurchases } from "./useRecentPurchases";
import Stats from "./Stats";
import { useStockout } from "./useStockout";
import RevenueChart from "./RevenueChart";
import { useSearchParams } from "react-router-dom";
import CategoryChart from "./CategoryChart";
import { useGetBrands } from "../brands/useGetBrands";
import { useGetCategories } from "../categories/useGetCategories";
import BrandChart from "./BrandChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const { isPending: isBrandPending, brands } = useGetBrands();
  const { isPending: isCategoryPending, categories } = useGetCategories();

  const {
    isPending: isOrderPending,
    filteredOrders,
    totalOrders,
  } = useRecentOrders();

  const numDays = !searchParams.get("dataDuration")
    ? 7
    : searchParams.get("dataDuration");

  const { isPending: isPurchasesPending, filteredPurchases } =
    useRecentPurchases();

  const { isPending: isPartsPending, filteredParts } = useStockout();

  const isPending =
    isOrderPending ||
    isPurchasesPending ||
    isPartsPending ||
    isBrandPending ||
    isCategoryPending;

  if (isPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        totalOrders={totalOrders}
        orders={filteredOrders}
        purchases={filteredPurchases}
        parts={filteredParts}
      />

      <BrandChart orders={filteredOrders} brands={brands} />
      <CategoryChart orders={filteredOrders} categories={categories} />
      <RevenueChart
        purchases={filteredPurchases}
        orders={filteredOrders}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
