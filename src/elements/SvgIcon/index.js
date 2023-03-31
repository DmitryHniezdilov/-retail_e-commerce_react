import icons from "./icons.svg";
import "./styles.scss";

const SvgIcon = (props) => {
  return (
    <svg className={`icon ${props.addСlass}`} aria-hidden="true">
      <use xlinkHref={`${icons}#icon-${props.icon}`}></use>
    </svg>
  );
};

export default SvgIcon;
