import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomers";

export function useGetCustomers() {
  const { isPending, data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  return { isPending, customers };
}
