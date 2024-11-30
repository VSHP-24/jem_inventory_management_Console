import { useSearchParams } from "react-router-dom";
import UpdatePasswordForm from "../authentication/UpdatePasswordForm";
import CreateNewStaffForm from "../authentication/CreateNewStaffForm";

function DisplayUsersNavTabsPages() {
  const [searchParams] = useSearchParams();

  const showPage = searchParams.get("userOptions") || "myProfile";

  if (showPage === "updatePassword") return <UpdatePasswordForm />;
  if (showPage === "createStaffProfile") return <CreateNewStaffForm />;
}

export default DisplayUsersNavTabsPages;
