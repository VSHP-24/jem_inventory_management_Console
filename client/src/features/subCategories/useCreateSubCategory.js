import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategory as createSubCategoryApi } from "../../services/apiSubCategories";
import toast from "react-hot-toast";

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
