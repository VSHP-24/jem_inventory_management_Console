import { useGetParts } from "../parts/useGetParts";
import { MINIMUM_PART_QUANTITY_TO_BE_IN_STOCK } from "../../utils/constants";

export function useStockout() {
  const { isPending, parts } = useGetParts();

  let filteredParts;

  if (!isPending)
    filteredParts = parts.filter(
      (part) => part.quantity < MINIMUM_PART_QUANTITY_TO_BE_IN_STOCK
    );

  return { isPending, filteredParts };
}
