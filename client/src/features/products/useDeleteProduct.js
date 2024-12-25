import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProductApi,

    onSuccess: () => {
      toast.success(` Product successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}
