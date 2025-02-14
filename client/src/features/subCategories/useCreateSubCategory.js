import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditSubCategory as createSubCategoryApi } from "../../services/apiSubCategories";

export function useCreateSubCategory() {
  const queryClient = useQueryClient();

  const { mutate: createSubCategory, isPending: isCreating } = useMutation({
    mutationFn: createSubCategoryApi,

    onSuccess: () => {
      toast.success(` New SubCategory successfully created `);
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createSubCategory };
}
