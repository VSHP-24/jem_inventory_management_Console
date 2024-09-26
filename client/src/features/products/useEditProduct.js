import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditProduct as editProductApi } from "../../services/apiProducts";

export function useEditProduct() {
  const queryClient = useQueryClient();
  const { mutate: editProduct, isPending: isEditing } = useMutation({
    mutationFn: editProductApi,
    onSuccess: () => {
      toast.success(` Product successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editProduct };
}
