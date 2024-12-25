import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMyProfile as updateMyProfileApi } from "../../services/apiAuth";

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateMyProfile, isPending: isEditing } = useMutation({
    mutationFn: updateMyProfileApi,

    onSuccess: () => {
      toast.success(`Profile Updated Successfully! 😉`);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => {
      toast.error("Profile Update failed!", err.message);
    },
  });

  return { updateMyProfile, isEditing };
}
