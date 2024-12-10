import { useGetParts } from "../parts/useGetParts";

export function useStockout() {
  const { isPending, parts } = useGetParts();
  let filteredParts;
  if (!isPending) filteredParts = parts.filter((part) => part.quantity < 100);
  return { isPending, filteredParts };
}
