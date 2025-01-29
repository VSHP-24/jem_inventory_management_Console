import styled from "styled-components";

import { device } from "../../utils/devices";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-gold-200);
  border: 1px solid var(--color-gold-700);
  border-radius: var(--border-radius-md);

  padding: 1rem;
  display: grid;
  grid-template-columns: 3.6rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media ${device.laptopL} {
    padding: 0.8rem;
    column-gap: 1.2rem;
  }

  @media ${device.mobileM} {
    column-gap: 0.5rem;
    grid-template-columns: 3rem 1fr;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-0);

    @media ${device.laptopL} {
      & svg {
        width: 1.6rem;
        height: 1.6rem;
      }

      @media ${device.mobileM} {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-700);

  @media ${device.laptopL} {
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    font-size: 0.8rem;
  }
`;

const Value = styled.p`
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 500;
  color: var(--color-grey-900);

  @media ${device.laptopL} {
    font-size: 1.4rem;
  }

  @media ${device.mobileM} {
    font-size: 1.2rem;
  }
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>

      <Title>{title}</Title>

      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
