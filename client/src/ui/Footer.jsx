import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-900);
  grid-column: 1/-1;
  color: var(--color-gold-100);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <StyledFooter>
      <Content>
        <p>{`© ${currentYear}, All Rights Reserved `}</p>
        <p>{`Built with ♥ by VSHP.`}</p>
      </Content>
    </StyledFooter>
  );
}

export default Footer;
