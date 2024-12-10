import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useGetOrders } from "../orders/useGetOrder";

export function useRecentOrders() {
  const [searchParams] = useSearchParams();

  const { isPending, orders } = useGetOrders();

  let filteredOrders;
  let totalOrders;

  if (searchParams.get("dataDuration") === "all" && !isPending) {
    filteredOrders = orders.filter((order) => order.paymentStatus === "paid");
    totalOrders = orders;
  }
  if (searchParams.get("dataDuration") !== "all") {
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
