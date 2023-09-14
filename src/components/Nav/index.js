import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { DESKTOP_WIDTH_XL } from "../../utils/constants";
import SvgIcon from "../../elements/SvgIcon";
import NavModal from "../NavModal";
import NavList from "../NavList";
import "./styles.scss";

const Nav = ({ categoriesList }) => {
  const innerWidth = useSelector((state) => state.innerWidth);
  const [isShowModal, setShowModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    innerWidth > DESKTOP_WIDTH_XL ? true : false
  );

  useEffect(() => {
    innerWidth > DESKTOP_WIDTH_XL ? setIsDesktop(true) : setIsDesktop(false);
  }, [innerWidth]);

  const NavComponent = ({ isDesktop, isShowModal }) => {
    return isDesktop ? (
      <NavList navList={categoriesList} isDesktop={isDesktop} />
    ) : (
      <NavList
        navList={categoriesList}
        isDesktop={isDesktop}
        onClose={() => setShowModal(false)}
      />
    );
  };

  return (
    <div className="nav">
      {isDesktop ? (
        <NavComponent isDesktop={true} isShowModal={isShowModal} />
      ) : categoriesList ? (
        <>
          <button
            className="nav__button-mob"
            type="button"
            aria-label="open modal navigation"
            onClick={() => setShowModal(true)}
          >
            <SvgIcon addСlass="nav__button-mob-icon" icon="btn" />
          </button>
          <NavModal
            isShowModal={isShowModal}
            onClose={() => setShowModal(false)}
          >
            <NavComponent isDesktop={false} isShowModal={isShowModal} />
          </NavModal>
        </>
      ) : (
        <Skeleton width={24} height={18} />
      )}
    </div>
  );
};

export default memo(Nav);
