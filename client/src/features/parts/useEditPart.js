import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPart as editPartApi } from "../../services/apiParts";
import toast from "react-hot-toast";

export function useEditPart() {
  const queryClient = useQueryClient();
  const { mutate: editPart, isPending: isEditing } = useMutation({
    mutationFn: editPartApi,
    onSuccess: () => {
      toast.success(` Part successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editPart };
}
