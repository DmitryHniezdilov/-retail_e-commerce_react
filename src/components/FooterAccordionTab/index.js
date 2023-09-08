import { useRef, memo } from "react";
import { CSSTransition } from "react-transition-group";

const FooterAccordionTab = ({
  idx,
  title,
  children,
  isAccordionOpen,
  onAccordionClick,
  isDesktop,
}) => {
  const nodeRef = useRef(null);

  return (
    <>
      <h6 className="footer__nav-title footer__nav-title--desc">{title}</h6>
      <button
        className={`footer__nav-title footer__nav-title--accordion ${
          isAccordionOpen === idx && "is-open"
        }`}
        type="button"
        aria-label="collapse contacts"
        onClick={() => onAccordionClick(idx)}
      >
        {title}
      </button>
      <CSSTransition
        nodeRef={nodeRef}
        in={isAccordionOpen === idx || isDesktop}
        classNames={{
          enter: "footer__accordion--enter",
          enterActive: "footer__accordion--active-enter",
          enterDone: "footer__accordion--done-enter",
          exit: "footer__accordion--exit",
          exitActive: "footer__accordion--active-exit",
        }}
        timeout={200}
        unmountOnExit
      >
        <div className="footer__accordion" ref={nodeRef}>
          {children}
        </div>
      </CSSTransition>
    </>
  );
};

export default memo(FooterAccordionTab);
