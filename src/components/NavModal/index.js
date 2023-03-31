import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { PAGE_CLASS, IS_MODAL_CLASS } from "../../utils/constants";
import "./styles.scss";

const NavModal = ({ isShowModal, onClose, children }) => {
  const [isTransition, setIsTransition] = useState(false);
  const nodeRef = useRef(null);

  const toggleRootOverflow = () => {
    document
      .getElementsByClassName(PAGE_CLASS)[0]
      .classList.toggle(IS_MODAL_CLASS);
  };

  const handleCloseModal = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    toggleRootOverflow();
    isShowModal ? setIsTransition(true) : setIsTransition(false);
  }, [isShowModal]);

  useEffect(() => {
    if (isShowModal) {
      document.body.addEventListener("keydown", handleCloseModal);
    } else {
      document.body.removeEventListener("keydown", handleCloseModal);
    }

    return () => {
      document.body.removeEventListener("keydown", handleCloseModal);
    };
  }, [isShowModal, handleCloseModal]);

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isTransition}
      classNames={{
        enter: "nav-modal--enter",
        enterActive: "nav-modal--active-enter",
        enterDone: "nav-modal--done-enter",
        exit: "nav-modal--exit",
        exitActive: "nav-modal--active-exit",
      }}
      timeout={200}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="nav-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mobile modal navigation"
        onClick={onClose}
      >
        <div
          className="nav-modal__dialog"
          role="document"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default NavModal;
