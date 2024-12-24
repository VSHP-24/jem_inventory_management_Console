import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../../services/apiOrders";

export function useGetOrders() {
  const { isPending, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return { isPending, orders };
}
