import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditPurchase as editPurchaseApi } from "../../services/apiPurchases";

export function useEditPurchase() {
  const queryClient = useQueryClient();

  const { mutate: editPurchase, isPending: isEditing } = useMutation({
    mutationFn: editPurchaseApi,

    onSuccess: () => {
      toast.success(` Purchase Order successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editPurchase };
}
