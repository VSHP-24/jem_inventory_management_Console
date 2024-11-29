import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

const FullPage = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--color-gold-100);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate]
  );

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated)
    return toast.error(
      "Unauthorized Access. Please provide valid email and password to log in!"
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
