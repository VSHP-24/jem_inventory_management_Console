import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editOrders as editOrdersApi } from "../../services/apiOrders";

export function useEditOrder() {
  const queryClient = useQueryClient();

  const { mutate: editOrder, isPending: isEditing } = useMutation({
    mutationFn: editOrdersApi,

    onSuccess: () => {
      toast.success(` Order Status successfully updated `);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editOrder };
}
