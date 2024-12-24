import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

import { useGetPurchases } from "../purchases/useGetPurchases";

export function useRecentPurchases() {
  const [searchParams] = useSearchParams();
  const { isPending, purchases } = useGetPurchases();

  let filteredPurchases;

  // IF SEARCHPARAMS DATA DURATION IS SET TO ALL , AND IS NOT PENDING
  if (searchParams.get("dataDuration") === "all" && !isPending)
    filteredPurchases = purchases.filter(
      (purchase) => purchase.status === "order_received"
    );

  // IF SEARCHPARAMS DATA DURATION IS NOT EQUAL TO ALL
  if (searchParams.get("dataDuration") !== "all") {
    // IF SEARCHPARAMS DOESN'T HAVE DATA DURATION , DEFAULT IS SET TO LAST 7 DAYS
    const numDays = !searchParams.get("dataDuration")
      ? 7
      : Number(searchParams.get("dataDuration"));

    const queryDate = subDays(new Date(), numDays).toISOString();

    if (!isPending)
      filteredPurchases = purchases.filter(
        (purchase) =>
          purchase.status === "order_received" &&
          purchase.orderPlacedOnDate >= queryDate
      );
  }

  return { isPending, filteredPurchases };
}
