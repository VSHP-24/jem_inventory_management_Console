import { useSearchParams } from "react-router-dom";
import UpdatePasswordForm from "../authentication/UpdatePasswordForm";

function DisplayUsersNavTabsPages() {
  const [searchParams] = useSearchParams();

  const showPage = searchParams.get("userOptions") || "myProfile";

  if (showPage === "updatePassword") return <UpdatePasswordForm />;
}

export default DisplayUsersNavTabsPages;
