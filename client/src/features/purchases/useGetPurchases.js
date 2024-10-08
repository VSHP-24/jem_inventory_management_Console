import { useQuery } from "@tanstack/react-query";
import { getPurchases } from "../../services/apiPurchases";

export function useGetPurchases() {
  const { isPending, data: purchases } = useQuery({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });

  return { isPending, purchases };
}
