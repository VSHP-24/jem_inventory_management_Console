import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledNavLink = styled(NavLink)`
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: column;
      align-items: center;
      line-height: 1;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      align-items: center;
      gap: 0.6rem;

      font-size: 1.2rem;
      font-weight: 500;
    `}

  text-decoration: none;
  display: flex;
  padding: 0.8rem;
`;

StyledNavLink.defaultProps = {
  type: "horizontal",
};

export default StyledNavLink;
