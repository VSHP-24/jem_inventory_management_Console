import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory as deleteCategoryApi } from "../../services/apiCategories";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryApi,

    onSuccess: () => {
      toast.success(` Category successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCategory };
}
