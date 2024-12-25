import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBrand as deleteBrandApi } from "../../services/apiBrands";

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  const { mutate: deleteBrand, isPending: isDeleting } = useMutation({
    mutationFn: deleteBrandApi,

    onSuccess: () => {
      toast.success(` Brand successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBrand };
}
