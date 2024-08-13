import { useQuery } from "@tanstack/react-query";
import { getParts } from "../../services/apiParts";

export function useGetParts() {
  const { isPending, data: parts } = useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });

  return { isPending, parts };
}
