import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: ({ passwordCurrent, password, passwordConfirm }) =>
      updatePasswordApi({ passwordCurrent, password, passwordConfirm }),
    onSuccess: (user) => {
      toast.success(`Password Reset successful!`);
    },
    onError: () => {
      toast.error("Password Reset failed!");
    },
  });
  return { updatePassword, isPending };
}
