import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";

export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: (user) => {
      toast.success(`Reset Password Token sent to email! 📧`);
    },

    onError: () => {
      toast.error("There was an error sending the email. Try again later!");
    },
  });

  return { forgotPassword, isPending };
}
