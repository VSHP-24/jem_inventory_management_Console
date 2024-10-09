import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditModel as editModelApi } from "../../services/apiModels";
import toast from "react-hot-toast";

export function useEditModel() {
  const queryClient = useQueryClient();
  const { mutate: editModel, isPending: isEditing } = useMutation({
    mutationFn: editModelApi,
    onSuccess: () => {
      toast.success(` Bike Model successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editModel };
}
