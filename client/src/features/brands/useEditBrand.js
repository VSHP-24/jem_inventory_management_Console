import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBrand as editBrandApi } from "../../services/apiBrands";
import toast from "react-hot-toast";

export function useEditBrand() {
  const queryClient = useQueryClient();

  const { mutate: editBrand, isPending: isEditing } = useMutation({
    mutationFn: editBrandApi,
    onSuccess: () => {
      toast.success(` Brand successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editBrand };
}
