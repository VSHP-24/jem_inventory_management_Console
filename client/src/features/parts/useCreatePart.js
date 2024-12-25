import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditPart as createPartApi } from "../../services/apiParts";

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
