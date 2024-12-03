import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useGetUsers() {
  const { isPending, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { isPending, users };
}
