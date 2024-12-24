import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

import { useGetOrders } from "../orders/useGetOrder";

export function useRecentOrders() {
  const [searchParams] = useSearchParams();
  const { isPending, orders } = useGetOrders();

  let filteredOrders, totalOrders;

  // IF SEARCHPARAMS DATA DURATION IS SET TO ALL , AND IS NOT PENDING
  if (searchParams.get("dataDuration") === "all" && !isPending) {
    filteredOrders = orders.filter((order) => order.paymentStatus === "paid");
    totalOrders = orders;
  }

  // IF SEARCHPARAMS DATA DURATION IS NOT EQUAL TO ALL
  if (searchParams.get("dataDuration") !== "all") {
    // IF SEARCHPARAMS DOESN'T HAVE DATA DURATION , DEFAULT IS SET TO LAST 7 DAYS
    const numDays = !searchParams.get("dataDuration")
      ? 7
      : Number(searchParams.get("dataDuration"));

    const queryDate = subDays(new Date(), numDays).toISOString();

    if (!isPending) {
      filteredOrders = orders.filter(
        (order) =>
          order.paymentStatus === "paid" && order.createdAt >= queryDate
      );
      totalOrders = orders.filter((order) => order.createdAt >= queryDate);
    }
  }

  return { isPending, filteredOrders, totalOrders };
}
