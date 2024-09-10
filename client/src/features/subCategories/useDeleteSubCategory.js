import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubCategory as deleteSubCategoryApi } from "../../services/apiSubCategories";
import toast from "react-hot-toast";

export function useDeleteSubCategory() {
  const queryClient = useQueryClient();
  const { mutate: deleteSubCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteSubCategoryApi,
    onSuccess: () => {
      toast.success(` SubCategory successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteSubCategory };
}
