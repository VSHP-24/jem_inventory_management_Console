import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      toast.success(` New Category successfully created `);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCategory };
}
