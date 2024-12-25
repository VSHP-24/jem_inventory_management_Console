import { useSearchParams } from "react-router-dom";

import UpdatePasswordForm from "../authentication/UpdatePasswordForm";
import CreateNewStaffForm from "../authentication/CreateNewStaffForm";
import MyProfile from "../authentication/MyProfile";
import UserTable from "./UserTable";

function DisplayUsersNavTabsPages() {
  const [searchParams] = useSearchParams();

  const showPage = searchParams.get("userOptions") || "myProfile";

  if (showPage === "myProfile") return <MyProfile />;
  if (showPage === "updatePassword") return <UpdatePasswordForm />;
  if (showPage === "createStaffProfile") return <CreateNewStaffForm />;
  if (showPage === "allUsers") return <UserTable />;
}

export default DisplayUsersNavTabsPages;
