import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editUser as editUserApi } from "../../services/apiUsers";

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending: isEditing } = useMutation({
    mutationFn: editUserApi,

    onSuccess: () => {
      toast.success(` User successfully edited `);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editUser };
}
