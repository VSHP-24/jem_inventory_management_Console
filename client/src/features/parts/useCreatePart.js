import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPart as createPartApi } from "../../services/apiParts";
import toast from "react-hot-toast";

export function useCreatePart() {
  const queryClient = useQueryClient();
  const { mutate: createPart, isPending: isCreating } = useMutation({
    mutationFn: createPartApi,
    onSuccess: () => {
      toast.success(` New Part successfully created `);
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createPart };
}
