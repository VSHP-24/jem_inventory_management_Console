import styled from "styled-components";

import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import RevenueChart from "./RevenueChart";
import CategoryChart from "./CategoryChart";
import BrandChart from "./BrandChart";

import { useRecentOrders } from "./useRecentOrders";
import { useRecentPurchases } from "./useRecentPurchases";
import { useStockout } from "./useStockout";
import { useSearchParams } from "react-router-dom";
import { useGetBrands } from "../brands/useGetBrands";
import { useGetCategories } from "../categories/useGetCategories";
import { device } from "../../utils/devices";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 1.4rem;

  @media ${device.laptopL} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 34rem auto;
    gap: 1.2rem;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.mobileM} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
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
  const { isPending: isPurchasesPending, filteredPurchases } =
    useRecentPurchases();
  const { isPending: isPartsPending, filteredParts } = useStockout();

  // IF SEARCHPARAMS DOESN'T HAVE NUMBER OF DAYS , DEFAULT IS SET TO LAST 7 DAYS
  const numDays = !searchParams.get("dataDuration")
    ? 7
    : searchParams.get("dataDuration");

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

      <BrandChart orders={filteredOrders} brands={brands} numDays={numDays} />

      <CategoryChart
        orders={filteredOrders}
        categories={categories}
        numDays={numDays}
      />

      <RevenueChart
        purchases={filteredPurchases}
        orders={filteredOrders}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
