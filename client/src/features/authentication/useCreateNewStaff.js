import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewStaff as createNewStaffApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useCreateNewStaff() {
  const queryClient = useQueryClient();

  const { mutate: createNewStaff, isPending } = useMutation({
    mutationFn: createNewStaffApi,
    onSuccess: (user) => {
      toast.success(`New Staff profile created successfully`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createNewStaff, isPending };
}
