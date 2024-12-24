import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../../services/apiCategories";

export function useGetCategories() {
  const { isPending, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { isPending, categories };
}
