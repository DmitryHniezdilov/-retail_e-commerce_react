import SvgIcon from "../SvgIcon";
import "./styles.scss";

const HeaderIcons = () => {
  return (
    <div className="header-icons">
      <button
        className="header-icons__btn header-icons__btn--cart"
        type="button"
        aria-label="open shopping cart"
      >
        <SvgIcon addСlass="header-icons__icon" icon="cart" />
      </button>
      <button
        className="header-icons__btn header-icons__btn--heart"
        type="button"
        aria-label="open favorites products"
      >
        <SvgIcon addСlass="header-icons__icon" icon="heart" />
      </button>
      <button
        className="header-icons__btn header-icons__btn--profile"
        type="button"
        aria-label="open your profile"
      >
        <SvgIcon addСlass="header-icons__icon" icon="profile" />
      </button>
    </div>
  );
};

export default HeaderIcons;
