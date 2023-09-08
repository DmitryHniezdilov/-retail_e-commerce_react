import SvgIcon from "../SvgIcon";
import { Link } from "react-router-dom";
import "./styles.scss";

const Socials = () => {
  return (
    <ul className="socials">
      <li className="socials__item">
        <Link
          to="/"
          className="socials__link socials__link--fb"
          aria-label="open facebook"
        >
          <SvgIcon addСlass="socials__icon" icon="social-fb" />
        </Link>
      </li>
      <li className="socials__item">
        <Link
          to="/"
          className="socials__link socials__link--tw"
          aria-label="open twitter"
        >
          <SvgIcon addСlass="socials__icon" icon="social-tw" />
        </Link>
      </li>
      <li className="socials__item">
        <Link
          to="/"
          className="socials__link socials__link--in"
          aria-label="open instagram"
        >
          <SvgIcon addСlass="socials__icon" icon="social-in" />
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
