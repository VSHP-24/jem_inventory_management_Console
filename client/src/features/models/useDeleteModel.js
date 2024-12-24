import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteModel as deleteModelApi } from "../../services/apiModels";

export function useDeleteModel() {
  const queryClient = useQueryClient();

  const { mutate: deleteModel, isPending: isDeleting } = useMutation({
    mutationFn: deleteModelApi,

    onSuccess: () => {
      toast.success(` Bike Model successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteModel };
}
