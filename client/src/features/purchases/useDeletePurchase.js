import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePurchase as deletePurchaseApi } from "../../services/apiPurchases";

export function useDeletePurchase() {
  const queryClient = useQueryClient();

  const { mutate: deletePurchase, isPending: isDeleting } = useMutation({
    mutationFn: deletePurchaseApi,

    onSuccess: () => {
      toast.success(` Purchase successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePurchase };
}
