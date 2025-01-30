import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

import { useLogout } from "./useLogout";
import { device } from "../../utils/devices";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const StyledIcon = styled.div`
  font-size: 2rem;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media ${device.laptopS} {
    font-size: 1rem;
    @media ${device.tablet} {
      & svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }

  @media ${device.tablet} {
    font-size: 1rem;
    @media ${device.tablet} {
      & svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
`;

const StyledIconLabel = styled.span`
  font-size: 1rem;

  @media ${device.laptopS} {
    font-size: 1rem;
  }

  @media ${device.tablet} {
    font-size: 0.8rem;
  }
`;

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {!isPending ? (
        <StyledContainer>
          <StyledIcon>
            <HiArrowRightOnRectangle />
          </StyledIcon>
          <StyledIconLabel>Logout</StyledIconLabel>
        </StyledContainer>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
