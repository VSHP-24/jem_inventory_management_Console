import styled from "styled-components";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { cloneElement, createContext, useContext, useState } from "react";

import Button from "./Button";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { device } from "../utils/devices";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-gold-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-height: 100vh;
  overflow-y: auto;
  width: ${(props) => props?.width};
  max-width: 80%;
  justify-items: center;

  @media ${device.laptopL} {
    padding: 1.2rem;
    font-size: 1rem;
  }

  @media ${device.laptopS} {
    padding: 1.5rem;
    font-size: 1rem;
  }

  @media ${device.tablet} {
    padding: 1rem;
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    padding: 1rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledButton = styled(Button)`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  & svg {
    @media ${device.laptopS} {
      font-size: 1.6rem;
    }
    @media ${device.tablet} {
      font-size: 1.4rem;
    }
    @media ${device.mobileM} {
      font-size: 1.2rem;
    }
  }
`;

const ModalContext = createContext();

function Modal({ children, closeMenuList }) {
  const [openName, setOpenName] = useState("");

  function close() {
    setOpenName("");
    closeMenuList?.();
  }

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    ...children.props,
    onClick: () => {
      open(opensWindowName);
    },
  });
}

function Window({ children, name, width = "100%" }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref} width={width}>
        <StyledButton size="medium" variation="secondary" onClick={close}>
          <HiXMark />
        </StyledButton>
        {cloneElement(children, { ...children.props, onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
