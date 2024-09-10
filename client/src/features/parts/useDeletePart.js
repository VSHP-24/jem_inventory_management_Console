import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePart as deletePartApi } from "../../services/apiParts";
import toast from "react-hot-toast";

export function useDeletePart() {
  const queryClient = useQueryClient();
  const { mutate: deletePart, isPending: isDeleting } = useMutation({
    mutationFn: deletePartApi,
    onSuccess: () => {
      toast.success(` Part successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deletePart };
}
