import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { resetPassword as resetPasswordApi } from "../../services/apiAuth";

export function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (user) => {
      toast.success(`Password Reset successful! 🔐 `);
    },

    onError: () => {
      toast.error(" Oops ! Password reset failed 😥. Please try again later !");
    },
  });

  return { resetPassword, isPending };
}
