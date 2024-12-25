import { useQuery } from "@tanstack/react-query";

import { getSubCategories } from "../../services/apiSubCategories";

export function useGetSubCategories() {
  const { isPending, data: subCategories } = useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
  });

  return { isPending, subCategories };
}
