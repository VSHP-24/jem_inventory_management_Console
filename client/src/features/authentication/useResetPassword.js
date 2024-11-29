import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";

export function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: ({ password, passwordConfirm }) =>
      resetPasswordApi({ password, passwordConfirm }),
    onSuccess: (user) => {
      toast.success(`Password Reset successful!`);
    },
    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });
  return { resetPassword, isPending };
}
