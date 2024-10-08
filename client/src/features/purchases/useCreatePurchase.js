import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditPurchase as createPurchaseApi } from "../../services/apiPurchases";

export function useCreatePurchase() {
  const queryClient = useQueryClient();
  const { mutate: createPurchase, isPending: isCreating } = useMutation({
    mutationFn: createPurchaseApi,
    onSuccess: () => {
      toast.success(` New Purchase successfully created `);
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPurchase };
}
