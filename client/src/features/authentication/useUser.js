import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (user && user?.role !== "admin")
    toast.error("Provided email or password is incorrect");

  return { isPending, user, isAuthenticated: user?.role === "admin" };
}
