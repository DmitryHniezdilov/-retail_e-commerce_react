import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Search from "../../elements/Search";
import Nav from "../Nav";
import HeaderIcons from "../../elements/HeaderIcons";
import logo from "./logo.svg";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";

const Header = ({ categoriesList, isLoading }) => {
  return (
    <header className="header">
      <div className="center">
        <div className="header__inner">
          <div className="header__search-wrap">
            {categoriesList || !isLoading ? (
              <Search />
            ) : (
              <Skeleton width={18} height={18} />
            )}
          </div>
          <div className="header__drop-wrap">
            <Nav categoriesList={categoriesList} />
          </div>
          <div className="header__logo-wrap">
            {categoriesList || !isLoading ? (
              <Link to="/" className="header__logo">
                <img
                  src={logo}
                  alt="logo e-commerce"
                  className="header__logo-img"
                />
              </Link>
            ) : (
              <Skeleton className="header__logo skeleton" />
            )}
          </div>
          <div className="header__icons-wrap">
            {categoriesList || !isLoading ? (
              <HeaderIcons />
            ) : (
              <Skeleton width={100} height={18} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
