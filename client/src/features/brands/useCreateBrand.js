import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand as createBrandApi } from "../../services/apiBrands";
import toast from "react-hot-toast";

export function useCreateBrand() {
  const queryClient = useQueryClient();
  const { mutate: createBrand, isPending: isCreating } = useMutation({
    mutationFn: createBrandApi,
    onSuccess: () => {
      toast.success(` New Brand successfully created `);
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createBrand };
}
