import { useQuery } from "@tanstack/react-query";

import { getBrands } from "../../services/apiBrands";

export function useGetBrands() {
  const { isPending, data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return { isPending, brands };
}
