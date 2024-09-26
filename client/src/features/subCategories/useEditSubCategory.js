import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditSubCategory as editSubCategoryApi } from "../../services/apiSubCategories";
import toast from "react-hot-toast";

export function useEditSubCategory() {
  const queryClient = useQueryClient();
  const { mutate: editSubCategory, isPending: isEditing } = useMutation({
    mutationFn: editSubCategoryApi,
    onSuccess: () => {
      toast.success(` SubCategory successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editSubCategory };
}
