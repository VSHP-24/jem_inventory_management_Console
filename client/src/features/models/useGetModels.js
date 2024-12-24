import { useQuery } from "@tanstack/react-query";

import { getModels } from "../../services/apiModels";

export function useGetModels() {
  const { isPending, data: models } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  return { isPending, models };
}
