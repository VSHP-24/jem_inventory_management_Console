import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import styled from "styled-components";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledIcon = styled.div`
  font-size: 3rem;
`;

const StyledIconLabel = styled.span`
  font-size: 1rem;
`;

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {!isPending ? (
        <>
          <StyledIcon>
            <HiArrowRightOnRectangle />
          </StyledIcon>
          <StyledIconLabel>Logout</StyledIconLabel>
        </>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
