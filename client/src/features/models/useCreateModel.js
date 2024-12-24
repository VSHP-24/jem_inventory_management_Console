import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditModel as createModelApi } from "../../services/apiModels";

export function useCreateModel() {
  const queryClient = useQueryClient();

  const { mutate: createModel, isPending: isCreating } = useMutation({
    mutationFn: createModelApi,

    onSuccess: () => {
      toast.success(` New Bike Model successfully created `);
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createModel };
}
